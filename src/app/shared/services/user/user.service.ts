import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {CrmService} from "../crm.service";

@Injectable({
  providedIn: 'root'
})
export class UserService2 extends CrmService {

  constructor(
    private router: Router,
    private _http: HttpClient,
  ) {
    super(_http);
  }
}
