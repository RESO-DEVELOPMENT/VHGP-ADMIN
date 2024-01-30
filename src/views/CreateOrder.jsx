import {
  Button,
  Card,
  CardHeader,
  Col,
  Container,
  Input,
  Row,
  Spinner,
} from "reactstrap";
import SimpleHeader from "../components/Headers/SimpleHeader";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { notify } from "../components/Toast/ToastCustom";
import { postMenu } from "../apis/menuApiService";
import Select from "react-select";
import { createOrder } from "../apis/orderApiService";

const CreateOrder = () => {
  const { buildingList, storeList } = useContext(AppContext);

  const [store, setStore] = useState("");
  const [storeState, setStoreState] = useState("");
  const [building, setBuilding] = useState("");
  const [buildingState, setBuildingState] = useState("");
  const [name, setName] = useState("");
  const [nameState, setNameState] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneState, setPhoneState] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");
  const [total, setTotal] = useState("");
  const [totalState, setTotalState] = useState("");
  const [note, setNote] = useState("");
  const [payment, setPayment] = useState("");
  const [paymentState, setPaymentState] = useState("");
  const [shipCost, setShipCost] = useState("");
  const [shipCostState, setShipCostState] = useState("");
  const [isLoadingCircle, setIsLoadingCircle] = useState(false);

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

  const optionsStore = storeList.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  const optionsBuilding = buildingList.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  const getPaymentName = (item) => {
    switch (item) {
      case 0:
        return "Thu hộ tiền mặt";
      case 1:
        return "Thu hộ chuyển khoản";
      case 2:
        return "Đã thanh toán";
    }
  };

  const optionsPayment = [0, 1, 2].map((item) => {
    return {
      label: getPaymentName(item),
      value: item,
    };
  });

  const checkPhoneValid = () => {
    if (phone.match(/^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/im)) {
      return true;
    }
    return false;
  };

  const validateCustomStylesForm = () => {
    let valid = true;

    // STORE
    if (store === "") {
      valid = false;
      setStoreState("invalid");
    } else {
      setStoreState("valid");
    }

    // BUILDING
    if (building === "") {
      valid = false;
      setBuildingState("invalid");
    } else {
      setBuildingState("valid");
    }

    // NAME
    if (name === "") {
      valid = false;
      setNameState("invalid");
    } else {
      setNameState("valid");
    }

    // PHONE NUMBER
    if (phone === "") {
      setPhoneState("invalid");
      setPhoneMessage("Số điện thoại không được để trống");
    } else if (!checkPhoneValid()) {
      valid = false;
      setPhoneState("invalid");
      setPhoneMessage("Số điện thoại không hợp lệ");
    } else {
      setPhoneState("valid");
      setPhoneMessage("Số điện thoại không được để trống");
    }

    // PAYMENT
    if (payment === "") {
      valid = false;
      setPaymentState("invalid");
    } else {
      setPaymentState("valid");
    }

    // TOTAL
    if (total === "") {
      valid = false;
      setTotalState("invalid");
    } else if (total < 0) {
      setTotal(0);
      setTotalState("invalid");
    } else {
      setTotalState("valid");
    }

    // SHIP COST
    if (shipCost === "") {
      valid = false;
      setShipCostState("invalid");
    } else {
      setShipCostState("valid");
    }

    return valid;
  };

  const handleSubmit = () => {
    if (validateCustomStylesForm()) {
      setIsLoadingCircle(true);
      let order = {
        phoneNumber: phone,
        total: parseFloat(total),
        buildingId: building.value,
        note: note,
        fullName: name,
        deliveryTimeId: "1",
        paymentType: payment.value,
        shipCost: shipCost,
      };

      createOrder(store.value, order)
        .then((res) => {
          console.log(res);
          if (res.data) {
            setIsLoadingCircle(false);
            notify("Thêm mới thành công", "Success");
            setStore("");
            setBuilding("");
            setName("");
            setPhone("");
            setTotal("");
            setNote("");
            setPayment("");
            setShipCost("");
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoadingCircle(false);
          notify("Đã xảy ra lỗi gì đó!!", "Error");
        });
    }
  };

  return (
    <>
      <SimpleHeader name="Tạo vận đơn" parentName="Quản Lý" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col-lg-8">
            <Card>
              {/* TITLE */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "10px 0px",
                }}
                className="align-items-center"
              >
                <CardHeader className="border-0" style={{ padding: "15px" }}>
                  <h2 className="mb-0">Thông tin đơn </h2>
                </CardHeader>
              </div>

              {/* FORM NEW MENU */}
              <div className="col-md-12">
                <form>
                  <div className="row">
                    {/* STORE */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-control-label">
                          Cửa hàng <span style={{ color: "red" }}>*</span>
                        </label>
                        <div
                          className={`${
                            storeState === "invalid" && "error-select"
                          }`}
                        >
                          <Select
                            options={optionsStore}
                            placeholder="Cửa hàng"
                            styles={customStyles}
                            value={store}
                            onChange={(e) => {
                              setStore(e);
                            }}
                          />
                        </div>
                        {storeState === "invalid" && (
                          <div
                            className="invalid"
                            style={{
                              fontSize: "80%",
                              color: "#fb6340",
                              marginTop: "0.25rem",
                            }}
                          >
                            Cửa hàng không được để trống
                          </div>
                        )}
                      </div>
                    </div>

                    {/* BUILDING */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-control-label">
                          Địa điểm giao <span style={{ color: "red" }}>*</span>
                        </label>
                        <div
                          className={`${
                            buildingState === "invalid" && "error-select"
                          }`}
                        >
                          <Select
                            options={optionsBuilding}
                            placeholder="Địa điểm giao"
                            styles={customStyles}
                            value={building}
                            onChange={(e) => {
                              setBuilding(e);
                            }}
                          />
                        </div>
                        {buildingState === "invalid" && (
                          <div
                            className="invalid"
                            style={{
                              fontSize: "80%",
                              color: "#fb6340",
                              marginTop: "0.25rem",
                            }}
                          >
                            Địa điểm giao không được để trống
                          </div>
                        )}
                      </div>
                    </div>

                    {/* FULL NAME */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-control-label">
                          Tên khách hàng <span style={{ color: "red" }}>*</span>
                        </label>
                        <Input
                          valid={nameState === "valid"}
                          invalid={nameState === "invalid"}
                          className="form-control"
                          type="search"
                          id="example-search-input"
                          value={`${name}`}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                        <div className="invalid-feedback">
                          Tên không được để trống
                        </div>
                      </div>
                    </div>

                    {/* PHONE NUMBER */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-control-label">
                          Số điện thoại <span style={{ color: "red" }}>*</span>
                        </label>
                        <Input
                          valid={phoneState === "valid"}
                          invalid={phoneState === "invalid"}
                          className="form-control"
                          type="search"
                          id="example-search-input"
                          value={`${phone}`}
                          onChange={(e) => {
                            setPhone(e.target.value);
                          }}
                        />
                        {phoneState === "invalid" && (
                          <div
                            className="invalid"
                            style={{
                              fontSize: "80%",
                              color: "#fb6340",
                              marginTop: "0.25rem",
                            }}
                          >
                            {phoneMessage}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* TOTAL */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-control-label">
                          Giá trị đơn hàng chưa tính phí ship{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <Input
                          min={0}
                          valid={totalState === "valid"}
                          invalid={totalState === "invalid"}
                          className="form-control"
                          type="number"
                          id="example-search-input"
                          value={`${total}`}
                          onChange={(e) => {
                            if (parseFloat(e.target.value) < 0) {
                              setTotal("0");
                            } else {
                              setTotal(e.target.value);
                            }
                          }}
                        />
                        <div className="invalid-feedback">
                          Giá trị đơn hàng không được để trống
                        </div>
                      </div>
                    </div>

                    {/* SHIP COST */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-control-label">
                          Phí ship <span style={{ color: "red" }}>*</span>
                        </label>
                        <Input
                          min={0}
                          valid={shipCostState === "valid"}
                          invalid={shipCostState === "invalid"}
                          className="form-control"
                          type="number"
                          id="example-search-input"
                          value={`${shipCost}`}
                          onChange={(e) => {
                            if (parseFloat(e.target.value) < 0) {
                              setShipCost("0");
                            } else {
                              setShipCost(e.target.value);
                            }
                          }}
                        />
                        <div className="invalid-feedback">
                          Phí ship không được để trống
                        </div>
                      </div>
                    </div>

                    {/* PAYMENT STATUS */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-control-label">
                          Trạng thái thanh toán
                        </label>
                        <div
                          className={`${
                            paymentState === "invalid" && "error-select"
                          }`}
                        >
                          <Select
                            options={optionsPayment}
                            placeholder="Thu hộ"
                            styles={customStyles}
                            value={payment}
                            onChange={(e) => {
                              setPayment(e);
                            }}
                          />
                        </div>
                        {paymentState === "invalid" && (
                          <div
                            className="invalid"
                            style={{
                              fontSize: "80%",
                              color: "#fb6340",
                              marginTop: "0.25rem",
                            }}
                          >
                            Trạng thái thanh toán không được để trống
                          </div>
                        )}
                      </div>
                    </div>

                    {/* NOTE */}
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-control-label">
                          Ghi chú <span style={{ color: "red" }}>*</span>
                        </label>
                        <textarea
                          rows={3}
                          className="form-control"
                          type="search"
                          id="example-search-input"
                          value={`${note}`}
                          onChange={(e) => {
                            setNote(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}
                  <Col className="mt-3  text-md-right mb-4" lg="12" xs="5">
                    {/* CREATE BUTTON */}
                    <Button
                      onClick={() => {
                        handleSubmit();
                      }}
                      className="btn-neutral"
                      color="default"
                      size="lg"
                      disabled={isLoadingCircle}
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
                          width: 99,
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
                            <span style={{ color: "#fff" }}>Thêm mới</span>
                          </>
                        )}
                      </div>
                    </Button>
                  </Col>
                </form>
              </div>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};
export default CreateOrder;
