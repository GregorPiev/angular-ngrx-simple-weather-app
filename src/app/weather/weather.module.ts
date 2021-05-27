import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { TempConverterPipe } from '../shared/temp-converter.pipe';
import { WeatherAddComponent } from './weather-add/weather-add.component';
import { WeatherComponent } from './weather/weather.component';
import { WeatherListComponent } from './weather-list/weather-list.component';
import { WeatherMainComponent } from './weather-main/weather-main.component';
import { cityWeatherReducer } from './state/weather.reducer';
import { WeatherIconPipe } from '../shared/weather-icon.pipe';

const Components = [
  WeatherComponent,
  WeatherListComponent,
  WeatherAddComponent,
  WeatherMainComponent,
];
@NgModule({
  declarations: [...Components, TempConverterPipe, WeatherIconPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('citiesWeatherList', cityWeatherReducer),
  ],
  exports: [...Components],
})
export class WeatherModule {}
