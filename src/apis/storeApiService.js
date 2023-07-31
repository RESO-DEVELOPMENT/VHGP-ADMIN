import axios from "axios";
import {
  BASE_URL,
  BASE_URL_V2,
  STORE,
  BASE_URL_CORAL_TEAM_VERSION,
} from "./constants";

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/store-management/stores?pageIndex=1&pageSize=20&SearchByStoreName=n&SearchByBuilding=S1.03&SearchByStoreCategory=N%C3%B4ng%20s%E1%BA%A3&SearchByBrand=kh%C3%B4
export const getListStores = (
  SearchByStoreName,
  SearchByBuilding,
  SearchByStoreCategory,
  SearchByBrand,
  page,
  size
) => {
  let url = "";
  if (SearchByStoreName !== "") {
    url = url + `&SearchByStoreName=${SearchByStoreName}`;
  }
  if (SearchByBuilding !== "") {
    url = url + `&SearchByBuilding=${SearchByBuilding}`;
  }
  if (SearchByStoreCategory !== "") {
    url = url + `&SearchByStoreCategory=${SearchByStoreCategory}`;
  }
  if (SearchByBrand !== "") {
    url = url + `&SearchByBrand=${SearchByBrand}`;
  }
  return axios.get(
    `${BASE_URL_CORAL_TEAM_VERSION}${STORE}/${"stores"}?pageIndex=${page}&pageSize=${size}${url}`,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};

//https://deliveryvhgp-webapi.azurewebsites.net/api/v2/brands?pageIndex=1&pageSize=10
export const getListBrands = (page, size) => {
  return axios.get(
    `${BASE_URL_CORAL_TEAM_VERSION}${"brands"}?pageIndex=${page}&pageSize=${size}`,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/storeCategory-management/storeCategories?pageIndex=1&pageSize=10
export const getListStoreCategory = (page, size) => {
  return axios.get(
    `${BASE_URL_CORAL_TEAM_VERSION}${"storeCategory-management"}/storeCategories?pageIndex=${page}&pageSize=${size}`,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/store-management/stores/storeId?storeId=s1
export const getStoreDetail = (storeId) => {
  return axios.get(
    `${BASE_URL_CORAL_TEAM_VERSION}${STORE}/stores/${"storeId"}?storeId=${storeId}`,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/buildings?pageIndex=1&pageSize=100
export const getListBuilding = (page, size) => {
  return axios.get(
    `${BASE_URL_CORAL_TEAM_VERSION}${"buildings"}?pageIndex=${page}&pageSize=${size}`,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/areas?pageIndex=1&pageSize=20
export const getListArea = (page, size) => {
  return axios.get(`${BASE_URL_CORAL_TEAM_VERSION}${"areas"}?pageIndex=${page}&pageSize=${size}`, {
    Accept: "application/json",
    "Content-Type": "application/json",
  });
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/areas/ByAreaId?areaId=2
export const getListBuildingByAreaId = (id) => {
  return axios.get(`${BASE_URL_CORAL_TEAM_VERSION}areas/ByAreaId?areaId=${id}`, {
    Accept: "application/json",
    "Content-Type": "application/json",
  });
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/store-management/stores/search-name?storeName=H%E1%BA%B1ng&pageIndex=1&pageSize=20
export const getListStoreByKey = (key, page, size) => {
  return axios.get(
    `${BASE_URL_CORAL_TEAM_VERSION}${"store-management"}/stores/search-name?storeName=${key}&pageIndex=${page}&pageSize=${size}`,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/store-management/stores/1
export const putStore = (store, id, imgUpdate) => {
  return axios.put(
    `${BASE_URL_CORAL_TEAM_VERSION}${STORE}/stores/${id}?imgUpdate=${imgUpdate}
    `,
    store,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/store-management/stores
export const postStore = (store) => {
  return axios.post(`${BASE_URL_CORAL_TEAM_VERSION}${STORE}/stores`, store, {
    Accept: "application/json",
    "Content-Type": "application/json",
  });
};

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/store-management/stores/bunthitnuong1%40gmail.com
export const deleteStore = (id) => {
  return axios.delete(`${BASE_URL_CORAL_TEAM_VERSION}${STORE}/stores/${id}`, {
    Accept: "application/json",
    "Content-Type": "application/json",
  });
};
