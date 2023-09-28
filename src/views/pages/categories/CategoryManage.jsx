/*!

=========================================================
* Argon Dashboard PRO React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import ImageUploading from 'react-images-uploading'
import { debounce } from 'lodash'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Modal,
  Row,
  Spinner,
  Table,
} from 'reactstrap'
import {
  deleteCategory,
  getListCategorys,
  getListStoreCategorysByKey,
  postCategory,
} from '../../../apis/categoryApiService'
import { getListStoreByKey } from '../../../apis/storeApiService'
import Lottie from 'react-lottie'
import animationData from '../../../assets/loading.json'
import SimpleHeader from '../../../components/Headers/SimpleHeader'
import { CategoryModal } from '../../../components/Modals/categoryModal'
import { notify } from '../../../components/Toast/ToastCustom'
import { AppContext } from '../../../context/AppProvider'
import { CategoryItem } from './CategoryItem'
import { getBase64Image } from '../../../constants'
// core components
function CategoryManage() {
  const {
    storeCategoryModal,
    openDeleteModal,
    setOpenDeleteModal,
    openCategoryModal,
    setOpenCategoryModal,
  } = useContext(AppContext)
  let history = useHistory()
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  const [categoryList, setCategoryList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingCircle, setIsLoadingCircle] = useState(false)
  const [categoryName, setCategoryName] = useState('')
  const [categoryNameState, setCategoryNameState] = useState('')
  const [priority, setPriority] = useState('')
  const [priorityState, setPriorityState] = useState('')
  const [imageState, setImageState] = useState('')
  const [keyword, setKeyword] = useState('')
  const [images, setImages] = useState([])
  const maxNumber = 69

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    if (imageList.length > 0) {
      setImageState('valid')
    } else {
      setImageState('invalid')
    }
    console.log(imageList.length)
    setImages(imageList)
  }
  const validateCustomStylesForm = () => {
    let valid = true
    if (categoryName === '') {
      valid = false
      setCategoryNameState('invalid')
    } else {
      // valid = true;
      setCategoryNameState('valid')
    }
    if (priority === '') {
      valid = false
      setPriorityState('invalid')
    } else {
      // valid = true;
      setPriorityState('valid')
    }
    if (images.length === 0) {
      valid = false
      setImageState('invalid')
    } else {
      // valid = true;
      setImageState('valid')
    }

    return valid
  }

  const handleSubmit = () => {
    if (validateCustomStylesForm()) {
      setIsLoadingCircle(true)
      let cate = {
        name: categoryName,
        image: getBase64Image(images[0].data_url || '', images[0]?.file?.type),
        priority: priority,
      }
      postCategory(cate)
        .then((res) => {
          if (res.data) {
            console.log(res.data)
            setIsLoadingCircle(false)
            handleReload()
            setCategoryList([...categoryList, cate])
            notify('Thêm danh mục thành công', 'Success')
            setOpenCategoryModal(false)
            setImages([])
            setCategoryName('')
            // history.push("/admin/categories");
          }
        })
        .catch((error) => {
          console.log(error)
          setIsLoadingCircle(false)
          notify('Đã xảy ra lỗi gì đó!!', 'Error')
        })
    }
  }

  function fetchDropdownOptions(key) {
    setIsLoading(true)
    setCategoryList([])
    if (key !== '') {
      getListStoreCategorysByKey(key, 1, 100)
        .then((res) => {
          const cate = res.data
          console.log(cate)
          setTimeout(() => {
            setCategoryList(cate)
            setIsLoading(false)
          }, 1)
        })
        .catch((error) => console.log(error))
    } else {
      hanldeGetListCategorys()
    }
  }

  const debounceDropDown = useCallback(
    debounce((nextValue) => fetchDropdownOptions(nextValue), 1000),
    []
  )

  function handleInputOnchange(e) {
    const { value } = e.target
    setKeyword(value)
    debounceDropDown(value)
  }

  const hanldeGetListCategorys = () => {
    getListCategorys(1, 100).then((res) => {
      const categorys = res.data
      setCategoryList(categorys)
      setIsLoading(false)
    })
  }

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      hanldeGetListCategorys()
    }, 100)
  }, [])

  const handleDeleteCategory = (id) => {
    setIsLoadingCircle(true)
    deleteCategory(id)
      .then((res) => {
        if (res.data) {
          setIsLoading(false)
          notify('Xóa danh mục thành công', 'Success')
          // let NewStoreCategory = storeCategoryList.filter((item) => item.name !== name);
          // setStoreCategoryList([...NewStoreCategory]);
          handleReload()
          setOpenDeleteModal(false)
          setIsLoadingCircle(false)
        }
      })
      .catch((error) => {
        console.log(error)
        setIsLoadingCircle(false)
        setIsLoading(false)
        notify('Đã xảy ra lỗi gì đó!!', 'Error')
      })
  }

  const handleReload = () => {
    setIsLoading(true)
    hanldeGetListCategorys()
  }

  return (
    <>
      <CategoryModal handleReload={handleReload} />
      {/* <ProductModal openModal={openModal} handleReload={handleReload} /> */}
      <SimpleHeader name="Danh Sách Danh Mục" parentName="Quản Lý" />
      <Row>
        <Col md="4">
          <Modal
            className="modal-dialog-centered"
            size="md"
            isOpen={openCategoryModal}
            toggle={() => {
              setOpenCategoryModal(false)
              setImages([])
              setCategoryName('')
              setPriority('')
            }}
          >
            <div className="modal-body p-0">
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
                              <div
                                className="upload-img"
                                onClick={onImageUpload}
                              >
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

                <div className="col-md-12">
                  <form>
                    <div className="row">
                      <div className="col-md-12">
                        {/* Category */}
                        <div className="form-group">
                          <label className="form-control-label">
                            Tên danh mục <span style={{ color: 'red' }}>*</span>
                          </label>
                          <Input
                            valid={categoryNameState === 'valid'}
                            invalid={categoryNameState === 'invalid'}
                            placeholder="Ăn vặt"
                            className="form-control"
                            type="search"
                            id="example-search-input"
                            value={`${categoryName}`}
                            onChange={(e) => {
                              setCategoryName(e.target.value)
                              if (e.target.value === '') {
                                setCategoryNameState('invalid')
                              } else {
                                setCategoryNameState('valid')
                              }
                            }}
                          />
                          <div className="invalid-feedback">
                            Tên danh mục không được để trống
                          </div>
                        </div>

                        {/* PRIORITY */}
                        <div className="form-group">
                          <label className="form-control-label">
                            Thứ tự ưu tiên{' '}
                            <span style={{ color: 'red' }}>*</span>
                          </label>
                          <Input
                            min={0}
                            valid={priorityState === 'valid'}
                            invalid={priorityState === 'invalid'}
                            className="form-control"
                            type="number"
                            placeholder="Nhập thứ tự (số)"
                            id="example-search-input"
                            value={`${priority}`}
                            onChange={(e) => {
                              setPriority(e.target.value)
                              if (e.target.value === '') {
                                setPriorityState('invalid')
                              } else if (e.target.value < 0) {
                                setPriority(0)
                              } else {
                                setPriorityState('valid')
                              }
                            }}
                          />
                          <div className="invalid-feedback">
                            Thứ tự ưu tiên không được để trống
                          </div>
                        </div>
                      </div>
                    </div>

                    <Col className="mt-3  text-md-right mb-4" lg="12" xs="5">
                      <Button
                        onClick={() => {
                          setOpenCategoryModal(false)
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
          </Modal>
        </Col>
      </Row>
      {/* Delete modal */}
      {/* <Modal
        className="modal-dialog-centered"
        size="sm"
        isOpen={openDeleteModal}
        toggle={() => {
          setOpenDeleteModal(false)
        }}
      >
        <div className="modal-body p-0">
          <Card className="bg-secondary border-0 mb-0">
            <div className="" style={{ paddingTop: 0 }}>
              <Container
                className=""
                fluid
                style={{ padding: '1.5rem 1.5rem 1rem 1.5rem ' }}
              >
                <Row>
                  <div className="col-lg-12 ">
                    <h3>Bạn có chắc</h3>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        padding: '0px 0px 30px 0px',
                      }}
                      className=""
                    >
                      <span className="mb-0">
                        Danh mục:{' '}
                        <span style={{ fontWeight: 700 }}>
                          {storeCategoryModal.name}
                        </span>{' '}
                        sẽ bị xóa!!!{' '}
                      </span>
                      <span className="mb-0">
                        Bạn sẽ không thể hoàn nguyên hành động này{' '}
                      </span>
                    </div>
                    <div className="col-md-12"></div>
                  </div>
                </Row>
                <Col className="text-md-right mb-3" lg="12" xs="5">
                  <Row style={{ justifyContent: 'flex-end' }}>
                    {' '}
                    <Button
                      onClick={() => {
                        setOpenDeleteModal(false)
                      }}
                      // className="btn-neutral"
                      color="default"
                      size="lg"
                      style={{
                        background: '#fff',
                        color: '#000',
                        padding: '0.875rem 1rem',
                        border: 'none',
                      }}
                    >
                      <div
                        className="flex"
                        style={{
                          alignItems: 'center',
                          width: 80,
                          justifyContent: 'center',
                        }}
                      >
                        <span>Đóng</span>
                      </div>
                    </Button>
                    <Button
                      onClick={() => {
                        setIsLoadingCircle(true)
                        handleDeleteCategory(storeCategoryModal.id)
                        // hanldeDeleteStoreCate(storeCategoryModal.id, storeCategoryModal.name);
                      }}
                      className="btn-neutral"
                      disabled={isLoadingCircle}
                      color="default"
                      size="lg"
                      style={{
                        background: 'var(--primary)',
                        color: '#fff',
                        padding: '0.875rem 1rem',
                      }}
                    >
                      <div
                        className="flex"
                        style={{
                          alignItems: 'center',
                          width: 80,
                          justifyContent: 'center',
                        }}
                      >
                        {isLoadingCircle ? (
                          <Spinner
                            style={{
                              color: 'rgb(250,250,250)',
                              width: '1.31rem',
                              height: '1.31rem',
                            }}
                          >
                            Loading...
                          </Spinner>
                        ) : (
                          <>
                            <span>Chắc chắn</span>
                          </>
                        )}
                      </div>
                    </Button>
                  </Row>
                </Col>
              </Container>
            </div>
          </Card>
        </div>
      </Modal> */}
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '20px 0px',
                }}
                className="align-items-center"
              >
                <CardHeader className="" style={{ padding: '0 0 0 20px' }}>
                  <div
                    className="flex"
                    style={{ alignItems: 'center', gap: 20 }}
                  >
                    <div className="mb-0">
                      <InputGroup
                        className="input-group-lg input-group-flush"
                        style={{ border: '1px solid #9e9e9e' }}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText style={{ padding: '0 15px' }}>
                            <span className="fas fa-search" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Tìm kiếm bằng tên danh mục"
                          type="search"
                          onChange={handleInputOnchange}
                          className="btn-lg"
                          style={{ height: 46, width: 250 }}
                        />
                      </InputGroup>
                    </div>
                  </div>
                </CardHeader>

                <Col className="mt-3 mt-md-0 text-md-right" lg="6" xs="5">
                  <Button
                    onClick={() => {
                      // history.push("/admin/category");
                      setOpenCategoryModal(true)
                    }}
                    className="btn-neutral"
                    color="default"
                    size="lg"
                    style={{
                      background: 'var(--primary)',
                      color: '#fff',
                      fontWeight: 700,
                      border: '1px solid var(--primary)',
                    }}
                  >
                    + Thêm Danh Mục Mới
                  </Button>
                </Col>
              </div>

              {!isLoading && (
                <Table
                  className="align-items-center table-flush"
                  responsive
                  hover={true}
                  style={{ position: 'relative' }}
                >
                  <div
                    className={`loading-spin ${
                      !isLoading && 'loading-spin-done'
                    }`}
                  ></div>
                  <thead className="thead-light">
                    <tr>
                      <th className="sort table-title" scope="col">
                        STT
                      </th>
                      <th className="sort table-title" scope="col">
                        Hình ảnh
                      </th>

                      <th className="sort table-title" scope="col">
                        Tên danh mục
                      </th>
                      {/* <th className="sort table-title" scope="col">
                                                Mã danh mục
                                            </th> */}
                      <th className="sort table-title" scope="col">
                        Trạng thái
                      </th>
                      <th className="sort table-title" scope="col">
                        Thứ tự hiển thị
                      </th>

                      <th className="sort table-title" scope="col">
                        Hành động
                      </th>
                    </tr>
                  </thead>
                  <tbody className="list">
                    {categoryList.map((item, index) => {
                      return (
                        <CategoryItem data={item} key={index} index={index} />
                      )
                    })}
                  </tbody>
                </Table>
              )}
              {categoryList.length === 0 && !isLoading && (
                <>
                  <div
                    className="center_flex"
                    style={{ padding: '50px 0 0 0' }}
                  >
                    <img
                      src="/icons/empty.png"
                      alt=""
                      style={{ textAlign: 'center', width: 300 }}
                    />
                  </div>
                  <h1
                    className="description"
                    style={{
                      fontSize: 18,
                      textAlign: 'center',
                      padding: '20px 0 50px 0',
                    }}
                  >
                    Không có danh mục nào!!!
                  </h1>
                </>
              )}
              {isLoading && (
                <CardBody className=" center_flex">
                  <Lottie options={defaultOptions} height={400} width={400} />
                </CardBody>
              )}
              {/* {!isLoading && driverList.length > 0 && (
                                <CardFooter className="py-4">
                                    <nav aria-label="...">
                                        <Pagination className="pagination justify-content-end mb-0" listClassName="justify-content-end mb-0">
                                            <PaginationItem className="disabled">
                                                <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()} tabIndex="-1">
                                                    <i className="fas fa-angle-left" />
                                                    <span className="sr-only">Previous</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem className="active">
                                                <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                                                    1
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                                                    2 <span className="sr-only">(current)</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                                                    3
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                                                    <i className="fas fa-angle-right" />
                                                    <span className="sr-only">Next</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                        </Pagination>
                                    </nav>
                                </CardFooter>
                            )} */}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  )
}

export default CategoryManage
