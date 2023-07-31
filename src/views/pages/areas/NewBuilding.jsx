import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import Select from "react-select";
import { Button, Card, CardBody, CardHeader, Col, Container, Input, Modal, Row, Spinner } from "reactstrap";
import { getListHub, postArea, postBuilding } from "../../../apis/areaApiService";
import { postStoreCategory } from "../../../apis/categoryApiService";
import { notify } from "../../../components/Toast/ToastCustom";
import { AppContext } from "../../../context/AppProvider";
export const NewBuilding = ({ handleReload, listCluster }) => {
    const { openNewBuildingModal, setOpenNewBuildingModal } = useContext(AppContext);
    const [buildingName, setBuildingName] = useState("");
    const [buildingNameState, setBuildingNameState] = useState("");
    const [status, setStatus] = useState(0);
    const [cluster, setCluster] = useState(0);
    const [hub, setHub] = useState({});
    const [hubs, setHubs] = useState([]);
    const [isLoadingCircle, setIsLoadingCircle] = useState(false);
    const [longitude, setLongitude] = useState("");
    const [longitudeState, setLongitudeState] = useState("");
    const [latitude, setLatitude] = useState("");
    const [latitudeState, setLatitudeState] = useState("");
    let location = useLocation();
    const hanldeGetHub = () => {
        setHubs([]);
        getListHub(1, 100)
            .then((res) => {
                if (res.data) {
                    const hubList = res.data;
                    setHubs(hubList);
                    setHub({ label: hubList[0].name, value: hubList[0].id });
                } else {
                    setHubs([]);
                }
            })
            .catch((error) => {
                console.log(error);
                setHubs([]);
                notify("Đã xảy ra lỗi gì đó!!", "Error");
            });
    };
    useEffect(() => {
        hanldeGetHub();
        setStatus({ label: "Hoạt động", value: 0 });
        if (listCluster.length > 0) {
            setCluster({ label: listCluster[0].name, value: listCluster[0].id });
        }
    }, [listCluster]);

    const validateCustomStylesForm = () => {
        let valid = true;
        if (buildingName === "") {
            valid = false;
            setBuildingNameState("invalid");
        } else {
            // valid = true;
            setBuildingNameState("valid");
        }
        if (longitude === "") {
            valid = false;
            setLongitudeState("invalid");
        } else {
            // valid = true;
            setLongitudeState("valid");
        }
        if (latitude === "") {
            valid = false;
            setLatitudeState("invalid");
        } else {
            // valid = true;
            setLatitudeState("valid");
        }

        return valid;
    };
    const hanldeUpdate = () => {
        if (validateCustomStylesForm()) {
            setIsLoadingCircle(true);
            let areaId = location.pathname.split("/")[3];
            let building = { name: buildingName, hubId: hub.value.toString(), latitude: latitude.toString(), longitude: longitude.toString() };
            console.log({ areaId });
            console.log({ cluster });
            console.log({ building });
            postBuilding(areaId.toString(), cluster.value.toString(), building)
                .then((res) => {
                    if (res.data) {
                        notify("Thêm mới thành công", "Success");
                        handleReload();
                        setOpenNewBuildingModal(false);
                        setIsLoadingCircle(false);
                        setBuildingName("");
                        setLongitude("");
                        setLatitude("");
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setIsLoadingCircle(false);
                    notify("Đã xảy ra lỗi gì đó!!", "Error");
                });
        }
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
    const optionsHub = hubs.map((item) => {
        return { label: item.name, value: item.id };
    });
    const optionsCluster = listCluster.map((item, ind) => {
        return { label: item.name, value: item.id };
    });

    return (
        <>
            <Row>
                <Col md="4">
                    <Modal
                        className="modal-dialog-centered"
                        size="md"
                        isOpen={openNewBuildingModal}
                        toggle={() => {
                            setOpenNewBuildingModal(false);
                            setBuildingName("");
                            setBuildingNameState(false);
                            setLatitude("");
                            setLatitudeState(false);
                            setLongitude("");
                            setLongitudeState(false);
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
                                                            <h2 className="mb-0">Thông tin tòa nhà </h2>
                                                        </CardHeader>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <form>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label className="form-control-label">Tên tòa nhà </label>
                                                                        <Input
                                                                            valid={buildingNameState === "valid"}
                                                                            invalid={buildingNameState === "invalid"}
                                                                            className="form-control"
                                                                            type="search"
                                                                            id="example-search-input"
                                                                            value={`${buildingName}`}
                                                                            onChange={(e) => {
                                                                                setBuildingName(e.target.value);
                                                                            }}
                                                                        />{" "}
                                                                        <div className="invalid-feedback">Tên tòa nhà không được để trống</div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label className="form-control-label">Cụm tòa nhà</label>
                                                                        <Select
                                                                            options={optionsCluster}
                                                                            placeholder="Cụm tòa nhà"
                                                                            styles={customStylesPayment}
                                                                            value={cluster}
                                                                            defaultValue={cluster}
                                                                            onChange={(e) => {
                                                                                console.log(e);
                                                                                setCluster(e);
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>{" "}
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label className="form-control-label">Kinh độ </label>
                                                                        <Input
                                                                            valid={longitudeState === "valid"}
                                                                            invalid={longitudeState === "invalid"}
                                                                            className="form-control"
                                                                            type="search"
                                                                            id="example-search-input"
                                                                            value={`${longitude}`}
                                                                            onChange={(e) => {
                                                                                setLongitude(e.target.value);
                                                                            }}
                                                                        />{" "}
                                                                        <div className="invalid-feedback">Kinh độ không được để trống</div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label className="form-control-label">Vĩ độ </label>
                                                                        <Input
                                                                            valid={latitudeState === "valid"}
                                                                            invalid={latitudeState === "invalid"}
                                                                            className="form-control"
                                                                            type="search"
                                                                            id="example-search-input"
                                                                            value={`${latitude}`}
                                                                            onChange={(e) => {
                                                                                setLatitude(e.target.value);
                                                                            }}
                                                                        />
                                                                        <div className="invalid-feedback">Vĩ đô không được để trống</div>
                                                                    </div>
                                                                </div>{" "}
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label className="form-control-label">Hub</label>
                                                                        <Select
                                                                            options={optionsHub}
                                                                            placeholder="Chọn Hub"
                                                                            styles={customStylesPayment}
                                                                            value={hub}
                                                                            defaultValue={hub}
                                                                            onChange={(e) => {
                                                                                setHub(e);
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>{" "}
                                                                <div className="col-md-6">
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
                                                                </div>{" "}
                                                            </div>
                                                        </form>
                                                    </div>
                                                </Card>
                                            </div>
                                        </Row>
                                        <Col className="text-md-right mb-3" lg="12" xs="5">
                                            <Button
                                                onClick={() => {
                                                    setOpenNewBuildingModal(false);
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
                                                            <span style={{ color: "#fff" }}>Thêm mới</span>
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
