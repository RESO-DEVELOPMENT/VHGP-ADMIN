import React, { useContext } from "react";
import { useHistory } from "react-router";
import { NOT_FOUND_IMG } from "../../../constants";
import { AppContext } from "../../../context/AppProvider";

export const AreaItem = ({ data, index, areaId }) => {
    const { setStoreCategoryModal, setOpenBuildingModal, setOpenDeleteModal, setBuildingModal, setOpenClusterModal, setClusterModal } = useContext(AppContext);
    let history = useHistory();
    return (
        <>
            <tr>
                <td className="budget table-text-product bold">{index + 1}</td>

                <td className="budget table-text-product bold">{data.id}</td>
                <td className="budget table-text-product bold">{data.name}</td>

                {/* <td>
        <span className="badge badge-lg badge-primary " style={{ color: "var(--secondary)", fontSize: 11, padding: "1em 1.4em" }}>
            {data.brandStoreName}
        </span>
    </td> */}
                <td>
                    {!data.isActive ? (
                        <span className={`badge  status-success`} style={{ padding: "0.8em 1em", fontSize: 11 }}>
                            Hoạt Động
                        </span>
                    ) : (
                        <span className={`badge  status-cancel`} style={{ padding: "0.8em 1em", fontSize: 11 }}>
                            Ngưng Hoạt Động
                        </span>
                    )}
                </td>

                <td className="">
                    <i
                        className="fa-regular fa-eye mr-3 cusor"
                        style={{ fontSize: 22 }}
                        onClick={() => {
                            setBuildingModal(data);
                            history.push(`/admin/area/${areaId}/clusters/${data.id}`);
                            // setOpenBuildingModal(true);
                        }}
                    ></i>
                    <i
                        className="fa-solid fa-pen-to-square mr-3 cusor"
                        style={{ fontSize: 22 }}
                        onClick={() => {
                            console.log({ data });
                            setClusterModal(data);
                            setOpenClusterModal(true);
                        }}
                    ></i>
                    <i
                        className="fa-regular fa-trash-can mr-3 cusor"
                        style={{ fontSize: 22, color: "red" }}
                        onClick={() => {
                            setOpenDeleteModal(true);
                            setStoreCategoryModal(data);
                        }}
                    ></i>
                </td>
            </tr>
        </>
    );
};
