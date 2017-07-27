import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Injectable()
export class QuoteInfoService {

  //private baseUrl = 'http://localhost:8080/'
  private baseUrl = 'https://arcane-beyond-83669.herokuapp.com/';

  constructor (private http: Http) {}


    getRecords(endpoint: string, quoteId: string): Observable<any[]> {
        let apiUrl = this.baseUrl+endpoint + "/" + quoteId;
        return this.http.get(apiUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getRecord(endpoint: string, recordId: string): Observable<any> {
        let apiUrl = this.baseUrl+endpoint + "/" + recordId;
        return this.http.get(apiUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    addRecord(endpoint: string, record:object): Observable<any> {
        let apiUrl = `${this.baseUrl}${endpoint}`;       
        return this.http.post(apiUrl, record)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteRecord(endpoint: string, id:number): Observable<object> {
      let apiUrl = `${this.baseUrl}${endpoint}/${id}`;
      return this.http.delete(apiUrl)
          .map(this.extractData)
          .catch(this.handleError);
    }

    editRecord(endpoint: string, record:object): Observable<object> {
        let apiUrl = `${this.baseUrl}${endpoint}`;
        return this.http.put(apiUrl, record)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let results = false
        try{
            results = res.json();
        }catch(e){
            if(res.status !== 200){
                return Observable.throw(e);
            }
        }
        return results || [];
    }

    private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        console.log(error)
        let errMsg: string;
        if(typeof error._body === "string"){
            errMsg = error._body
        }else{
            if (error instanceof Response) {
                if(error.status === 0){
                    errMsg = "Error connecting to API"
                }else{
                    const errorJSON = error.json();
                    errMsg = errorJSON.message;
                }
            }
        }

        return Observable.throw(errMsg);
    }

}
