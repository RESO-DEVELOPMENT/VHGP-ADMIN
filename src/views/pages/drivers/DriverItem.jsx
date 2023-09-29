import React, { useContext } from 'react'
import { AppContext } from '../../../context/AppProvider'

export const DriverItem = ({ data, index }) => {
  const {
    setShipperModal,
    setOpenModal,
    setStoreCategoryModal,
    setOpenDeleteModal,
  } = useContext(AppContext)
  return (
    <>
      <tr>
        <td className="budget table-text bold">{index + 1}</td>
        <td className="budget table-text bold">{data.email}</td>
        <td className="budget table-text bold">{data.fullName}</td>
        <td className="budget table-text ">{data.phone}</td>
        <td className="budget table-text ">{data.deliveryTeam}</td>
        <td className="budget table-text ">{data.vehicleType}</td>

        {/* <td>
        <span className="badge badge-lg badge-primary " style={{ color: "var(--secondary)", fontSize: 11, padding: "1em 1.4em" }}>
            {data.brandStoreName}
        </span>
    </td> */}
        <td>
          {data.status === 'Active' ? (
            <span
              className={`badge  status-success`}
              style={{ padding: '0.8em 1em', fontSize: 11 }}
            >
              Hoạt Động
            </span>
          ) : (
            <span
              className={`badge  status-cancel`}
              style={{ padding: '0.8em 1em', fontSize: 11 }}
            >
              Ngưng Hoạt Động
            </span>
          )}
        </td>

        <td className="text-left">
          <i
            className="fa-solid fa-pen-to-square mr-3 cusor"
            style={{ fontSize: 22 }}
            onClick={() => {
              setShipperModal(data)
              setOpenModal(true)
            }}
          ></i>
          <i
            className="fa-regular fa-trash-can mr-3 cusor"
            onClick={() => {
              setStoreCategoryModal(data)
              console.log(data)
              setOpenDeleteModal(true)
            }}
            style={{ fontSize: 22, color: 'red' }}
          ></i>
        </td>
      </tr>
    </>
  )
}
