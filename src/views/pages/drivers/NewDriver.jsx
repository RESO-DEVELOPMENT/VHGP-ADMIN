import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import ImageUploading from 'react-images-uploading'
import { useHistory } from 'react-router'
import Select from 'react-select'
import {
  Button,
  Card,
  CardHeader,
  Col,
  Container,
  Input,
  Row,
  Spinner,
} from 'reactstrap'
import { postShipper } from '../../../apis/shiperApiService'
import SimpleHeader from '../../../components/Headers/SimpleHeader'
import { notify } from '../../../components/Toast/ToastCustom'
import { getBase64Image } from '../../../constants'
import { AppContext } from '../../../context/AppProvider'

export const NewDriver = () => {
  const { storeCategoryList } = useContext(AppContext)
  const [driverName, setDriverName] = useState('')
  const [driverNameState, setDriverNameState] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneState, setPhoneState] = useState('')
  const [phoneMessage, setPhoneMessage] = useState('')
  const [vehicleType, setVehicleType] = useState('')
  const [vehicleTypeState, setVehicleTypeState] = useState('')
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehicleColorState, setVehicleColorState] = useState('')
  const [deliveryTeam, setdeliveryTeam] = useState('')
  const [deliveryTeamState, setDeliveryTeamState] = useState('')
  const [userName, setUserName] = useState('')
  const [userNameMess, setUserNameMess] = useState('')
  const [userNameState, setUserNameState] = useState('')
  const [password, setPassword] = useState('')
  const [passwordState, setPasswordState] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')
  const [numberVehicle, setNumberVehicle] = useState('')
  const [numberVehicleState, setNumberVehicleState] = useState('')
  const [isLoadingCircle, setIsLoadingCircle] = useState(false)
  const [images, setImages] = React.useState([])
  const [imageState, setImageState] = React.useState('')
  const maxNumber = 69
  let history = useHistory()
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

  const optionsCategoryStore = storeCategoryList.map((item) => {
    return {
      label: item.name,
      value: item.id,
    }
  })
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

  const checkEmailValid = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userName)) {
      return true
    }
    return false
  }

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
    if (userName === '') {
      valid = false
      setUserNameState('invalid')
      setUserNameMess('Tên đăng nhập không được để trống')
    } else if (!checkEmailValid()) {
      valid = false
      setUserNameState('invalid')
      setUserNameMess('Tên đăng nhập không hợp lệ')
    } else {
      // valid = true;
      setUserNameState('valid')
    }
    if (password === '') {
      valid = false
      setPasswordState('invalid')
      setPasswordMessage('Mật khẩu không được để trống')
    } else if (password.length < 6) {
      valid = false
      setPasswordState('invalid')
      setPasswordMessage('Mật khẩu phải tối thiểu 6 kí tự')
    } else {
      // valid = true;
      setPasswordState('valid')
    }
    if (images.length === 0) {
      valid = false
      setImageState('invalid')
    } else {
      // valid = true;
      setImageState('valid')
    }

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
  const handleSubmit = () => {
    if (validateCustomStylesForm()) {
      setIsLoadingCircle(true)
      // const authentication = getAuth();
      let shipper = {
        id: userName,
        fullName: driverName,
        phone: phone,
        email: userName,
        vehicleType: vehicleType.label,
        image: images[0]
          ? getBase64Image(images[0].data_url || '', images[0]?.file?.type) ||
            ''
          : '',
        deliveryTeam: deliveryTeam.label,
        password: password,
        licensePlates: numberVehicle,
        colour: vehicleColor,
      }
      console.log({ shipper })

      const authentication = getAuth()
      createUserWithEmailAndPassword(authentication, userName, password)
        .then((response) => {
          if (response) {
            postShipper(shipper)
              .then((res) => {
                if (res.data) {
                  setIsLoadingCircle(false)
                  notify('Thêm mới thành công', 'Success')
                  history.push('/admin/drivers')
                }
              })
              .catch((error) => {
                const authentication = getAuth().currentUser
                authentication
                  .delete()
                  .then(function () {
                    console.log(error)
                    setIsLoadingCircle(false)
                    notify('Đã xảy ra lỗi gì đó!!', 'Error')
                  })
                  .catch(function (error) {
                    // An error happened.
                    console.log(error)
                    setIsLoadingCircle(false)
                    notify('Đã xảy ra lỗi gì đó!!', 'Error')
                  })
              })
          } else {
            notify('Tên đăng nhập đã được sử dụng', 'Error')
            setIsLoadingCircle(false)
          }
        })
        .catch((error) => {
          notify('Tên đăng nhập đã được sử dụng', 'Error')
          console.log(error)
          setIsLoadingCircle(false)
        })
    }
  }
  return (
    <>
      <SimpleHeader name="Thêm Mới Tài Xế" parentName="Quản Lý" />
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
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '10px 0px',
                }}
                className="align-items-center"
              >
                <CardHeader className="border-0" style={{ padding: '1rem' }}>
                  <h2 className="mb-0">
                    Hình ảnh <span style={{ color: 'red' }}>*</span>
                  </h2>
                </CardHeader>
              </div>
              <div className="col-md-12">
                <form>
                  <div className="row">
                    <div
                      className=""
                      id="dropzone-single"
                      style={{ width: '100%', padding: '0 30px 30px 30px' }}
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
                            <div className="upload-img" onClick={onImageUpload}>
                              {images.length <= 0 && (
                                <span
                                  style={isDragging ? { color: 'red' } : null}
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
                        {imageState === 'invalid' && (
                          <div
                            className="invalid"
                            style={{
                              textAlign: 'center',
                              fontSize: '80%',
                              color: '#fb6340',
                              marginTop: '0.25rem',
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
              <div className="col-md-12">
                <form>
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
                      <h2 className="mb-0">Thông tin tài xế </h2>
                    </CardHeader>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-control-label">
                          Tên tài xế <span style={{ color: 'red' }}>*</span>
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
                          Số điện thoại <span style={{ color: 'red' }}>*</span>
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
                        <div className="invalid-feedback">{phoneMessage}</div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-control-label">
                          Email đăng nhập{' '}
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <Input
                          valid={userNameState === 'valid'}
                          invalid={userNameState === 'invalid'}
                          className="form-control"
                          type="email"
                          id="example-search-input"
                          value={`${userName}`}
                          onChange={(e) => {
                            setUserName(e.target.value)
                          }}
                        />
                        <div className="invalid-feedback">{userNameMess}</div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-control-label">
                          Mật khẩu <span style={{ color: 'red' }}>*</span>
                        </label>
                        <Input
                          valid={passwordState === 'valid'}
                          invalid={passwordState === 'invalid'}
                          className="form-control"
                          type="search"
                          id="example-search-input"
                          value={`${password}`}
                          onChange={(e) => {
                            setPassword(e.target.value)
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
                          Đội giao hàng <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div
                          className={`${
                            deliveryTeamState === 'invalid' && 'error-select'
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
                      <h2 className="mb-0">Thông tin phương tiện </h2>
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
                            vehicleTypeState === 'invalid' && 'error-select'
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
                          Biển số <span style={{ color: 'red' }}>*</span>
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
                          Màu sắc <span style={{ color: 'red' }}>*</span>
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
                  </div>
                  <Col className="mt-3  text-md-right mb-4" lg="12" xs="5">
                    <Button
                      onClick={() => {
                        history.push('/admin/drivers')
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
                        <span>Trở Về</span>
                      </div>
                    </Button>
                    <Button
                      onClick={() => {
                        handleSubmit()
                      }}
                      className="btn-neutral"
                      color="default"
                      size="lg"
                      disabled={isLoadingCircle}
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
                            <span style={{ color: '#fff' }}>Thêm mới</span>
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
  )
}
