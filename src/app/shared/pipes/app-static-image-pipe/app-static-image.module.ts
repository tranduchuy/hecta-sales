import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppStaticImagePipe } from "./app-static-image.pipe";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AppStaticImagePipe],
  exports: [AppStaticImagePipe]
})

export class AppStaticImageModule {}