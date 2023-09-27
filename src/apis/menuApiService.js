import axios from "axios";
import {
  BASE_URL,
  MENU,
  PRODUCT,
  BASE_URL_CORAL_TEAM_VERSION,
} from "./constants";

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/menus/byMode?modeId=1
export const getListMenuByMode = (modeId) => {
  return axios.get(
    `${BASE_URL_CORAL_TEAM_VERSION}${MENU}/byMode?modeId=${modeId}`,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/product-management/products/1/products?pageIndex=1&pageSize=20
export const getListMenuByMenuId = (menuId, page, size) => {
  return axios.get(
    `${BASE_URL_CORAL_TEAM_VERSION}product-management/products/${menuId}/${PRODUCT}?pageIndex=${page}&pageSize=${size}`,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/menu-management/menus/menuId?menuId
export const getMenuDetail = async (menuId) => {
  https: return await axios.get(
    `${BASE_URL_CORAL_TEAM_VERSION}menu-management/menus/menuId?menuId=${menuId}`,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/menus/1/filter?storeId=s4&page=1&pageSize=20
export const getListProductMenu = (menuId, storeId, page, size) => {
  return axios.get(
    `${BASE_URL_CORAL_TEAM_VERSION}${MENU}/${menuId}/filter?storeId=${storeId}&page=${page}&pageSize=${size}`,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/menus/1/products/byCategoryId?categoryId=11&page=1&pageSize=20
export const getListProductMenuByCate = (menuId, categoryId, page, size) => {
  return axios.get(
    `${BASE_URL_CORAL_TEAM_VERSION}${MENU}/${menuId}/products/byCategoryId?categoryId=${categoryId}&page=${page}&pageSize=${size}`,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/menu-management/menus
export const postMenu = (menu) => {
  return axios.post(
    `${BASE_URL_CORAL_TEAM_VERSION}menu-management/${MENU}`,
    menu,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/menu-management/menus/s
export const putMenu = (menu, menuId) => {
  https: return axios.put(
    `${BASE_URL_CORAL_TEAM_VERSION}menu-management/${MENU}/${menuId}`,
    menu,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/menu-management/menus/{menuId}/remove-product
export const removeProductFromMenu = (menuId, listProductId) => {
  https: return axios.post(
    `${BASE_URL_CORAL_TEAM_VERSION}menu-management/${MENU}/${menuId}/remove-product`,
    listProductId,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};
