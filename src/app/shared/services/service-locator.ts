import {Injector} from '@angular/core';

/**
 * サービスロケーター
 * 継承元の親クラスなど、DIできない箇所でサービスを利用したい場合などに使用する
 *
 * @example
 * export class ParentClass {
 *
 *   protected service: SampleService;
 *
 *   constructor() {
 *     this.service = ServiceLocator.injector.get(SampleService);
 *     ....
 *   }
 * }
 */
export class ServiceLocator {
  static injector: Injector;
}
