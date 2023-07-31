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
import { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Button, Card, CardBody, CardHeader, Col, Container, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Modal, Row, Spinner, Table } from "reactstrap";
import { deleteHub, getListHub } from "../../../apis/areaApiService";
import SimpleHeader from "../../../components/Headers/SimpleHeader";
import { HubModal } from "../../../components/Modals/hubModal";
import { notify } from "../../../components/Toast/ToastCustom";
import { AppContext } from "../../../context/AppProvider";
import { HubItem } from "./HubItem";
import { NewHub } from "./NewHub";
import Lottie from "react-lottie";
import animationData from "../../../assets/loading.json";
// core components
function HubManage() {
    const { storeCategoryModal, setOpenDeleteModal, openDeleteModal, setOpenNewHubModal } = useContext(AppContext);
    let history = useHistory();
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    const [hubs, setHubs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingCircle, setIsLoadingCircle] = useState(false);
    let location = useLocation();
    const hanldeGetHub = () => {
        setIsLoading(true);
        setHubs([]);
        getListHub(1, 100)
            .then((res) => {
                if (res.data) {
                    const hubList = res.data;
                    setHubs(hubList);
                    setIsLoading(false);
                } else {
                    setHubs([]);
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
                setHubs([]);
                notify("Đã xảy ra lỗi gì đó!!", "Error");
            });
    };
    useEffect(() => {
        hanldeGetHub();
    }, []);

    const handleReload = () => {
        hanldeGetHub();
    };

    const hanldeDeleteHub = (id) => {
        setIsLoadingCircle(true);
        deleteHub(id)
            .then((res) => {
                if (res.data) {
                    setIsLoading(false);
                    notify("Xóa hub thành công", "Success");
                    hanldeGetHub();
                    setOpenDeleteModal(false);
                    setIsLoadingCircle(false);
                }
            })
            .catch((error) => {
                console.log(error);
                setIsLoadingCircle(false);
                setIsLoading(false);
                notify("Đã xảy ra lỗi gì đó!!", "Error");
            });
    };
    return (
        <>
            <NewHub handleReload={handleReload} />
            {/* <NewCluster handleReload={handleReload} /> */}
            <HubModal handleReload={handleReload} />
            {/* <ProductModal openModal={openModal} handleReload={handleReload} /> */}
            <SimpleHeader name="Danh sách Hub" parentName="Quản Lý" />
            <Modal
                className="modal-dialog-centered"
                size="sm"
                isOpen={openDeleteModal}
                toggle={() => {
                    setOpenDeleteModal(false);
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
                                                Hub: <span style={{ fontWeight: 700 }}>{storeCategoryModal.name}</span> sẽ bị xóa!!!{" "}
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
                                                setOpenDeleteModal(false);
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
                                                setIsLoadingCircle(true);
                                                hanldeDeleteHub(storeCategoryModal.id);
                                            }}
                                            className="btn-neutral"
                                            disabled={isLoadingCircle}
                                            color="default"
                                            size="lg"
                                            style={{ background: "var(--primary)", color: "#fff", padding: "0.875rem 1rem" }}
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
            </Modal>

            <Container className="mt--6" fluid>
                <Row>
                    <div className="col">
                        <Card>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "20px 0px" }} className="align-items-center">
                                <CardHeader className="" style={{ padding: "0 0 0 20px", borderBottom: "none" }}>
                                    {" "}
                                    <FormGroup className="mb-0">
                                        <InputGroup className="input-group-lg input-group-flush" style={{ border: "1px solid #9e9e9e" }}>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText style={{ padding: "0 15px" }}>
                                                    <span className="fas fa-search" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="Tìm kiếm bằng tên hub" type="search" className="btn-lg" style={{ height: 46, width: 250 }} />
                                        </InputGroup>
                                    </FormGroup>
                                </CardHeader>
                                <Col className="mt-3 mt-md-0 text-md-right" lg="6" xs="5">
                                    <Button
                                        onClick={() => {
                                            setOpenNewHubModal(true);
                                        }}
                                        className="btn-neutral"
                                        color="default"
                                        size="lg"
                                        style={{ background: "var(--primary)", color: "#fff", fontWeight: 700, border: "1px solid var(--primary)" }}
                                    >
                                        + Thêm Hub Mới
                                    </Button>
                                </Col>
                            </div>

                            {!isLoading && (
                                <Table className="align-items-center table-flush" responsive hover={true} style={{ position: "relative" }}>
                                    <div className={`loading-spin ${!isLoading && "loading-spin-done"}`}></div>
                                    <thead className="thead-light">
                                        <tr>
                                            <th className="sort table-title" scope="col">
                                                STT
                                            </th>
                                            <th className="sort table-title" scope="col">
                                                Mã hub
                                            </th>
                                            <th className="sort table-title" scope="col">
                                                Tên hub
                                            </th>
                                            <th className="sort table-title" scope="col">
                                                Tòa nhà
                                            </th>
                                            <th className="sort table-title" scope="col">
                                                Trạng thái
                                            </th>
                                            <th className="sort table-title" scope="col">
                                                Hành động
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="list">
                                        {hubs.length > 0 &&
                                            hubs.map((item, index) => {
                                                return <HubItem data={item} key={index} index={index} />;
                                            })}
                                    </tbody>
                                </Table>
                            )}
                            {hubs.length === 0 && !isLoading && (
                                <>
                                    <div className="center_flex" style={{ padding: "50px 0 0 0" }}>
                                        <img src="/icons/empty.png" alt="" style={{ textAlign: "center", width: 300 }} />
                                    </div>
                                    <h1 className="description" style={{ fontSize: 18, textAlign: "center", padding: "20px 0 50px 0" }}>
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
    );
}

export default HubManage;
