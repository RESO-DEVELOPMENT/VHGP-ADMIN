import React, { useContext, useState } from "react";
import ImageUploading from "react-images-uploading";
import { useHistory } from "react-router";
import Select from "react-select";
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
import SimpleHeader from "../../../components/Headers/SimpleHeader";
import { getBase64Image } from "../../../constants";
import { AppContext } from "../../../context/AppProvider";
import { app } from "../../../firebase-config.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { postStore } from "../../../apis/storeApiService";
import { notify } from "../../../components/Toast/ToastCustom";
const unitData = ["Gam", "Kg", "Chai", "Hủ", "Hộp", "Cái"];

export const NewStore = () => {
  const { brandList, storeCategoryList, buildingList } = useContext(AppContext);
  const [storeName, setStoreName] = useState("");
  const [storeNameState, setStoreNameState] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneState, setPhoneState] = useState("");
  const [building, setBuilding] = useState("");
  const [buildingState, setBuildingState] = useState("");
  const [account, setAccount] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [slogan, setSlogan] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [userName, setUserName] = useState("");
  const [userNameMess, setUserNameMess] = useState("");
  const [userNameState, setUserNameState] = useState("");
  const [password, setPassword] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [status, setStatus] = useState(0);
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [brandState, setBrandState] = useState("");
  const [isLoadingCircle, setIsLoadingCircle] = useState(false);
  const [storeCategory, setStoreCategory] = useState("");
  const [storeCategoryState, setStoreCategoryState] = useState("");
  const [images, setImages] = React.useState([]);
  const [imageState, setImageState] = React.useState("");
  const maxNumber = 69;
  let history = useHistory();
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  const customStylesPayment = {
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
  const optionsBrand = brandList.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });
  const optionsCategoryStore = storeCategoryList.map((item) => {
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

  const checkEmailValid = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userName)) {
      return true;
    }
    return false;
  };

  const checkPhoneValid = () => {
    if (phone.match(/^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/im)) {
      return true;
    }
    return false;
  };

  const validateCustomStylesForm = () => {
    let valid = true;
    if (storeName === "") {
      valid = false;
      setStoreNameState("invalid");
    } else {
      // valid = true;
      setStoreNameState("valid");
    }

    // phone number
    if (phone !== "") {
      if (!checkPhoneValid()) {
        valid = false;
        setPhoneState("invalid");
      } else {
        setPhoneState("valid");
      }
    }

    // username
    if (userName === "") {
      valid = false;
      setUserNameState("invalid");
      setUserNameMess("Tên đăng nhập không được để trống");
    } else if (!checkEmailValid()) {
      valid = false;
      setUserNameState("invalid");
      setUserNameMess("Tên đăng nhập không hợp lệ");
    } else {
      // valid = true;f
      setUserNameState("valid");
    }

    if (password === "") {
      valid = false;
      setPasswordState("invalid");
      setPasswordMessage("Mật khẩu không được để trống");
    } else if (password.length < 6) {
      valid = false;
      setPasswordState("invalid");
      setPasswordMessage("Mật khẩu phải tối thiểu 6 kí tự");
    } else {
      // valid = true;
      setPasswordState("valid");
    }
    if (images.length === 0) {
      valid = false;
      setImageState("invalid");
    } else {
      // valid = true;
      setImageState("valid");
    }
    if (brand === "") {
      valid = false;
      setBrandState("invalid");
    } else {
      // valid = true;
      setBrandState("valid");
    }
    if (storeCategory === "") {
      valid = false;
      setStoreCategoryState("invalid");
    } else {
      // valid = true;
      setStoreCategoryState("valid");
    }
    if (building === "") {
      valid = false;
      setBuildingState("invalid");
    } else {
      // valid = true;
      setBuildingState("valid");
    }

    return valid;
  };
  const handleSubmit = () => {
    if (validateCustomStylesForm()) {
      setIsLoadingCircle(true);
      const authentication = getAuth();

      let store = {
        id: userName,
        password: password,
        name: storeName,
        buildingId: building.value,
        brandId: brand.value,
        rate: "",
        closeTime: closeTime,
        openTime: openTime,
        image: images[0]
          ? getBase64Image(images[0].data_url || "", images[0]?.file?.type) ||
            ""
          : "",
        storeCategoryId: storeCategory.value,
        slogan: slogan,
        description: description,
        phone: phone,
        status: true,
      };
      console.log({ store });

      createUserWithEmailAndPassword(authentication, userName, password)
        .then((response) => {
          if (response) {
            postStore(store)
              .then((res) => {
                if (res.data) {
                  setIsLoadingCircle(false);
                  notify("Cập nhật thành công", "Success");
                  history.push("/admin/stores");
                }
              })
              .catch((error) => {
                const authentication = getAuth().currentUser;
                authentication
                  .delete()
                  .then(function () {
                    console.log(error);
                    setIsLoadingCircle(false);
                    notify("Đã xảy ra lỗi gì đó!!", "Error");
                  })
                  .catch(function (error) {
                    // An error happened.
                    console.log(error);
                    setIsLoadingCircle(false);
                    notify("Đã xảy ra lỗi gì đó!!", "Error");
                  });
              });
          } else {
            notify("Tên đăng nhập đã được sử dụng", "Error");
            setIsLoadingCircle(false);
          }
        })
        .catch((error) => {
          notify("Tên đăng nhập đã được sử dụng", "Error");
          console.log(error);
          setIsLoadingCircle(false);
        });
    }
  };
  return (
    <>
      <SimpleHeader name="Thêm Cửa Hàng Mới" parentName="Quản Lý" />
      <Container className="mt--6" fluid>
        <Row>
          {/* <div className="col-lg-4">
                        <Card>
                            <CardHeader>
                                <h2 className="mb-0">Hình ảnh</h2>
                            </CardHeader>
                            <CardBody>
                                <div className="dropzone dropzone-single mb-3" id="dropzone-single">
                                    <div className="" style={{ height: "100%" }}>
                                        <ImgCrop style={{width: "100%"}} aspect={375/250}  quality={1}>
                                            <Upload style={{width: "100%"}} action="https://www.mocky.io/v2/5cc8019d300000980a055e76" listType="picture-card" fileList={fileList} onChange={onChange} onPreview={onPreview}>
                                                {fileList.length < 1 && "+ Upload"}
                                            </Upload>
                                        </ImgCrop>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div> */}
          <div className="col-lg-4">
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
                <CardHeader className="border-0" style={{ padding: "1rem" }}>
                  <h2 className="mb-0">
                    Hình ảnh <span style={{ color: "red" }}>*</span>
                  </h2>
                </CardHeader>
              </div>
              <div className="col-md-12">
                <form>
                  <div className="row">
                    <div
                      className=""
                      id="dropzone-single"
                      style={{ width: "100%", padding: "0 30px 30px 30px" }}
                    >
                      <div className="" style={{ height: "100%" }}>
                        <ImageUploading
                          value={images}
                          onChange={onChange}
                          maxNumber={maxNumber}
                          dataURLKey="data_url"
                          acceptType={["jpg", "png", "jpeg"]}
                        >
                          {({
                            imageList,
                            onImageUpload,
                            onImageRemoveAll,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps,
                          }) => (
                            // write your building UI
                            <div className="upload-img" onClick={onImageUpload}>
                              {images.length <= 0 && (
                                <span
                                  style={isDragging ? { color: "red" } : null}
                                  {...dragProps}
                                >
                                  Tải ảnh
                                </span>
                              )}
                              {imageList.map((image, index) => (
                                <div key={index} className="upload-img">
                                  <img
                                    src={image.data_url}
                                    alt=""
                                    width="100"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </ImageUploading>
                        {imageState === "invalid" && (
                          <div
                            className="invalid"
                            style={{
                              textAlign: "center",
                              fontSize: "80%",
                              color: "#fb6340",
                              marginTop: "0.25rem",
                            }}
                          >
                            Hình ảnh không được để trống
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </Card>
          </div>
          <div className="col-lg-8">
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
                <CardHeader className="border-0" style={{ padding: "15px" }}>
                  <h2 className="mb-0">Thông tin cửa hàng </h2>
                </CardHeader>
              </div>
              <div className="col-md-12">
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-control-label">
                          Tên cửa hàng <span style={{ color: "red" }}>*</span>
                        </label>
                        <Input
                          valid={storeNameState === "valid"}
                          invalid={storeNameState === "invalid"}
                          className="form-control"
                          type="search"
                          id="example-search-input"
                          value={`${storeName}`}
                          onChange={(e) => {
                            setStoreName(e.target.value);
                          }}
                        />
                        <div className="invalid-feedback">
                          Tên cửa hàng không được để trống
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-control-label">
                          Số điện thoại{" "}
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
                        <div className="invalid-feedback">
                          Số điện thoại không hợp lệ
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-control-label">
                          Email đăng nhập{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <Input
                          valid={userNameState === "valid"}
                          invalid={userNameState === "invalid"}
                          className="form-control"
                          type="email"
                          id="example-search-input"
                          value={`${userName}`}
                          onChange={(e) => {
                            setUserName(e.target.value);
                          }}
                        />
                        <div className="invalid-feedback">{userNameMess}</div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-control-label">
                          Mật khẩu <span style={{ color: "red" }}>*</span>
                        </label>
                        <Input
                          valid={passwordState === "valid"}
                          invalid={passwordState === "invalid"}
                          className="form-control"
                          type="search"
                          id="example-search-input"
                          value={`${password}`}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                        <div className="invalid-feedback">
                          {passwordMessage}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-control-label">
                          Giờ mở cửa{" "}
                        </label>
                        <input
                          className="form-control"
                          type="search"
                          id="example-search-input"
                          value={`${openTime}`}
                          onChange={(e) => {
                            setOpenTime(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-control-label">
                          Giờ đóng cửa{" "}
                        </label>
                        <input
                          className="form-control"
                          type="search"
                          id="example-search-input"
                          value={`${closeTime}`}
                          onChange={(e) => {
                            setCloseTime(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-control-label">
                          Building <span style={{ color: "red" }}>*</span>
                        </label>
                        <div
                          className={`${
                            buildingState === "invalid" && "error-select"
                          }`}
                        >
                          <Select
                            options={optionsBuilding}
                            placeholder="Tòa nhà"
                            styles={customStylesPayment}
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
                            Địa chỉ không được để trống
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-control-label">
                          Số tài khoản{" "}
                        </label>
                        <input
                          className="form-control"
                          type="search"
                          id="example-search-input"
                          value={`${account}`}
                          onChange={(e) => {
                            setAccount(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-control-label">
                          Thương hiệu <span style={{ color: "red" }}>*</span>
                        </label>
                        <div
                          className={`${
                            brandState === "invalid" && "error-select"
                          }`}
                        >
                          <Select
                            options={optionsBrand}
                            placeholder="Thương hiệu"
                            styles={customStylesPayment}
                            value={brand}
                            onChange={(e) => {
                              setBrand(e);
                            }}
                          />
                        </div>
                        {brandState === "invalid" && (
                          <div
                            className="invalid"
                            style={{
                              fontSize: "80%",
                              color: "#fb6340",
                              marginTop: "0.25rem",
                            }}
                          >
                            Thương hiệu không được để trống
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-control-label">
                          Loại cửa hàng <span style={{ color: "red" }}>*</span>
                        </label>
                        <div
                          className={`${
                            storeCategoryState === "invalid" && "error-select"
                          }`}
                        >
                          <Select
                            options={optionsCategoryStore}
                            placeholder="Loại cửa hàng"
                            styles={customStylesPayment}
                            value={storeCategory}
                            onChange={(e) => {
                              setStoreCategory(e);
                            }}
                          />
                        </div>
                        {storeCategoryState === "invalid" && (
                          <div
                            className="invalid"
                            style={{
                              fontSize: "80%",
                              color: "#fb6340",
                              marginTop: "0.25rem",
                            }}
                          >
                            Loại cửa hàng không được để trống
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-control-label">
                          Miêu tả cửa hàng
                        </label>
                        <div>
                          <textarea
                            className="form-control"
                            type="search"
                            id="example-search-input"
                            value={`${description}`}
                            onChange={(e) => {
                              setDescription(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <Col className="mt-3  text-md-right mb-4" lg="12" xs="5">
                    <Button
                      onClick={() => {
                        history.push("/admin/stores");
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
                        <span>Trở Về</span>
                      </div>
                    </Button>
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
