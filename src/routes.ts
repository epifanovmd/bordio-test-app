import loadable from "@loadable/component";
import { AsyncThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { IResponse } from "Api/baseFetch";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Action } from "redux";
import { IAppState } from "Store/IAppState";
import { IExtraArguments } from "Store/store";

const SignUp = loadable(() => import("Pages/signUp/signUp"));

export enum Roles {}

export interface IRoute {
  path: string;
  pathName: string;
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  exact: boolean;
  getInitialData?: AsyncThunkAction<
    IResponse<any>,
    any,
    {
      dispatch: ThunkDispatch<IAppState, IExtraArguments, Action>;
      state: IAppState;
      extra: IExtraArguments;
    }
  >;
  roles?: (keyof typeof Roles)[];
  Icon?: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
}

export const getRoutsFromRole = (
  _routes: IRoute[],
  _roles: (keyof typeof Roles)[],
) =>
  _routes.filter(
    ({ roles }) =>
      roles &&
      _roles &&
      roles.some(item =>
        _roles.some(
          itm => Roles[itm] && Roles[item] && Roles[itm] === Roles[item],
        ),
      ),
  );

export const routepaths = {
  SIGN_UP: "/",
};

export const routes: IRoute[] = [
  {
    path: routepaths.SIGN_UP,
    pathName: "sign_up",
    component: SignUp,
    exact: true,
  },
];
