import { Injectable } from '@angular/core';
import {ScriptService} from './script.service';
import {DocumentScript} from '../models/document-script';
import {environment} from '../../environments/environment';

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
}
