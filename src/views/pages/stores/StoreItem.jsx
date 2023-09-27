import { Tooltip } from "reactstrap";
import { getAuth } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Button, Media } from "reactstrap";
import { AppContext } from "../../../context/AppProvider";

export const StoreItem = ({ data, index }) => {
  const { setOpenModal, setDeleteModal, setOpenDeleteModal, setStoreModal } =
    useContext(AppContext);
  const [tooltipOpenEdit, setTooltipOpenEdit] = useState(false);
  const [tooltipOpenDelete, setTooltipOpenDelete] = useState(false);
  const toggleEdit = () => setTooltipOpenEdit(!tooltipOpenEdit);
  const toggleDelete = () => setTooltipOpenDelete(!tooltipOpenDelete);
  return (
    <>
      <tr>
        <td className="budget table-text bold">{index + 1}</td>
        <td className="budget table-text bold">{data.brandStoreName}</td>
        <td className="budget table-text bold" style={{ whiteSpace: "unset" }}>
          {data.name}
        </td>
        <td className="budget table-text ">{data.phone}</td>
        <td className="budget table-text ">
          {data.creditAccount || "Không có"}
        </td>
        <td className="budget table-text bold">{data.buildingStore}</td>
        <td className="budget table-text ">{data.storeCateName}</td>
        {/* <td>
                    <span className="badge badge-lg badge-primary " style={{ color: "var(--secondary)", fontSize: 11, padding: "1em 1.4em" }}>
                        {data.brandStoreName}
                    </span>
                </td> */}
        <td>
          {data.status ? (
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

        <td className="text-right">
          <i
            className="fa-solid fa-pen-to-square mr-3 cusor"
            style={{ fontSize: 22 }}
            id={"Edit-" + index}
            onClick={() => {
              console.log({ data });
              setStoreModal(data);
              setOpenModal(true);
            }}
          ></i>
          <Tooltip
            placement="bottom"
            isOpen={tooltipOpenEdit}
            autohide={false}
            target={"Edit-" + index}
            toggle={toggleEdit}
          >
            Điều chỉnh
          </Tooltip>
          <i
            className="fa-regular fa-trash-can mr-3 cusor"
            style={{ fontSize: 22, color: "red" }}
            id={"Delete-" + index}
            onClick={() => {
              console.log({ data });
              setDeleteModal({ data });
              setOpenDeleteModal(true);
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
