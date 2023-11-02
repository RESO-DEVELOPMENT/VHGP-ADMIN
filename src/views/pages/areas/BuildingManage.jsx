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
import { useContext, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
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
  Table,
} from 'reactstrap'
import { deleteBuilding } from '../../../apis/areaApiService'
import { getListBuildingByAreaId } from '../../../apis/storeApiService'
import SimpleHeader from '../../../components/Headers/SimpleHeader'
import { BuildingModal } from '../../../components/Modals/buildingModal'
import { notify } from '../../../components/Toast/ToastCustom'
import { AppContext } from '../../../context/AppProvider'
import { BuildingItem } from './BuildingItem'
import { NewBuilding } from './NewBuilding'
import Lottie from 'react-lottie'
import animationData from '../../../assets/loading.json'
// core components
function BuildingManage() {
  const {
    storeCategoryModal,
    setOpenDeleteModal,
    openDeleteModal,
    setOpenNewBuildingModal,
  } = useContext(AppContext)
  let history = useHistory()

  const [buildings, setBuildings] = useState([])

  const [listCluster, setListCluster] = useState([])
  const [clusterSelected, setclusterSelected] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingCircle, setIsLoadingCircle] = useState(false)
  let location = useLocation()
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  const hanldeGetBuildingByArea = (value) => {
    let areaId = location.pathname.split('/')[3]
    setIsLoading(true)
    setBuildings([])
    getListBuildingByAreaId(areaId)
      .then((res) => {
        if (res.data) {
          const buidlingList = res.data
          buidlingList.listCluster.map((item, ind) => {
            if (item.id === value) {
              setBuildings(item.listBuilding)
              setclusterSelected(item.id)
            }
          })
          setListCluster(buidlingList.listCluster)
          setIsLoading(false)
        } else {
          setBuildings([])
          setIsLoading(false)
        }
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
        setBuildings([])
        notify('Đã xảy ra lỗi gì đó!!', 'Error')
      })
  }
  useEffect(() => {
    // setIsLoading(true);
    // setBuildings(buildingModal.listBuilding);
    // console.log({ buildingModal });
    // setIsLoading(false);
    let clusterId = location.pathname.split('/')[5]

    hanldeGetBuildingByArea(clusterId)
    // getListArea(1, 100)
    //     .then((res) => {
    //         if (res.data) {
    //             const areaList = res.data;
    //             let newArea = areaList.map((item) => {
    //                 return { value: item.id, label: item.name };
    //             });
    //             setAreaSelected(newArea[0]);
    //             setAreas(newArea);
    //             hanldeGetBuildingByArea(newArea[0].value);
    //             setIsLoading(false);
    //         } else {
    //             setAreas([]);
    //         }
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //         setIsLoading(false);
    //         setAreas([]);
    //         notify("Đã xảy ra lỗi gì đó!!", "Error");
    //     });
  }, [])

  const handleReload = () => {
    let clusterId = location.pathname.split('/')[5]
    hanldeGetBuildingByArea(clusterId)
    // setIsLoading(true);
    // getListArea(1, 100)
    //     .then((res) => {
    //         if (res.data) {
    //             const areaList = res.data;
    //             let newArea = areaList.map((item) => {
    //                 return { value: item.id, label: item.name };
    //             });
    //             setclusterSelected(newArea[0]);
    //             setAreas(newArea);
    //             // hanldeGetBuildingByArea(newArea[0].value);
    //             setIsLoading(false);
    //         } else {
    //             setAreas([]);
    //         }
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //         setIsLoading(false);
    //         setAreas([]);
    //         notify("Đã xảy ra lỗi gì đó!!", "Error");
    //     });
  }
  // const handleUpdateReload = (area) => {
  //     setIsLoading(true);
  //     getListArea(1, 100)
  //         .then((res) => {
  //             if (res.data) {
  //                 const areaList = res.data;
  //                 let newArea = areaList.map((item) => {
  //                     return { value: item.id, label: item.name };
  //                 });
  //                 setAreaSelected(area);
  //                 setAreas(newArea);
  //                 // hanldeGetBuildingByArea(area.value);
  //                 setIsLoading(false);
  //             } else {
  //                 setAreas([]);
  //             }
  //         })
  //         .catch((error) => {
  //             console.log(error);
  //             setIsLoading(false);
  //             setAreas([]);
  //             notify("Đã xảy ra lỗi gì đó!!", "Error");
  //         });
  // };
  const customStylesPayment = {
    control: (provided, state) => ({
      ...provided,
      background: '#fff',
      borderColor: '#9e9e9e',
      minHeight: '30px',
      height: '46px',
      width: '200px',
      boxShadow: state.isFocused ? null : null,
      borderRadius: '0.5rem',
    }),

    input: (provided, state) => ({
      ...provided,
      margin: '5px',
    }),
  }
  const hanldeDeleteBuilding = (id) => {
    setIsLoadingCircle(true)
    deleteBuilding(id)
      .then((res) => {
        if (res.data) {
          setIsLoading(false)
          notify('Xóa tòa nhà thành công', 'Success')
          let clusterId = location.pathname.split('/')[5]
          hanldeGetBuildingByArea(clusterId)
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
  return (
    <>
      <BuildingModal handleReload={handleReload} listCluster={listCluster} />
      <NewBuilding handleReload={handleReload} listCluster={listCluster} />
      {/* <NewCluster handleReload={handleReload} /> */}
      {/* <AreaModal handleReload={handleUpdateReload} /> */}
      {/* <ProductModal openModal={openModal} handleReload={handleReload} /> */}
      <SimpleHeader
        name="Danh sách cụm tòa nhà"
        parentName="Quản Lý  -  Danh Sách Khu Vực"
      />
      <Modal
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
                        Tòa nhà:{' '}
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
                        hanldeDeleteBuilding(storeCategoryModal.id)
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
                              color: 'rgb(100,100,100)',
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
      </Modal>
      {/* <Modal
                className="modal-dialog-centered"
                size="sm"
                isOpen={deleteAreaModal}
                toggle={() => {
                    setDeleteAreaModal(false);
                }}
            >
                <div className="modal-body p-0">
                    <Card className="bg-secondary border-0 mb-0">
                        <div className="" style={{ paddingTop: 0 }}>
                            <Container className="" fluid style={{ padding: "1.5rem 1.5rem 1rem 1.5rem " }}>
                                <Row>
                                    <div className="col-lg-12 ">
                                        <h3>Bạn có chắc</h3>
                                        <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "0px 0px 30px 0px" }} className="">
                                            <span className="mb-0">
                                                Khu vực: <span style={{ fontWeight: 700 }}>{areaDataModal.label}</span> sẽ bị xóa!!!{" "}
                                            </span>
                                            <span className="mb-0">Bạn sẽ không thể hoàn nguyên hành động này </span>
                                        </div>
                                        <div className="col-md-12"></div>
                                    </div>
                                </Row>
                                <Col className="text-md-right mb-3" lg="12" xs="5">
                                    <Row style={{ justifyContent: "flex-end" }}>
                                        {" "}
                                        <Button
                                            onClick={() => {
                                                setDeleteAreaModal(false);
                                            }}
                                            // className="btn-neutral"
                                            color="default"
                                            size="lg"
                                            style={{ background: "#fff", color: "#000", padding: "0.875rem 1rem", border: "none" }}
                                        >
                                            <div className="flex" style={{ alignItems: "center", width: 80, justifyContent: "center" }}>
                                                <span>Đóng</span>
                                            </div>
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                // setIsLoadingCircle(true);
                                                hanldeDeleteArea(areaDataModal.value);
                                            }}
                                            className="btn-neutral"
                                            disabled={isLoadingCircle}
                                            color="default"
                                            size="lg"
                                            style={{ background: "var(--primary)", color: "#000", padding: "0.875rem 1rem" }}
                                        >
                                            <div className="flex" style={{ alignItems: "center", width: 80, justifyContent: "center" }}>
                                                {isLoadingCircle ? (
                                                    <Spinner style={{ color: "rgb(100,100,100)", width: "1.31rem", height: "1.31rem" }}>Loading...</Spinner>
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
                <CardHeader
                  className="flex"
                  style={{ padding: '0 0 0 20px', borderBottom: 'none' }}
                >
                  <div
                    className="flex flex-wrap"
                    style={{ alignItems: 'center', gap: 20 }}
                  >
                    {/* <div className="mb-0">
                                            <Select
                                                options={areas}
                                                placeholder="Khu vực"
                                                styles={customStylesPayment}
                                                value={areaSelected}
                                                onChange={(e) => {
                                                    console.log(e);
                                                    setIsLoading(true);
                                                    setAreaSelected(e);
                                                    hanldeGetBuildingByArea(e.value);
                                                }}
                                            />
                                        </div> */}
                    {listCluster.map((item, index) => {
                      return (
                        <div
                          className="mb-0 center_flex"
                          key={index}
                          style={{
                            background:
                              item.id === clusterSelected
                                ? 'var(--primary)'
                                : '#fff',
                            color:
                              item.id === clusterSelected ? '#fff' : '#637381',
                            border:
                              item.id !== clusterSelected
                                ? '1px solid rgb(222, 226, 230)'
                                : 'none',
                            padding: '10px 20px',
                            fontWeight: 600,
                            height: 50,
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            fontSize: 16,
                          }}
                          onClick={() => {
                            if (item.id !== clusterSelected) {
                              let areaId = location.pathname.split('/')[3]
                              setIsLoading(true)
                              history.replace(
                                `/admin/area/${areaId}/clusters/${item.id}`
                              )
                              setclusterSelected(item.id)
                              hanldeGetBuildingByArea(item.id)
                            }
                          }}
                        >
                          <div
                            className={'mb-sm-3 mb-md-0 '}
                            href="#pablo"
                            onClick={(e) => {
                              e.preventDefault()
                            }}
                            style={{ padding: '0px' }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                position: 'relative',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <span style={{ textAlign: 'center' }}>
                                {item.name}
                              </span>

                              {/* {item.id === clusterSelected.id && (
                                                                <UncontrolledDropdown>
                                                                    <DropdownToggle
                                                                        size="sm"
                                                                        className="mr-0"
                                                                        style={{ background: "var(--primary)", border: "none", boxShadow: "none", color: "#fff" }}
                                                                    >
                                                                        <i class="fa-solid fa-ellipsis-vertical" style={{ fontSize: 18 }}></i>
                                                                    </DropdownToggle>
                                                                    <DropdownMenu left>
                                                                        <DropdownItem
                                                                            href="#pablo"
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                setOpenAreaModal(true);
                                                                                setAreaModal(item);
                                                                                // setStoreCategoryModal(item);
                                                                            }}
                                                                        >
                                                                            Chỉnh sửa
                                                                        </DropdownItem>
                                                                        <DropdownItem
                                                                            href="#pablo"
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                // setDeleteAreaModal(true);
                                                                                // setAreaDataModal(item);
                                                                                // setStoreCategoryModal(item);
                                                                            }}
                                                                        >
                                                                            Xóa
                                                                        </DropdownItem>
                                                                    </DropdownMenu>
                                                                </UncontrolledDropdown>
                                                            )} */}
                            </div>
                          </div>
                        </div>
                      )
                    })}{' '}
                    {/* <div
                                            className="mb-0 center_flex"
                                            style={{
                                                background: "#fff",
                                                color: "var(--primary)",
                                                border: "1px solid var(--primary)",
                                                padding: "10px 20px",
                                                fontWeight: 600,
                                                height: 50,
                                                borderRadius: "0.5rem",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => {}}
                                        >
                                            <div
                                                className={"mb-sm-3 mb-md-0 "}
                                                href="#pablo"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                }}
                                                style={{ padding: "0px" }}
                                            >
                                                <div style={{ display: "flex", flexDirection: "row", position: "relative", alignItems: "center" }}>
                                                    <span style={{ paddingRight: 15 }}>{"+ Thêm khu vực mới"}</span>
                                                </div>
                                            </div>
                                        </div> */}
                  </div>
                </CardHeader>

                <Col className="mt-3 mt-md-0 text-md-right" lg="3" xs="3">
                  {/* <Button
                                        onClick={() => {
                                            setOpenNewAreaModal(true);
                                        }}
                                        className="btn-neutral"
                                        color="default"
                                        size="lg"
                                        style={{ background: "#fff", color: "var(--primary)", fontWeight: 700, border: "1px solid var(--primary)" }}
                                    >
                                        + Thêm Tòa Nhà Mới
                                    </Button> */}
                  <Button
                    onClick={() => {
                      setOpenNewBuildingModal(true)
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
                    + Thêm Tòa Nhà Mới
                  </Button>
                </Col>
              </div>
              {!isLoading && (
                <Table
                  className="align-items-center table-flush"
                  responsive
                  hover={true}
                >
                  <thead className="thead-light">
                    <tr>
                      <th className="sort table-title" scope="col">
                        STT
                      </th>
                      <th className="sort table-title" scope="col">
                        Mã tòa nhà
                      </th>
                      <th className="sort table-title" scope="col">
                        Tên tòa nhà
                      </th>
                      <th className="sort table-title" scope="col">
                        Trạng thái
                      </th>
                      <th className="sort table-title" scope="col">
                        Hành động
                      </th>
                    </tr>
                  </thead>
                  <tbody className="list" style={{ position: 'relative' }}>
                    <div
                      className={`loading-spin ${
                        !isLoading && 'loading-spin-done'
                      }`}
                    ></div>
                    {buildings.length > 0 &&
                      buildings.map((item, index) => {
                        return (
                          <BuildingItem
                            data={item}
                            key={index}
                            index={index}
                            clusterId={clusterSelected}
                          />
                        )
                      })}
                  </tbody>
                </Table>
              )}

              {buildings.length === 0 && !isLoading && (
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
                    Không có tòa nhà nào!!!
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

export default BuildingManage
