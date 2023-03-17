import { Injectable } from '@angular/core';
import {LoginRs} from "../../models/user/login.model";
import {Subject} from "rxjs";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  storeUser: Subject<LoginRs> = new Subject();

  // private _test: BehaviorSubject<LoginRs[]> = new BehaviorSubject<LoginRs[]>([]);
  private loginSubject2: BehaviorSubject<LoginRs[]> = new BehaviorSubject<LoginRs[]>([]);


  // public testObs$: Observable<LoginRs[]> = this._test.asObservable().pipe(distinctUntilChanged());

  // get us() {
  //   let patata = this._test.getValue();
  //   console.log('patata', patata);
  //   return patata;
  // }
  //
  // addUs(user: LoginRs) {
  //   console.log('bs user', user);
  //   // this._test.next([user]);
  //   this._test.subscribe(item => {
  //     console.log(item)
  //   });
  //   // this._test.next([...this.us, user]);
  // }
  //
  // async saveUser(data: any) {
  //   if (data.status === 'OK') {
  //     this.storeUser.next(data);
  //     console.log('storage', this.storeUser)
  //   }
  // }
  // async process(data: any) {
  //   switch (true) {
  //     case (data.status === 'OK'):
  //       this.storeUser.next(data);
  //       break;
  //   }
  // }
}
