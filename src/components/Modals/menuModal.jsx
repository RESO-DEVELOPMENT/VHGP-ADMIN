import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import Select from 'react-select'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Modal,
  Row,
  Spinner,
} from 'reactstrap'
import { putStoreCategory } from '../../apis/categoryApiService'
import { AppContext } from '../../context/AppProvider'
import { notify } from '../Toast/ToastCustom'
export const MenuUpdateModal = ({ handleReload }) => {
  const { openModal, setOpenModal, storeCategoryModal } = useContext(AppContext)
  const [categoryName, setcategoryName] = useState('')
  const [categoryId, setcategoryId] = useState('')
  const [imageState, setimageState] = useState('')
  const [status, setStatus] = useState(0)
  const [images, setImages] = React.useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingCircle, setIsLoadingCircle] = useState(false)
  let history = useHistory()
  const maxNumber = 69
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    if (imageList.length > 0) {
      setimageState('valid')
    } else {
      setimageState('invalid')
    }
    console.log(imageList)
    setImages(imageList)
  }
  useEffect(() => {
    console.log(storeCategoryModal)
    setcategoryName(storeCategoryModal.name)
    setcategoryId(storeCategoryModal.id)

    setStatus({ label: 'Hoạt động', value: 0 })
  }, [storeCategoryModal])

  const handleUpdate = () => {
    setIsLoadingCircle(true)
    let categoryUpdate = {
      id: categoryId,
      name: categoryName,
      status: status.label,
      storeName: '',
      storeId: '',
      storeImage: '',
    }
    console.log({ categoryUpdate })
    putStoreCategory(categoryUpdate)
      .then((res) => {
        if (res.data) {
          setIsLoading(false)
          notify('Cập nhật thành công', 'Success')
          history.push('/admin/categorieStore')
          handleReload()
          setOpenModal(false)
          setIsLoadingCircle(false)
        }
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
        setIsLoadingCircle(false)
        notify('Đã xảy ra lỗi gì đó!!', 'Error')
      })
  }
  const customStylesPayment = {
    control: (provided, state) => ({
      ...provided,
      background: '#fff',
      borderColor: '#dee2e6',
      minHeight: '30px',
      height: '46px',
      // width: "200px",
      boxShadow: state.isFocused ? null : null,
      borderRadius: '0.5rem',
    }),

    input: (provided, state) => ({
      ...provided,
      margin: '5px',
    }),
  }

  const optionsStatus = [
    { label: 'Hoạt động', value: 0 },
    { label: 'Ngưng hoạt động', value: 1 },
  ]
  return (
    <>
      <Row>
        <Col md="4">
          <Modal
            className="modal-dialog-centered"
            size="lg"
            isOpen={openModal}
            toggle={() => {
              setOpenModal(false)
            }}
          >
            <div className="modal-body p-0">
              <Card className="bg-secondary border-0 mb-0">
                <CardHeader
                  className="bg-transparent "
                  style={{ border: 'none' }}
                >
                  <h3>Chi tiết</h3>
                </CardHeader>
                <CardBody className="" style={{ paddingTop: 0 }}>
                  <Container className="" fluid style={{ padding: '0 0px' }}>
                    <Row>
                      <div className="col-lg-12 modal-product">
                        <Card>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              width: '100%',
                              padding: '10px 0px',
                            }}
                            className="align-items-center"
                          >
                            <CardHeader
                              className="border-0"
                              style={{ padding: '15px' }}
                            >
                              <h2 className="mb-0">Thông tin loại cửa hàng </h2>
                            </CardHeader>
                          </div>
                          <div className="col-md-12">
                            <form>
                              <div className="row">
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <label className="form-control-label">
                                      Mã loại cửa hàng{' '}
                                    </label>
                                    <input
                                      className="form-control"
                                      type="search"
                                      id="example-search-input"
                                      value={storeCategoryModal.id}
                                      readOnly
                                      onChange={() => {}}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <label className="form-control-label">
                                      Tên loại cửa hàng{' '}
                                    </label>
                                    <input
                                      className="form-control"
                                      type="search"
                                      id="example-search-input"
                                      value={`${categoryName}`}
                                      onChange={(e) => {
                                        setcategoryName(e.target.value)
                                      }}
                                    />
                                  </div>
                                </div>

                                <div className="col-md-4">
                                  <div className="form-group">
                                    <label className="form-control-label">
                                      Trạng Thái
                                    </label>
                                    <Select
                                      options={optionsStatus}
                                      placeholder="Trạng Thái"
                                      styles={customStylesPayment}
                                      value={status}
                                      defaultValue={status}
                                      onChange={(e) => {
                                        console.log(e)
                                        setStatus(e)
                                      }}
                                    />
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
                          setOpenModal(false)
                        }}
                        // className="btn-neutral"
                        color="default"
                        size="lg"
                        style={{
                          background: '#fff',
                          color: '#000',
                          padding: '0.875rem 2rem',
                          border: 'none',
                        }}
                      >
                        <div className="flex" style={{ alignItems: 'center' }}>
                          <i
                            className="fa-solid fa-backward"
                            style={{ fontSize: 18 }}
                          ></i>
                          <span>Đóng</span>
                        </div>
                      </Button>
                      <Button
                        onClick={() => {
                          handleUpdate()
                        }}
                        className="btn-neutral"
                        disabled={isLoadingCircle}
                        color="default"
                        size="lg"
                        style={{
                          background: 'var(--primary)',
                          color: '#000',
                          padding: '0.875rem 2rem',
                        }}
                      >
                        <div
                          className="flex"
                          style={{
                            alignItems: 'center',
                            width: 99,
                            justifyContent: 'center',
                          }}
                        >
                          {isLoadingCircle ? (
                            <Spinner
                              style={{
                                color: '#fff',
                                width: '1.31rem',
                                height: '1.31rem',
                              }}
                            >
                              Loading...
                            </Spinner>
                          ) : (
                            <>
                              <i
                                className="fa-solid fa-square-plus"
                                style={{ fontSize: 18, color: '#fff' }}
                              ></i>
                              <span style={{ color: '#fff' }}>Chỉnh Sửa</span>
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
  )
}

// import React, { useContext, useEffect, useState } from "react";
// import { useHistory } from "react-router";
// import Select from "react-select";
// import { Button, Card, CardBody, CardHeader, Col, Container, Modal, Row } from "reactstrap";
// import { AppContext } from "../../context/AppProvider";
// import Pdata from "../../views/pages/menus/Pdata";
// const unitData = ["Gam", "Kg", "Chai", "Hủ", "Hộp", "Cái"];
// export const MenuModal = ({ handleReload }) => {
//     const { openModal, setOpenModal, productModal, setProductModal, categoryList } = useContext(AppContext);
//     const { shopItems } = Pdata;
//     const [options, setOptions] = useState([]);
//     const [checked, setChecked] = useState(-1);
//     let history = useHistory();
//     useEffect(() => {
//         const options = categoryList?.map((item) => {
//             return { label: item.name, id: item.id, value: item.id };
//         });
//         setOptions(options);
//     }, [categoryList]);
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
//     const handleUpdate = () => {};
//     return (
//         <>
//             <Modal
//                 className="modal-dialog-centered"
//                 size="lg"
//                 isOpen={openModal}
//                 toggle={() => {
//                     setOpenModal(false);
//                 }}
//             >
//                 <div className="modal-body p-0">
//                     <Card className="bg-secondary border-0 mb-0">
//                         {/* <CardHeader className="bg-transparent " style={{ border: "none" }}>
//                             <h3>Thêm vào thực đơn</h3>
//                         </CardHeader> */}
//                         <CardBody className="" style={{}}>
//                             <Container className="" fluid style={{ padding: "0 0px" }}>
//                                 <Row>
//                                     <div className="col-lg-12 modal-product">
//                                         <Card style={{ borderRadius: "0.5rem" }}>
//                                             <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }} className="align-items-center">
//                                                 <CardHeader className="" style={{ width: "100%" }}>
//                                                     <div className="flex" style={{ alignItems: "center", gap: 20, justifyContent: "space-between" }}>
//                                                         <h2 className="mb-0">Danh Sách Sản Phẩm</h2>
//                                                         <Select options={options} placeholder="Danh Mục" styles={customStylesPayment} />
//                                                     </div>
//                                                 </CardHeader>
//                                             </div>
//                                             <div className="col-md-12 modal-list">
//                                                 <form>
//                                                     <div className="row" style={{ margin: 0 }}>
//                                                         <Row xl={2}>
//                                                             {shopItems.map((item, index) => (
//                                                                 <Col style={{}} key={index}>
//                                                                     <div
//                                                                         className=" "
//                                                                         style={{
//                                                                             display: "flex",
//                                                                             // borderRadius: "0.5rem",
//                                                                             // position: "relative",
//                                                                             flexDirection: "row",
//                                                                             justifyContent: "start",
//                                                                             alignItems: "center",
//                                                                             borderBottom: "1px solid rgb(230,230,230)",
//                                                                             gap: 10,
//                                                                             padding: "0 15px",
//                                                                             cursor: "pointer",
//                                                                         }}
//                                                                         // onClick={() => setChecked(item.id)}
//                                                                     >
//                                                                         {/* <input type="checkbox" id={index} class="my-checkbox-x2" value={item.id} /> */}
//                                                                         <label className="stardust-checkbox">
//                                                                             <input type="checkbox" id={index} class="my-checkbox-x2" value={item.id} />
//                                                                             <span class="indicator"></span>
//                                                                         </label>

//                                                                         <label
//                                                                             htmlFor={index}
//                                                                             style={{
//                                                                                 cursor: "pointer",
//                                                                                 display: "flex",
//                                                                                 justifyContent: "center",
//                                                                                 alignItems: "center",
//                                                                             }}
//                                                                         >
//                                                                             <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "150px", paddingTop: 10 }}>
//                                                                                 <img
//                                                                                     style={{ width: "100%", padding: "0", borderRadius: "10px" }}
//                                                                                     className="description "
//                                                                                     src={item.cover}
//                                                                                     alt=""
//                                                                                 ></img>
//                                                                             </div>
//                                                                             <div className="f_flex" style={{ display: "flex", flexDirection: "column" }}>
//                                                                                 <span style={{ fontSize: 15, fontWeight: 700, lineHeight: 1, color: "#000" }}>{item.name}</span>
//                                                                                 <span style={{ fontSize: 14, fontWeight: 700, lineHeight: 2, color: "var(--primary)" }}>
//                                                                                     {item.price / 1000 + ".000"}đ
//                                                                                 </span>
//                                                                             </div>
//                                                                         </label>
//                                                                     </div>
//                                                                 </Col>
//                                                             ))}
//                                                         </Row>
//                                                     </div>
//                                                 </form>
//                                             </div>
//                                         </Card>
//                                     </div>
//                                 </Row>
//                                 <Col className="text-md-right mb-1" lg="12" xs="5">
//                                     <Button
//                                         onClick={() => {
//                                             setOpenModal(false);
//                                         }}
//                                         className="btn-neutral"
//                                         color="default"
//                                         size="lg"
//                                         style={{ background: "#fff", color: "#000", padding: "0.875rem 2rem" }}
//                                     >
//                                         <div className="flex" style={{ alignItems: "center" }}>
//                                             <i className="fa-solid fa-backward" style={{ fontSize: 18 }}></i>
//                                             <span>Đóng</span>
//                                         </div>
//                                     </Button>
//                                     <Button
//                                         onClick={() => {
//                                             handleUpdate();
//                                         }}
//                                         className="btn-neutral"
//                                         color="default"
//                                         size="lg"
//                                         style={{ background: "var(--primary)", color: "#000", padding: "0.875rem 2rem" }}
//                                     >
//                                         <div className="flex" style={{ alignItems: "center" }}>
//                                             <i className="fa-solid fa-square-plus" style={{ fontSize: 18 }}></i>
//                                             <span>Chỉnh Sửa</span>
//                                         </div>
//                                     </Button>
//                                 </Col>
//                             </Container>
//                         </CardBody>
//                     </Card>
//                 </div>
//             </Modal>
//         </>
//     );
// };
