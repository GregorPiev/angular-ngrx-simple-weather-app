import { Component, OnInit } from '@angular/core';
import {
  cityWeatherListLoaded,
  loadCityWeatherList,
} from '../state/weather.actions';

import { AppState } from 'src/app/reducers';
import { CityWeather } from '../model/cityWeather.interface';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { WeatherService } from 'src/app/services/weather.service';
import { getCityWeatherList } from '../state/weather.reducer';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.less'],
})
export class WeatherListComponent implements OnInit {
  cityWeatherList: CityWeather[] = [];
  constructor(
    private weathServ: WeatherService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadCityWeatherList());
    this.store.select(getCityWeatherList).subscribe((result) => {
      this.cityWeatherList = result;
    });
  }
}
