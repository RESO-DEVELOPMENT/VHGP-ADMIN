import React, { useContext, useState } from "react";
import ImageUploading from "react-images-uploading";
import { useHistory } from "react-router";
import Select from "react-select";
import { Button, Card, CardHeader, Col, Container, Input, Modal, Row, Spinner } from "reactstrap";
import { postCategory } from "../../../apis/categoryApiService";
import SimpleHeader from "../../../components/Headers/SimpleHeader";
import { CategoryModal } from "../../../components/Modals/categoryModal";
import { notify } from "../../../components/Toast/ToastCustom";
import { getBase64Image } from "../../../constants";
import { AppContext } from "../../../context/AppProvider";
const unitData = ["Gam", "Kg", "Chai", "Hủ", "Hộp", "Cái"];

export const NewCategory = () => {
    const { categoryList, setCategoryList, openCategoryModal, setOpenCategoryModal } = useContext(AppContext);
    const [categoryName, setcategoryName] = useState("");
    const [categoryNameState, setcategoryNameState] = useState("");
    const [imageState, setimageState] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [images, setImages] = React.useState([]);
    const maxNumber = 69;
    let history = useHistory();
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        if (imageList.length > 0) {
            setimageState("valid");
        } else {
            setimageState("invalid");
        }
        console.log(imageList.length);
        setImages(imageList);
    };
    const validateCustomStylesForm = () => {
        let valid = true;
        if (categoryName === "") {
            valid = false;
            setcategoryNameState("invalid");
        } else {
            // valid = true;
            setcategoryNameState("valid");
        }
        if (images.length === 0) {
            valid = false;
            setimageState("invalid");
        } else {
            // valid = true;
            setimageState("valid");
        }

        return valid;
    };
    const hanldeSubmit = () => {
        if (validateCustomStylesForm()) {
            setIsLoading(true);
            let cate = { name: categoryName, image: getBase64Image(images[0].data_url || "", images[0]?.file?.type) };
            postCategory(cate)
                .then((res) => {
                    if (res.data) {
                        console.log(res.data);
                        setIsLoading(false);
                        setCategoryList([...categoryList, cate]);
                        notify("Thêm danh mục thành công", "Success");

                        history.push("/admin/categories");
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setIsLoading(false);
                    notify("Đã xảy ra lỗi gì đó!!", "Error");
                });
        }
    };

    return (
        <>
            <SimpleHeader name="Thêm Mới Danh Mục" parentName="Quản Lý" />
            <Container className="mt--6" fluid>
                <Row>
                    <Col md="4">
                        <Modal
                            className="modal-dialog-centered"
                            size="lg"
                            isOpen={openCategoryModal}
                            toggle={() => {
                                setOpenCategoryModal(false);
                            }}
                        >
                            <div className="modal-body p-0">
                                <Card>
                                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "10px 0px" }} className="align-items-center">
                                        <CardHeader className="border-0" style={{ padding: "1rem" }}>
                                            <h2 className="mb-0">Hình ảnh</h2>
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
                                                            <div className="invalid" style={{ fontSize: "80%", color: "#fb6340", marginTop: "0.25rem" }}>
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
                                                    <div className="form-group">
                                                        <label className="form-control-label">Tên danh mục </label>
                                                        <Input
                                                            valid={categoryNameState === "valid"}
                                                            invalid={categoryNameState === "invalid"}
                                                            className="form-control"
                                                            type="search"
                                                            id="example-search-input"
                                                            value={`${categoryName}`}
                                                            onChange={(e) => {
                                                                setcategoryName(e.target.value);
                                                                if (e.target.value === "") {
                                                                    setcategoryNameState("invalid");
                                                                } else {
                                                                    setcategoryNameState("valid");
                                                                }
                                                            }}
                                                        />
                                                        <div className="invalid-feedback">Tên danh mục không được để trống</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <Col className="mt-3  text-md-right mb-4" lg="12" xs="5">
                                                <Button
                                                    onClick={() => {
                                                        history.push("/admin/categories");
                                                    }}
                                                    // className="btn-neutral"
                                                    color="default"
                                                    size="lg"
                                                    style={{ background: "#fff", color: "#000", padding: "0.875rem 2rem", border: "none" }}
                                                >
                                                    <div className="flex" style={{ alignItems: "center" }}>
                                                        <i className="fa-solid fa-backward" style={{ fontSize: 18 }}></i>
                                                        <span>Trở Về</span>
                                                    </div>
                                                </Button>
                                                <Button
                                                    onClick={() => {
                                                        hanldeSubmit();
                                                    }}
                                                    className="btn-neutral"
                                                    color="default"
                                                    size="lg"
                                                    disabled={isLoading}
                                                    style={{ background: "var(--primary)", color: "#000", padding: "0.875rem 2rem" }}
                                                >
                                                    <div className="flex" style={{ alignItems: "center", width: 99, justifyContent: "center" }}>
                                                        {isLoading ? (
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
                                        </form>
                                    </div>
                                </Card>
                            </div>
                        </Modal>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
