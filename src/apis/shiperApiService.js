import axios from "axios";
import { BASE_URL, SHIP, BASE_URL_CORAL_TEAM_VERSION } from "./constants";

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/shipper-management/shippers?pageIndex=1&pageSize=20
export const getListShipper = (page, size) => {
  return axios.get(
    `${BASE_URL_CORAL_TEAM_VERSION}${SHIP}/shippers?pageIndex=${page}&pageSize=${size}`,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};
// https://api.vhgp.net/api/v1/shipper-management/shippers/search-name?shipName=thien&pageIndex=1&pageSize=100'
export const getListShipperbyKey = (key, page, size) => {
  return axios.get(
    `${BASE_URL_CORAL_TEAM_VERSION}${SHIP}/shippers/search-name?shipName=${key}&pageIndex=${page}&pageSize=${size}`,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/shipper-management/shippers
export const postShipper = (shipper) => {
  return axios.post(`${BASE_URL_CORAL_TEAM_VERSION}${SHIP}/shippers`, shipper, {
    Accept: "application/json",
    "Content-Type": "application/json",
  });
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/shipper-management/shippers/1
export const putShipper = (shipper) => {
  return axios.put(
    `${BASE_URL_CORAL_TEAM_VERSION}${SHIP}/shippers/${shipper.id}`,
    shipper,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};
