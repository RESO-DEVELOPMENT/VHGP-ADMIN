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
  Input,
  Modal,
  Row,
  Spinner,
} from 'reactstrap'
import { putCategory } from '../../apis/categoryApiService'
import { AppContext } from '../../context/AppProvider'
import ImageUploading from 'react-images-uploading'
import { notify } from '../Toast/ToastCustom'
import { getBase64Image } from '../../constants'
export const CategoryModal = ({ handleReload }) => {
  const { openModal, setOpenModal, categoryModal } = useContext(AppContext)
  const [categoryId, setCategoryId] = useState('')

  const [categoryName, setCategoryName] = useState('')
  const [categoryNameState, setCategoryNameState] = useState('')
  const [status, setStatus] = useState(0)
  const [statusState, setStatusState] = useState('')
  const [priority, setPriority] = useState(0)
  const [priorityState, setPriorityState] = useState('')
  const [message, setMessage] = useState('')

  const [images, setImages] = React.useState([])
  const [imageState, setImageState] = useState('')
  const [imgUpdate, setImgUpdate] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingCircle, setIsLoadingCircle] = useState(false)
  let history = useHistory()
  const maxNumber = 69

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    if (imageList.length > 0) {
      setImageState('valid')
      setImgUpdate(true)
    } else {
      setImageState('invalid')
    }
    console.log(imageList)
    setImages(imageList)
  }

  useEffect(() => {
    setCategoryName(categoryModal.name)
    setCategoryId(categoryModal.id)
    setPriority(categoryModal.priority)
    if (categoryModal.image) {
      setImages([{ data_url: categoryModal.image }])
    } else {
      setImages([])
    }
    setStatus(
      categoryModal.status === 'Active' ? optionsStatus[0] : optionsStatus[1]
    )
  }, [categoryModal, openModal])

  const validateCustomStylesForm = () => {
    let valid = true
    // Category
    if (categoryName === '') {
      valid = false
      setCategoryNameState('invalid')
    } else {
      setCategoryNameState('valid')
    }

    // Priority
    if (priority === '') {
      valid = false
      setMessage('Độ ưu tiên không được để trống')
      setPriorityState('invalid')
    } else if (priority < 0) {
      valid = false
      setMessage('Độ ưu tiên không được là số âm')
      setPriorityState('invalid')
    } else {
      setPriorityState('valid')
    }

    // Status
    if (status === '') {
      valid = false
      setStatusState('invalid')
    } else {
      setStatusState('valid')
    }

    return valid
  }

  const handleUpdate = () => {
    if (validateCustomStylesForm()) {
      setIsLoadingCircle(true)
      let categoryUpdate = {
        id: categoryId,
        name: categoryName,
        image: getBase64Image(images[0].data_url || '', images[0]?.file?.type),
        status: status.value,
        priority: priority,
      }
      console.log({ categoryUpdate })
      putCategory(categoryUpdate, imgUpdate)
        .then((res) => {
          if (res.data) {
            setIsLoading(false)
            notify('Cập nhật thành công', 'Success')
            history.push('/admin/categories')
            handleReload()

            setOpenModal(false)
            setImgUpdate(false)
            setIsLoadingCircle(false)
          }
        })
        .catch((error) => {
          console.log(error)
          setIsLoading(false)
          notify('Đã xảy ra lỗi gì đó!!', 'Error')
        })
    }
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
    { label: 'Hoạt động', value: 'Active' },
    { label: 'Ngưng hoạt động', value: 'Inactive' },
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
              setOpenModal(false)
              setImgUpdate(false)
            }}
          >
            <div className="modal-body p-0">
              <Card className="bg-secondary border-0 mb-0">
                {/* CART HEADER */}
                <CardHeader
                  className="bg-transparent "
                  style={{ border: 'none' }}
                >
                  <h3>Chi tiết</h3>
                </CardHeader>

                {/* CART BODY */}
                <CardBody className="" style={{ paddingTop: 0 }}>
                  <Container className="" fluid style={{ padding: '0 0px' }}>
                    <Row>
                      {/* lEFT */}
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
                                      acceptType={['jpg', 'png']}
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

                      {/* RIGHT */}
                      <div className="col-lg-8 modal-product">
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
                            <CardHeader
                              className="border-0"
                              style={{ padding: '15px' }}
                            >
                              <h2 className="mb-0">Thông tin danh mục </h2>
                            </CardHeader>
                          </div>

                          {/* DETAILS */}
                          <div className="col-md-12">
                            <form>
                              <div className="row">
                                {/* CATEGORY NAME */}
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label className="form-control-label">
                                      Tên danh mục{' '}
                                    </label>
                                    <Input
                                      valid={categoryNameState === 'valid'}
                                      invalid={categoryNameState === 'invalid'}
                                      className="form-control input-group"
                                      type="search"
                                      id="example-search-input"
                                      value={`${categoryName}`}
                                      onChange={(e) => {
                                        setCategoryName(e.target.value)
                                      }}
                                    />
                                    <div className="invalid-feedback">
                                      Tên cửa hàng không được để trống
                                    </div>
                                  </div>
                                </div>

                                {/* PRIORITY */}
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label className="form-control-label">
                                      Thứ tự hiển thị{' '}
                                    </label>
                                    <Input
                                      min={0}
                                      valid={priorityState === 'valid'}
                                      invalid={priorityState === 'invalid'}
                                      className="form-control"
                                      type="number"
                                      id="example-search-input"
                                      value={`${priority}`}
                                      onChange={(e) => {
                                        setPriority(e.target.value)
                                        if (e.target.value < 0) {
                                          setPriority(0)
                                        }
                                      }}
                                    />
                                    <div className="invalid-feedback">
                                      {message}
                                    </div>
                                  </div>
                                  <div className="invalid-feedback">
                                    {message}
                                  </div>
                                </div>

                                {/* STATUS */}
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label className="form-control-label">
                                      Trạng thái
                                    </label>
                                    <Select
                                      valid={priorityState === 'valid'}
                                      invalid={priorityState === 'invalid'}
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
                                    <div className="invalid-feedback">
                                      Trạng thái không được để trống
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </Card>
                      </div>
                    </Row>

                    {/* ACTION BUTTONS */}
                    <Col className="text-md-right mb-3" lg="12" xs="5">
                      {/* CLOSE BUTTON */}
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

                      {/* SUBMIT BUTTON */}
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
                          border: '1px solid var(--primary)',
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
