import React, { useContext, useState } from "react";
import { NOT_FOUND_IMG } from "../../../constants";
import { AppContext } from "../../../context/AppProvider";
import { Tooltip } from "reactstrap";

export const MenuItem = ({ data, index }) => {
  const {
    setOpenModal,
    setCategoryModal,
    setDeleteModal,
    setOpenRemoveProductFromMenuModal,
  } = useContext(AppContext);

  const [tooltipOpenDelete, setTooltipOpenDelete] = useState(false);
  const toggleDelete = () => setTooltipOpenDelete(!tooltipOpenDelete);

  return (
    <>
      <tr>
        <td className="budget table-text-product bold">{index + 1}</td>
        <td className="budget table-text-product bold" align="left">
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

        <td className="budget table-text-product bold" align="left">
          {data.name}
        </td>

        {/* <td className="budget table-text-product bold">{data.id}</td> */}

        <td className="budget table-text-product bold" align="left">
          {data.storeName}
        </td>
        <td className="budget table-text-product bold">
          {data.productCategory}
        </td>
        <td className="budget table-text-product bold" align="right">
          {data.pricePerPack.toLocaleString()}
        </td>

        {/* <td>
        <span className="badge badge-lg badge-primary " style={{ color: "var(--secondary)", fontSize: 11, padding: "1em 1.4em" }}>
            {data.brandStoreName}
        </span>
    </td> */}
        <td align="left">
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
          {/* <i
            className="fa-solid fa-pen-to-square mr-3 cusor"
            style={{ fontSize: 22 }}
            onClick={() => {
              // setCategoryModal(data);
              // setOpenModal(true);
            }}
          ></i> */}
          <i
            className="fa-regular fa-trash-can mr-3 cusor"
            style={{ fontSize: 22, color: "red" }}
            id={"Delete-" + index}
            onClick={() => {
              setDeleteModal({ data });
              setOpenRemoveProductFromMenuModal(true);
            }}
          ></i>
          <Tooltip
            placement="bottom"
            isOpen={tooltipOpenDelete}
            autohide={false}
            target={"Delete-" + index}
            toggle={toggleDelete}
          >
            Xóa
          </Tooltip>
        </td>
      </tr>
    </>
  );
};
