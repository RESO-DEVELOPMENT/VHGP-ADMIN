import axios from 'axios'
import { BASE_URL, BASE_URL_V2, BASE_URL_CORAL_TEAM_VERSION } from './constants'
//https://deliveryvhgp-webapi.azurewebsites.net/api/v2/hubs?pageIndex=1&pageSize=20
export const getListHub = (page, size) => {
  return axios.get(
    `${BASE_URL_CORAL_TEAM_VERSION}${'hubs'}?pageIndex=${page}&pageSize=${size}`,
    {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  )
}

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/areas
export const postArea = (store) => {
  return axios.post(`${BASE_URL_CORAL_TEAM_VERSION}areas`, store, {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  })
}
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/buildings/ByArea?AreaId=1&ClusterId=2
export const postBuilding = (AreaId, ClusterId, building) => {
  return axios.post(
    `${BASE_URL_CORAL_TEAM_VERSION}buildings/ByArea?AreaId=${AreaId}&ClusterId=${ClusterId}`,
    building,
    {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  )
}
//https://deliveryvhgp-webapi.azurewebsites.net/api/v2/hubs
export const postHub = (hub) => {
  return axios.post(`${BASE_URL_CORAL_TEAM_VERSION}hubs`, hub, {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  })
}
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/areas/9
export const putArea = (area) => {
  return axios.put(`${BASE_URL_CORAL_TEAM_VERSION}areas/${area.id}`, area, {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  })
}
//https://deliveryvhgp-webapi.azurewebsites.net/api/v2/hubs/1
export const putHub = (hub) => {
  return axios.put(`${BASE_URL_CORAL_TEAM_VERSION}hubs/${hub.id}`, hub, {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  })
}
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/buildings/ByBuildingId?buildingId=1
export const putBuilding = (building, id) => {
  return axios.put(
    `${BASE_URL_CORAL_TEAM_VERSION}buildings/ByBuildingId?buildingId=${id}`,
    building,
    {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  )
}
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/areas/e2176f96-6e98-4cfa-a528-fa1b7cb073dd
export const deleteArea = (id) => {
  return axios.delete(`${BASE_URL_CORAL_TEAM_VERSION}areas/${id}`, {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  })
}
//https://deliveryvhgp-webapi.azurewebsites.net/api/v2/hubs/1
export const deleteHub = (id) => {
  return axios.delete(`${BASE_URL_CORAL_TEAM_VERSION}hubs/${id}`, {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  })
}
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/buildings/a
export const deleteBuilding = (id) => {
  return axios.delete(`${BASE_URL_CORAL_TEAM_VERSION}buildings/${id}`, {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  })
}
