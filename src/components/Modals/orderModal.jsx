// import React, { useContext, useEffect, useState } from "react";
// import Select from "react-select";
// import { Button, Card, CardBody, CardHeader, Col, Container, Input, Label, Modal, Row, Spinner } from "reactstrap";
// import { getListBrands, getStoreDetail, putStore } from "../../apis/storeApiService";
// import { AppContext } from "../../context/AppProvider";
// import ImageUploading from "react-images-uploading";
// import { getBase64Ima, getBase64Image, getBase64ImageNotType, getModeName } from "../../constants";
// import { notify } from "../Toast/ToastCustom";
// import axios from "axios";
// import { getOrderDetail } from "../../apis/orderApiService";

// export const OrderModal = ({ handleReload }) => {
//     const { openModal, setOpenModal, brandList, storeCategoryList, buildingList, orderModal, setorderModal } = useContext(AppContext);

//     const [isLoadingCircle, setIsLoadingCircle] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);
//     const [shipperName, setshipperName] = useState("");
//     const [shipperPhone, setshipperPhone] = useState("");
//     const [storeBuilding, setStoreBuilding] = useState("");
//     const [phoneNumber, setPhoneNumber] = useState("");
//     const [paymentName, setPaymentName] = useState("");
//     const [modeName, setModeName] = useState("");

//     const validateCustomStylesForm = () => {
//         let valid = true;
//         // if (storeName === "") {
//         //     valid = false;
//         //     setStoreNameState("invalid");
//         // } else {
//         //     // valid = true;
//         //     setStoreNameState("valid");
//         // }

//         return valid;
//     };
//     const [storeCategory, setStoreCategory] = useState("");
//     useEffect(() => {
//         if (orderModal.id) {
//             // setIsLoading(true);
//             // setStoreName(storeModal.name);
//             // setPhone(storeModal.phone || "");
//             // setBuilding({ label: storeModal.buildingStore, value: storeModal.buildingId });
//             // setBrand({ label: storeModal.brandStoreName, value: storeModal.brandStoreId });
//             // setStoreCategory({ label: storeModal.storeCateName, value: storeModal.storeCateId });
//             // setAccount("");
//             console.log({ orderModal });
//             getOrderDetail(orderModal.id)
//                 .then((res) => {
//                     if (res.data) {
//                         console.log(res.data);
//                         const order = res.data;
//                         setshipperPhone(order.shipperPhone);
//                         setshipperName(order.shipperName);
//                         setStoreBuilding(order.storeBuilding);
//                         setPhoneNumber(order.phoneNumber);
//                         setPaymentName(order.paymentName);
//                         console.log(getModeName(order.modeId));
//                         setModeName(getModeName(order.modeId));
//                     }
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                     setIsLoading(false);
//                     setIsLoadingCircle(false);
//                 });
//         }
//     }, [orderModal]);
//     const hanldeUpdate = () => {
//         if (validateCustomStylesForm()) {
//             setIsLoadingCircle(true);

//             // let store = {
//             //     id: storeModal.id,
//             //     name: storeName,
//             //     buildingId: building.value,
//             //     brandId: brand.value,
//             //     rate: "",
//             //     closeTime: closeTime,
//             //     openTime: openTime,
//             //     image: getBase64Image(images[0].data_url || "", images[0]?.file?.type) || "",
//             //     storeCategoryId: storeCategory.value,
//             //     slogan: slogan,
//             //     phone: phone,
//             //     status: status.value,
//             //     password: password,
//             // };
//             // console.log({ store, imgUpdate });
//             // putStore(store, storeModal.id, imgUpdate)
//             //     .then((res) => {
//             //         if (res.data) {
//             //             setIsLoadingCircle(false);
//             //             handleReload();
//             //             notify("Cập nhật thành công", "Success");
//             //             setOpenModal(false);
//             //             setStoreModal({});
//             //             setImages([]);
//             //             setImgUpdate(false);
//             //         }
//             //     })
//             //     .catch((error) => {
//             //         console.log(error);
//             //         setIsLoadingCircle(false);
//             //         notify("Đã xảy ra lỗi gì đó!!", "Error");
//             //     });
//         }
//     };
//     const customStylesPayment = {
//         control: (provided, state) => ({
//             ...provided,
//             background: "#fff",
//             borderColor: "#dee2e6",
//             minHeight: "30px",
//             height: "46px",
//             // width: "200px",
//             boxShadow: state.isFocused ? null : null,
//             borderRadius: "0.5rem",
//         }),

//         input: (provided, state) => ({
//             ...provided,
//             margin: "5px",
//         }),
//     };
//     const optionsBuilding = buildingList.map((item) => {
//         return {
//             label: item.name,
//             value: item.id,
//         };
//     });
//     const optionsBrand = brandList.map((item) => {
//         return {
//             label: item.name,
//             value: item.id,
//         };
//     });
//     const optionsCategoryStore = storeCategoryList.map((item) => {
//         // console.log(item);
//         return {
//             label: item.name,
//             value: item.id,
//         };
//     });

//     const optionsStatus = [
//         { label: "Hoạt động", value: true },
//         { label: "Ngưng hoạt động", value: false },
//     ];
//     return (
//         <>
//             <Row>
//                 <Col md="4">
//                     <Modal
//                         className="modal-dialog-centered"
//                         size="xl"
//                         isOpen={openModal}
//                         toggle={() => {
//                             setorderModal({});
//                             setOpenModal(false);
//                         }}
//                     >
//                         <div className="modal-body p-0">
//                             <Card className="bg-secondary border-0 mb-0">
//                                 <CardHeader className="bg-transparent " style={{ border: "none" }}>
//                                     <h3>Chi tiết</h3>
//                                 </CardHeader>
//                                 <CardBody className="" style={{ paddingTop: 0 }}>
//                                     <Container className="" fluid style={{ padding: "0 0px" }}>
//                                         <Row>
//                                             <div className="col-lg-12 modal-product">
//                                                 <Card>
//                                                     <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "10px 0px" }} className="align-items-center">
//                                                         <CardHeader className="border-0" style={{ padding: "15px" }}>
//                                                             <h2 className="mb-0">Thông tin đơn hàng </h2>
//                                                         </CardHeader>
//                                                     </div>
//                                                     <div className="col-md-12">
//                                                         <form>
//                                                             <div className="row">
//                                                                 <div className="col-md-4">
//                                                                     <div className="form-group">
//                                                                         <label className="form-control-label">Mã đơn hàng</label>
//                                                                         <Input className="form-control" type="search" id="example-search-input" value={orderModal.id} readOnly onChange={() => {}} />
//                                                                     </div>
//                                                                 </div>

//                                                                 <div className="col-md-4">
//                                                                     <div className="form-group">
//                                                                         <label className="form-control-label">Cửa hàng </label>
//                                                                         <Input
//                                                                             className="form-control"
//                                                                             type="search"
//                                                                             id="example-search-input"
//                                                                             readOnly
//                                                                             value={`${orderModal.storeName}`}
//                                                                             onChange={(e) => {}}
//                                                                         />
//                                                                     </div>
//                                                                 </div>
//                                                                 <div className="col-md-4">
//                                                                     <div className="form-group">
//                                                                         <label className="form-control-label">Địa chỉ lấy hàng</label>
//                                                                         <Input
//                                                                             className="form-control"
//                                                                             type="text"
//                                                                             id="example-search-input"
//                                                                             readOnly
//                                                                             value={`${storeBuilding}`}
//                                                                             onChange={(e) => {}}
//                                                                         />
//                                                                     </div>
//                                                                 </div>
//                                                                 <div className="col-md-4">
//                                                                     <div className="form-group">
//                                                                         <label className="form-control-label">Tài xế </label>
//                                                                         <Input className="form-control" type="text" id="example-search-input" readOnly value={`${shipperName}`} onChange={(e) => {}} />
//                                                                     </div>
//                                                                 </div>
//                                                                 <div className="col-md-4">
//                                                                     <div className="form-group">
//                                                                         <label className="form-control-label">Số điện thoại</label>
//                                                                         <Input className="form-control" type="text" id="example-search-input" readOnly value={`${shipperPhone}`} />
//                                                                     </div>
//                                                                 </div>
//                                                                 <div className="col-md-4">
//                                                                     <div className="form-group">
//                                                                         <label className="form-control-label">Loại thực đơn</label>
//                                                                         <Input className="form-control" type="text" id="example-search-input" readOnly value={modeName} onChange={(e) => {}} />
//                                                                     </div>
//                                                                 </div>
//                                                             </div>
//                                                         </form>
//                                                     </div>
//                                                     <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "10px 0px" }} className="align-items-center">
//                                                         <CardHeader className="border-0" style={{ padding: "0 15px 15px 15px" }}>
//                                                             <h2 className="mb-0">Lộ trình đơn hàng </h2>
//                                                         </CardHeader>
//                                                     </div>
//                                                     <div className="col-md-12">
//                                                         <form>
//                                                             <div className="row">
//                                                                 <div className="col-md-4">
//                                                                     <div className="form-group">
//                                                                         <label className="form-control-label">Địa điểm giao</label>
//                                                                         <Input
//                                                                             className="form-control"
//                                                                             type="search"
//                                                                             id="example-search-input"
//                                                                             value={orderModal.buildingName}
//                                                                             readOnly
//                                                                             onChange={() => {}}
//                                                                         />
//                                                                     </div>
//                                                                 </div>
//                                                             </div>
//                                                         </form>
//                                                     </div>
//                                                     <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "10px 0px" }} className="align-items-center">
//                                                         <CardHeader className="border-0" style={{ padding: "0 15px 15px 15px" }}>
//                                                             <h2 className="mb-0">Thông tin khách hàng </h2>
//                                                         </CardHeader>
//                                                     </div>
//                                                     <div className="col-md-12">
//                                                         <form>
//                                                             <div className="row">
//                                                                 <div className="col-md-4">
//                                                                     <div className="form-group">
//                                                                         <label className="form-control-label">Địa điểm giao</label>
//                                                                         <Input
//                                                                             className="form-control"
//                                                                             type="search"
//                                                                             id="example-search-input"
//                                                                             value={orderModal.buildingName}
//                                                                             readOnly
//                                                                             onChange={() => {}}
//                                                                         />
//                                                                     </div>
//                                                                 </div>

//                                                                 <div className="col-md-4">
//                                                                     <div className="form-group">
//                                                                         <label className="form-control-label">Tên khách hàng </label>
//                                                                         <Input
//                                                                             className="form-control"
//                                                                             type="search"
//                                                                             id="example-search-input"
//                                                                             readOnly
//                                                                             value={`${orderModal.customerName}`}
//                                                                             onChange={(e) => {}}
//                                                                         />
//                                                                     </div>
//                                                                 </div>
//                                                                 <div className="col-md-4">
//                                                                     <div className="form-group">
//                                                                         <label className="form-control-label">Số điện thoại</label>
//                                                                         <Input
//                                                                             className="form-control"
//                                                                             type="number"
//                                                                             id="example-search-input"
//                                                                             readOnly
//                                                                             value={`${orderModal.phone}`}
//                                                                             onChange={(e) => {}}
//                                                                         />
//                                                                     </div>
//                                                                 </div>
//                                                             </div>
//                                                         </form>
//                                                     </div>
//                                                     <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "10px 0px" }} className="align-items-center">
//                                                         <CardHeader className="border-0" style={{ padding: "0 15px 15px 15px" }}>
//                                                             <h2 className="mb-0">Thông tin thanh toán </h2>
//                                                         </CardHeader>
//                                                     </div>
//                                                     <div className="col-md-12">
//                                                         <form>
//                                                             <div className="row">
//                                                                 <div className="col-md-4">
//                                                                     <div className="form-group">
//                                                                         <label className="form-control-label">Phương thức thanh toán</label>
//                                                                         <Input
//                                                                             className="form-control"
//                                                                             type="search"
//                                                                             id="example-search-input"
//                                                                             value={orderModal.paymentName}
//                                                                             readOnly
//                                                                             onChange={() => {}}
//                                                                         />
//                                                                     </div>
//                                                                 </div>

//                                                                 <div className="col-md-4">
//                                                                     <div className="form-group">
//                                                                         <label className="form-control-label">Giá trị đơn hàng </label>
//                                                                         <Input
//                                                                             className="form-control"
//                                                                             type="search"
//                                                                             id="example-search-input"
//                                                                             readOnly
//                                                                             value={`${orderModal.total}`}
//                                                                             onChange={(e) => {}}
//                                                                         />
//                                                                     </div>
//                                                                 </div>
//                                                                 <div className="col-md-4">
//                                                                     <div className="form-group">
//                                                                         <label className="form-control-label">Phí ship</label>
//                                                                         <Input className="form-control" type="number" id="example-search-input" value={`${orderModal.shipCost}`} onChange={(e) => {}} />
//                                                                     </div>
//                                                                 </div>
//                                                             </div>
//                                                         </form>
//                                                     </div>
//                                                 </Card>
//                                             </div>
//                                         </Row>
//                                         {/* <Col className="text-md-right mb-3" lg="12" xs="5">
//                                             <Button
//                                                 onClick={() => {
//                                                     setOpenModal(false);
//                                                 }}
//                                                 className="btn-neutral"
//                                                 color="default"
//                                                 size="lg"
//                                                 style={{ background: "#fff", color: "#000", padding: "0.875rem 2rem" }}
//                                             >
//                                                 <div className="flex" style={{ alignItems: "center" }}>
//                                                     <i className="fa-solid fa-backward" style={{ fontSize: 18 }}></i>
//                                                     <span>Đóng</span>
//                                                 </div>
//                                             </Button>
//                                             <Button
//                                                 onClick={() => {
//                                                     hanldeUpdate();
//                                                 }}
//                                                 className="btn-neutral"
//                                                 disabled={isLoadingCircle}
//                                                 color="default"
//                                                 size="lg"
//                                                 style={{ background: "var(--primary)", color: "#000", padding: "0.875rem 2rem" }}
//                                             >
//                                                 <div className="flex" style={{ alignItems: "center", width: 99, justifyContent: "center" }}>
//                                                     {isLoadingCircle ? (
//                                                         <Spinner style={{ color: "rgb(100,100,100)", width: "1.31rem", height: "1.31rem" }}>Loading...</Spinner>
//                                                     ) : (
//                                                         <>
//                                                             <i className="fa-solid fa-square-plus" style={{ fontSize: 18 }}></i>
//                                                             <span>Chỉnh Sửa</span>
//                                                         </>
//                                                     )}
//                                                 </div>
//                                             </Button>
//                                         </Col> */}
//                                     </Container>
//                                 </CardBody>
//                             </Card>
//                         </div>
//                     </Modal>
//                 </Col>
//             </Row>
//         </>
//     );
// };
