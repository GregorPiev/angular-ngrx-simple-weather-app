import { AppState, getCitiesList, getCity } from '../state/weather.reducer';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CityWeather } from './../model/cityWeather.interface';
import { GettCityWeather } from '../state/weather.actions';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-add',
  templateUrl: './weather-add.component.html',
  styleUrls: ['./weather-add.component.less'],
})
export class WeatherAddComponent implements OnInit {
  weatherForm: FormGroup;
  citiesList$: Observable<[]> | [];
  curentCity: CityWeather[] | null;
  constructor(
    private fb: FormBuilder,
    private weathServ: WeatherService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.weatherForm = this.fb.group({
      city: [null, [Validators.required]],
      units: [null, [Validators.required]],
    });
    this.citiesList$ = this.store.select(getCitiesList);
  }

  sendValue(): void {
    if (this.weatherForm.invalid) {
      if (!this.weatherForm.get('city').valid) {
        this.weatherForm.get('city').markAsTouched();
      }
      if (!this.weatherForm.get('units').valid) {
        this.weatherForm.get('units').markAsTouched();
      }
      return;
    }
    let city = this.weatherForm.get('city').value;
    let units = this.weatherForm.get('units').value;
    this.weathServ.getCityValues(city, units).subscribe((result) => {
      this.store.dispatch(GettCityWeather({ city }));

      this.store.select(getCity(city)).subscribe((elem) => {
        this.curentCity = elem;
      });

      this.weatherForm.get('units').reset();

      setTimeout(() => {
        this.weathServ.changeAddedCityAction(true);
      }, 400);
    });
  }
}
