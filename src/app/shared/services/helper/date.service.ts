import { Injectable } from '@angular/core';

@Injectable()
export class DateService {
  startOfDate(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  addDate(date: Date, value: number): Date {
    const newDate: Date = this._copyDateObj(date);
    newDate.setDate(newDate.getDate() + value);
    return newDate;
  }

  addHour(date: Date, value: number): Date {
    const newDate: Date = this._copyDateObj(date);
    newDate.setHours(newDate.getHours() + value);
    return newDate;
  }

  addMonth(date: Date, value: number): Date {
    const newDate: Date = this._copyDateObj(date);
    newDate.setMonth(newDate.getMonth() + value);
    return newDate;
  }

  countDaysBetweenDate(from: Date, to: Date): number {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((from.getTime() - to.getTime()) / (oneDay)));
  }

  private _copyDateObj(date: Date): Date {
    return new Date(date.getTime());
  }
}
