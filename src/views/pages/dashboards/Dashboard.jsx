/*!

=========================================================
* Argon Dashboard PRO React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useContext, useEffect, useState } from "react";
// node.js library that concatenates classes (strings)
// javascipt plugin for creating charts
import { Chart } from "chart.js";
// react plugin used to create charts
// reactstrap components
import { Card, CardBody, Container, Row, Spinner } from "reactstrap";

// core components
// import CardsHeader from "../../../components/Headers/CardsHeader.js";
import Select from "react-select";
import CardsHeader from "../../../components/Headers/CardsHeader.js";
import {
  getOrderReport,
  getOrderReportPrice,
} from "../../../apis/orderApiService.js";
import { notify } from "../../../components/Toast/ToastCustom.js";
import moment from "moment";
import { AppContext } from "../../../context/AppProvider.jsx";

function Dashboard() {
  const calculateDateRange = (start) => {
    moment.locale("en");
    let startDateConvert = moment().subtract(start, "days").format("ll");
    let startDate =
      startDateConvert.split(",")[0] + startDateConvert.split(",")[1];
    let endDateConvert = moment().format("ll");
    let endDate = endDateConvert.split(",")[0] + endDateConvert.split(",")[1];

    if (start === 1) {
      startDateConvert = moment().format("ll");
      startDate =
        startDateConvert.split(",")[0] + startDateConvert.split(",")[1];

      endDateConvert = moment().add(1, "days").format("ll");
      endDate = endDateConvert.split(",")[0] + endDateConvert.split(",")[1];
    }
    if (start === 0) {
      startDateConvert = moment().add(-1, "days").format("ll");
      startDate =
        startDateConvert.split(",")[0] + startDateConvert.split(",")[1];

      endDateConvert = moment().add(0, "days").format("ll");
      endDate = endDateConvert.split(",")[0] + endDateConvert.split(",")[1];
    }
    return { startDate, endDate };
  };

  let initialDate = calculateDateRange(1);

  const { setIsLoadingMain } = useContext(AppContext);
  const [activeNav, setActiveNav] = React.useState(1);
  const [countStore, setCountStore] = React.useState(0);
  const [countOrder, setCountOrder] = React.useState(0);
  const [countShipper, setCountShipper] = React.useState(0);
  const [countOrderDone, setCountOrderDone] = React.useState(0);
  const [countOrderFail, setCountOrderFail] = React.useState(0);
  const [countOrderNew, setCountOrderNew] = React.useState(0);
  const [countOrderPaymentFail, setCountOrderPaymentFail] = React.useState(0);
  const [chartExample1Data, setChartExample1Data] = React.useState("data1");

  const [totalOrder, setTotalOrder] = React.useState(0);
  const [totalShipFree, setTotalShipFree] = React.useState(0);
  const [totalPaymentVNPay, setTotalPaymentVNPay] = React.useState(0);
  const [totalPaymentCash, setTotalPaymentCash] = React.useState(0);
  const [totalSurcharge, setTotalSurcharge] = React.useState(0);
  const [totalRevenueOrder, setTotalRevenueOrder] = React.useState(0);
  const [totalProfitOrder, setTotalProfitOrder] = React.useState(0);
  const [Date, setDate] = useState({
    label: "Hôm nay",
    value: 0,
  });

  //
  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data(chartExample1Data === "data1" ? "data2" : "data1");
  };

  //
  const handleGetReport = (startDate, endDate) => {
    setIsLoadingMain(true);
    getOrderReport(startDate, endDate)
      .then((res) => {
        if (res.data) {
          let report = res.data.data;
          setCountStore(report.totalStore);
          setCountOrder(report.totalOrder);
          setCountShipper(report.totalShipper);
          setCountOrderDone(report.totalOrderCompleted);
          setCountOrderFail(report.totalOrderCancel);
          setCountOrderNew(report.totalOrderNew);
          setCountOrderPaymentFail(report.totalOrderUnpaidVNpay);
        }
      })
      .catch((error) => {
        console.log(error);
        notify("Đã xảy ra lỗi gì đó!!", "Error");
      });
    getOrderReportPrice(startDate, endDate)
      .then((res) => {
        if (res.data) {
          let report = res.data.data;

          setTimeout(() => {
            setTotalOrder(report.totalOrder);
            setTotalShipFree(report.totalShipFree);
            setTotalPaymentVNPay(report.totalPaymentVNPay);
            setTotalPaymentCash(report.totalPaymentCash);
            setTotalSurcharge(report.totalSurcharge);
            setTotalRevenueOrder(report.totalRevenueOrder);
            setTotalProfitOrder(report.totalProfitOrder);
            setIsLoadingMain(false);
          }, 1000);
        }
      })
      .catch((error) => {
        console.log(error);
        notify("Đã xảy ra lỗi gì đó!!", "Error");
      });
  };

  useEffect(() => {
    handleGetReport(initialDate.startDate, initialDate.endDate);

    return () => {};
  }, []);

  const options = () => {
    return [
      {
        label: "Hôm nay",
        value: 0,
      },
      {
        label: "Hôm qua",
        value: 1,
      },
      {
        label: "7 ngày",
        value: 2,
      },
      {
        label: "30 ngày",
        value: 3,
      },
      {
        label: "365 ngày",
        value: 4,
      },
    ];
  };

  const customStylesPayment = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "rgb(200, 200, 200)",
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

  const handleReportByDateRange = (e) => {
    setDate(e);
    let date = {};

    switch (e.value) {
      // Today
      case 0:
        date = calculateDateRange(1);

        handleGetReport(date.startDate, date.endDate);
        break;
      case 1:
        date = calculateDateRange(0);

        handleGetReport(date.startDate, date.endDate);
        break;

      // 7 days
      case 2:
        date = calculateDateRange(7);

        handleGetReport(date.startDate, date.endDate);
        break;

      // 30 days
      case 3:
        date = calculateDateRange(30);

        handleGetReport(date.startDate, date.endDate);
        break;

      // 365 days
      case 4:
        date = calculateDateRange(365);

        handleGetReport(date.startDate, date.endDate);
        break;
    }
  };

  return (
    <>
      <CardsHeader
        name=""
        parentName="Dashboards"
        countOrder={countOrder}
        countShipper={countShipper}
        countStore={countStore}
      />

      <Container className="mt--12" fluid>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "10px 0 20px 0",
          }}
        >
          <h1>Báo cáo tổng quan</h1>
          <Select
            options={options()}
            placeholder="Lọc theo ngày"
            styles={customStylesPayment}
            value={Date}
            onChange={(e) => {
              handleReportByDateRange(e);
            }}
          />
        </div>
        <Row>
          <div className="col-lg-6">
            <Card
              style={{ background: "rgba(255, 170, 76, 0.9)", height: 440 }}
            >
              <div className="col-md-12">
                <form>
                  <div className="row">
                    <div
                      className=""
                      id="dropzone-single"
                      style={{ width: "100%", padding: "0 15px 30px 15px" }}
                    >
                      <div
                        className="center_flex"
                        style={{
                          paddingTop: 15,
                          paddingBottom: 30,
                          flexDirection: "column",
                        }}
                      >
                        <span
                          style={{
                            color: "#fff",
                            fontSize: 24,
                            fontWeight: 700,
                          }}
                        >
                          Tổng số hóa đơn bán hàng
                        </span>
                        <span
                          style={{
                            color: "#fff",
                            fontSize: 16,
                            fontWeight: 600,
                          }}
                        >
                          Đơn vị (Hóa đơn)
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "0px 10px 30px 10px",
                        }}
                      >
                        <span
                          style={{
                            color: "#fff",
                            fontSize: 16,
                            fontWeight: 600,
                          }}
                        >
                          Số đơn hàng thành công
                        </span>
                        <span
                          style={{
                            color: "#fff",
                            fontSize: 20,
                            fontWeight: 600,
                          }}
                        >
                          {countOrderDone}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "0px 10px 30px 10px",
                        }}
                      >
                        <span
                          style={{
                            color: "#fff",
                            fontSize: 16,
                            fontWeight: 600,
                          }}
                        >
                          Số đơn hàng mới
                        </span>
                        <span
                          style={{
                            color: "#fff",
                            fontSize: 20,
                            fontWeight: 600,
                          }}
                        >
                          {countOrderNew}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "0px 10px 30px 10px",
                        }}
                      >
                        <span
                          style={{
                            color: "#fff",
                            fontSize: 16,
                            fontWeight: 600,
                          }}
                        >
                          Số đơn hàng chưa thanh toán
                        </span>
                        <span
                          style={{
                            color: "#fff",
                            fontSize: 20,
                            fontWeight: 600,
                          }}
                        >
                          {countOrderPaymentFail}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "0px 10px 30px 10px",
                        }}
                      >
                        <span
                          style={{
                            color: "#fff",
                            fontSize: 16,
                            fontWeight: 600,
                          }}
                        >
                          Số đơn hàng thất bại
                        </span>
                        <span
                          style={{
                            color: "#fff",
                            fontSize: 20,
                            fontWeight: 600,
                          }}
                        >
                          {countOrderFail}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          background: "rgba(250, 250, 250, 0.22)",
                          borderRadius: 10,
                          padding: "5px 10px",
                        }}
                      >
                        <span
                          style={{
                            color: "#fff",
                            fontSize: 16,
                            fontWeight: 600,
                          }}
                        >
                          Tổng số đơn hàng
                        </span>
                        <span
                          style={{
                            color: "#fff",
                            fontSize: 20,
                            fontWeight: 600,
                          }}
                        >
                          {countOrder}
                        </span>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </Card>
          </div>
          <div className="col-lg-6">
            <Card style={{ background: "rgb(76, 175, 80)", height: 440 }}>
              <div className="col-md-12">
                <form>
                  <div className="row">
                    <div
                      className=""
                      id="dropzone-single"
                      style={{ width: "100%", padding: "0 15px 30px 15px" }}
                    >
                      <div
                        className="center_flex"
                        style={{
                          paddingTop: 15,
                          paddingBottom: 30,
                          flexDirection: "column",
                        }}
                      >
                        <span
                          style={{
                            color: "#fff",
                            fontSize: 24,
                            fontWeight: 700,
                          }}
                        >
                          Tổng doanh thu bán hàng
                        </span>
                        <span
                          style={{
                            color: "#fff",
                            fontSize: 16,
                            fontWeight: 600,
                          }}
                        >
                          Đơn vị (VND)
                        </span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "0px 10px 20px 10px",
                        }}
                      >
                        <span
                          style={{
                            color: "#fff",
                            fontSize: 16,
                            fontWeight: 600,
                          }}
                        >
                          Tổng thu hộ chuyển khoản (1)
                        </span>
                        <span
                          style={{
                            color: "#fff",
                            fontSize: 20,
                            fontWeight: 600,
                          }}
                        >
                          {totalPaymentVNPay?.toLocaleString()}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "0px 10px 20px 10px",
                        }}
                      >
                        <span
                          style={{
                            color: "#fff",
                            fontSize: 16,
                            fontWeight: 600,
                          }}
                        >
                          Tổng thu hộ tiền mặt (2)
                        </span>
                        <span
                          style={{
                            color: "#fff",
                            fontSize: 20,
                            fontWeight: 600,
                          }}
                        >
                          {totalPaymentCash?.toLocaleString()}
                        </span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          background: "rgba(250, 250, 250, 0.22)",
                          borderRadius: 10,
                          padding: "10px 10px 10px 10px",
                        }}
                      >
                        <span
                          style={{
                            color: "#fff",
                            fontSize: 16,
                            fontWeight: 600,
                          }}
                        >
                          Tổng thu hộ (3) = (1) + (2)
                        </span>
                        <span
                          style={{
                            color: "#fff",
                            fontSize: 22,
                            fontWeight: 600,
                          }}
                        >
                          {totalOrder?.toLocaleString()}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          background: "rgba(250, 250, 250, 0.22)",
                          borderRadius: 10,
                          padding: "10px 10px 10px 10px",
                          margin: "10px 0px 10px 0px",
                        }}
                      >
                        <span
                          style={{
                            color: "#fff",
                            fontSize: 16,
                            fontWeight: 600,
                          }}
                        >
                          Phí ship (doanh thu) (4)
                        </span>
                        <span
                          style={{
                            color: "#fff",
                            fontSize: 22,
                            fontWeight: 600,
                          }}
                        >
                          {totalShipFree?.toLocaleString()}
                        </span>
                      </div>

                      {/* <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "20px 10px 20px 10px",
                        }}
                      >
                        <span
                          style={{
                            color: "#fff",
                            fontSize: 16,
                            fontWeight: 600,
                          }}
                        >
                          Tổng thu hộ
                        </span>
                        <span
                          style={{
                            color: "#fff",
                            fontSize: 20,
                            fontWeight: 600,
                          }}
                        >
                          {totalOrder?.toLocaleString()}
                        </span>
                      </div> */}
                      {/* <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          background: "rgba(250, 250, 250, 0.22)",
                          borderRadius: 10,
                          padding: "5px 10px",
                        }}
                      >
                        <span
                          style={{
                            color: "#fff",
                            fontSize: 16,
                            fontWeight: 600,
                          }}
                        >
                          Tổng lợi nhuận
                        </span>
                        <span
                          style={{
                            color: "#fff",
                            fontSize: 22,
                            fontWeight: 600,
                          }}
                        >
                          {totalProfitOrder?.toLocaleString()}
                        </span>
                      </div> */}
                    </div>
                  </div>
                </form>
              </div>
            </Card>
          </div>
        </Row>
        {/* <Row>
          <Col xl="8">
            <Card className="bg-default">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-light text-uppercase ls-1 mb-1">
                      Overview
                    </h6>
                    <h5 className="h3 text-white mb-0">Sales value</h5>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem className="mr-2 mr-md-0">
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Line
                    data={chartExample1[chartExample1Data]}
                    options={chartExample1.options}
                    id="chart-sales-dark"
                    className="chart-canvas"
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card>
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Performance
                    </h6>
                    <h5 className="h3 mb-0">Total orders</h5>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Bar
                    data={chartExample2.data}
                    options={chartExample2.options}
                    className="chart-canvas"
                    id="chart-bars"
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row> */}
        {/* <Row>
          <Col xl="4">
            <Card>
              <CardHeader>
                <h5 className="h3 mb-0">Team members</h5>
              </CardHeader>

              <CardBody>
                <ListGroup className="list my--3" flush>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          className="avatar rounded-circle"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={"https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"}
                          />
                        </a>
                      </Col>
                      <div className="col ml--2">
                        <h4 className="mb-0">
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            John Michael
                          </a>
                        </h4>
                        <span className="text-success">●</span>{" "}
                        <small>Online</small>
                      </div>
                      <Col className="col-auto">
                        <Button color="primary" size="sm" type="button">
                          Add
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          className="avatar rounded-circle"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={"https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"}
                          />
                        </a>
                      </Col>
                      <div className="col ml--2">
                        <h4 className="mb-0">
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            Alex Smith
                          </a>
                        </h4>
                        <span className="text-warning">●</span>{" "}
                        <small>In a meeting</small>
                      </div>
                      <Col className="col-auto">
                        <Button color="primary" size="sm" type="button">
                          Add
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          className="avatar rounded-circle"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={"https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"}
                          />
                        </a>
                      </Col>
                      <div className="col ml--2">
                        <h4 className="mb-0">
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            Samantha Ivy
                          </a>
                        </h4>
                        <span className="text-danger">●</span>{" "}
                        <small>Offline</small>
                      </div>
                      <Col className="col-auto">
                        <Button color="primary" size="sm" type="button">
                          Add
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          className="avatar rounded-circle"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={"https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"}
                          />
                        </a>
                      </Col>
                      <div className="col ml--2">
                        <h4 className="mb-0">
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            John Michael
                          </a>
                        </h4>
                        <span className="text-success">●</span>{" "}
                        <small>Online</small>
                      </div>
                      <Col className="col-auto">
                        <Button color="primary" size="sm" type="button">
                          Add
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card>
              <CardHeader>
                <h5 className="h3 mb-0">To do list</h5>
              </CardHeader>

              <CardBody className="p-0">
                <ListGroup data-toggle="checklist" flush>
                  <ListGroupItem className="checklist-entry flex-column align-items-start py-4 px-4">
                    <div className="checklist-item checklist-item-success checklist-item-checked">
                      <div className="checklist-info">
                        <h5 className="checklist-title mb-0">Call with Dave</h5>
                        <small>10:30 AM</small>
                      </div>
                      <div>
                        <div className="custom-control custom-checkbox custom-checkbox-success">
                          <input
                            className="custom-control-input"
                            defaultChecked
                            id="chk-todo-task-1"
                            type="checkbox"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="chk-todo-task-1"
                          />
                        </div>
                      </div>
                    </div>
                  </ListGroupItem>
                  <ListGroupItem className="checklist-entry flex-column align-items-start py-4 px-4">
                    <div className="checklist-item checklist-item-warning">
                      <div className="checklist-info">
                        <h5 className="checklist-title mb-0">Lunch meeting</h5>
                        <small>10:30 AM</small>
                      </div>
                      <div>
                        <div className="custom-control custom-checkbox custom-checkbox-warning">
                          <input
                            className="custom-control-input"
                            id="chk-todo-task-2"
                            type="checkbox"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="chk-todo-task-2"
                          />
                        </div>
                      </div>
                    </div>
                  </ListGroupItem>
                  <ListGroupItem className="checklist-entry flex-column align-items-start py-4 px-4">
                    <div className="checklist-item checklist-item-info">
                      <div className="checklist-info">
                        <h5 className="checklist-title mb-0">
                          Argon Dashboard Launch
                        </h5>
                        <small>10:30 AM</small>
                      </div>
                      <div>
                        <div className="custom-control custom-checkbox custom-checkbox-info">
                          <input
                            className="custom-control-input"
                            id="chk-todo-task-3"
                            type="checkbox"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="chk-todo-task-3"
                          />
                        </div>
                      </div>
                    </div>
                  </ListGroupItem>
                  <ListGroupItem className="checklist-entry flex-column align-items-start py-4 px-4">
                    <div className="checklist-item checklist-item-danger checklist-item-checked">
                      <div className="checklist-info">
                        <h5 className="checklist-title mb-0">
                          Winter Hackaton
                        </h5>
                        <small>10:30 AM</small>
                      </div>
                      <div>
                        <div className="custom-control custom-checkbox custom-checkbox-danger">
                          <input
                            className="custom-control-input"
                            defaultChecked
                            id="chk-todo-task-4"
                            type="checkbox"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="chk-todo-task-4"
                          />
                        </div>
                      </div>
                    </div>
                  </ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card>
              <CardHeader>
                <h5 className="h3 mb-0">Progress track</h5>
              </CardHeader>

              <CardBody>
                <ListGroup className="list my--3" flush>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          className="avatar rounded-circle"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={
                              "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                            }
                          />
                        </a>
                      </Col>
                      <div className="col">
                        <h5>Argon Design System</h5>
                        <Progress
                          className="progress-xs mb-0"
                          color="orange"
                          max="100"
                          value="60"
                        />
                      </div>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          className="avatar rounded-circle"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={
                              "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                            }
                          />
                        </a>
                      </Col>
                      <div className="col">
                        <h5>Angular Now UI Kit PRO</h5>
                        <Progress
                          className="progress-xs mb-0"
                          color="success"
                          max="100"
                          value="100"
                        />
                      </div>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          className="avatar rounded-circle"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={"https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"}
                          />
                        </a>
                      </Col>
                      <div className="col">
                        <h5>Black Dashboard</h5>
                        <Progress
                          className="progress-xs mb-0"
                          color="danger"
                          max="100"
                          value="72"
                        />
                      </div>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          className="avatar rounded-circle"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={"https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"}
                          />
                        </a>
                      </Col>
                      <div className="col">
                        <h5>React Material Dashboard</h5>
                        <Progress
                          className="progress-xs mb-0"
                          color="info"
                          max="100"
                          value="90"
                        />
                      </div>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xl="5">
            <Card>
              <CardHeader>
                <h5 className="h3 mb-0">Activity feed</h5>
              </CardHeader>
              <CardHeader className="d-flex align-items-center">
                <div className="d-flex align-items-center">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar"
                      src={"https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"}
                    />
                  </a>
                  <div className="mx-3">
                    <a
                      className="text-dark font-weight-600 text-sm"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      John Snow
                    </a>
                    <small className="d-block text-muted">3 days ago</small>
                  </div>
                </div>
                <div className="text-right ml-auto">
                  <Button
                    className="btn-icon"
                    color="primary"
                    size="sm"
                    type="button"
                  >
                    <span className="btn-inner--icon mr-1">
                      <i className="ni ni-fat-add" />
                    </span>
                    <span className="btn-inner--text">Follow</span>
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                <p className="mb-4">
                  Personal profiles are the perfect way for you to grab their
                  attention and persuade recruiters to continue reading your CV
                  because you’re telling them from the off exactly why they
                  should hire you.
                </p>
                <img
                  alt="..."
                  className="img-fluid rounded"
                  src={"https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"}
                />
                <Row className="align-items-center my-3 pb-3 border-bottom">
                  <Col sm="6">
                    <div className="icon-actions">
                      <a
                        className="like active"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="ni ni-like-2" />
                        <span className="text-muted">150</span>
                      </a>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <i className="ni ni-chat-round" />
                        <span className="text-muted">36</span>
                      </a>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <i className="ni ni-curved-next" />
                        <span className="text-muted">12</span>
                      </a>
                    </div>
                  </Col>
                  <Col className="d-none d-sm-block" sm="6">
                    <div className="d-flex align-items-center justify-content-sm-end">
                      <div className="avatar-group">
                        <a
                          className="avatar avatar-xs rounded-circle"
                          href="#pablo"
                          id="tooltip36177092"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={"https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"}
                          />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip36177092">
                          Jessica Rowland
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-xs rounded-circle"
                          href="#pablo"
                          id="tooltip857639221"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={"https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip857639221"
                        >
                          Audrey Love
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-xs rounded-circle"
                          href="#pablo"
                          id="tooltip260223080"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={"https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip260223080"
                        >
                          Michael Lewis
                        </UncontrolledTooltip>
                      </div>
                      <small className="pl-2 font-weight-bold">
                        and 30+ more
                      </small>
                    </div>
                  </Col>
                </Row>

                <div className="mb-1">
                  <Media className="media-comment">
                    <img
                      alt="..."
                      className="avatar avatar-lg media-comment-avatar rounded-circle"
                      src={"https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"}
                    />
                    <Media>
                      <div className="media-comment-text">
                        <h6 className="h5 mt-0">Michael Lewis</h6>
                        <p className="text-sm lh-160">
                          Cras sit amet nibh libero nulla vel metus scelerisque
                          ante sollicitudin. Cras purus odio vestibulum in
                          vulputate viverra turpis.
                        </p>
                        <div className="icon-actions">
                          <a
                            className="like active"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="ni ni-like-2" />
                            <span className="text-muted">3 likes</span>
                          </a>
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            <i className="ni ni-curved-next" />
                            <span className="text-muted">2 shares</span>
                          </a>
                        </div>
                      </div>
                    </Media>
                  </Media>
                  <Media className="media-comment">
                    <img
                      alt="..."
                      className="avatar avatar-lg media-comment-avatar rounded-circle"
                      src={"https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"}
                    />
                    <Media>
                      <div className="media-comment-text">
                        <h6 className="h5 mt-0">Jessica Stones</h6>
                        <p className="text-sm lh-160">
                          Cras sit amet nibh libero, in gravida nulla. Nulla vel
                          metus scelerisque ante sollicitudin. Cras purus odio,
                          vestibulum in vulputate at, tempus viverra turpis.
                        </p>
                        <div className="icon-actions">
                          <a
                            className="like active"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="ni ni-like-2" />
                            <span className="text-muted">10 likes</span>
                          </a>
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            <i className="ni ni-curved-next" />
                            <span className="text-muted">1 share</span>
                          </a>
                        </div>
                      </div>
                    </Media>
                  </Media>
                  <hr />
                  <Media className="align-items-center">
                    <img
                      alt="..."
                      className="avatar avatar-lg rounded-circle mr-4"
                      src={"https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"}
                    />
                    <Media body>
                      <Form>
                        <Input
                          placeholder="Write your comment"
                          rows="1"
                          type="textarea"
                        />
                      </Form>
                    </Media>
                  </Media>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="7">
            <Row>
              <div className="col">
                <Card>
                  <CardHeader className="border-0">
                    <h3 className="mb-0">Light table</h3>
                  </CardHeader>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th className="sort" data-sort="name" scope="col">
                          Project
                        </th>
                        <th className="sort" data-sort="budget" scope="col">
                          Budget
                        </th>
                        <th className="sort" data-sort="status" scope="col">
                          Status
                        </th>
                        <th scope="col">Users</th>
                        <th className="sort" data-sort="completion" scope="col">
                          Completion
                        </th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody className="list">
                      <tr>
                        <th scope="row">
                          <Media className="align-items-center">
                            <a
                              className="avatar rounded-circle mr-3"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <Media>
                              <span className="name mb-0 text-sm">
                                Argon Design System
                              </span>
                            </Media>
                          </Media>
                        </th>
                        <td className="budget">$2500 USD</td>
                        <td>
                          <Badge className="badge-dot mr-4" color="">
                            <i className="bg-warning" />
                            <span className="status">pending</span>
                          </Badge>
                        </td>
                        <td>
                          <div className="avatar-group">
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip792717700"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip792717700"
                            >
                              Ryan Tompson
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip654289872"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip654289872"
                            >
                              Romina Hadid
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip409131762"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip409131762"
                            >
                              Alexander Smith
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip50788433"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip50788433"
                            >
                              Jessica Doe
                            </UncontrolledTooltip>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="completion mr-2">60%</span>
                            <div>
                              <Progress max="100" value="60" color="warning" />
                            </div>
                          </div>
                        </td>
                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              color=""
                              size="sm"
                              className="btn-icon-only text-light"
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Another action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Something else here
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <Media className="align-items-center">
                            <a
                              className="avatar rounded-circle mr-3"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <Media>
                              <span className="name mb-0 text-sm">
                                Angular Now UI Kit PRO
                              </span>
                            </Media>
                          </Media>
                        </th>
                        <td className="budget">$1800 USD</td>
                        <td>
                          <Badge className="badge-dot mr-4" color="">
                            <i className="bg-success" />
                            <span className="status">completed</span>
                          </Badge>
                        </td>
                        <td>
                          <div className="avatar-group">
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip545726644"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip545726644"
                            >
                              Ryan Tompson
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip823332447"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip823332447"
                            >
                              Romina Hadid
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip354076640"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip354076640"
                            >
                              Alexander Smith
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip625572621"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip625572621"
                            >
                              Jessica Doe
                            </UncontrolledTooltip>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="completion mr-2">100%</span>
                            <div>
                              <Progress max="100" value="100" color="success" />
                            </div>
                          </div>
                        </td>
                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              color=""
                              size="sm"
                              className="btn-icon-only text-light"
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Another action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Something else here
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <Media className="align-items-center">
                            <a
                              className="avatar rounded-circle mr-3"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <Media>
                              <span className="name mb-0 text-sm">
                                Black Dashboard
                              </span>
                            </Media>
                          </Media>
                        </th>
                        <td className="budget">$3150 USD</td>
                        <td>
                          <Badge className="badge-dot mr-4" color="">
                            <i className="bg-danger" />
                            <span className="status">delayed</span>
                          </Badge>
                        </td>
                        <td>
                          <div className="avatar-group">
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip927457712"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip927457712"
                            >
                              Ryan Tompson
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip959509788"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip959509788"
                            >
                              Romina Hadid
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip239649821"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip239649821"
                            >
                              Alexander Smith
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip908443321"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip908443321"
                            >
                              Jessica Doe
                            </UncontrolledTooltip>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="completion mr-2">72%</span>
                            <div>
                              <Progress max="100" value="72" color="danger" />
                            </div>
                          </div>
                        </td>
                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              color=""
                              size="sm"
                              className="btn-icon-only text-light"
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Another action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Something else here
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <Media className="align-items-center">
                            <a
                              className="avatar rounded-circle mr-3"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <Media>
                              <span className="name mb-0 text-sm">
                                React Material Dashboard
                              </span>
                            </Media>
                          </Media>
                        </th>
                        <td className="budget">$4400 USD</td>
                        <td>
                          <Badge className="badge-dot mr-4" color="">
                            <i className="bg-info" />
                            <span className="status">on schedule</span>
                          </Badge>
                        </td>
                        <td>
                          <div className="avatar-group">
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip817843622"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip817843622"
                            >
                              Ryan Tompson
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip885824111"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip885824111"
                            >
                              Romina Hadid
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip426851535"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip426851535"
                            >
                              Alexander Smith
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip913358720"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip913358720"
                            >
                              Jessica Doe
                            </UncontrolledTooltip>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="completion mr-2">90%</span>
                            <div>
                              <Progress max="100" value="90" color="info" />
                            </div>
                          </div>
                        </td>
                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              color=""
                              size="sm"
                              className="btn-icon-only text-light"
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Another action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Something else here
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <Media className="align-items-center">
                            <a
                              className="avatar rounded-circle mr-3"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <Media>
                              <span className="name mb-0 text-sm">
                                Vue Paper UI Kit PRO
                              </span>
                            </Media>
                          </Media>
                        </th>
                        <td className="budget">$2200 USD</td>
                        <td>
                          <Badge className="badge-dot mr-4" color="">
                            <i className="bg-success" />
                            <span className="status">completed</span>
                          </Badge>
                        </td>
                        <td>
                          <div className="avatar-group">
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip460474820"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip460474820"
                            >
                              Ryan Tompson
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip979995688"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip979995688"
                            >
                              Romina Hadid
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip732882700"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip732882700"
                            >
                              Alexander Smith
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip242724387"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip242724387"
                            >
                              Jessica Doe
                            </UncontrolledTooltip>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="completion mr-2">100%</span>
                            <div>
                              <Progress max="100" value="100" color="success" />
                            </div>
                          </div>
                        </td>
                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              color=""
                              size="sm"
                              className="btn-icon-only text-light"
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Another action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Something else here
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <Media className="align-items-center">
                            <a
                              className="avatar rounded-circle mr-3"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <Media>
                              <span className="name mb-0 text-sm">
                                Argon Design System
                              </span>
                            </Media>
                          </Media>
                        </th>
                        <td className="budget">$2500 USD</td>
                        <td>
                          <Badge className="badge-dot mr-4" color="">
                            <i className="bg-warning" />
                            <span className="status">pending</span>
                          </Badge>
                        </td>
                        <td>
                          <div className="avatar-group">
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip318080952"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip318080952"
                            >
                              Ryan Tompson
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip221723068"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip221723068"
                            >
                              Romina Hadid
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip138748612"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip138748612"
                            >
                              Alexander Smith
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip431342349"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip431342349"
                            >
                              Jessica Doe
                            </UncontrolledTooltip>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="completion mr-2">60%</span>
                            <div>
                              <Progress max="100" value="60" color="warning" />
                            </div>
                          </div>
                        </td>
                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              color=""
                              size="sm"
                              className="btn-icon-only text-light"
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Another action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Something else here
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <Media className="align-items-center">
                            <a
                              className="avatar rounded-circle mr-3"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <Media>
                              <span className="name mb-0 text-sm">
                                Angular Now UI Kit PRO
                              </span>
                            </Media>
                          </Media>
                        </th>
                        <td className="budget">$1800 USD</td>
                        <td>
                          <Badge className="badge-dot mr-4" color="">
                            <i className="bg-success" />
                            <span className="status">completed</span>
                          </Badge>
                        </td>
                        <td>
                          <div className="avatar-group">
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip384464413"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip384464413"
                            >
                              Ryan Tompson
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip828512937"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip828512937"
                            >
                              Romina Hadid
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip409745485"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip409745485"
                            >
                              Alexander Smith
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip262162858"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip262162858"
                            >
                              Jessica Doe
                            </UncontrolledTooltip>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="completion mr-2">100%</span>
                            <div>
                              <Progress max="100" value="100" color="success" />
                            </div>
                          </div>
                        </td>
                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              color=""
                              size="sm"
                              className="btn-icon-only text-light"
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Another action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Something else here
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <Media className="align-items-center">
                            <a
                              className="avatar rounded-circle mr-3"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <Media>
                              <span className="name mb-0 text-sm">
                                Black Dashboard
                              </span>
                            </Media>
                          </Media>
                        </th>
                        <td className="budget">$3150 USD</td>
                        <td>
                          <Badge className="badge-dot mr-4" color="">
                            <i className="bg-danger" />
                            <span className="status">delayed</span>
                          </Badge>
                        </td>
                        <td>
                          <div className="avatar-group">
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip711925042"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip711925042"
                            >
                              Ryan Tompson
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip664693924"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip664693924"
                            >
                              Romina Hadid
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip582913491"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip582913491"
                            >
                              Alexander Smith
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip699784330"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip699784330"
                            >
                              Jessica Doe
                            </UncontrolledTooltip>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="completion mr-2">72%</span>
                            <div>
                              <Progress max="100" value="72" color="danger" />
                            </div>
                          </div>
                        </td>
                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              color=""
                              size="sm"
                              className="btn-icon-only text-light"
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Another action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Something else here
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <Media className="align-items-center">
                            <a
                              className="avatar rounded-circle mr-3"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <Media>
                              <span className="name mb-0 text-sm">
                                Angular Now UI Kit PRO
                              </span>
                            </Media>
                          </Media>
                        </th>
                        <td className="budget">$1800 USD</td>
                        <td>
                          <Badge className="badge-dot mr-4" color="">
                            <i className="bg-success" />
                            <span className="status">completed</span>
                          </Badge>
                        </td>
                        <td>
                          <div className="avatar-group">
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip912421317"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip912421317"
                            >
                              Ryan Tompson
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip912012329"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip912012329"
                            >
                              Romina Hadid
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip366509724"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip366509724"
                            >
                              Alexander Smith
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip569311457"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  "https://img.freepik.com/free-photo/eyes-full-joy-american-spaniel-puppy-cute-groomed-fluffy-doggy-pet-is-sitting-isolated-yellow-background-studio-photoshot-negative-space-insert-your-text-image_155003-34612.jpg?w=2000"
                                }
                              />
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip569311457"
                            >
                              Jessica Doe
                            </UncontrolledTooltip>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="completion mr-2">100%</span>
                            <div>
                              <Progress max="100" value="100" color="success" />
                            </div>
                          </div>
                        </td>
                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              color=""
                              size="sm"
                              className="btn-icon-only text-light"
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Another action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Something else here
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Card>
              </div>
            </Row>
            <div className="card-deck">
              <Card className="bg-gradient-default">
                <CardBody>
                  <div className="mb-2">
                    <sup className="text-white">$</sup>{" "}
                    <span className="h2 text-white">3,300</span>
                    <div className="text-light mt-2 text-sm">
                      Your current balance
                    </div>
                    <div>
                      <span className="text-success font-weight-600">
                        + 15%
                      </span>{" "}
                      <span className="text-light">($250)</span>
                    </div>
                  </div>
                  <Button
                    block
                    className="btn-neutral"
                    color=""
                    size="sm"
                  >
                    Add credit
                  </Button>
                </CardBody>
                <CardBody>
                  <Row>
                    <div className="col">
                      <small className="text-light">Orders: 60%</small>
                      <Progress
                        className="progress-xs my-2"
                        max="100"
                        value="60"
                        color="success"
                      />
                    </div>
                    <div className="col">
                      <small className="text-light">Sales: 40%</small>
                      <Progress
                        className="progress-xs my-2"
                        max="100"
                        value="40"
                        color="warning"
                      />
                    </div>
                  </Row>
                </CardBody>
              </Card>
              <Card className="bg-gradient-danger">
                <CardBody>
                  <Row className="justify-content-between align-items-center">
                    <div className="col">
                      <img
                        style={{width:50}}
                        alt="..."
                        src={
                          "https://play-lh.googleusercontent.com/_fUkrB-1WZFUHj8YiExLupujkqH3ppV7vBMyCXav_aIwg56L0QEFSuQHgWmvM4m2Qe0"
                        }
                      />
                    </div>
                    <Col className="col-auto">
                      <Badge className="badge-lg" color="success">
                        Active
                      </Badge>
                    </Col>
                  </Row>
                  <div className="my-4">
                    <span className="h6 surtitle text-light">Username</span>
                    <div className="h1 text-white">@johnsnow</div>
                  </div>
                  <Row>
                    <div className="col">
                      <span className="h6 surtitle text-light">Name</span>
                      <span className="d-block h3 text-white">John Snow</span>
                    </div>
                  </Row>
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xl="8">
            <Card>
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Page visits</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Page name</th>
                    <th scope="col">Visitors</th>
                    <th scope="col">Unique users</th>
                    <th scope="col">Bounce rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">/argon/</th>
                    <td>4,569</td>
                    <td>340</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" />
                      46,53%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/index.html</th>
                    <td>3,985</td>
                    <td>319</td>
                    <td>
                      <i className="fas fa-arrow-down text-warning mr-3" />
                      46,53%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/charts.html</th>
                    <td>3,513</td>
                    <td>294</td>
                    <td>
                      <i className="fas fa-arrow-down text-warning mr-3" />
                      36,49%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/tables.html</th>
                    <td>2,050</td>
                    <td>147</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" />
                      50,87%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/profile.html</th>
                    <td>1,795</td>
                    <td>190</td>
                    <td>
                      <i className="fas fa-arrow-down text-danger mr-3" />
                      46,53%
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col xl="4">
            <Card>
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Social traffic</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Referral</th>
                    <th scope="col">Visitors</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>1,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">60%</span>
                        <div>
                          <Progress
                            max="100"
                            value="60"
                            color="gradient-danger"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>5,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">70%</span>
                        <div>
                          <Progress
                            max="100"
                            value="70"
                            color="gradient-success"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Google</th>
                    <td>4,807</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">80%</span>
                        <div>
                          <Progress
                            max="100"
                            value="80"
                            clor="gradient-primary"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Instagram</th>
                    <td>3,678</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">75%</span>
                        <div>
                          <Progress
                            max="100"
                            value="75"
                            color="gradient-info"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">twitter</th>
                    <td>2,645</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">30%</span>
                        <div>
                          <Progress
                            max="100"
                            value="30"
                            color="gradient-warning"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row> */}
      </Container>
    </>
  );
}

export default Dashboard;
