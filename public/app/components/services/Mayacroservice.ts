import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";

@Injectable()
export class Mayacroservice {
    
    private headers = new Headers();
    private mayaRL = 'tagInfo';
    // options = new RequestOptions({ headers: this.headers });
    // return this.http
    // .put(url, JSON.stringify(student), options)

    constructor(private http: Http) { 
        this.headers.append( 'Content-Type', 'application/json'); //set up right headers
    }

    getApp() {
        return "hello!"; 
    }
    get(): Observable<any>{
        return this.http.get(this.mayaRL, this.headers)
    }
}    
