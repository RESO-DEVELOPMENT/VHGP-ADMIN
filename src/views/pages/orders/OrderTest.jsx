// import React, { useEffect, useRef, useState } from "react";
// import { useHistory } from "react-router";
// import Select from "react-select";
// import { Card, CardBody, CardHeader, Container, Form, Input, Row, Spinner, Table } from "reactstrap";
// import { getListOrder, getListOrderByPayment, getListOrderByStatus } from "../../../apis/orderApiService";
// import SimpleHeader from "../../../components/Headers/SimpleHeader";
// import { OrderModal } from "../../../components/Modals/orderModal";
// import { statusType } from "../../../constants";
// import ReactDatetime from "react-datetime";
// import Odata from "./OData";
// import { OrderItem } from "./OrderItem";
// import paginationFactory from "react-bootstrap-table2-paginator";

// import BootstrapTable from "react-bootstrap-table-next";
// import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
// import { dataTable } from "../../../variables/general";

// const pagination = paginationFactory({
//     page: 1,
//     alwaysShowAllBtns: true,
//     showTotal: true,
//     withFirstAndLast: false,
//     sizePerPageRenderer: ({ options, currSizePerPage, onSizePerPageChange }) => (
//         <div className="dataTables_length" id="datatable-basic_length">
//             <label>
//                 Show{" "}
//                 {
//                     <select name="datatable-basic_length" aria-controls="datatable-basic" className="form-control form-control-sm" onChange={(e) => onSizePerPageChange(e.target.value)}>
//                         <option value="10">10</option>
//                         <option value="25">25</option>
//                         <option value="50">50</option>
//                         <option value="100">100</option>
//                     </select>
//                 }{" "}
//                 entries.
//             </label>
//         </div>
//     ),
// });
// const { SearchBar } = Search;
// export const OrderTest = () => {
//     const [orders, setOrders] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [payment, setPayment] = useState("");
//     const [status, setStatus] = useState("");
//     const [dateType, setDateType] = useState("text");
//     const [dateOrder, setDateOrder] = useState("");
//     const interviewDateRef = useRef();
//     const options = [
//         { label: "Tất cả", value: "Tất cả" },
//         { label: "Tiền Mặt(COD)", value: "Tiền Mặt" },
//         { label: "Đã Thanh Toán", value: "Đã Thanh Toán" },
//     ];
//     const optionsMode = [
//         { label: "Tất cả", value: "0" },
//         { label: "Gọi Món", value: "1" },
//         { label: "Đi Chợ", value: "2" },
//         { label: "Đặt Hàng", value: "3" },
//     ];

//     const optionsStatus = statusType.map((item) => {
//         return { label: item.value, value: item.id };
//     });

//     const { orderItem } = Odata;
//     useEffect(() => {
//         window.scrollTo({ top: 0, behavior: "smooth" });
//         return () => {};
//     }, []);
//     const handleGetOrder = (date) => {
//         setIsLoading(true);
//         if (date === "") {
//             date = "";
//         }
//         getListOrder(date.replace("-", "/").replace("-", "/"), 1, 100)
//             .then((res) => {
//                 const orders = res.data;
//                 setOrders(orders);
//                 setIsLoading(false);
//             })
//             .catch((error) => console.log(error));
//     };
//     useEffect(() => {
//         // const date = new Date();
//         // const futureDate = date.getDate();
//         // date.setDate(futureDate);
//         // const defaultValue = date.toLocaleDateString("en-CA");
//         // setDateOrder("");
//         handleGetOrder("");

//         return () => {};
//     }, []);

//     let history = useHistory();
//     const customStylesPayment = {
//         control: (provided, state) => ({
//             ...provided,
//             background: "#fff",
//             borderColor: "#9e9e9e",
//             minHeight: "30px",
//             height: "46px",
//             width: "200px",
//             boxShadow: state.isFocused ? null : null,
//             borderRadius: "0.5rem",
//         }),

//         input: (provided, state) => ({
//             ...provided,
//             margin: "5px",
//         }),
//     };
//     const customStylesStatus = {
//         control: (provided, state) => ({
//             ...provided,
//             background: "#fff",
//             borderColor: "#9e9e9e",
//             minHeight: "30px",
//             height: "46px",
//             width: "250px",
//             boxShadow: state.isFocused ? null : null,
//             borderRadius: "0.5rem",
//         }),

//         input: (provided, state) => ({
//             ...provided,
//             margin: "5px",
//         }),
//     };
//     const handleInterviewDateClick = () => {
//         interviewDateRef.current.focus();
//     };
//     return (
//         <>
//             <SimpleHeader name="Danh Sách Đơn Hàng" parentName="Quản Lý" />
//             <OrderModal />
//             <Container className="mt--6" fluid>
//                 <Row>
//                     <div className="col">
//                         <Card>
//                             {/* <CardHeader>
//                                 <h3 className="mb-0">React Bootstrap Table 2</h3>
//                                 <p className="text-sm mb-0">
//                                     This is an exmaple of data table using the well known react-bootstrap-table2 plugin. This is a minimal setup in order to get started fast.
//                                 </p>
//                             </CardHeader> */}
//                             <ToolkitProvider
//                                 data={dataTable}
//                                 keyField="name"
//                                 columns={[
//                                     {
//                                         dataField: "name",
//                                         text: "Name",
//                                         sort: true,
//                                     },
//                                     {
//                                         dataField: "position",
//                                         text: "Position",
//                                         sort: true,
//                                     },
//                                     {
//                                         dataField: "office",
//                                         text: "Office",
//                                         sort: true,
//                                     },
//                                     {
//                                         dataField: "age",
//                                         text: "Age",
//                                         sort: true,
//                                     },
//                                     {
//                                         dataField: "start_date",
//                                         text: "Start date",
//                                         sort: true,
//                                     },
//                                     {
//                                         dataField: "salary",
//                                         text: "Salary",
//                                         sort: true,
//                                     },
//                                 ]}
//                                 search
//                             >
//                                 {(props) => {
//                                     console.log(props.searchProps);
//                                     return (
//                                         <div className="py-4 table-responsive">
//                                             <div id="datatable-basic_filter" className="dataTables_filter px-4 pb-1">
//                                                 <label>
//                                                     Search:
//                                                     <SearchBar className="form-control-sm" placeholder="" {...props.searchProps} />
//                                                 </label>
//                                             </div>
//                                             <BootstrapTable {...props.baseProps} bootstrap4={true} pagination={pagination} bordered={false} classes="thai" />
//                                         </div>
//                                     );
//                                 }}
//                             </ToolkitProvider>
//                         </Card>
//                     </div>
//                 </Row>
//             </Container>
//         </>
//     );
// };
