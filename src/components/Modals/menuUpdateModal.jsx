import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Select from "react-select";
import { Button, Card, CardBody, CardHeader, Col, Container, Input, Modal, Row, Spinner } from "reactstrap";
import { putCategory, putStoreCategory } from "../../apis/categoryApiService";
import { AppContext } from "../../context/AppProvider";
import ImageUploading from "react-images-uploading";
import { notify } from "../Toast/ToastCustom";
import { getBase64Image } from "../../constants";
import { getMenuDetail, putMenu } from "../../apis/menuApiService";
import makeAnimated from "react-select/animated";
export const MenuUpdateModal = ({ handleReload }) => {
    const { openModal, setOpenModal, categoryList, menu, mode } = useContext(AppContext);
    const [menuName, setmenuName] = useState("");
    const [menuNameState, setmenuNameState] = useState("");
    const [dayFilter, setDayFilter] = useState("");
    const [Mode, setMode] = useState("");
    const [ModeState, setModeState] = useState("");
    const [openTime, setopenTime] = useState("");
    const [openTimeState, setOpenTimeState] = useState("");
    const [closeTime, setcloseTime] = useState("");
    const [closeTimeState, setCloseTimeState] = useState("");
    const [Category, setCategory] = useState("");
    const [CategoryState, setCategoryState] = useState("");
    const [priorityState, setPriorityState] = useState("");
    const [priority, setPriority] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingCircle, setIsLoadingCircle] = useState(false);
    let history = useHistory();
    const maxNumber = 69;
    const animatedComponents = makeAnimated();
    useEffect(() => {
        if (openModal) {
            setIsLoading(true);
            getMenuDetail(menu)
                .then((res) => {
                    if (res.data) {
                        let menu = res.data;
                        setopenTime(menu.startHour);
                        setcloseTime(menu.endHour);
                        setmenuName(menu.name);
                        setDayFilter(menu.dayFilter);
                        setMode({
                            label: getModeName(mode),
                            value: mode,
                        });
                        console.log(menu);
                        let list = categoryList
                            .filter((item) => {
                                return menu.listCategory.indexOf(item.id) !== -1;
                            })
                            .map((value) => {
                                return { value: value.id, label: value.name };
                            });
                        setCategory(list);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setIsLoading(false);
                    setIsLoadingCircle(false);
                    notify("Đã xảy ra lỗi gì đó!!", "Error");
                });
        }

        // setmenuName(menuModal.name);
        // setcloseTime(menuModal.endTime);
        // setopenTime(menuModal.startTime);
        // setMode({ label: getModeName(menuModal.mode), value: menuModal.mode });
    }, [menu, openModal]);

    const hanldeUpdate = () => {
        setIsLoadingCircle(true);
        let newCate = Category.map((item) => {
            return item.value;
        });
        let menuUpdate = {
            image: null,
            name: menuName,
            startDate: null,
            endDate: null,
            dayFilter: dayFilter,
            hourFilter: null,
            startHour: parseFloat(openTime),
            endHour: parseFloat(closeTime),
            modeId: mode.toString(),
            listCategory: newCate,
        };
        console.log({ menuUpdate });
        putMenu(menuUpdate, menu)
            .then((res) => {
                if (res.data) {
                    notify("Cập nhật thành công", "Success");
                    handleReload();
                    setOpenModal(false);
                    setIsLoading(false);
                    setIsLoadingCircle(false);
                }
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
                setIsLoadingCircle(false);
                notify("Đã xảy ra lỗi gì đó!!", "Error");
            });
    };
    const getModeName = (mode) => {
        switch (mode) {
            case "1":
                return "Gọi Món";
            case "2":
                return "Giao Hàng";
            case "3":
                return "Đặt Hàng";

            default:
                return "Gọi Món";
        }
    };
    const customStyles = {
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

    const optionsMode = ["1", "2", "3"].map((item) => {
        return {
            label: getModeName(item),
            value: item,
        };
    });
    const optionsCategory = categoryList.map((item) => {
        return {
            label: item.name,
            value: item.id,
        };
    });
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
                        isOpen={openModal}
                        toggle={() => {
                            setOpenModal(false);
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
                                                            <h2 className="mb-0">Thông tin thực đơn </h2>
                                                        </CardHeader>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <form>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label className="form-control-label">
                                                                            Tên thực đơn <span style={{ color: "red" }}>*</span>
                                                                        </label>
                                                                        <Input
                                                                            valid={menuNameState === "valid"}
                                                                            invalid={menuNameState === "invalid"}
                                                                            className="form-control"
                                                                            type="search"
                                                                            id="example-search-input"
                                                                            value={`${menuName}`}
                                                                            onChange={(e) => {
                                                                                setmenuName(e.target.value);
                                                                            }}
                                                                        />
                                                                        <div className="invalid-feedback">Tên cửa hàng không được để trống</div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label className="form-control-label">
                                                                            Loại thực đơn <span style={{ color: "red" }}>*</span>
                                                                        </label>
                                                                        <div className={`${ModeState === "invalid" && "error-select"}`}>
                                                                            <Select
                                                                                options={optionsMode}
                                                                                placeholder="Loại thực đơn"
                                                                                styles={customStyles}
                                                                                value={Mode}
                                                                                isDisabled
                                                                                onChange={(e) => {
                                                                                    setMode(e);
                                                                                }}
                                                                            />
                                                                        </div>
                                                                        {ModeState === "invalid" && (
                                                                            <div className="invalid" style={{ fontSize: "80%", color: "#fb6340", marginTop: "0.25rem" }}>
                                                                                Loại thực đơn không được để trống
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <label className="form-control-label">
                                                                            Giờ bắt đầu <span style={{ color: "red" }}>*</span>
                                                                        </label>
                                                                        <Input
                                                                            valid={openTimeState === "valid"}
                                                                            invalid={openTimeState === "invalid"}
                                                                            className="form-control"
                                                                            type="number"
                                                                            id="example-search-input"
                                                                            value={`${openTime}`}
                                                                            onChange={(e) => {
                                                                                setopenTime(e.target.value);
                                                                            }}
                                                                        />
                                                                        <div className="invalid-feedback">Giờ bắt đầu không được để trống</div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <label className="form-control-label">
                                                                            Giờ kết thúc <span style={{ color: "red" }}>*</span>
                                                                        </label>
                                                                        <Input
                                                                            valid={closeTimeState === "valid"}
                                                                            invalid={closeTimeState === "invalid"}
                                                                            className="form-control"
                                                                            type="number"
                                                                            id="example-search-input"
                                                                            value={`${closeTime}`}
                                                                            onChange={(e) => {
                                                                                setcloseTime(e.target.value);
                                                                            }}
                                                                        />
                                                                        <div className="invalid-feedback">Giờ kết thúc không được để trống</div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <label className="form-control-label">
                                                                            Độ ưu tiên <span style={{ color: "red" }}>*</span>
                                                                        </label>
                                                                        <Input
                                                                            valid={priorityState === "valid"}
                                                                            invalid={priorityState === "invalid"}
                                                                            className="form-control"
                                                                            type="number"
                                                                            id="example-search-input"
                                                                            value={`${priority}`}
                                                                            onChange={(e) => {
                                                                                setPriority(e.target.value);
                                                                            }}
                                                                        />
                                                                        <div className="invalid-feedback">Độ ưu tiên không được để trống</div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-12">
                                                                    <div className="form-group">
                                                                        <label className="form-control-label">
                                                                            Danh mục <span style={{ color: "red" }}>*</span>
                                                                        </label>
                                                                        <div className={`${CategoryState === "invalid" && "error-select"}`}>
                                                                            <Select
                                                                                // components={animatedComponents}
                                                                                options={optionsCategory}
                                                                                isMulti
                                                                                placeholder="Danh mục"
                                                                                // styles={customStylesCategory}
                                                                                value={Category}
                                                                                closeMenuOnSelect={false}
                                                                                onChange={(e) => {
                                                                                    setCategory(e);
                                                                                }}
                                                                            />
                                                                        </div>
                                                                        {CategoryState === "invalid" && (
                                                                            <div className="invalid" style={{ fontSize: "80%", color: "#fb6340", marginTop: "0.25rem" }}>
                                                                                Danh mục không được để trống
                                                                            </div>
                                                                        )}
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
                                                    setOpenModal(false);
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
                                                <div className="flex" style={{ alignItems: "center", width: 101, justifyContent: "center" }}>
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
