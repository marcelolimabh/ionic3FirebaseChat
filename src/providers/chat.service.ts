import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { AngularFireDatabase } from 'angularfire2/database';

import { BaseService } from './base.service';
import { Chat } from '../models/chat.model';


@Injectable()
export class ChatService  extends BaseService{

  constructor(public http: HttpClient, public af: AngularFireDatabase) {
   super();
  }

  create(chat: Chat, userId1: string, userId2: string): Promise<void>{
      return this.af.object(`/chats/${userId1}/${userId2}`)
      .set(chat)
      .catch(this.handlePromisseError);
  }

  getDeepChat(userId1: string, userId2: string): Observable<Chat>{
    return <Observable<Chat>>this.af.object(`/chats/${userId1}/${userId2}`)
    .valueChanges()
    .catch(this.handleObservableError);
  }

}
