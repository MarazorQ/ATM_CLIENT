import React from "react";
import RegisterClient from "../pages/RegisterClient";
import UpdateClient from "../pages/UpdateClient";
import ClientsList from "../pages/ClinetsList";
import ClientDetailsPage from "../pages/ClientDetailsPage";

export interface IRoute {
  path: string;
  component: React.ComponentType;
}

export enum RouteNames {
  REGISTER_CLIENT = "/register",
  UPDATE_CLIENT = "/update",
  CLIENT_LIST = "/list",
  CLIENT_DETAILS = "/details",
  ANY = "*",
}

export const publicRoutes: IRoute[] = [
  { path: RouteNames.REGISTER_CLIENT, component: RegisterClient },
  { path: RouteNames.UPDATE_CLIENT, component: UpdateClient },
  { path: RouteNames.CLIENT_LIST, component: ClientsList },
  { path: RouteNames.CLIENT_DETAILS, component: ClientDetailsPage },
];
