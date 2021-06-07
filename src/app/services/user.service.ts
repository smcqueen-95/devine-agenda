import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpService } from "./http.service";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  userData$ = new BehaviorSubject<any>([]);

  constructor(private httpService: HttpService) { }

  changeUserData(data: any) {
    this.userData$.next(data);
  }

  getCurrentUserData() {
    return this.userData$.getValue();
  }

  updateUserData(newUserM: any) {
    let data = [];
    data.push(newUserM);
    let currentUserData = this.getCurrentUserData();
    let newUserUpdateData = data.concat(currentUserData);
    this.changeUserData(newUserUpdateData);
  }

  userData(postData: any): Observable<any> {
    return this.httpService.post("user", postData);
  }


  userUpdate(postData: any): Observable<any> {
    return this.httpService.post("userUpdate", postData);
  }
}
