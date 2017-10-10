import {Component, TemplateRef, ViewChild} from '@angular/core';
import {CarsService} from '../../services/cars.service';
import {Cars} from '../../../Cars';

@Component({
  selector: 'cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent {

  cars: Cars[];
  _id: string;
  model: string;
  price: string;
  run: string;
  color: string;
  owner: string;
  city: string;
  isSold: boolean;

  // Template Types
  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

  editedCar: Cars;
  currentSelectedCar: Cars;

  editCar(car: Cars) {
    if (car.isSold == undefined) {
      car.isSold = false;
    }
    this.currentSelectedCar = car;

    this.editedCar = {
      _id: car._id,
      isSold: car.isSold,
      model: car.model,
      price: car.price,
      run: car.run,
      color: car.color,
      owner: car.owner,
      city: car.city
    };
  }

  // загружаем один из двух шаблонов
  loadTemplate(car: Cars) {
    if (this.editedCar && this.editedCar._id == car._id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  // end of test

  constructor(private carsService: CarsService) {
    this.carsService.getCars()
      .subscribe(cars => {
        this.cars = cars;
      });
  }

  addTask(event) {
    event.preventDefault();

    var newCar = {
      model: this.model,
      isSold: false,
      price: this.price,
      run: this.run,
      color: this.color,
      owner: this.owner,
      city: this.city,
    };

    this.carsService.addCar(newCar)
      .subscribe(car => {
        this.cars.push(newCar);
        this.model = '';
        this.price = '';
        this.run = '';
        this.color = '';
        this.owner = '';
        this.city = '';
      });
  }

  deleteCar(id) {
    var cars = this.cars;

    this.carsService.deleteCar(id).subscribe(data => {
      if (data.n == 1) {
        for (var i = 0; i < cars.length; i++) {
          if (this.cars[i]._id == id) {
            cars.splice(i, 1);
          }
        }
      }
    });
  }

  updateStatus(car) {
    var _car = {
      _id: car._id,
      model: car.model,
      price: car.price,
      run: car.run,
      color: car.color,
      owner: car.owner,
      city: car.city,
      isSold: car.isSold
    };

    this.carsService.updateStatus(_car).subscribe(data => {
      this.editedCar = null;
    });

    this.carsService.getCars().subscribe(cars => {
      this.cars = cars;
    });
  }

  cancel() {
    this.updateStatus(this.currentSelectedCar);
    this.editedCar = null;
  }

}
