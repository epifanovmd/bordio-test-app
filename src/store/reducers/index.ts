import { combineReducers, Reducer } from "redux";

import { IAppState } from "../IAppState";

export type Reducers<T> = {
  [P in keyof T]: Reducer<T[P]>;
};

export function createMainReduce(): Reducer<IAppState> {
  const _reducers: Reducers<IAppState> = { };

  return combineReducers(_reducers);
}
