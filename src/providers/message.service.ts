import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { Message } from './../models/message.model';
import { BaseService } from './base.service';


@Injectable()
export class MessageService  extends BaseService{

  constructor(
    public af: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public http: HttpClient) {
      super();
  }

  create(message: Message,  userId2: string): Promise<any>{
    return Promise.resolve(this.af.list<Message>(`/messages/${message.userId}-${userId2}`, ref => ref.orderByChild('timestamp')).push(message));
  }

  getMessages(userId1: string, userId2: string):Observable<Message[]>{
    return <Observable<Message[]>>this.af.list<Message[]>(`/messages/${userId1}-${userId2}`, ref => ref.orderByChild('timestamp'))
    .valueChanges()
    .catch(this.handleObservableError);
  }

}
