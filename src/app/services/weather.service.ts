import { BehaviorSubject, Observable } from 'rxjs';

import { AddCityWeather } from '../weather/state/weather.actions';
import { CityWeather } from '../weather/model/cityWeather.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private onAddedCityAction: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );
  public onAddedCity = this.onAddedCityAction.asObservable();
  baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
  userAPI =
    '&appid=bbdb11a7359e8238b084e4cf0ce219f0&appid=0d7303c17ee3d3482cd82a2ad273a90d';
  constructor(private http: HttpClient, private store: Store<any>) {}

  public changeAddedCityAction(value: boolean) {
    this.onAddedCityAction.next(value);
  }

  public getCityValues(city: string, units: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${city}${this.userAPI}`).pipe(
      tap((result) => {
        let cityWeather: CityWeather = {
          city: city,
          unit: units,
          temp: result.main.temp,
          weather: result.weather[0].description,
        };
        this.store.dispatch(AddCityWeather({ cityWeather }));
      })
    );
  }
}
