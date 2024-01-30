import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import ReactDatetime from "react-datetime";
import { useHistory } from "react-router";
import Select from "react-select";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Form,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Spinner,
  Table,
} from "reactstrap";
import { getListOrder } from "../../../apis/orderApiService";
import SimpleHeader from "../../../components/Headers/SimpleHeader";
import { statusTypeOptions } from "../../../constants";
import { OrderItem } from "./OrderItem";
import Lottie from "react-lottie";
import animationData from "../../../assets/loading.json";
// import "moment/locale/en";

export const Order = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [payment, setPayment] = useState("");
  // const [paymentFilter, setPaymentFilter] = useState("");
  const [mode, setMode] = useState("");
  // const [modeFilter, setModeFilter] = useState("");
  const [status, setStatus] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [startOrder, setStartOrder] = useState(0);
  const [endOrder, setEndOrder] = useState(0);
  const [listPage, setListPage] = useState([]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const [filter, setFilter] = useState({
    date: "",
    payment: "",
    status: "",
    mode: "",
  });
  // const [statusFilter, setStatusFilter] = useState("");
  // const [dateFilter, setDateFilter] = useState("");

  const interviewDateRef = useRef();

  const options = [
    { label: "Tất cả", value: -1 },
    { label: "Thu hộ Tiền Mặt", value: 0 },
    { label: "Thu hộ chuyển khoản", value: 1 },
    { label: "Đã thanh toán", value: 2 },
  ];
  const optionsMode = [
    { label: "Tất cả", value: 0 },
    { label: "Gọi Món", value: 1 },
    { label: "Đi Chợ", value: 2 },
    //{ label: "Đặt Hàng", value: 3 },
  ];

  const sizeOptions = [
    { label: "10", value: 10 },
    { label: "50", value: 50 },
    { label: "100", value: 100 },
  ];

  const optionsStatus = statusTypeOptions.map((item) => {
    return { label: item.value, value: item.id };
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return () => {};
  }, []);

  const handleGetOrder = (date, payment, status, mode, pageIndex, size) => {
    let dateFilter = "";
    let paymentFilter = "";
    let statusFilter = "";
    let modeFilter = "";
    dateFilter = date;
    paymentFilter = payment;
    statusFilter = status;
    modeFilter = mode;
    setIsLoading(true);

    getListOrder(
      dateFilter === "" ? "" : dateFilter.replace("-", "/").replace("-", "/"),
      paymentFilter === -1 ? "" : paymentFilter,
      statusFilter === -1 ? -1 : statusFilter,
      modeFilter === 0 ? "" : modeFilter,
      pageIndex,
      size
    )
      .then((res) => {
        setTimeout(() => {
          setStartOrder(res.data.startOrder);
          setEndOrder(res.data.endOrder);
          const { data } = res.data;
          const orders = data;
          const { totalOrder } = res.data;
          setTotalPage(totalOrder);
          let newList = [];

          for (
            let index = 1;
            index <= Math.ceil(totalOrder / pageSize);
            index++
          ) {
            newList = [...newList, index];
          }
          setListPage(newList);
          setOrders(orders);
          setIsLoading(false);
        }, 100);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    // const date = new Date();
    // const futureDate = date.getDate();
    // date.setDate(futureDate);
    // const defaultValue = date.toLocaleDateString("en-CA");
    // setDateOrder("");
    // handleGetOrder("");

    getListOrder("", "", "", "", page, pageSize)
      .then((res) => {
        const { data } = res.data;
        const orders = data;
        setStartOrder(res.data.startOrder);
        setEndOrder(res.data.endOrder);
        const { totalOrder } = res.data;
        setTotalPage(totalOrder);
        let newList = [];
        for (
          let index = 1;
          index <= Math.ceil(totalOrder / pageSize);
          index++
        ) {
          newList = [...newList, index];
        }
        setListPage(newList);
        setTimeout(() => {
          setOrders(orders);
          setIsLoading(false);
        }, 100);
      })
      .catch((error) => console.log(error));

    return () => {};
  }, []);

  const customStylesPayment = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "#9e9e9e",
      minHeight: "30px",
      height: "46px",
      width: "200px",
      boxShadow: state.isFocused ? null : null,
      borderRadius: "0.5rem",
    }),

    input: (provided, state) => ({
      ...provided,
      margin: "5px",
    }),
  };

  const customStylesOrder = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "#9e9e9e",
      minHeight: "30px",
      height: "40px",
      width: "80px",
      boxShadow: state.isFocused ? null : null,
      borderRadius: "0.5rem",
      zIndex: "1",
    }),

    input: (provided, state) => ({
      ...provided,
    }),
  };

  const customStylesStatus = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "#9e9e9e",
      minHeight: "30px",
      height: "46px",
      width: "250px",
      boxShadow: state.isFocused ? null : null,
      borderRadius: "0.5rem",
    }),

    input: (provided, state) => ({
      ...provided,
      margin: "5px",
    }),
  };

  const handleInterviewDateClick = () => {
    interviewDateRef.current.focus();
  };

  return (
    <>
      <SimpleHeader name="Danh Sách Đơn Hàng" parentName="Quản Lý" />
      <Container className="mb-7 mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "20px 0px",
                  zIndex: 2,
                }}
                className="align-items-center"
              >
                <CardHeader
                  className=""
                  style={{ padding: "0 0 0 20px", border: "none" }}
                >
                  <Form
                    className="flex"
                    style={{ alignItems: "center", gap: 20 }}
                  >
                    {/* <FormGroup className="mb-0">
                                            <InputGroup className="input-group-lg input-group-flush" style={{ border: "2px solid #dce0e8" }}>
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText style={{ padding: "0 15px" }}>
                                                        <span className="fas fa-search" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="Tìm kiếm bằng tên sản phẩm"
                                                    type="search"
                                                    className="btn-lg input-search"
                                                    style={{ height: 44, width: 250, fontSize: "1.2rem !important" }}
                                                />
                                            </InputGroup>
                                        </FormGroup> */}
                    <ReactDatetime
                      closeOnSelect={true}
                      inputProps={{
                        placeholder: "Lọc theo ngày",
                      }}
                      initialValue={new Date()}
                      className="ReactDatetime"
                      style={{ border: "none" }}
                      timeFormat={false}
                      onChange={(e) => {
                        let date = "";
                        moment.locale("en");
                        // Nếu input không empty
                        if (e) {
                          // Ngày hợp lệ
                          if (e._d) {
                            date = new Date(e._d + "");
                            console.log(date);
                            let dateConvert = moment(date).format("ll");
                            date =
                              dateConvert.split(",")[0] +
                              dateConvert.split(",")[1];
                            console.log(date);
                            setFilter({ ...filter, date: date });
                          }
                          // Ngày không hợp lệ thì set date là ngày tiếp theo để UI hiển thị không có đơn hàng nào
                          else {
                            let dateConvert = moment()
                              .add(1, "days")
                              .format("ll");
                            date =
                              dateConvert.split(",")[0] +
                              dateConvert.split(",")[1];
                            console.log(date);
                          }
                        }
                        // Nếu input empty thì hiển thị toàn bộ đơn hàng
                        else {
                          date = "";
                        }

                        handleGetOrder(
                          date,
                          filter.payment,
                          filter.status,
                          filter.mode,
                          1,
                          pageSize
                        );
                        setPage(1);
                      }}
                    />

                    <Select
                      options={options}
                      placeholder="Thanh Toán"
                      styles={customStylesPayment}
                      value={payment}
                      onChange={(e) => {
                        // setIsLoading(true);
                        // setOrders([]);
                        setPayment(e);
                        setFilter({ ...filter, payment: e.value });
                        handleGetOrder(
                          filter.date,
                          e.value,
                          filter.status,
                          filter.mode,
                          1,
                          pageSize
                        );
                        setPage(1);
                        // if (e.value !== -1) {
                        //     getListOrderByPayment(e.value, page,pageSize)
                        //         .then((res) => {
                        //             const orders = res.data;
                        //             setOrders(orders);
                        //             setIsLoading(false);
                        //         })
                        //         .catch((error) => console.log(error));
                        // } else {
                        //     getListOrder("", page,pageSize)
                        //         .then((res) => {
                        //             const orders = res.data;
                        //             setOrders(orders);
                        //             setIsLoading(false);
                        //         })
                        //         .catch((error) => console.log(error));
                        // }
                      }}
                    />
                    <Select
                      options={optionsStatus}
                      placeholder="Trạng Thái Đơn Hàng"
                      styles={customStylesStatus}
                      value={status}
                      onChange={(e) => {
                        console.log(e);
                        // setIsLoading(true);
                        // setOrders([]);
                        setStatus(e);
                        setFilter({ ...filter, status: e.value });
                        // setStatusFilter(e.value);
                        handleGetOrder(
                          filter.date,
                          filter.payment,
                          e.value,
                          filter.mode,
                          1,
                          pageSize
                        );
                        setPage(1);
                        // if (e.value !== "Tất cả") {
                        //     getListOrderByStatus(e.value, page,pageSize)
                        //         .then((res) => {
                        //             const orders = res.data;
                        //             setOrders(orders);
                        //             setIsLoading(false);
                        //         })
                        //         .catch((error) => console.log(error));
                        // } else {
                        //     getListOrder(page,pageSize)
                        //         .then((res) => {
                        //             const orders = res.data;
                        //             setOrders(orders);
                        //             setIsLoading(false);
                        //         })
                        //         .catch((error) => console.log(error));
                        // }
                      }}
                    />
                    <Select
                      options={optionsMode}
                      placeholder="Hình thức đặt hàng"
                      styles={customStylesStatus}
                      value={mode}
                      onChange={(e) => {
                        console.log(e);
                        setMode(e);
                        // setModeFilter(e.value);
                        setFilter({ ...filter, mode: e.value });
                        handleGetOrder(
                          filter.date,
                          filter.payment,
                          filter.status,
                          e.value,
                          1,
                          pageSize
                        );
                        setPage(1);
                        // setIsLoading(true);
                        // setOrders([]);
                        // setStatus(e);
                        // // if (e.value !== "Tất cả") {
                        //     getListOrderByStatus(e.value, page,pageSize)
                        //         .then((res) => {
                        //             const orders = res.data;
                        //             setOrders(orders);
                        //             setIsLoading(false);
                        //         })
                        //         .catch((error) => console.log(error));
                        // } else {
                        //     getListOrder(page,pageSize)
                        //         .then((res) => {
                        //             const orders = res.data;
                        //             setOrders(orders);
                        //             setIsLoading(false);
                        //         })
                        //         .catch((error) => console.log(error));
                        // }
                      }}
                    />
                  </Form>
                </CardHeader>
                {/* <Col className="mt-3 mt-md-0 text-md-right" lg="6" xs="5">
                                    <Button onClick={() => history.push("/admin/product")} className="btn-neutral" color="default" size="lg" style={{ background: "var(--secondary)", color: "#fff" }}>
                                        Thêm Sản Phẩm Mới
                                    </Button>
                                </Col> */}
              </div>

              <Table
                className="align-items-center table-flush"
                responsive
                hover={true}
                style={{}}
              >
                <div
                  className={`loading-spin ${
                    !isLoading && "loading-spin-done"
                  }`}
                ></div>
                <thead className="thead-light">
                  <tr>
                    <th className="sort table-title" scope="col">
                      Mã Đơn Hàng
                    </th>
                    <th className="sort table-title" scope="col">
                      Cửa hàng
                    </th>
                    <th className="sort table-title" scope="col">
                      Điểm Giao Hàng
                    </th>
                    <th className="sort table-title" scope="col">
                      Khách Hàng
                    </th>
                    <th className="sort table-title" scope="col">
                      SDT
                    </th>
                    <th className="sort table-title" scope="col">
                      Giá trị Đơn hàng
                    </th>
                    <th className="sort table-title" scope="col">
                      Phí ship
                    </th>
                    <th className="sort table-title" scope="col">
                      Tổng cộng
                    </th>
                    <th className="sort table-title" scope="col">
                      Ngày Tạo
                    </th>

                    <th className="sort table-title" scope="col">
                      Thanh Toán
                    </th>
                    <th className="sort table-title" scope="col">
                      Trạng Thái
                    </th>
                    {/* <th className="sort table-title" scope="col">
                                            Dịch vụ
                                        </th> */}
                    <th className="sort table-title" scope="col">
                      Mode
                    </th>

                    <th className="sort table-title" scope="col">
                      {/* Hành động */}
                    </th>
                    {/* <th scope="col">Users</th>
                                        <th className="sort table-title" data-sort="completion" scope="col">
                                            Completion
                                        </th>
                                        <th scope="col" /> */}
                  </tr>
                </thead>

                <tbody className="list">
                  {orders.length > 0 &&
                    orders.map((item, index) => {
                      return (
                        <OrderItem data={item} index={index} key={index} />
                      );
                    })}
                </tbody>
              </Table>

              {orders.length === 0 && !isLoading && (
                <>
                  <div
                    className="center_flex"
                    style={{ padding: "50px 0 0 0" }}
                  >
                    <img
                      src="/icons/empty.png"
                      alt=""
                      style={{ textAlign: "center", width: 300 }}
                    />
                  </div>
                  <h1
                    className="description"
                    style={{
                      fontSize: 18,
                      textAlign: "center",
                      padding: "20px 0 50px 0",
                    }}
                  >
                    Không có đơn hàng nào!!!
                  </h1>
                </>
              )}

              {isLoading && (
                <CardBody
                  className=" center_flex"
                  style={{
                    zIndex: 1,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    background: "#fff",
                    padding: "330px 0 300px 0",
                  }}
                >
                  <Lottie options={defaultOptions} height={400} width={400} />
                </CardBody>
              )}

              {orders.length > 0 && (
                <CardFooter className="py-10" style={{ zIndex: 1 }}>
                  <nav
                    aria-label="..."
                    className="flex align-items-center justify-content-end"
                  >
                    <p className="mb-0 mr-2">Số hàng mỗi trang:</p>
                    <Select
                      options={sizeOptions}
                      placeholder={pageSize}
                      styles={customStylesOrder}
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(e.value);
                        handleGetOrder(
                          "",
                          filter.payment,
                          filter.status,
                          filter.mode,
                          page,
                          e.value
                        );
                      }}
                    />

                    <p className="ml-4 mb-0 mr-3">
                      {startOrder}-{endOrder} trong {totalPage ? totalPage : 0}
                    </p>

                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className={`${page === 1 && "disabled"}`}>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => {
                            e.preventDefault();
                            setPage(page - 1);
                            handleGetOrder(
                              "",
                              filter.payment,
                              filter.status,
                              filter.mode,
                              page - 1,
                              pageSize
                            );
                          }}
                          tabIndex="1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>

                      <PaginationItem
                        className={`${
                          page === Math.ceil(totalPage / pageSize) && "disabled"
                        }`}
                      >
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => {
                            e.preventDefault();
                            setPage(page + 1);
                            handleGetOrder(
                              "",
                              filter.payment,
                              filter.status,
                              filter.mode,
                              page + 1,
                              pageSize
                            );
                          }}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              )}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};
