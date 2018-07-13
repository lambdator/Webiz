import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import { routerReducer, routerMiddleware } from 'react-router-redux';
import DevTools from '../components/DevTools'
import * as Counter from './Counter';
import * as WeatherForecasts from './WeatherForecasts';

export default function configureStore(history, initialState) {
  const reducers = {
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer
  };

  const middleware = [
    thunk,
    createLogger(),
    routerMiddleware(history)
  ];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  enhancers.push(DevTools.instrument());
  //const isDevelopment = process.env.NODE_ENV === 'development';
  //if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
  //  enhancers.push(window.devToolsExtension());
  //}

  const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer
  });

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
}
