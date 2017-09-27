import {environment} from '../../environments/environment';
import {RequestOptions, Headers} from '@angular/http';

export class BaseService {
  makeUri(path, query = {}): string {
    return `${environment.apiUrl}${path}`;
  }

  getPostOptions(): RequestOptions {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return new RequestOptions({ headers: headers });
  }
}
