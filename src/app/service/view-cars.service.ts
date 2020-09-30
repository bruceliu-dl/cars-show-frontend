import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Cars } from '../interface/cars.interface';


@Injectable({
    providedIn: 'root'
})

export class ViewCarsService {
    apiHost: string;
    
    constructor(private _http: HttpClient) {
        this.apiHost = "http://localhost:3000";
    }

    //get all cars
    public getAllCars(): Observable<any>{
        let requestUri = '/cars';
        return this._http.get(this.apiHost + requestUri).pipe(
            map(result => result),
            catchError(this.handleError)
        )    
    }

    //delete car by car id
    public deleteCarById(id: number): Observable<any> {
        let requestUri = '/cars/' + id;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
        let options = ({ headers: headers });   

        return this._http.delete(this.apiHost + requestUri, options).pipe(
            map(result => result),
            catchError(this.handleError)
        )
    } 

    //update car by car id
    public updateCarById(id: number, carsInfor: Cars): Observable<any> {
        let requestUri = '/cars/' + id;
        let requestBody = carsInfor;  

        return this._http.put(this.apiHost + requestUri, requestBody).pipe(
            map(result => result),
            catchError(this.handleError)
        ) 
    }

    //add a new car
    public addNewCar(carsInfor: Cars): Observable<any> {
        let requestUri = '/cars';
        let requestBody = carsInfor;  

        return this._http.post(this.apiHost + requestUri, requestBody).pipe(
            map(result => result),
            catchError(this.handleError)
        ) 
    } 

    public handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          console.error('An error occurred:', error.error.message);
        } else {
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        return throwError(
          'Something bad happened; please try again later.');
      }

}