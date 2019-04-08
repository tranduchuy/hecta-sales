import { Pipe, PipeTransform } from '@angular/core';
import {environment} from '../../../../environments/environment';

/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'appStaticImage'})
export class AppStaticImagePipe implements PipeTransform {
  transform(value: string, exponent: string): string {
    return environment.staticImageSize + exponent + '/' + value;
  }
}
