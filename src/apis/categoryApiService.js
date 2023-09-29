import axios from 'axios'
import {
  BASE_URL,
  BASE_URL_V2,
  CATEGORY,
  BASE_URL_CORAL_TEAM_VERSION,
} from './constants'

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/category-management/categories?pageIndex=1&pageSize=10
export const getListCategorys = (page, size) => {
  return axios.get(
    `${BASE_URL_CORAL_TEAM_VERSION}${CATEGORY}/categories?pageIndex=${page}&pageSize=${size}`,
    {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  )
}
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/storeCategory-management/storeCategories?pageIndex=1&pageSize=100
export const getListStoreCategorys = (page, size) => {
  return axios.get(
    `${BASE_URL_CORAL_TEAM_VERSION}${'storeCategory-management'}/storeCategories?pageIndex=${page}&pageSize=${size}`,
    {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  )
}
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/storeCategory-management/storeCategories?pageIndex=1&pageSize=100
export const getListBrand = (page, size) => {
  return axios.get(
    `${BASE_URL_CORAL_TEAM_VERSION}brand-management/brands?pageIndex=${page}&pageSize=${size}`,
    {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  )
}
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/category-management/categories/search-name?cateName=K&pageIndex=1&pageSize=100
export const getListStoreCategorysByKey = (key, page, size) => {
  return axios.get(
    `${BASE_URL_CORAL_TEAM_VERSION}${'category-management'}/categories/search-name?cateName=${key}&pageIndex=${page}&pageSize=${size}`,
    {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  )
}

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/category-management/categories
export const postCategory = (category) => {
  return axios.post(
    `${BASE_URL_CORAL_TEAM_VERSION}${CATEGORY}/categories`,
    category
  )
}

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/category-management/categories/999
export const putCategory = (category, imgUpdate) => {
  return axios.put(
    `${BASE_URL_CORAL_TEAM_VERSION}${CATEGORY}/categories/${category.id}?imgUpdate=${imgUpdate}`,
    {
      name: category.name,
      image: category.image,
      status: category.status,
      priority: category.priority,
    }
  )
}
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/storeCategory-management/storeCategories/10
export const putStoreCategory = (storeCategory) => {
  return axios.put(
    `${BASE_URL_CORAL_TEAM_VERSION}${'storeCategory-management'}/storeCategories/${
      storeCategory.id
    }`,
    storeCategory
  )
}
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/storeCategory-management/storeCategories/10
export const postStoreCategory = (storeCategory) => {
  return axios.post(
    `${BASE_URL_CORAL_TEAM_VERSION}${'storeCategory-management'}/storeCategories`,
    storeCategory
  )
}

//https://deliveryvhgp-webapi.azurewebsites.net/api/v2/brand-management/brands
export const postBrand = (brand) => {
  return axios.post(
    `${BASE_URL_CORAL_TEAM_VERSION}${'brand-management'}/brands`,
    brand
  )
}
//https://deliveryvhgp-webapi.azurewebsites.net/api/v2/brand-management/brands
export const putBrand = (brand) => {
  return axios.put(
    `${BASE_URL_CORAL_TEAM_VERSION}${'brand-management'}/brands/${brand.id}`,
    brand
  )
}
//https://deliveryvhgp-webapi.azurewebsites.net/api/v2/brand-management/brands/string
export const deleteBrand = (id) => {
  return axios.delete(
    `${BASE_URL_CORAL_TEAM_VERSION}${'brand-management'}/brands/${id}`
  )
}
//https://deliveryvhgp-webapi.azurewebsites.net/api/v2/brand-management/brands/string
export const deleteStoreCate = (id) => {
  return axios.delete(
    `${BASE_URL_CORAL_TEAM_VERSION}${'storeCategory-management'}/storeCategories/${id}`
  )
}
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/category-management/categories/9fec8575-2ce1-4a2d-b536-bfb1458fda09
export const deleteCategory = (id) => {
  return axios.delete(
    `${BASE_URL_CORAL_TEAM_VERSION}${'category-management'}/categories/${id}`
  )
}
