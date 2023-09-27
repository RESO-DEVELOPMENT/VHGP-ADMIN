import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Select from "react-select";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Modal,
  Row,
  Spinner,
} from "reactstrap";
import { putCategory, putStoreCategory } from "../../apis/categoryApiService";
import { AppContext } from "../../context/AppProvider";
import ImageUploading from "react-images-uploading";
import { notify } from "../Toast/ToastCustom";
import { getBase64Image } from "../../constants";
import { getMenuDetail, putMenu } from "../../apis/menuApiService";
import makeAnimated from "react-select/animated";

export const MenuUpdateModal = ({ handleReload }) => {
  const { openModal, setOpenModal, categoryList, menu, mode, areaList } =
    useContext(AppContext);
  const [menuName, setMenuName] = useState("");
  const [menuNameState, setMenuNameState] = useState("");
  const [dayFilter, setDayFilter] = useState("");
  const [Mode, setMode] = useState("");
  const [ModeState, setModeState] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [openTimeState, setOpenTimeState] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [closeTimeState, setCloseTimeState] = useState("");
  const [shipCost, setShipCost] = useState(0);
  const [shipCostState, setShipCostState] = useState("");
  const [status, setStatus] = useState("");
  const [statusState, setStatusState] = useState("");
  const [Category, setCategory] = useState("");
  const [CategoryState, setCategoryState] = useState("");
  const [priorityState, setPriorityState] = useState("");
  const [priority, setPriority] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCircle, setIsLoadingCircle] = useState(false);

  const [area, setArea] = useState("");
  const [areaState, setAreaState] = useState("");

  let history = useHistory();
  const maxNumber = 69;
  const animatedComponents = makeAnimated();

  const handleStatus = (e) => {
    const convertStatus = e === "Active" ? "Hoạt động" : "Ngưng hoạt động";
    setStatus(convertStatus);
  };

  useEffect(() => {
    if (openModal) {
      setIsLoading(true);
      getMenuDetail(menu)
        .then((res) => {
          console.log(res);
          if (res.data) {
            let menu = res.data;
            setOpenTime(menu.startHour);
            setCloseTime(menu.endHour);
            setMenuName(menu.name);
            setDayFilter(menu.dayFilter);
            setShipCost(menu.shipCost);
            setPriority(menu.priority ? menu.priority : 0);
            handleStatus(menu.status);
            setMode({
              label: getModeName(mode),
              value: mode,
            });

            let categoryListFromApi = categoryList
              .filter((item) => {
                return menu.listCategory.indexOf(item.id) !== -1;
              })
              .map((value) => {
                return { value: value.id, label: value.name };
              });
            setCategory(categoryListFromApi);

            let areaListFromApi = areaList
              .filter((item) => {
                return menu.listAreaId.indexOf(item.id) !== -1;
              })
              .map((value) => {
                return { value: value.id, label: value.name };
              });
            setArea(areaListFromApi);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          setIsLoadingCircle(false);
          notify("Đã xảy ra lỗi gì đó!!", "Error");
        });
    }

    // setMenuName(menuModal.name);
    // setCloseTime(menuModal.endTime);
    // setOpenTime(menuModal.startTime);
    // setMode({ label: getModeName(menuModal.mode), value: menuModal.mode });
  }, [menu, openModal]);

  const handleUpdate = () => {
    setIsLoadingCircle(true);
    let newCate = Category.map((item) => {
      return item.value;
    });
    let newArea = area.map((item) => {
      return item.value;
    });
    const convertStatus = status === "Hoạt động" ? "Active" : "Inactive";
    let menuUpdate = {
      image: null,
      name: menuName,
      startDate: null,
      endDate: null,
      dayFilter: dayFilter,
      hourFilter: null,
      startHour: parseFloat(openTime),
      endHour: parseFloat(closeTime),
      modeId: mode.toString(),
      shipCost: shipCost,
      priority: priority,
      status: convertStatus,
      listCategory: newCate,
      listAreaId: newArea,
    };

    putMenu(menuUpdate, menu)
      .then((res) => {
        if (res.data) {
          notify("Cập nhật thành công", "Success");
          handleReload();
          setOpenModal(false);
          setIsLoading(false);
          setIsLoadingCircle(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setIsLoadingCircle(false);
        notify("Đã xảy ra lỗi gì đó!!", "Error");
      });
  };

  const getModeName = (mode) => {
    switch (mode) {
      case "1":
        return "Gọi Món";
      case "2":
        return "Giao Hàng";
      case "3":
        return "Đặt Hàng";

      default:
        return "Gọi Món";
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "#dee2e6",
      minHeight: "30px",
      height: "46px",
      // width: "200px",
      boxShadow: state.isFocused ? null : null,
      borderRadius: "0.5rem",
    }),

    input: (provided, state) => ({
      ...provided,
      margin: "5px",
    }),
  };

  const optionsMode = ["1", "2", "3"].map((item) => {
    return {
      label: getModeName(item),
      value: item,
    };
  });

  const optionsCategory = categoryList.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  const optionsArea = areaList.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  const optionsStatus = [
    { label: "Hoạt động", value: "Active" },
    { label: "Ngưng hoạt động", value: "Inactive" },
  ];

  return (
    <>
      <Row>
        <Col md="4">
          <Modal
            className="modal-dialog-centered"
            size="lg"
            isOpen={openModal}
            toggle={() => {
              setOpenModal(false);
            }}
          >
            <div className="modal-body p-0">
              <Card className="bg-secondary border-0 mb-0">
                <CardBody className="" style={{ paddingTop: 0 }}>
                  <Container className="" fluid style={{ padding: "0 0px" }}>
                    <Row>
                      <div className="col-lg-12 modal-product">
                        <Card>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                              padding: "10px 0px",
                            }}
                            className="align-items-center"
                          >
                            <CardHeader
                              className="border-0"
                              style={{ padding: "15px" }}
                            >
                              <h2 className="mb-0">Thông tin thực đơn </h2>
                            </CardHeader>
                          </div>
                          <div className="col-md-12">
                            <form>
                              <div className="row">
                                {/* MENU NAME */}
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label className="form-control-label">
                                      Tên thực đơn{" "}
                                      <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <Input
                                      valid={menuNameState === "valid"}
                                      invalid={menuNameState === "invalid"}
                                      className="form-control"
                                      type="search"
                                      id="example-search-input"
                                      value={`${menuName}`}
                                      onChange={(e) => {
                                        setMenuName(e.target.value);
                                      }}
                                    />
                                    <div className="invalid-feedback">
                                      Tên cửa hàng không được để trống
                                    </div>
                                  </div>
                                </div>

                                {/* MODE */}
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label className="form-control-label">
                                      Loại thực đơn{" "}
                                      <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <div
                                      className={`${
                                        ModeState === "invalid" &&
                                        "error-select"
                                      }`}
                                    >
                                      <Select
                                        options={optionsMode}
                                        placeholder="Loại thực đơn"
                                        styles={customStyles}
                                        value={Mode}
                                        isDisabled
                                        onChange={(e) => {
                                          setMode(e);
                                        }}
                                      />
                                    </div>
                                    {ModeState === "invalid" && (
                                      <div
                                        className="invalid"
                                        style={{
                                          fontSize: "80%",
                                          color: "#fb6340",
                                          marginTop: "0.25rem",
                                        }}
                                      >
                                        Loại thực đơn không được để trống
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* START TIME */}
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <label className="form-control-label">
                                      Giờ bắt đầu{" "}
                                      <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <Input
                                      min={0}
                                      max={24}
                                      valid={openTimeState === "valid"}
                                      invalid={openTimeState === "invalid"}
                                      className="form-control"
                                      type="number"
                                      id="example-search-input"
                                      value={`${openTime}`}
                                      onChange={(e) => {
                                        setOpenTime(e.target.value);
                                      }}
                                    />
                                    <div className="invalid-feedback">
                                      Giờ bắt đầu không được để trống
                                    </div>
                                  </div>
                                </div>

                                {/* END TIME */}
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <label className="form-control-label">
                                      Giờ kết thúc{" "}
                                      <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <Input
                                      min={0}
                                      max={24}
                                      valid={closeTimeState === "valid"}
                                      invalid={closeTimeState === "invalid"}
                                      className="form-control"
                                      type="number"
                                      id="example-search-input"
                                      value={`${closeTime}`}
                                      onChange={(e) => {
                                        setCloseTime(e.target.value);
                                      }}
                                    />
                                    <div className="invalid-feedback">
                                      Giờ kết thúc không được để trống
                                    </div>
                                  </div>
                                </div>

                                {/* PRIORITY */}
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <label className="form-control-label">
                                      Độ ưu tiên{" "}
                                      <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <Input
                                      valid={priorityState === "valid"}
                                      invalid={priorityState === "invalid"}
                                      className="form-control"
                                      type="number"
                                      id="example-search-input"
                                      value={`${priority}`}
                                      onChange={(e) => {
                                        setPriority(e.target.value);
                                      }}
                                    />
                                    <div className="invalid-feedback">
                                      Độ ưu tiên không được để trống
                                    </div>
                                  </div>
                                </div>

                                {/* SHIP COST */}
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <label className="form-control-label">
                                      Phí ship{" "}
                                      <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <Input
                                      min={0}
                                      max={100000}
                                      valid={shipCostState === "valid"}
                                      invalid={shipCostState === "invalid"}
                                      className="form-control"
                                      type="number"
                                      id="example-search-input"
                                      value={`${shipCost}`}
                                      onChange={(e) => {
                                        setShipCost(e.target.value);
                                      }}
                                    />
                                    <div className="invalid-feedback">
                                      Độ ưu tiên không được để trống
                                    </div>
                                  </div>
                                </div>

                                {/* STATUS */}
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <label className="form-control-label">
                                      Trạng thái{" "}
                                      <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <Select
                                      options={optionsStatus}
                                      placeholder={status}
                                      // styles={customStylesCategory}
                                      value={status}
                                      closeMenuOnSelect={true}
                                      onChange={(e) => {
                                        setStatus(e.label);
                                      }}
                                    />

                                    <div className="invalid-feedback">
                                      Độ ưu tiên không được để trống
                                    </div>
                                  </div>
                                </div>

                                {/* CATEGORIES */}
                                <div className="col-md-12">
                                  <div className="form-group">
                                    <label className="form-control-label">
                                      Danh mục{" "}
                                      <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <div
                                      className={`${
                                        CategoryState === "invalid" &&
                                        "error-select"
                                      }`}
                                    >
                                      <Select
                                        // components={animatedComponents}
                                        options={optionsCategory}
                                        isMulti
                                        placeholder="Danh mục"
                                        // styles={customStylesCategory}
                                        value={Category}
                                        closeMenuOnSelect={false}
                                        onChange={(e) => {
                                          setCategory(e);
                                        }}
                                      />
                                    </div>
                                    {CategoryState === "invalid" && (
                                      <div
                                        className="invalid"
                                        style={{
                                          fontSize: "80%",
                                          color: "#fb6340",
                                          marginTop: "0.25rem",
                                        }}
                                      >
                                        Danh mục không được để trống
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* AREAS */}
                                <div className="col-md-12">
                                  <div className="form-group">
                                    <label className="form-control-label">
                                      Khu vực{" "}
                                      <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <div
                                      className={`${
                                        areaState === "invalid" &&
                                        "error-select"
                                      }`}
                                    >
                                      <Select
                                        // components={animatedComponents}
                                        options={optionsArea}
                                        isMulti
                                        placeholder="Khu vực"
                                        // styles={customStylesCategory}
                                        value={area}
                                        closeMenuOnSelect={false}
                                        onChange={(e) => {
                                          setArea(e);
                                        }}
                                      />
                                    </div>
                                    {areaState === "invalid" && (
                                      <div
                                        className="invalid"
                                        style={{
                                          fontSize: "80%",
                                          color: "#fb6340",
                                          marginTop: "0.25rem",
                                        }}
                                      >
                                        Khu vực không được để trống
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </Card>
                      </div>
                    </Row>
                    <Col className="text-md-right mb-3" lg="12" xs="5">
                      <Button
                        onClick={() => {
                          setOpenModal(false);
                        }}
                        // className="btn-neutral"
                        color="default"
                        size="lg"
                        style={{
                          background: "#fff",
                          color: "#000",
                          padding: "0.875rem 2rem",
                          border: "none",
                        }}
                      >
                        <div className="flex" style={{ alignItems: "center" }}>
                          <i
                            className="fa-solid fa-backward"
                            style={{ fontSize: 18 }}
                          ></i>
                          <span>Đóng</span>
                        </div>
                      </Button>
                      <Button
                        onClick={() => {
                          handleUpdate();
                        }}
                        className="btn-neutral"
                        disabled={isLoadingCircle}
                        color="default"
                        size="lg"
                        style={{
                          background: "var(--primary)",
                          color: "#000",
                          padding: "0.875rem 2rem",
                        }}
                      >
                        <div
                          className="flex"
                          style={{
                            alignItems: "center",
                            width: 101,
                            justifyContent: "center",
                          }}
                        >
                          {isLoadingCircle ? (
                            <Spinner
                              style={{
                                color: "#fff",
                                width: "1.31rem",
                                height: "1.31rem",
                              }}
                            >
                              Loading...
                            </Spinner>
                          ) : (
                            <>
                              <i
                                className="fa-solid fa-square-plus"
                                style={{ fontSize: 18, color: "#fff" }}
                              ></i>
                              <span style={{ color: "#fff" }}>Chỉnh Sửa</span>
                            </>
                          )}
                        </div>
                      </Button>
                    </Col>
                  </Container>
                </CardBody>
              </Card>
            </div>
          </Modal>
        </Col>
      </Row>
    </>
  );
};
