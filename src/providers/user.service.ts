import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/catch';


import { AngularFireDatabase } from 'angularfire2/database';
import { BaseService } from './base.service';
import { User } from './../models/user.model';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserService extends BaseService {

  private items = this.db.list<User>('/users').snapshotChanges();


  constructor(public http: HttpClient, private db: AngularFireDatabase) {
    super();
    console.log('Hello UserProvider Provider');
  }

  create(user) {
    return this.db.object(`/users/${user.uid}`).set(user).catch(this.handlePromisseError);
  }

  getAll(): any {
    return this.items;
  }

  userExists(username: string): Observable<boolean> {

    return this.db.list<User>('/users', ref => ref.orderByChild('username').equalTo(username))
    .valueChanges()
    .map((users: User[]) => {
      return users.length > 0;
    })
    .catch(this.handleObservableError);
  }


}
