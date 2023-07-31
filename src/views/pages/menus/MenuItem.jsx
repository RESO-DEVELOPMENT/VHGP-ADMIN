import React, { useContext } from "react";
import { NOT_FOUND_IMG } from "../../../constants";
import { AppContext } from "../../../context/AppProvider";

export const MenuItem = ({ data, index }) => {
  const { setOpenModal, setCategoryModal } = useContext(AppContext);
  return (
    <>
      <tr>
        <td className="budget table-text-product bold">{index + 1}</td>
        <td className="budget table-text-product bold">
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "5%",
              overflow: "hidden",
              margin: "20px 0",
            }}
          >
            <img
              src={data.image || NOT_FOUND_IMG}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </td>

        <td className="budget table-text-product bold">{data.name}</td>

        {/* <td className="budget table-text-product bold">{data.id}</td> */}

        <td className="budget table-text-product bold">{data.storeName}</td>
        <td className="budget table-text-product bold">
          {data.productCategory}
        </td>
        <td className="budget table-text-product bold">
          {data.pricePerPack.toLocaleString()}
        </td>

        {/* <td>
        <span className="badge badge-lg badge-primary " style={{ color: "var(--secondary)", fontSize: 11, padding: "1em 1.4em" }}>
            {data.brandStoreName}
        </span>
    </td> */}
        <td>
          {!data.isActive ? (
            <span
              className={`badge  status-success`}
              style={{ padding: "0.8em 1em", fontSize: 11 }}
            >
              Hoạt Động
            </span>
          ) : (
            <span
              className={`badge  status-cancel`}
              style={{ padding: "0.8em 1em", fontSize: 11 }}
            >
              Ngưng Hoạt Động
            </span>
          )}
        </td>

        <td className="text-center">
          <i
            className="fa-solid fa-pen-to-square mr-3 cusor"
            style={{ fontSize: 22 }}
            onClick={() => {
              // setCategoryModal(data);
              // setOpenModal(true);
            }}
          ></i>
          {/* <i className="fa-regular fa-trash-can mr-3 cusor" style={{ fontSize: 22 }}></i> */}
        </td>
      </tr>
    </>
  );
};
