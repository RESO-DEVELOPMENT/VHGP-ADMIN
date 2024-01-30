import moment from "moment";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { Tooltip } from "reactstrap";
import {
  getModeName,
  getPaymentStatusName,
  getTimeConvert,
  statusType,
} from "../../../constants";
import { AppContext } from "../../../context/AppProvider";
import "moment/locale/vi";
export const OrderItem = ({ data, index }) => {
  const [tooltipOpenEdit, setTooltipOpenEdit] = useState(false);
  const toggleEdit = () => setTooltipOpenEdit(!tooltipOpenEdit);
  const { setOpenModal, setorderModal } = useContext(AppContext);
  let history = useHistory();
  const getStatus = (status) => {
    return statusType[status];
  };

  return (
    <tr>
      {/* MÃ ĐƠN */}
      <td
        className="budget table-text"
        style={{ padding: "1.7rem 0rem 1.7rem 1.5rem" }}
      >
        {data.id}
      </td>

      {/* CỬA HÀNG  */}
      <td
        className="budget table-text "
        style={{
          whiteSpace: "unset",
          padding: "1.7rem 0rem 1.7rem 1.5rem",
          minWidth: 200,
        }}
      >
        {data.storeName}
      </td>

      {/* ĐIỂM GIAO HÀNG */}
      <td
        className="budget table-text "
        style={{ padding: "1.7rem 0rem 1.7rem 1.5rem" }}
      >
        {data.buildingName}
      </td>

      {/* KHÁCH HÀNG */}
      <td
        className="budget table-text "
        style={{ padding: "1.7rem 0rem 1.7rem 1.5rem" }}
      >
        {data.customerName}
      </td>

      {/* SỐ ĐIỆN THOẠI */}
      <td
        className="budget table-text bold"
        style={{ padding: "1.7rem 0rem 1.7rem 1.5rem" }}
      >
        {data.phone}
      </td>

      {/* GIÁ TRỊ ĐƠN HÀNG */}
      <td
        className="budget table-text "
        style={{ padding: "1.7rem 0rem 1.7rem 1.5rem" }}
      >
        {data.total.toLocaleString()}
      </td>
      {/* phí ship */}
      <td
        className="budget table-text "
        style={{ padding: "1.7rem 0rem 1.7rem 1.5rem" }}
      >
        {data.shipCost.toLocaleString()}
      </td>
      {/* Tổng cộng */}
      <td
        className="budget table-text "
        style={{ padding: "1.7rem 0rem 1.7rem 1.5rem" }}
      >
        {(data.shipCost + data.total).toLocaleString()}
      </td>

      {/* NGÀY TẠO */}
      <td
        className="budget table-text"
        style={{ whiteSpace: "unset", padding: "1.7rem 0rem 1.7rem 1.5rem" }}
      >
        {getTimeConvert(data.time)}
      </td>

      {/* THANH TOÁN */}
      <td
        className="budget table-text bold"
        style={{
          padding: "1.7rem 0rem 1.7rem 1.5rem",
          whiteSpace: "unset",
          color:
            data.paymentName !== 0
              ? data.paymentStatus === 0 || data.paymentStatus === 2
                ? "red"
                : null
              : null,
        }}
      >
        {getPaymentStatusName(data.paymentName)}
      </td>
      <td
        className="budget table-text"
        style={{ padding: "1.7rem 0rem 1.7rem 1.5rem" }}
      >
        {
          <span
            className={`badge  ${getStatus(data.status).class}`}
            style={{ padding: "0.8em 1.2em", fontSize: 11 }}
          >
            {getStatus(data.status).value}
          </span>
        }
      </td>
      {/* <td className="budget table-text bold" style={{ color: "var(--secondary)", padding: "1.7rem 0rem 1.7rem 1.5rem" }}>
                {data.shipper}
            </td> */}
      <td
        className="budget table-text"
        style={{ padding: "1.7rem 0rem 1.7rem 1.5rem" }}
      >
        {getModeName(data.modeId)}
      </td>

      <td
        className="budget table-text"
        style={{ padding: "1.7rem 0rem 1.7rem 1.5rem", minWidth: 84 }}
      ></td>

      {/* <Badge color="" className="badge-dot mr-4">
                    <i className="bg-warning" />
                    <span className="status">pending</span>
                </Badge> */}
      {/* <td>
                {data.isActive ? (
                    <span className="badge " style={{ color: "green", fontSize: 11, fontWeight: 700, padding: "0.9em 1.6em", background: "rgba(0, 171, 85, 0.2)" }}>
                        Còn hàng
                    </span>
                ) : (
                    <span className="badge" style={{ color: "red", fontSize: 11, padding: "0.9em 1.6em", background: "rgba(255, 0, 0, 0.2)" }}>
                        Hết hàng
                    </span>
                )}
            </td> */}

      <td
        className="budget table-text"
        style={{
          textAlign: "center",
          position: "absolute",
          right: 0,
          background: "#fff",
          padding: "36px 1.7rem 36px 1.7rem",
        }}
      >
        <i
          id={"Edit-" + index}
          className="fa-solid fa-pen-to-square  cusor"
          style={{ fontSize: 22 }}
          onClick={() => {
            // handleCallback(data);
            // setOpenModal(true);
            setorderModal(data);

            history.push(`/admin/order/${data.id}`);
          }}
        ></i>
        <Tooltip
          placement="bottom"
          isOpen={tooltipOpenEdit}
          autohide={false}
          target={"Edit-" + index}
          toggle={toggleEdit}
        >
          Xem chi tiết
        </Tooltip>
        {/* <i className="fa-regular fa-trash-can mr-3 cusor" style={{ fontSize: 22, color: "red" }}></i> */}
      </td>
    </tr>
  );
};
