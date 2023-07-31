import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Select from "react-select";
import { Button, Card, CardBody, CardHeader, Col, Container, Modal, Row, Spinner } from "reactstrap";
import { putArea } from "../../apis/areaApiService";
import { AppContext } from "../../context/AppProvider";
import { notify } from "../Toast/ToastCustom";
export const ClusterModal = ({ handleReload }) => {
    const { openClusterModal, setOpenClusterModal, clusterModal, setClusterModal, setAreaModal, areaModal } = useContext(AppContext);
    const [clusterName, setClusterName] = useState("");
    const [status, setStatus] = useState(0);
    const [isLoadingCircle, setIsLoadingCircle] = useState(false);

    useEffect(() => {
        setClusterName(clusterModal.name);

        setStatus({ label: "Hoạt động", value: 0 });
    }, [clusterModal]);

    const hanldeUpdate = () => {
        setIsLoadingCircle(true);

        let newArea = areaModal.listCluster.map((item) => {
            if (item.id === clusterModal.id) {
                item.name = clusterName;
                return { name: item.name };
            } else {
                return { name: item.name };
            }
        });
        let area = areaModal;
        area.listCluster = newArea;

        putArea(area)
            .then((res) => {
                if (res.data) {
                    notify("Cập nhật thành công", "Success");
                    handleReload({ value: res.data.id, label: res.data.name });
                    setOpenClusterModal(false);
                    setIsLoadingCircle(false);
                }
            })
            .catch((error) => {
                console.log(error);
                setIsLoadingCircle(false);
                notify("Đã xảy ra lỗi gì đó!!", "Error");
            });
    };
    const customStylesPayment = {
        control: (provided, state) => ({
            ...provided,
            background: "#fff",
            borderColor: "#dee2e6",
            minHeight: "30px",
            height: "46px",
            // width: "200px",
            boxShadow: state.isFocused ? null : null,
            borderRadius: "0.5rem",
        }),

        input: (provided, state) => ({
            ...provided,
            margin: "5px",
        }),
    };

    const optionsStatus = [
        { label: "Hoạt động", value: 0 },
        { label: "Ngưng hoạt động", value: 1 },
    ];
    return (
        <>
            <Row>
                <Col md="4">
                    <Modal
                        className="modal-dialog-centered"
                        size="lg"
                        isOpen={openClusterModal}
                        toggle={() => {
                            setOpenClusterModal(false);
                        }}
                    >
                        <div className="modal-body p-0">
                            <Card className="bg-secondary border-0 mb-0">
                                <CardHeader className="bg-transparent " style={{ border: "none" }}>
                                    <h3>Chi tiết</h3>
                                </CardHeader>
                                <CardBody className="" style={{ paddingTop: 0 }}>
                                    <Container className="" fluid style={{ padding: "0 0px" }}>
                                        <Row>
                                            <div className="col-lg-12 modal-product">
                                                <Card>
                                                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "10px 0px" }} className="align-items-center">
                                                        <CardHeader className="border-0" style={{ padding: "15px" }}>
                                                            <h2 className="mb-0">Thông tin cụm tòa nhà </h2>
                                                        </CardHeader>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <form>
                                                            <div className="row">
                                                                <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <label className="form-control-label">Mã cụm tòa nhà </label>
                                                                        <input className="form-control" type="search" id="example-search-input" value={clusterModal.id} readOnly onChange={() => {}} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <label className="form-control-label">Tên cụm tòa nhà </label>
                                                                        <input
                                                                            className="form-control"
                                                                            type="search"
                                                                            id="example-search-input"
                                                                            value={`${clusterName}`}
                                                                            onChange={(e) => {
                                                                                setClusterName(e.target.value);
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <label className="form-control-label">Trạng Thái</label>
                                                                        <Select
                                                                            options={optionsStatus}
                                                                            placeholder="Trạng Thái"
                                                                            styles={customStylesPayment}
                                                                            value={status}
                                                                            defaultValue={status}
                                                                            onChange={(e) => {
                                                                                console.log(e);
                                                                                setStatus(e);
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
                                                    setOpenClusterModal(false);
                                                }}
                                                // className="btn-neutral"
                                                color="default"
                                                size="lg"
                                                style={{ background: "#fff", color: "#000", padding: "0.875rem 2rem", border: "none" }}
                                            >
                                                <div className="flex" style={{ alignItems: "center" }}>
                                                    <i className="fa-solid fa-backward" style={{ fontSize: 18 }}></i>
                                                    <span>Đóng</span>
                                                </div>
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    hanldeUpdate();
                                                }}
                                                className="btn-neutral"
                                                disabled={isLoadingCircle}
                                                color="default"
                                                size="lg"
                                                style={{ background: "var(--primary)", color: "#000", padding: "0.875rem 2rem" }}
                                            >
                                                <div className="flex" style={{ alignItems: "center", width: 99, justifyContent: "center" }}>
                                                    {isLoadingCircle ? (
                                                        <Spinner style={{ color: "#fff", width: "1.31rem", height: "1.31rem" }}>Loading...</Spinner>
                                                    ) : (
                                                        <>
                                                            <i className="fa-solid fa-square-plus" style={{ fontSize: 18, color: "#fff" }}></i>
                                                            <span style={{ color: "#fff" }}>Chỉnh Sửa</span>
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
    );
};
