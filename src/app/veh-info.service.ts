import { Injectable } from '@angular/core';
import { Jsonp, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Injectable()
export class VehInfoService {

      private baseUrl = 'https://www.carqueryapi.com/api/0.3/?callback=JSONP_CALLBACK&'

    constructor (private jsonp: Jsonp) {}

    getAvailableYears(): Observable<any> {
        let apiUrl = this.baseUrl;
        return this.jsonp.get(apiUrl + 'cmd=getYears')
            .map(this.extractData)
            .catch(this.handleError);
    }

    getMakes(modelYear: string): Observable<any> {
        let apiUrl = this.baseUrl + `cmd=getMakes&year=${modelYear}&sold_in_us=1`;     
        return this.jsonp.get(apiUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getModels(modelYear: string, make: string): Observable<any> {
        let apiUrl = this.baseUrl + `cmd=getModels&make=${make}&year=${modelYear}&sold_in_us=1`;
  console.log(apiUrl);      
        return this.jsonp.get(apiUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getTrimLevels(modelYear: string, make: string, model: string): Observable<any> {
        let apiUrl = this.baseUrl + `cmd=getTrims&make=${make}&year=${modelYear}&model=${model}`;
        return this.jsonp.get(apiUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let results = res.json();
        return results || [];
    }

    private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
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
