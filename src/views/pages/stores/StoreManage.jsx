import { debounce } from "lodash";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Select from "react-select";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Spinner,
  Table,
} from "reactstrap";
import {
  getListStoreByKey,
  getListStores,
} from "../../../apis/storeApiService";
import SimpleHeader from "../../../components/Headers/SimpleHeader";
import { DeleteModal } from "../../../components/Modals/deleteModal";
import { StoreModal } from "../../../components/Modals/storeModal";
import { AppContext } from "../../../context/AppProvider";
import { StoreItem } from "./StoreItem";
import Lottie from "react-lottie";
import animationData from "../../../assets/loading.json";
export const StoreManage = () => {
  const { buildingList, storeCategoryList, brandList } = useContext(AppContext);
  const [storeCategory, setStoreCategory] = useState("");
  const [storeLists, setStoreLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [building, setBuilding] = useState("");
  const [brand, setBrand] = useState("");
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState({
    buildingFilter: "",
    storeCateFilter: "",
    brandFilter: "",
  });
  function fetchDropdownOptions(key) {
    setIsLoading(true);
    setStoreLists([]);
    if (key !== "") {
      getListStoreByKey(key, 1, 100)
        .then((res) => {
          const stores = res.data;
          setTimeout(() => {
            setStoreLists(stores);
            setIsLoading(false);
          }, 1);
        })
        .catch((error) => console.log(error));
    } else {
      hanldeGetListStore("", "", "");
    }
  }
  const debounceDropDown = useCallback(
    debounce((nextValue) => fetchDropdownOptions(nextValue), 1000),
    []
  );
  function handleInputOnchange(e) {
    const { value } = e.target;
    setKeyword(value);
    debounceDropDown(value);
  }
  let history = useHistory();
  const hanldeGetListStore = (building, storeCate, brand) => {
    let buildingFilter = "";
    let storeCateFilter = "";
    let brandFilter = "";
    buildingFilter = building;
    storeCateFilter = storeCate;
    brandFilter = brand;
    setIsLoading(true);
    setStoreLists([]);
    getListStores(
      "",
      buildingFilter === "Tất cả" ? "" : buildingFilter,
      storeCateFilter === "Tất cả" ? "" : storeCateFilter,
      brandFilter === "Tất cả" ? "" : brandFilter,
      1,
      100
    )
      .then((res) => {
        const stores = res.data;
        console.log(stores);
        setTimeout(() => {
          setStoreLists(stores);
          setIsLoading(false);
        }, 1);
      })
      .catch((error) => console.log(error));
  };
  const customStylesPayment = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "rgb(158, 158, 158)",
      minHeight: "30px",
      height: "46px",
      width: "200px",
      boxShadow: state.isFocused ? null : null,
      borderRadius: "0.5rem",
    }),

    input: (provided, state) => ({
      ...provided,
      margin: "5px",
    }),
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const customStylesBuilding = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "rgb(158, 158, 158)",
      minHeight: "30px",
      height: "46px",
      width: "150px",
      boxShadow: state.isFocused ? null : null,
      borderRadius: "0.5rem",
    }),

    input: (provided, state) => ({
      ...provided,
      margin: "5px",
    }),
  };
  useEffect(() => {
    hanldeGetListStore("", "", "");
    setBuilding("Tất cả");
    setStoreCategory("Tất cả");
    setBrand("Tất cả");
  }, []);

  const handleReload = () => {
    hanldeGetListStore("", "", "");
  };
  const optionsBuilding = () => {
    let newList;
    newList = buildingList.map((item) => {
      return {
        label: item.name,
        value: item.name,
      };
    });
    let element = {
      label: "Tất cả",
      value: "",
    };
    newList = [element].concat(newList);
    return newList;
  };
  const optionsCategoryStore = () => {
    let newList;
    newList = storeCategoryList.map((item) => {
      return {
        label: item.name,
        value: item.name,
      };
    });
    let element = {
      label: "Tất cả",
      value: "",
    };
    newList = [element].concat(newList);
    return newList;
  };
  const optionsBrand = () => {
    let newList;
    newList = brandList.map((item) => {
      return {
        label: item.name,
        value: item.name,
      };
    });
    let element = {
      label: "Tất cả",
      value: "",
    };
    newList = [element].concat(newList);
    return newList;
  };

  return (
    <>
      <StoreModal handleReload={handleReload} />
      <DeleteModal handleReload={handleReload} />
      <SimpleHeader name="Danh Sách Cửa Hàng" parentName="Quản Lý" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  width: "100%",
                  padding: "10px 0px 20px 0px",
                }}
                className="align-items-center"
              >
                <Col lg="9" xs="7">
                  <CardHeader className="" style={{ padding: "0 0 0 5px" }}>
                    <div
                      className="flex"
                      style={{
                        alignItems: "center",
                        gap: 25,
                        justifyContent: "start",
                      }}
                      onSubmit={(e) => {
                        e.preventdefault();
                      }}
                    >
                      <FormGroup className="mb-0">
                        <h3 className="m-0 p-0 mb-1">Tìm kiếm tên cửa hàng</h3>
                        <InputGroup
                          className="input-group-lg input-group-flush"
                          style={{ border: "1px solid #9e9e9e" }}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText style={{ padding: "0 10px" }}>
                              <span className="fas fa-search" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Nhập tên cửa hàng"
                            type="search"
                            onChange={handleInputOnchange}
                            className="btn-lg"
                            style={{
                              height: 46,
                              paddingRight: "10px",
                            }}
                          />
                        </InputGroup>
                      </FormGroup>

                      <div>
                        <h3 className="m-0 p-0 mb-1">Tòa nhà</h3>
                        <Select
                          options={optionsBuilding()}
                          placeholder={building}
                          styles={customStylesBuilding}
                          value={building}
                          onChange={(e) => {
                            setBuilding(e);
                            setFilter({ ...filter, buildingFilter: e.label });
                            hanldeGetListStore(
                              e.label,
                              filter.storeCateFilter,
                              filter.brandFilter
                            );
                          }}
                        />
                      </div>

                      <div>
                        <h3 className="m-0 p-0 mb-1">Loại cửa hàng</h3>
                        <Select
                          options={optionsCategoryStore()}
                          placeholder={storeCategory}
                          styles={customStylesPayment}
                          value={storeCategory}
                          onChange={(e) => {
                            setStoreCategory(e);
                            setFilter({ ...filter, storeCateFilter: e.label });
                            hanldeGetListStore(
                              filter.buildingFilter,
                              e.label,
                              filter.brandFilter
                            );
                          }}
                        />
                      </div>

                      <div>
                        <h3 className="m-0 p-0 mb-1">Thương hiệu</h3>
                        <Select
                          options={optionsBrand()}
                          placeholder={brand}
                          styles={customStylesPayment}
                          value={brand}
                          onChange={(e) => {
                            setBrand(e);
                            setFilter({ ...filter, brandFilter: e.label });
                            hanldeGetListStore(
                              filter.buildingFilter,
                              filter.storeCateFilter,
                              e.label
                            );
                          }}
                        />
                      </div>
                      {/* <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                                            <DropdownToggle
                                                className="dropdown"
                                                caret
                                                size="lg"
                                                style={{
                                                    height: 42,
                                                    borderRadius: "0.25rem",
                                                    boxShadow: "none",
                                                    border: "1px solid rgb(200,200,200)",
                                                    transition: "none",
                                                    padding: "10px 20px",
                                                    // background: "#fff",
                                                }}
                                            >
                                                Danh Mục
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem>Header</DropdownItem>
                                                <DropdownItem>Action</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown> */}
                    </div>
                  </CardHeader>
                </Col>

                <Col className="mt-3 mt-md-0 text-md-right" lg="3" xs="5">
                  <Button
                    onClick={() => history.push("/admin/store")}
                    className="btn-neutral"
                    color="default"
                    size="lg"
                    style={{
                      background: "var(--primary)",
                      color: "#fff",
                      fontWeight: 700,
                    }}
                  >
                    + Thêm Cửa Hàng Mới
                  </Button>
                </Col>
              </div>
              <Table
                className="align-items-center table-flush"
                responsive
                hover={true}
                style={{ position: "relative" }}
              >
                <div
                  className={`loading-spin ${
                    !isLoading && "loading-spin-done"
                  }`}
                ></div>
                <thead className="thead-light">
                  <tr>
                    <th className="sort table-title" scope="col">
                      STT
                    </th>
                    <th className="sort table-title" scope="col">
                      Tên Thương Hiệu
                    </th>
                    <th className="sort table-title" scope="col">
                      Tên Cửa Hàng
                    </th>
                    <th className="sort table-title" scope="col">
                      Số Điện Thoại
                    </th>
                    <th className="sort table-title" scope="col">
                      Số Tài Khoản
                    </th>
                    <th className="sort table-title" scope="col">
                      Building
                    </th>
                    <th className="sort table-title" scope="col">
                      Loại Của Hàng
                    </th>

                    <th className="sort table-title" scope="col">
                      Trạng Thái
                    </th>
                    <th className="sort table-title" scope="col">
                      Hành động
                    </th>
                    {/* <th scope="col">Users</th>
                                        <th className="sort" data-sort="completion" scope="col">
                                            Completion
                                        </th>
                                        <th scope="col" /> */}
                  </tr>
                </thead>
                <tbody className="list">
                  {storeLists.map((item, index) => {
                    return <StoreItem data={item} key={index} index={index} />;
                  })}
                </tbody>
              </Table>
              {storeLists.length === 0 && !isLoading && (
                <>
                  <div
                    className="center_flex"
                    style={{ padding: "50px 0 0 0" }}
                  >
                    <img
                      src="/icons/empty.png"
                      alt=""
                      style={{ textAlign: "center", width: 300 }}
                    />
                  </div>
                  <h1
                    className="description"
                    style={{
                      fontSize: 18,
                      textAlign: "center",
                      padding: "20px 0 50px 0",
                    }}
                  >
                    Không có sản phẩm nào!!!
                  </h1>
                </>
              )}
              {isLoading && (
                <CardBody className=" center_flex">
                  <Lottie options={defaultOptions} height={400} width={400} />
                </CardBody>
              )}
              {/* {!isLoading && storeLists.length > 0 && (
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
  );
};
