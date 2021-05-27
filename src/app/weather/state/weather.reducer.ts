import * as fromRoot from '../../reducers/index';

import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

import { CityWeather } from '../model/cityWeather.interface';
import { cityWeatherActionsType } from './weather.actions';

export const initialState = {
  citiesWeatherList: [],
  citiesList: ['London', 'Kiev', 'Tel Aviv', 'Haifa'],
  cityResult: null,
};

export const cityWeatherReducer = createReducer(
  initialState,
  on(cityWeatherActionsType.loadCityWeatherList, (state) => state),
  on(cityWeatherActionsType.cityWeatherListLoaded, (state, action) => {
    return {
      ...state,
      citiesWeatherList: [...action.cityWeatherList],
    };
  }),
  on(cityWeatherActionsType.AddCityWeather, (state, action) => {
    let list = [...state.citiesWeatherList];
    list.push(action.cityWeather);
    return {
      ...state,
      citiesWeatherList: [...list],
    };
  }),
  on(cityWeatherActionsType.GettCityWeather, (state, action) => {
    let list = [...state.citiesWeatherList];
    let city = list.filter((item) => {
      return item.city === action.city;
    });
    return {
      ...state,
      cityResult: city,
    };
  })
);

export interface AppState extends fromRoot.AppState {
  citiesWeatherList: CityWeather[];
}
export interface citiesWeatherList {
  citiesWeatherList: CityWeather[];
  citiesList: [];
  cityResult: null;
}

export const getCityWeatherListFeatureState =
  createFeatureSelector<citiesWeatherList>('citiesWeatherList');

export const getCityWeatherList = createSelector(
  getCityWeatherListFeatureState,
  (state) => state.citiesWeatherList || []
);
export const getCitiesList = createSelector(
  getCityWeatherListFeatureState,
  (state) => state.citiesList
);

export const getCity = (city: string) =>
  createSelector(getCityWeatherListFeatureState, (state) => {
    let list = [...state.citiesWeatherList];
    return list.filter((item) => {
      return item.city === city;
    });
  });
