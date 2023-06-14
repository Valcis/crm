import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrmLoaderService {

  private loading: boolean = true;

  constructor() { }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  getLoading(): boolean {
    return this.loading;
  }
}
