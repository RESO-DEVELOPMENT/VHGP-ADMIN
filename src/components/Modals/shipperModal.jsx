import React, { useContext, useEffect, useState } from 'react'
import ImageUploading from 'react-images-uploading'
import Select from 'react-select'
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
} from 'reactstrap'
import { putShipper } from '../../apis/shiperApiService'
import { getStoreDetail, putStore } from '../../apis/storeApiService'
import { getBase64Image } from '../../constants'
import { AppContext } from '../../context/AppProvider'
import { notify } from '../Toast/ToastCustom'

export const ShipperModal = ({ handleReload }) => {
  const { openModal, setOpenModal, shipperModal, setShipperModal } =
    useContext(AppContext)
  const [driverName, setDriverName] = useState('')
  const [driverNameState, setDriverNameState] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneMessage, setPhoneMessage] = useState('')
  const [phoneState, setPhoneState] = useState('')
  const [vehicleType, setVehicleType] = useState('')
  const [vehicleTypeState, setVehicleTypeState] = useState('')
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehicleColorState, setVehicleColorState] = useState('')
  const [deliveryTeam, setdeliveryTeam] = useState('')
  const [deliveryTeamState, setDeliveryTeamState] = useState('')
  const [status, setStatus] = useState(0)
  const [userName, setUserName] = useState('')
  const [userNameState, setUserNameState] = useState('')
  const [password, setPassword] = useState('')
  const [passwordState, setPasswordState] = useState('')
  const [numberVehicle, setNumberVehicle] = useState('')
  const [numberVehicleState, setNumberVehicleState] = useState('')
  const [isLoadingCircle, setIsLoadingCircle] = useState(false)
  const [images, setImages] = React.useState([])
  // const [brand, setBrand] = useState("");
  const maxNumber = 69
  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList)
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
  const optionsDeliveryTeam = [
    {
      label: 'Unico',
      value: 1,
    },
  ]
  const optionsVehicleType = [
    {
      label: 'Xe máy',
      value: 1,
    },
    {
      label: 'Ô tô',
      value: 2,
    },
    {
      label: 'Xe tải',
      value: 3,
    },
  ]

  const checkPhoneValid = () => {
    if (phone.match(/^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/im)) {
      return true
    }
    return false
  }

  const validateCustomStylesForm = () => {
    let valid = true
    if (driverName === '') {
      valid = false
      setDriverNameState('invalid')
    } else {
      // valid = true;
      setDriverNameState('valid')
    }
    if (phone === '') {
      valid = false
      setPhoneState('invalid')
      setPhoneMessage('Số điện thoại không được để trống')
    } else if (!checkPhoneValid()) {
      valid = false
      setPhoneState('invalid')
      setPhoneMessage('Số điện thoại không hợp lệ')
    } else {
      // valid = true;
      setPhoneState('valid')
    }

    // if (images.length === 0) {
    //     valid = false;
    //     setImageState("invalid");
    // } else {
    //     // valid = true;
    //     setImageState("valid");
    // }

    if (vehicleType === '') {
      valid = false
      setVehicleTypeState('invalid')
    } else {
      // valid = true;
      setVehicleTypeState('valid')
    }
    if (numberVehicle === '') {
      valid = false
      setNumberVehicleState('invalid')
    } else {
      // valid = true;
      setNumberVehicleState('valid')
    }
    if (vehicleColor === '') {
      valid = false
      setVehicleColorState('invalid')
    } else {
      // valid = true;
      setVehicleColorState('valid')
    }
    if (deliveryTeam === '') {
      valid = false
      setDeliveryTeamState('invalid')
    } else {
      // valid = true;
      setDeliveryTeamState('valid')
    }

    return valid
  }
  useEffect(() => {
    setDriverName(shipperModal.fullName)
    setPhone(shipperModal.phone)
    setdeliveryTeam({
      label: shipperModal.deliveryTeam,
      value: shipperModal.deliveryTeam,
    })
    setNumberVehicle(shipperModal.licensePlates)
    setVehicleType({
      label: shipperModal.vehicleType,
      value: shipperModal.vehicleType,
    })
    setVehicleColor(shipperModal.colour)
    setStatus(
      shipperModal.status === 'Active' ? optionsStatus[0] : optionsStatus[1]
    )
    if (shipperModal.image !== null && shipperModal.image !== '') {
      setImages([{ data_url: shipperModal.image }])
    } else {
      setImages([])
    }

    return () => {}
  }, [shipperModal])

  const handleSubmit = () => {
    if (validateCustomStylesForm()) {
      setIsLoadingCircle(true)
      // const authentication = getAuth();
      let shipper = {
        id: shipperModal.id,
        fullName: driverName,
        phone: phone,
        email: shipperModal.id,
        vehicleType: vehicleType.label,
        image: images[0]
          ? getBase64Image(images[0].data_url || '', images[0]?.file?.type) ||
            ''
          : '',
        deliveryTeam: deliveryTeam.label,
        password: shipperModal.password,
        licensePlates: numberVehicle,
        colour: vehicleColor,
        status: status.value,
      }
      console.log({ shipper })
      putShipper(shipper)
        .then((res) => {
          if (res.data) {
            setIsLoadingCircle(false)
            handleReload()
            notify('Cập nhật thành công', 'Success')
            setOpenModal(false)
            setShipperModal({})
            setImages([])
          }
        })
        .catch((error) => {
          console.log(error)
          setIsLoadingCircle(false)
          notify('Đã xảy ra lỗi gì đó!!', 'Error')
        })
    }
  }
  const optionsStatus = [
    { label: 'Hoạt động', value: 'Active' },
    { label: 'Ngưng hoạt động', value: 'Deactive' },
  ]
  return (
    <>
      <Row>
        <Col md="4">
          <Modal
            className="modal-dialog-centered"
            size="xl"
            isOpen={openModal}
            toggle={() => {
              setShipperModal({})
              setImages([])
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
                      <div className="col-lg-4 modal-product">
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
                            <CardHeader className="border-0">
                              <h2 className="mb-0">Hình ảnh</h2>
                            </CardHeader>
                          </div>
                          <div className="col-md-12">
                            <form>
                              <div className="row">
                                <div
                                  className=""
                                  id="dropzone-single"
                                  style={{
                                    width: '100%',
                                    padding: '0 30px 30px 30px',
                                  }}
                                >
                                  <div className="" style={{ height: '100%' }}>
                                    <ImageUploading
                                      value={images}
                                      onChange={onChange}
                                      maxNumber={maxNumber}
                                      dataURLKey="data_url"
                                      acceptType={['jpg', 'png', 'jpeg']}
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
                                        <div
                                          className="upload-img"
                                          onClick={onImageUpload}
                                        >
                                          {images.length <= 0 && (
                                            <span
                                              style={
                                                isDragging
                                                  ? { color: 'red' }
                                                  : null
                                              }
                                              {...dragProps}
                                            >
                                              Tải ảnh
                                            </span>
                                          )}
                                          {imageList.map((image, index) => (
                                            <div
                                              key={index}
                                              className="upload-img"
                                            >
                                              <img
                                                id="image-url"
                                                src={image.data_url}
                                                alt=""
                                                width="100"
                                              />
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </ImageUploading>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </Card>
                      </div>
                      <div className="col-lg-8 modal-product">
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
                              <h2 className="mb-0">Thông tin tài xế </h2>
                            </CardHeader>
                          </div>
                          <div className="col-md-12">
                            <form>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label className="form-control-label">
                                      Tên đăng nhập
                                    </label>
                                    <Input
                                      className="form-control"
                                      type="search"
                                      id="example-search-input"
                                      value={shipperModal.id}
                                      readOnly
                                      onChange={() => {}}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label className="form-control-label">
                                      Mật khẩu
                                    </label>
                                    <Input
                                      className="form-control"
                                      type="search"
                                      id="example-search-input"
                                      value={shipperModal.password}
                                      readOnly
                                      onChange={(e) => {
                                        setPassword(e.target.value)
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label className="form-control-label">
                                      Tên tài xế{' '}
                                    </label>
                                    <Input
                                      valid={driverNameState === 'valid'}
                                      invalid={driverNameState === 'invalid'}
                                      className="form-control"
                                      type="search"
                                      id="example-search-input"
                                      value={`${driverName}`}
                                      onChange={(e) => {
                                        setDriverName(e.target.value)
                                      }}
                                    />
                                    <div className="invalid-feedback">
                                      Tên tài xế không được để trống
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label className="form-control-label">
                                      Số điện thoại{' '}
                                    </label>
                                    <Input
                                      valid={phoneState === 'valid'}
                                      invalid={phoneState === 'invalid'}
                                      className="form-control"
                                      type="search"
                                      id="example-search-input"
                                      value={`${phone}`}
                                      onChange={(e) => {
                                        setPhone(e.target.value)
                                      }}
                                    />
                                    <div className="invalid-feedback">
                                      {phoneMessage}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label className="form-control-label">
                                      Đội giao hàng{' '}
                                      <span style={{ color: 'red' }}>*</span>
                                    </label>
                                    <div
                                      className={`${
                                        deliveryTeamState === 'invalid' &&
                                        'error-select'
                                      }`}
                                    >
                                      <Select
                                        options={optionsDeliveryTeam}
                                        placeholder="Đội giao hàng"
                                        styles={customStylesPayment}
                                        value={deliveryTeam}
                                        onChange={(e) => {
                                          setdeliveryTeam(e)
                                        }}
                                      />
                                    </div>
                                    {deliveryTeamState === 'invalid' && (
                                      <div
                                        className="invalid"
                                        style={{
                                          fontSize: '80%',
                                          color: '#fb6340',
                                          marginTop: '0.25rem',
                                        }}
                                      >
                                        Đội giao hàng không được để trống
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
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
                                  style={{ padding: '15px 15px 15px 0' }}
                                >
                                  <h2 className="mb-0">
                                    Thông tin phương tiện{' '}
                                  </h2>
                                </CardHeader>
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label className="form-control-label">
                                      Loại phương tiện{' '}
                                      <span style={{ color: 'red' }}>*</span>
                                    </label>
                                    <div
                                      className={`${
                                        vehicleTypeState === 'invalid' &&
                                        'error-select'
                                      }`}
                                    >
                                      <Select
                                        options={optionsVehicleType}
                                        placeholder="Loại phương tiện"
                                        styles={customStylesPayment}
                                        value={vehicleType}
                                        onChange={(e) => {
                                          setVehicleType(e)
                                        }}
                                      />
                                    </div>
                                    {vehicleTypeState === 'invalid' && (
                                      <div
                                        className="invalid"
                                        style={{
                                          fontSize: '80%',
                                          color: '#fb6340',
                                          marginTop: '0.25rem',
                                        }}
                                      >
                                        Loại phương tiện không được để trống
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label className="form-control-label">
                                      Biển số{' '}
                                      <span style={{ color: 'red' }}>*</span>
                                    </label>
                                    <Input
                                      valid={numberVehicleState === 'valid'}
                                      invalid={numberVehicleState === 'invalid'}
                                      className="form-control"
                                      type="search"
                                      id="example-search-input"
                                      value={`${numberVehicle}`}
                                      onChange={(e) => {
                                        setNumberVehicle(e.target.value)
                                      }}
                                    />
                                    <div className="invalid-feedback">
                                      Biển số không được để trống
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label className="form-control-label">
                                      Màu sắc{' '}
                                      <span style={{ color: 'red' }}>*</span>
                                    </label>
                                    <Input
                                      valid={vehicleColorState === 'valid'}
                                      invalid={vehicleColorState === 'invalid'}
                                      className="form-control"
                                      type="search"
                                      id="example-search-input"
                                      value={vehicleColor}
                                      onChange={(e) => {
                                        setVehicleColor(e.target.value)
                                      }}
                                    />
                                    <div className="invalid-feedback">
                                      Màu sắc không được để trống
                                    </div>
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
                          handleSubmit()
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
