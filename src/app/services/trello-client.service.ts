import { Injectable } from '@angular/core';
import {ScriptService} from './script.service';
import {DocumentScript} from '../models/document-script';
import {environment} from '../../environments/environment';
import {ITrelloList} from "../models/i-trello-list";
import {ITrelloBoard} from "../models/i-trello-board";
import {ICard} from "../models/i-card";

declare let Trello: any;

@Injectable()
export class TrelloClientService {

  constructor(
    public scriptService: ScriptService
  ) {
    this.scriptService
      .load(new DocumentScript('trello', `https://api.trello.com/1/client.js?key=${environment.trelloApiKey}`))
      .subscribe((s) => console.log(s) );
  }

  authorize(): Promise<string> {
    return new Promise((resolve, reject) => {
      Trello.authorize({
        type: 'popup',
        name: 'Getting Started Application',
        scope: {
          read: 'true',
          write: 'true' },
        expiration: 'never',
        success: resolve,
        error: reject
      });
    });
  }

  getBoards(): Promise<ITrelloBoard[]> {
    return new Promise((resolve) => {
      Trello.get('/members/me/boards', resolve);
    });
  }

  getLists(boardId): Promise<ITrelloList[]> {
    return new Promise((resolve) => {
      Trello.get(`/boards/${boardId}/lists`, resolve);
    });
  }

  createCard(card: ICard): Promise<ITrelloList[]> {
    return new Promise((resolve) => {
      Trello.post('/cards/', card, resolve);
    });
  }
}
