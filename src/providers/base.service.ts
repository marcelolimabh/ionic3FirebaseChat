import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';


const extractError = (error: HttpErrorResponse | any): string => {
  let errMsg: string;
  if (error instanceof HttpErrorResponse) {
    errMsg = `${error.status} - ${error.statusText || ''} ${error.message}`
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.log(errMsg);
  return errMsg;
}

export abstract class BaseService {

  protected handlePromisseError(error: HttpErrorResponse | any): Promise<any> {
    return Promise.reject(extractError(error));
  }

  protected handleObservableError(error: HttpErrorResponse | any): Observable<any> {
    return Observable.throw(extractError(error));
  }
}
