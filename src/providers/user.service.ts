import { AngularFireAuth } from 'angularfire2/auth';
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

   users : Observable<User[]>;



  currentUser: Observable<any>;


  constructor(public http: HttpClient, private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    super();
    this.listenAuthState();
  }

  private listenAuthState(): void{
    this.afAuth.authState.subscribe((user)=>{
      if(user){
        this.currentUser = this.db.object(`/users/${user.uid}`, ).valueChanges();
        console.log(this.currentUser);
        this.setUsers(user.uid);
      }
    });
  }

  private setUsers(uidToExclude):void{
    this.users = this.db.list<User>('/users', ref => ref.orderByChild('username')).valueChanges().map((users: User[])=>{
      return users.filter((user: User)=>user._key !== uidToExclude);
    });
  }

  create(user: User, uuid: string) {
    return this.db.object(`/users/${uuid}`).set(user).catch(this.handlePromisseError);
  }

  getAll(): Observable<User[]> {
    return this.users;
  }

  userExists(username: string): Observable<boolean> {

    return this.db.list<User>('/users', ref => ref.orderByChild('username').equalTo(username))
    .valueChanges()
    .map((users: User[]) => {
      return users.length > 0;
    })
    .catch(this.handleObservableError);
  }

  getUserById(userId: string): Observable<User>{

    return <Observable<User>> this.db.object(`/users/${userId}`).valueChanges().catch(this.handleObservableError);
  }


}
