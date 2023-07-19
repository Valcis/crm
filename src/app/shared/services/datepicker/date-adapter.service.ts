import { Injectable } from '@angular/core';
import {NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Injectable()
export class DateAdapterService extends  NgbDateAdapter<string>{
  readonly delimiter = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.delimiter);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      }
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.delimiter + date.month + this.delimiter + date.year : null;
  }
}

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly delimiter = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.delimiter);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      }
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.delimiter + date.month + this.delimiter + date.year : '';
  }
}
