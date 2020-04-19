import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface IServiceResponse {
    results: any[];
}

@Injectable()
export class DataService {
    private rndUsr: any[];

    constructor(private http: HttpClient) {
    }

}
