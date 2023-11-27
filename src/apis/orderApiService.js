import axios from "axios";
import { BASE_URL, ORDER, BASE_URL_CORAL_TEAM_VERSION } from "./constants";

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/order-management/orders?pageIndex=1&pageSize=200&DateFilter=Nov%2023%202022&SearchByPayment=0&SearchByStatus=1&SearchByMode=1
export const getListOrder = (
  dateFilter,
  SearchByPayment,
  SearchByStatus,
  SearchByMode,
  page,
  size
) => {
  let url = "";
  if (dateFilter !== "") {
    url = url + `&DateFilter=${dateFilter}`;
  }
  if (SearchByPayment !== "") {
    url = url + `&SearchByPayment=${SearchByPayment}`;
  }
  if (SearchByStatus !== "") {
    url = url + `&SearchByStatus=${SearchByStatus}`;
  }
  if (SearchByMode !== "") {
    url = url + `&SearchByMode=${SearchByMode}`;
  }
  return axios.get(
    `${BASE_URL_CORAL_TEAM_VERSION}${ORDER}/orders?pageIndex=${page}&pageSize=${size}${url}`,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/order-management/orders/report?StartDate=01/01/2023&EndDate=01/02/2023
export const getOrderReport = (startDate, endDate) => {
  let url = "";

  if (startDate !== "" && endDate !== "") {
    url = `?StartDate=${startDate}&EndDate=${endDate}`;
  }

  https: return axios.get(
    `${BASE_URL_CORAL_TEAM_VERSION}${ORDER}/orders/report${url}`,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/order-management/orders/report-price?StartDate=01/01/2023&EndDate=01/02/2023
export const getOrderReportPrice = (startDate, endDate) => {
  let url = "";

  if (startDate !== "" && endDate !== "") {
    url = `?StartDate=${startDate}&EndDate=${endDate}`;
  }

  return axios.get(
    `${BASE_URL_CORAL_TEAM_VERSION}${ORDER}/orders/report-price${url}`,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/order-management/orders/search-status?statusName=ShopAccept&pageIndex=1&pageSize=20
export const getListOrderByStatus = (status, page, size) => {
  return axios.get(
    `${BASE_URL_CORAL_TEAM_VERSION}${ORDER}/orders/search-status?status=${status}&pageIndex=${page}&pageSize=${size}`,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/order-management/orders/search-status?statusName=ShopAccept&pageIndex=1&pageSize=20
export const getOrderDetail = (orderId) => {
  return axios.get(`${BASE_URL_CORAL_TEAM_VERSION}${ORDER}/orders/${orderId}`, {
    Accept: "application/json",
    "Content-Type": "application/json",
  });
};

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/order-management/orders/search-payment?paymentType=Ti%E1%BB%81n%20m%E1%BA%B7t&pageIndex=1&pageSize=20
export const getListOrderByPayment = (payment, page, size) => {
  return axios.get(
    `${BASE_URL_CORAL_TEAM_VERSION}${ORDER}/orders/search-payment?paymentType=${payment}&pageIndex=${page}&pageSize=${size}`,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};

export const cancelOrder = (OrderId) => {
  return axios.put(
    `${BASE_URL_CORAL_TEAM_VERSION}orders/admin/cancel?orderId=${OrderId}&orderStatus=6`,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};

//https://api.vhgp.net/api/v1/suppliers/deervinhome%40deer.com/billOfLanding
export const createOrder = (supplierId, order) => {
  console.log(supplierId);
  console.log(order);

  return axios.post(
    `${BASE_URL_CORAL_TEAM_VERSION}suppliers/${supplierId}/billOfLanding`,
    order,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};

//https://api.vhgp.net/api/v1/orders/admin/{orderId}
export const updateOrder = (orderId, updatedOrder) => {
  console.log(orderId);
  console.log(updatedOrder);

  return axios.put(
    `${BASE_URL_CORAL_TEAM_VERSION}orders/admin/${orderId}`,
    updatedOrder,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};
