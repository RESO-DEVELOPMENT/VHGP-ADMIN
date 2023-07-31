import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Select from "react-select";
import { Button, Card, CardBody, CardHeader, Col, Container, Input, Modal, Row, Spinner } from "reactstrap";
import { postBrand, postStoreCategory } from "../../../apis/categoryApiService";
import { notify } from "../../../components/Toast/ToastCustom";
import { AppContext } from "../../../context/AppProvider";
export const NewBrand = ({ handleReload }) => {
    const { openModalNewCateStore, setOpenModalNewCateStore, brandList, setBrandList } = useContext(AppContext);
    const [brandName, setBrandName] = useState("");
    const [brandNameState, setBrandNameState] = useState("");
    const [brandid, setBrandid] = useState("");
    const [brandidState, setBrandidState] = useState("");
    const [status, setStatus] = useState(0);
    const [isLoadingCircle, setIsLoadingCircle] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    let history = useHistory();

    useEffect(() => {
        setStatus({ label: "Hoạt động", value: 0 });
    }, []);
    const validateCustomStylesForm = () => {
        let valid = true;

        if (brandid === "") {
            valid = false;
            setBrandidState("invalid");
        } else {
            // valid = true;
            setBrandidState("valid");
        }

        if (brandName === "") {
            valid = false;
            setBrandNameState("invalid");
        } else {
            // valid = true;
            setBrandNameState("valid");
        }

        return valid;
    };
    const hanldeUpdate = () => {
        if (validateCustomStylesForm()) {
            setIsLoadingCircle(true);
            let brand = { name: brandName, image: "", id: brandid };
            console.log({ brand });
            postBrand(brand)
                .then((res) => {
                    if (res.data) {
                        setIsLoading(false);
                        notify("Thêm mới thành công", "Success");
                        history.push("/admin/brands");
                        setBrandList([...brandList, brand]);
                        handleReload();
                        setOpenModalNewCateStore(false);
                        setIsLoadingCircle(false);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setIsLoadingCircle(false);
                    setIsLoading(false);
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
    return (
        <>
            <Row>
                <Col md="4">
                    <Modal
                        className="modal-dialog-centered"
                        size="md"
                        isOpen={openModalNewCateStore}
                        toggle={() => {
                            setOpenModalNewCateStore(false);
                            setBrandName("");
                            setBrandid("");
                            setBrandNameState("");
                            setBrandidState("");
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
                                                            <h2 className="mb-0">Thông tin thương hiệu </h2>
                                                        </CardHeader>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <form>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label className="form-control-label">Mã thương hiệu </label>
                                                                        <Input
                                                                            valid={brandidState === "valid"}
                                                                            invalid={brandidState === "invalid"}
                                                                            className="form-control"
                                                                            type="search"
                                                                            id="example-search-input"
                                                                            value={brandid}
                                                                            onChange={(e) => {
                                                                                setBrandid(e.target.value);
                                                                            }}
                                                                        />{" "}
                                                                        <div className="invalid-feedback">Mã thương hiệu không được để trống</div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label className="form-control-label">Tên thương hiệu </label>
                                                                        <Input
                                                                            valid={brandNameState === "valid"}
                                                                            invalid={brandNameState === "invalid"}
                                                                            className="form-control"
                                                                            type="search"
                                                                            id="example-search-input"
                                                                            value={`${brandName}`}
                                                                            onChange={(e) => {
                                                                                setBrandName(e.target.value);
                                                                            }}
                                                                        />
                                                                        <div className="invalid-feedback">Tên thương hiệu không được để trống</div>
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
                                                    setOpenModalNewCateStore(false);
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
