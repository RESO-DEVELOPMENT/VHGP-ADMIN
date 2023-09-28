import React, { useContext, useEffect, useState } from 'react'
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
import { postMenu } from '../../../apis/menuApiService'
import SimpleHeader from '../../../components/Headers/SimpleHeader'
import { notify } from '../../../components/Toast/ToastCustom'
import { AppContext } from '../../../context/AppProvider'

export const NewMenu = () => {
  const { categoryList, areaList } = useContext(AppContext)
  const [menuName, setMenuName] = useState('')
  const [menuNameState, setMenuNameState] = useState('')
  const [Mode, setMode] = useState('')
  const [ModeState, setModeState] = useState('')
  const [openTime, setOpenTime] = useState('')
  const [openTimeState, setOpenTimeState] = useState('')
  const [closeTime, setCloseTime] = useState('')
  const [closeTimeState, setCloseTimeState] = useState('')
  const [Category, setCategory] = useState('')
  const [CategoryState, setCategoryState] = useState('')
  const [isLoadingCircle, setIsLoadingCircle] = useState(false)
  const [storeCategoryState, setStoreCategoryState] = useState('')
  const [priorityState, setPriorityState] = useState('')
  const [priority, setPriority] = useState('')
  const [images, setImages] = React.useState([])
  const [imageState, setImageState] = React.useState('')

  const [shipCost, setShipCost] = useState('')
  const [shipCostState, setShipCostState] = useState('')
  const [area, setArea] = useState('')
  const [areaState, setAreaState] = useState('')

  const maxNumber = 69
  let history = useHistory()

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex)
    setImages(imageList)
  }

  const customStyles = {
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

  const customStylesCategory = {
    control: (provided, state) => ({
      ...provided,
      background: '#fff',
      borderColor: '#dee2e6',
      minHeight: '30px',
      height: CategoryState === 'valid' ? null : '46px',
      // width: "200px",
      boxShadow: state.isFocused ? null : null,
      borderRadius: '0.5rem',
    }),

    input: (provided, state) => ({
      ...provided,
      margin: '5px',
    }),
  }

  const optionsCategory = categoryList.map((item) => {
    return {
      label: item.name,
      value: item.id,
    }
  })

  const optionsArea = areaList.map((item) => {
    return {
      label: item.name,
      value: item.id,
    }
  })

  const getModeName = (mode) => {
    switch (mode) {
      case '1':
        return 'Gọi Món'
      case '2':
        return 'Giao Hàng'
      case '3':
        return 'Đặt Hàng'
      default:
        return 'Gọi Món'
    }
  }

  const optionsMode = ['1', '2', '3'].map((item) => {
    return {
      label: getModeName(item),
      value: item,
    }
  })

  const validateCustomStylesForm = () => {
    let valid = true
    if (menuName === '') {
      valid = false
      setMenuNameState('invalid')
    } else {
      // valid = true;
      setMenuNameState('valid')
    }
    if (shipCost === '') {
      valid = false
      setShipCostState('invalid')
    } else {
      setShipCostState('valid')
    }
    if (openTime === '') {
      valid = false
      setOpenTimeState('invalid')
    } else {
      // valid = true;
      setOpenTimeState('valid')
    }
    if (closeTime === '') {
      valid = false
      setCloseTimeState('invalid')
    } else {
      // valid = true;
      setCloseTimeState('valid')
    }
    // if (images.length === 0) {
    //     valid = false;
    //     setImageState("invalid");
    // } else {
    //     // valid = true;
    //     setImageState("valid");
    // }
    if (Category === '') {
      valid = false
      setCategoryState('invalid')
    } else {
      // valid = true;
      setCategoryState('valid')
    }

    if (area === '') {
      valid = false
      setAreaState('invalid')
    } else {
      // valid = true;
      setAreaState('valid')
    }

    if (Mode === '') {
      valid = false
      setModeState('invalid')
    } else {
      // valid = true;
      setModeState('valid')
    }
    if (priority === '') {
      valid = false
      setPriorityState('invalid')
    } else {
      // valid = true;
      setPriorityState('valid')
    }

    return valid
  }

  const handleSubmit = () => {
    if (validateCustomStylesForm()) {
      setIsLoadingCircle(true)

      let categories = Category.map((item) => {
        return item.value
      })

      let areas = area.map((item) => {
        return item.value
      })

      let menu = {
        name: menuName,
        image: '',
        startHour: parseFloat(openTime),
        endHour: parseFloat(closeTime),
        modeId: Mode.value,
        priority: priority,
        shipCost: parseFloat(shipCost),
        listCategory: categories,
        listAreaId: areas,
      }

      postMenu(menu)
        .then((res) => {
          if (res.data) {
            setIsLoadingCircle(false)
            notify('Thêm mới thành công', 'Success')
            history.push('/admin/menus')
          }
        })
        .catch((error) => {
          console.log(error)
          setIsLoadingCircle(false)
          notify('Đã xảy ra lỗi gì đó!!', 'Error')
        })
    }
  }

  return (
    <>
      <SimpleHeader name="Thêm Mới Thực Đơn" parentName="Quản Lý" />
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
          {/* <div className="col-lg-4">
                        <Card>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "10px 0px" }} className="align-items-center">
                                <CardHeader className="border-0" style={{ padding: "1rem" }}>
                                    <h2 className="mb-0">
                                        Hình ảnh <span style={{ color: "red" }}>*</span>
                                    </h2>
                                </CardHeader>
                            </div>
                            <div className="col-md-12">
                                <form>
                                    <div className="row">
                                        <div className="" id="dropzone-single" style={{ width: "100%", padding: "0 30px 30px 30px" }}>
                                            <div className="" style={{ height: "100%" }}>
                                                <ImageUploading value={images} onChange={onChange} maxNumber={maxNumber} dataURLKey="data_url" acceptType={["jpg", "png", "jpeg"]}>
                                                    {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                                                        // write your building UI
                                                        <div className="upload-img" onClick={onImageUpload}>
                                                            {images.length <= 0 && (
                                                                <span style={isDragging ? { color: "red" } : null} {...dragProps}>
                                                                    Tải ảnh
                                                                </span>
                                                            )}
                                                            {imageList.map((image, index) => (
                                                                <div key={index} className="upload-img">
                                                                    <img src={image.data_url} alt="" width="100" />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </ImageUploading>
                                                {imageState === "invalid" && (
                                                    <div className="invalid" style={{ textAlign: "center", fontSize: "80%", color: "#fb6340", marginTop: "0.25rem" }}>
                                                        Hình ảnh không được để trống
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </Card>
                    </div> */}
          <div className="col-lg-8">
            <Card>
              {/* TITLE */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '10px 0px',
                }}
                className="align-items-center"
              >
                <CardHeader className="border-0" style={{ padding: '15px' }}>
                  <h2 className="mb-0">Thông tin thực đơn </h2>
                </CardHeader>
              </div>

              {/* FORM NEW MENU */}
              <div className="col-md-12">
                <form>
                  <div className="row">
                    {/* NAME */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-control-label">
                          Tên thực đơn <span style={{ color: 'red' }}>*</span>
                        </label>
                        <Input
                          valid={menuNameState === 'valid'}
                          invalid={menuNameState === 'invalid'}
                          className="form-control"
                          type="search"
                          id="example-search-input"
                          value={`${menuName}`}
                          onChange={(e) => {
                            setMenuName(e.target.value)
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
                          Loại thực đơn <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div
                          className={`${
                            ModeState === 'invalid' && 'error-select'
                          }`}
                        >
                          <Select
                            options={optionsMode}
                            placeholder="Loại thực đơn"
                            styles={customStyles}
                            value={Mode}
                            onChange={(e) => {
                              setMode(e)
                            }}
                          />
                        </div>
                        {ModeState === 'invalid' && (
                          <div
                            className="invalid"
                            style={{
                              fontSize: '80%',
                              color: '#fb6340',
                              marginTop: '0.25rem',
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
                          Giờ bắt đầu <span style={{ color: 'red' }}>*</span>
                        </label>
                        <Input
                          valid={openTimeState === 'valid'}
                          invalid={openTimeState === 'invalid'}
                          className="form-control"
                          type="number"
                          id="example-search-input"
                          value={`${openTime}`}
                          onChange={(e) => {
                            setOpenTime(e.target.value)
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
                          Giờ kết thúc <span style={{ color: 'red' }}>*</span>
                        </label>
                        <Input
                          valid={closeTimeState === 'valid'}
                          invalid={closeTimeState === 'invalid'}
                          className="form-control"
                          type="number"
                          id="example-search-input"
                          value={`${closeTime}`}
                          onChange={(e) => {
                            setCloseTime(e.target.value)
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
                          Độ ưu tiên <span style={{ color: 'red' }}>*</span>
                        </label>
                        <Input
                          valid={priorityState === 'valid'}
                          invalid={priorityState === 'invalid'}
                          className="form-control"
                          type="number"
                          id="example-search-input"
                          value={`${priority}`}
                          onChange={(e) => {
                            setPriority(e.target.value)
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
                          Phí ship <span style={{ color: 'red' }}>*</span>
                        </label>
                        <Input
                          min={0}
                          max={100000}
                          valid={shipCostState === 'valid'}
                          invalid={shipCostState === 'invalid'}
                          className="form-control"
                          type="number"
                          id="example-search-input"
                          value={`${shipCost}`}
                          onChange={(e) => {
                            setShipCost(e.target.value)
                          }}
                        />
                        <div className="invalid-feedback">
                          Giờ bắt đầu không được để trống
                        </div>
                      </div>
                    </div>

                    {/* CATEGORIES */}
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-control-label">
                          Danh mục <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div
                          className={`${
                            CategoryState === 'invalid' && 'error-select'
                          }`}
                        >
                          <Select
                            options={optionsCategory}
                            isMulti
                            placeholder="Danh mục"
                            // styles={customStylesCategory}
                            value={Category}
                            closeMenuOnSelect={false}
                            onChange={(e) => {
                              setCategory(e)
                            }}
                          />
                        </div>
                        {CategoryState === 'invalid' && (
                          <div
                            className="invalid"
                            style={{
                              fontSize: '80%',
                              color: '#fb6340',
                              marginTop: '0.25rem',
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
                          Khu vực <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div
                          className={`${
                            areaState === 'invalid' && 'error-select'
                          }`}
                        >
                          <Select
                            options={optionsArea}
                            isMulti
                            placeholder="Khu vực"
                            // styles={customStylesCategory}
                            value={area}
                            closeMenuOnSelect={false}
                            onChange={(e) => {
                              setArea(e)
                            }}
                          />
                        </div>
                        {areaState === 'invalid' && (
                          <div
                            className="invalid"
                            style={{
                              fontSize: '80%',
                              color: '#fb6340',
                              marginTop: '0.25rem',
                            }}
                          >
                            Khu vực không được để trống
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}
                  <Col className="mt-3  text-md-right mb-4" lg="12" xs="5">
                    {/* BACK BUTTON */}
                    <Button
                      onClick={() => {
                        history.push('/admin/menus')
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

                    {/* CREATE BUTTON */}
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
