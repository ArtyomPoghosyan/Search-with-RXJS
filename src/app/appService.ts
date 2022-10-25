import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()

export class AppService {

    constructor(private _http: HttpClient) { };

    public getBooks(value: any) {
        return this._http
            .get(`https://www.googleapis.com/books/v1/volumes?q=${value}`)
    }



}