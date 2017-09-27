import {environment} from '../../environments/environment';
import {RequestOptions, Headers} from '@angular/http';

export class BaseService {
  makeUri(path, query = {}): string {
    return `${environment.apiUrl}${path}`;
  }

  getPostOptions(token = null): RequestOptions {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    if (token !== null) {
      headers.append('X-Auth-Token', token);
    }
    return new RequestOptions({ headers: headers });
  }
}
