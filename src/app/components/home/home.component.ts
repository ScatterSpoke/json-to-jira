import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {ScriptService} from '../../services/script.service';
import {DocumentScript} from '../../models/document-script';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public scriptService: ScriptService
  ) { }

  ngOnInit() {
    this.scriptService
      .load(new DocumentScript('trello', `https://api.trello.com/1/client.js?key=${environment.trelloApiKey}`))
      .subscribe((s) => console.log(s) );
  }
}
