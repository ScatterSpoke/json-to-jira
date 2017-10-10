import { Injectable } from '@angular/core';
import {DocumentScript} from "../models/document-script";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";

@Injectable()
export class ScriptService {
  private scripts: DocumentScript[] = [];

  public load(script: DocumentScript): Observable<DocumentScript> {
    return new Observable<DocumentScript>((observer: Observer<DocumentScript>) => {
      var existingScript = this.scripts.find(s => s.name == script.name);

      // Complete if already loaded
      if (existingScript && existingScript.loaded) {
        observer.next(existingScript);
        observer.complete();
      }
      else {
        // Add the script
        this.scripts = [...this.scripts, script];

        // Load the script
        let scriptElement = document.createElement("script");
        scriptElement.type = "text/javascript";
        scriptElement.src = script.src;

        scriptElement.onload = () => {
          script.loaded = true;
          observer.next(script);
          observer.complete();
        };

        scriptElement.onerror = (error: any) => {
          observer.error("Couldn't load script " + script.src);
        };

        document.getElementsByTagName('body')[0].appendChild(scriptElement);
      }
    });
  }
}
