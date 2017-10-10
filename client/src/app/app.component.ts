import { Component } from '@angular/core';
import {CarsService} from './services/cars.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CarsService]
})
export class AppComponent {
  title = 'Cars And Owners List App';
}
