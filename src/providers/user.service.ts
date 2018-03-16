import { User } from './../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from '@firebase/util';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserService {

  items: Observable<any[]>;

  users: User[] = [];

  constructor(public http: HttpClient, private db: AngularFireDatabase) {
    console.log('Hello UserProvider Provider');
  }

  create(user: User){
    return this.db.list('/users').push(user);
  }

  getAll():Observable<any[]>{
   this.items =  this.db.list('/users').valueChanges();

  }



}
