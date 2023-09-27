import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Select from "react-select";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  Row,
  Spinner,
  TabContent,
  Table,
  TabPane,
  UncontrolledDropdown,
} from "reactstrap";
import {
  getListMenuByMenuId,
  getListMenuByMode,
} from "../../../apis/menuApiService";
import SimpleHeader from "../../../components/Headers/SimpleHeader";
import { MenuUpdateModal } from "../../../components/Modals/menuUpdateModal";
import { notify } from "../../../components/Toast/ToastCustom";
import { AppContext } from "../../../context/AppProvider";
import { MenuItem } from "./MenuItem";
import Lottie from "react-lottie";
import animationData from "../../../assets/loading.json";
import { RemoveProductFromMenuModal } from "../../../components/Modals/removeProductFromMenuModal";
// import Empty from "../../../../public/icons/empty.svg";
export const Menus = () => {
  const [hTabsIcons, setHTabsIcons] = React.useState("");
  const { mode, setMode, menu, setMenu, setOpenModal } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  const [menuList, setMenuList] = useState([]);
  const [menuActive, setMenuActive] = useState("");
  const [productMenuList, setProductMenuList] = useState([]);
  let history = useHistory();

  const optionsCategory = menuList.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    getListMenuByMode(mode)
      .then((res) => {
        const menus = res.data;
        setMenuList(menus);
        if (menus && menus.length > 0) {
          setHTabsIcons(menu.toString());
          handleChangeMenu(menu.toString());
          setMenu(menu.toString());
        } else {
          setIsLoading(false);
          setMenuList([]);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setMenuList([]);
        notify("Đã xảy ra lỗi gì đó!!", "Error");
      });
    return () => {};
  }, []);

  const customStylesPayment = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "#dee2e6",
      minHeight: "30px",
      height: "46px",
      width: "300px",
      boxShadow: state.isFocused ? null : null,
      borderRadius: "0.5rem",
    }),

    input: (provided, state) => ({
      ...provided,
      margin: "5px",
    }),
  };

  const handleChangeMode = (mode) => {
    setMenuList([]);
    setMode(mode);
    // setIsLoading(true);
    getListMenuByMode(mode)
      .then((res) => {
        const menus = res.data;
        setMenuActive({
          label: menus[0].name,
          value: menus[0].id,
        });
        setMenuList(menus);
        if (menus && menus.length > 0) {
          setHTabsIcons(menus[0].id);
          handleChangeMenu(menus[0].id);
        } else {
          setIsLoading(false);
          setMenuList([]);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        notify("Đã xảy ra lỗi gì đó!!", "Error");
        setMenuList([]);
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 1);
  };

  const handleChangeMenu = (menu) => {
    setMenu(menu);
    setProductMenuList([]);
    setIsLoading(true);
    setHTabsIcons(menu);
    getListMenuByMenuId(menu, 1, 100)
      .then((res) => {
        setTimeout(() => {
          let productMenus = res.data;

          setProductMenuList(productMenus);
          setIsLoading(false);
        }, 300);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        notify("Đã xảy ra lỗi gì đó!!", "Error");
        setProductMenuList([]);
      });
  };

  const handleReload = () => {
    handleChangeMenu(menu);
    getListMenuByMode(mode).then((res) => {
      const menus = res.data;
      setMenuList(menus);
    });
  };

  const convertTime = (time) => {
    return time.toFixed(2).toString().replace(".", ":");
  };

  return (
    <>
      <MenuUpdateModal handleReload={handleReload} />
      <RemoveProductFromMenuModal handleReload={handleReload} />
      <SimpleHeader name="Danh Sách Thực Đơn" parentName="Quản Lý" />
      <Container className="mt--6" fluid>
        {/* MODE */}
        <Row>
          {/* MODE 1 */}
          <Col md="6" xl="4">
            <Card
              className={`card-stats menu ${mode === 1 ? "menu-active" : ""}`}
              onClick={() => handleChangeMode(1)}
            >
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-0"
                    >
                      15 - 30 phút
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">Gọi Món</span>
                  </div>
                  <Col className="col-auto">
                    <div
                      className="  text-white rounded-circle center_flex"
                      style={{
                        width: 70,
                        height: 70,
                        border: "5px solid #fff",
                      }}
                    >
                      <img
                        style={{ width: 60, height: 60 }}
                        src="/images/breakfast.png"
                        alt=""
                      ></img>
                    </div>
                  </Col>
                </Row>
                <p className="mt-1 mb-0 text-sm">
                  <span className="text-nowrap" style={{ fontSize: "1rem" }}>
                    Sản phẩm giao ngay
                  </span>
                </p>
              </CardBody>
            </Card>
          </Col>

          {/* MODE 2 */}
          <Col md="6" xl="4">
            <Card
              className={`card-stats menu ${mode === 2 ? "menu-active" : ""}`}
              onClick={() => handleChangeMode(2)}
            >
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-0"
                    >
                      Giao hàng trong ngày
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">Giao hàng</span>
                  </div>
                  <Col className="col-auto">
                    <div
                      className="  text-white rounded-circle center_flex"
                      style={{
                        width: 70,
                        height: 70,
                        border: "5px solid #fff",
                      }}
                    >
                      <img
                        style={{ width: 60, height: 60 }}
                        src="/images/dicho-active.png"
                        alt=""
                      />
                    </div>
                  </Col>
                </Row>
                <p className="mt-1 mb-0 text-sm">
                  <span className="text-nowrap" style={{ fontSize: "1rem" }}>
                    Sản phẩm có sẵn trong ngày
                  </span>
                </p>
              </CardBody>
            </Card>
          </Col>

          {/* MODE 3 */}
          {/* <Col md="6" xl="4">
            <Card
              className={`card-stats menu ${mode === 3 ? "menu-active" : ""}`}
              onClick={() => handleChangeMode(3)}
            >
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-0"
                    >
                      3 - 5 ngày
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">Đặt Hàng</span>
                  </div>
                  <Col className="col-auto">
                    <div
                      className="  text-white rounded-circle center_flex"
                      style={{
                        width: 70,
                        height: 70,
                        border: "5px solid #fff",
                        backgroundColor: "#fff",
                      }}
                    >
                      <img
                        style={{ width: 60, height: 60, borderRadius: 50 }}
                        src="/images/giaohang.png"
                        alt=""
                      />
                    </div>
                  </Col>
                </Row>
                <p className="mt-1 mb-0 text-sm">
                  <span className="text-nowrap" style={{ fontSize: "1rem" }}>
                    Sản phẩm đặt trước
                  </span>
                </p>
              </CardBody>
            </Card>
          </Col> */}
        </Row>

        {/* MENU */}
        <Row>
          <Col md="6" xl="12">
            <Card className="card-stats">
              <CardBody style={{}}>
                {/* LIST MENU TAB */}
                <div
                  className="nav-wrapper"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {mode !== 3 ? (
                    <Nav
                      className="nav-fill flex-column flex-md-row"
                      pills
                      role="tablist"
                      style={{ flex: 1, gap: 15 }}
                    >
                      {menuList.length > 0 &&
                        menuList.map((item) => {
                          return (
                            <NavItem
                              style={{
                                flex: "none",
                                padding: 0,
                                zIndex: "10",
                              }}
                              key={item.id}
                            >
                              <NavLink
                                className={
                                  "mb-sm-3 mb-md-0 " +
                                  (hTabsIcons === item.id ? "active" : "")
                                }
                                href="#pablo"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (hTabsIcons !== item.id) {
                                    handleChangeMenu(item.id);
                                    convertTime(item.endTime);
                                  }
                                }}
                                style={{
                                  padding: "0px",
                                  color: "white",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 10,
                                  background:
                                    item.status === "Inactive" && "#E9E9E9",
                                  opacity: item.status === "Inactive" && "0.7",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    position: "relative",
                                  }}
                                >
                                  <span
                                    style={{
                                      color:
                                        item.status === "Inactive" && "#979797",
                                    }}
                                  >
                                    {item.name}
                                  </span>
                                  <span
                                    style={{
                                      fontSize: 14,
                                      fontWeight: 500,
                                      color:
                                        item.status === "Inactive" && "#979797",
                                    }}
                                  >
                                    {"(" +
                                      convertTime(item.startTime) +
                                      " - " +
                                      convertTime(item.endTime) +
                                      ")"}
                                  </span>
                                </div>
                                {hTabsIcons === item.id && (
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      size="sm"
                                      className="mr-0"
                                      style={{
                                        background: "var(--primary)",
                                        border: "none",
                                        boxShadow: "none",
                                        color: "#fff",
                                      }}
                                    >
                                      <i
                                        class="fa-solid fa-ellipsis-vertical"
                                        style={{ fontSize: 18 }}
                                      ></i>
                                    </DropdownToggle>
                                    <DropdownMenu left>
                                      <DropdownItem
                                        href="#pablo"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setOpenModal(true);
                                        }}
                                      >
                                        Chỉnh sửa
                                      </DropdownItem>
                                      {/* <DropdownItem
                                        href="#pablo"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          // setStoreCategoryModal(item);
                                        }}
                                      >
                                        Xóa
                                      </DropdownItem> */}
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                )}
                              </NavLink>
                            </NavItem>
                          );
                        })}
                    </Nav>
                  ) : (
                    <Select
                      options={optionsCategory}
                      placeholder="Ngày"
                      styles={customStylesPayment}
                      value={menuActive}
                      onChange={(e) => {
                        setMenuActive(e);
                        handleChangeMenu(e.value);
                      }}
                    />
                  )}

                  {/* WRITER SECTION */}
                  <div>
                    {/* <Button
                      onClick={() => {
                        // setOpenModal(true);
                        // setModeModal(mode);
                        setOpenModal(true);
                      }}
                      className=""
                      color=""
                      size="lg"
                      style={{
                        border: "1px solid var(--primary)",
                        marginRight: 10,
                        borderRadius: "0.5rem",
                        background: "#fff",
                        color: "var(--primary)",
                        fontWeight: 700,
                        width: 200,
                        fontSize: 16,
                        height: 49,
                      }}
                    >
                      <i class="fa-solid fa-pen-to-square"></i> Chỉnh sửa
                    </Button> */}
                    <Button
                      onClick={() => {
                        // setOpenModal(true);
                        // setModeModal(mode);
                        history.push("/admin/menu");
                      }}
                      className="btn-neutral"
                      color="default"
                      size="lg"
                      style={{
                        background: "var(--primary)",
                        color: "#fff",
                        fontWeight: 700,
                        width: 200,
                        fontSize: 16,
                        height: 49,
                      }}
                    >
                      + Thêm thực đơn
                    </Button>
                  </div>
                </div>
                {/* <div style={{ display: 'flex', margin: '15px 0' }}>
                  <Select
                    options={optionsCategory}
                    placeholder="Tòa nhà"
                    styles={customStylesPayment}
                    onChange={(e) => {
                      // setBuilding(e);
                    }}
                  />
                </div> */}

                {/* LIST PRODUCT SECTION */}
                <div>
                  <TabContent id="myTabContent" activeTab={hTabsIcons}>
                    <div style={{}}>
                      {/* {!isLoading &&
                                                productMenuList.map((item) => {
                                                    if (item && item.listProducts && item.listProducts.length > 0) {
                                                        return (
                                                            <div key={item.id} style={{ marginTop: 20 }}>
                                                                <h2>{item.name}</h2>
                                                                <Row xl={6}>
                                                                    {item.listProducts.length > 0 &&
                                                                        item.listProducts.map((pro, index) => (
                                                                            <Col style={{}} key={index}>
                                                                                <div
                                                                                    className=" hover-card"
                                                                                    style={{
                                                                                        display: "flex",
                                                                                        borderRadius: "0.5rem",
                                                                                        position: "relative",
                                                                                        flexDirection: "column",
                                                                                        justifyContent: "center",
                                                                                        alignItems: "center",
                                                                                    }}
                                                                                >
                                                                                    <div
                                                                                        style={{
                                                                                            display: "flex",
                                                                                            alignItems: "center",
                                                                                            justifyContent: "center",
                                                                                            width: "120px",
                                                                                            height: "120px",
                                                                                            paddingTop: 10,
                                                                                        }}
                                                                                    >
                                                                                        <img
                                                                                            style={{ width: "100%", height: "100%", objectFit: "cover", padding: "0", borderRadius: "10px" }}
                                                                                            className="description "
                                                                                            src={pro.image || NOT_FOUND_IMG}
                                                                                            alt=""
                                                                                        ></img>
                                                                                    </div>
                                                                                    <div className="center_flex" style={{ display: "flex", flexDirection: "column" }}>
                                                                                        <span style={{ fontSize: 15, fontWeight: 500, lineHeight: 1, color: "#000", textAlign: "center" }}>
                                                                                            {pro.name}
                                                                                        </span>
                                                                                        <span style={{ fontSize: 14, fontWeight: 700, lineHeight: 2, color: "var(--primary)" }}>
                                                                                            {pro.pricePerPack / 1000 + ".000"}đ
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </Col>
                                                                        ))}
                                                                </Row>
                                                            </div>
                                                        );
                                                    }
                                                })} */}

                      <Table
                        className="align-items-center table-flush"
                        responsive
                        hover={true}
                        style={{ position: "relative" }}
                      >
                        <div
                          className={`loading-spin ${
                            !isLoading && "loading-spin-done"
                          }`}
                        ></div>
                        <thead className="thead-light">
                          <tr>
                            <th className="sort table-title" scope="col">
                              STT
                            </th>
                            <th
                              className="sort table-title"
                              scope="col"
                              align="left"
                            >
                              Hình ảnh
                            </th>

                            <th
                              className="sort table-title"
                              scope="col"
                              align="left"
                            >
                              Tên sản phẩm
                            </th>

                            {/* <th className="sort table-title" scope="col">
                                                            Mã sản phẩm
                                                        </th> */}

                            <th
                              className="sort table-title"
                              scope="col"
                              align="left"
                            >
                              Tên cửa hàng
                            </th>
                            <th
                              className="sort table-title"
                              scope="col"
                              align="left"
                            >
                              Danh mục
                            </th>
                            <th
                              className="sort table-title"
                              scope="col"
                              align="right"
                            >
                              {`Giá (VND)`}
                            </th>
                            <th
                              className="sort table-title"
                              scope="col"
                              align="left"
                            >
                              Trạng thái
                            </th>
                            <th className="sort table-title" scope="col">
                              Hành động
                            </th>
                          </tr>
                        </thead>
                        {!isLoading && productMenuList.length > 0 && (
                          <tbody className="list">
                            {productMenuList.map((item, index) => {
                              return (
                                <MenuItem
                                  data={item}
                                  key={index}
                                  index={index}
                                />
                              );
                            })}
                          </tbody>
                        )}
                      </Table>

                      {!isLoading && productMenuList.length === 0 ? (
                        <TabPane
                          tabId="hTabsIcons-2"
                          role="tabpanel"
                          className=""
                        >
                          <div
                            className="center_flex"
                            style={{ padding: "40px 0 0 0" }}
                          >
                            <img
                              src="/icons/empty.png"
                              alt=""
                              style={{ textAlign: "center", width: 230 }}
                            />
                          </div>
                          <h1
                            className="description"
                            style={{
                              fontSize: 20,
                              textAlign: "center",
                              padding: "20px 0 0 0",
                            }}
                          >
                            Không có sản phẩm nào
                          </h1>
                        </TabPane>
                      ) : (
                        ""
                      )}
                      {isLoading && (
                        <CardBody className="loading-wrapper center_flex">
                          <Lottie
                            options={defaultOptions}
                            height={400}
                            width={400}
                          />
                        </CardBody>
                      )}
                    </div>
                    {/* <TabPane tabId="hTabsIcons-2" role="tabpanel" className="">
                                            <div className="center_flex" style={{ padding: "50px 0 0 0" }}>
                                                <img src="/icons/empty.png" alt="" style={{ textAlign: "center", width: 250 }} />
                                            </div>
                                            <h1 className="description" style={{ fontSize: 20, textAlign: "center", padding: "20px 0 0 0" }}>
                                                Không có sản phẩm nào
                                            </h1>
                                            <p className="description" style={{ fontSize: 17, textAlign: "center", padding: "0px 0 50px 0" }}>
                                                Vui lòng thêm sản phẩm vào thực đon
                                            </p>
                                        </TabPane>
                                        <TabPane tabId="hTabsIcons-3" role="tabpanel">
                                            <div className="center_flex" style={{ padding: "50px 0 0 0" }}>
                                                <img src="/icons/empty.png" alt="" style={{ textAlign: "center", width: 250 }} />
                                            </div>
                                            <h1 className="description" style={{ fontSize: 20, textAlign: "center", padding: "20px 0 0 0" }}>
                                                Không có sản phẩm nào
                                            </h1>
                                            <p className="description" style={{ fontSize: 17, textAlign: "center", padding: "0px 0 50px 0" }}>
                                                Vui lòng thêm sản phẩm vào thực đon
                                            </p>
                                        </TabPane>
                                        <TabPane tabId="hTabsIcons-4" role="tabpanel">
                                            <div className="center_flex" style={{ padding: "50px 0 0 0" }}>
                                                <img src="/icons/empty.png" alt="" style={{ textAlign: "center", width: 250 }} />
                                            </div>
                                            <h1 className="description" style={{ fontSize: 20, textAlign: "center", padding: "20px 0 0 0" }}>
                                                Không có sản phẩm nào
                                            </h1>
                                            <p className="description" style={{ fontSize: 17, textAlign: "center", padding: "0px 0 50px 0" }}>
                                                Vui lòng thêm sản phẩm vào thực đon
                                            </p>
                                        </TabPane> */}
                  </TabContent>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
