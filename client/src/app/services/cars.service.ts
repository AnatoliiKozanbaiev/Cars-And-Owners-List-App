import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CarsService {

  constructor(private http: Http) {}

  getCars(){
    return this.http.get('/api/cars')
      .map(res => res.json());
  }

  addCar(newCar) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/car', JSON.stringify(newCar), {headers: headers})
      .map(res => res.json);
  }

  deleteCar(id){
    return this.http.delete('/api/car/'+id)
      .map(res => res.json());
  }

  updateStatus(car){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('/api/car/'+car._id, JSON.stringify(car), {headers: headers})
      .map(res => res.json);
  }

}
