import { createAction, props } from '@ngrx/store';

import { CityWeather } from '../model/cityWeather.interface';

export enum ECityWeather {
  LOAD_CITY_WEATHER = '[City Weather List] Load City Weather List',
  LOAD_PRODUCTS_SUCCESS = '[City Weather Effect] City Weather List loaded successfully',
  ADD_CITY_WEATHER = '[City Weather] Add City',
  GET_CITY_WEATHER = '[City Weather] Get City',
}

export const loadCityWeatherList = createAction(ECityWeather.LOAD_CITY_WEATHER);
export const cityWeatherListLoaded = createAction(
  ECityWeather.LOAD_PRODUCTS_SUCCESS,
  props<{ cityWeatherList: CityWeather[] }>()
);

export const AddCityWeather = createAction(
  ECityWeather.ADD_CITY_WEATHER,
  props<{ cityWeather: CityWeather }>()
);

export const GettCityWeather = createAction(
  ECityWeather.GET_CITY_WEATHER,
  props<{ city: string }>()
);

export const cityWeatherActionsType = {
  loadCityWeatherList,
  cityWeatherListLoaded,
  AddCityWeather,
  GettCityWeather,
};
