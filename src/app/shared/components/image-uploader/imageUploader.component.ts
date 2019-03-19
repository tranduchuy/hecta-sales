import { HttpClient } from '@angular/common/http';
import {
  AfterContentInit,
  Component,
  DebugElement,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output, ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { URLs } from '../../constants/url.constant';
import { StrService } from '../../services/helper/str.service';
import { BaseComponent } from '../base/base.componen';
import {General} from '../../constants/general.constant';

const IMAGE_UPLOADER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ImageUploaderComponent),
  multi: true
};

interface IFile {
  elId: string;
  file: any;
  percentUploaded: number;
  result: any;
  url: string;
  isDemo?: boolean;
}

export interface IFileTextValue {
  link: string;
  isDemo?: boolean;
}

@Component({
  templateUrl: './imageUploader.component.html',
  selector: 'app-image-uploader',
  styleUrls: ['./imageUploader.component.scss'],
  providers: [IMAGE_UPLOADER_VALUE_ACCESSOR]
})

export class ImageUploaderComponent extends BaseComponent implements AfterContentInit, ControlValueAccessor {
  _files: IFile[] = [];
  _values = [];

  General = General;
  environment = environment;

  @Input()
  set values(values: IFileTextValue[]) {
    this._values = values;
    this._files = [];

    values.forEach((link: IFileTextValue) => {

      if (link.isDemo === undefined) {
        link.isDemo = true;
      }

      this._files.push({
        elId: StrService.guidGenerator(),
        file: {},
        percentUploaded: 0,
        result: {
          link: link.link
        },
        url: link.isDemo ?  environment.staticImageDemo + link.link : environment.staticImageSize + General.SizeImage.S164x170 + '/'  + link.link,
        isDemo: link.isDemo,
      });
    })
  }

  get values(): IFileTextValue[] {
    return this._values;
  }

  @Input() max = -1;
  @Input() maxSize = 1024 * 2; // 2mb
  @Output() valueChanged = new EventEmitter<IFileTextValue[]>();

  @ViewChild('inputFile') inputFile: DebugElement;

  constructor(private el: ElementRef,
    private http: HttpClient) {
    super();
  }

  ngAfterContentInit() {

  }

  writeValue(obj: any): void {
    this.values = obj;
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onModelTouched = fn;
  }

  updateModel() {
    this.values = this._files.filter(f => f.result)
      .map(f => {
        return {
          link: f.result.link,
          isDemo: f.isDemo
        };
      });

    this.valueChanged.emit(this.values);
    this.onModelChange(this.values);
  }

  onChangeInputFiles(event: any) {
    const selectedFiles = event.target.files;
    if (selectedFiles.length === 0) {
      return;
    }

    if (this.max !== -1 && this._files.length + selectedFiles.length > this.max) {
      this.resetValueOfInput();
      return;
    }

    if (this._existFileTooLarge(selectedFiles)) {
      this.resetValueOfInput();
      return;
    }

    const waitingImages = this.generateObjectImage(selectedFiles);
    this._files = [
      ...this._files,
      ...waitingImages
    ];

    if (waitingImages.length > 0) {
      setTimeout(() => {
        this._renderNewImages(waitingImages);
      }, 100);
      this.resetValueOfInput();
    }
  }

  trackBy(index, item) {
    return item.elId;
  }

  removeFile(file: IFile) {
    const index = this.findIndexFile(file);
    if (index !== -1) {
      this._files.splice(index, 1);
      this.updateModel();
    }
  }

  private onModelChange = (_: any) => { };

  private onModelTouched = () => { };

  private generateObjectImage(files: any): IFile[] {
    const results: IFile[] = [];

    for (const key in files) {
      if (files.hasOwnProperty(key)) {
        results.push({
          elId: StrService.guidGenerator(),
          file: files[key],
          percentUploaded: 0,
          result: null,
          url: ''
        });
      }
    }

    return results;
  }

  private findIndexFile(file: IFile) {
    return this._files.findIndex(f => f.elId === file.elId);
  }

  private resetValueOfInput() {
    this.inputFile.nativeElement.value = '';
  }

  private _renderNewImages(newImages: IFile[]) {
    newImages.forEach(imgFile => {
      this._uploadImage(imgFile);
    });
  }

  private _existFileTooLarge(selectedFiles: any): boolean {
    // TODO:
    return false;
  }

  private _uploadImage(imgFile: IFile) {
    const index = this.findIndexFile(imgFile);

    if (index === -1) {
      return;
    }

    const formData = new FormData();
    formData.append('file', imgFile.file);

    this.http.post(URLs.uploadImage, formData)
      .subscribe((res: any) => {
        if (res.status === 1) {
          this._files[index].url = environment.staticImageDemo + res.data.link.toString();
          this._files[index].result = res.data;
          this._files[index].isDemo = true;
          this.updateModel();
        }
        console.log(this._files);
      });
  }
}
