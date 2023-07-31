import { async } from "@firebase/util";
import { EmailAuthProvider, getAuth, reauthenticateWithCredential, signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Select from "react-select";
import { Button, Card, CardBody, CardHeader, Col, Container, Modal, Row, Spinner } from "reactstrap";
import { putStoreCategory } from "../../apis/categoryApiService";
import { deleteStore } from "../../apis/storeApiService";
import { AppContext } from "../../context/AppProvider";
import { notify } from "../Toast/ToastCustom";
export const DeleteModal = ({ handleReload }) => {
    const { openDeleteModal, deleteModal, setOpenDeleteModal, setOpenModal, setStoreModal } = useContext(AppContext);
    const [name, setName] = useState("");
    const [categoryId, setcategoryId] = useState("");
    const [imageState, setimageState] = useState("");
    const [status, setStatus] = useState(0);
    const [images, setImages] = React.useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingCircle, setIsLoadingCircle] = useState(false);
    let history = useHistory();

    useEffect(() => {
        if (deleteModal !== null) {
            setName((deleteModal.data && deleteModal.data.name) || "");
        }
        console.log({ deleteModal });
    }, [deleteModal]);

    const deleteUser = async (email, pass) => {
        const authentication = getAuth();
        setIsLoadingCircle(true);
        deleteStore(deleteModal.data.id)
            .then((res) => {
                console.log(res.data.message);
                if (res.data.message) {
                    setIsLoadingCircle(false);
                    notify(res.data.message, "Error");
                } else {
                    signInWithEmailAndPassword(authentication, email, pass)
                        .then((response) => {
                            if (response) {
                                response.user.auth.currentUser.delete().then((res) => {
                                    setStoreModal({});
                                    setOpenDeleteModal(false);
                                    setIsLoadingCircle(false);
                                    notify("Xóa cửa hàng thành công", "Success");
                                    handleReload();
                                });
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            })
            .catch((error) => {
                console.log(error);
                setIsLoadingCircle(false);
                notify("Đã xảy ra lỗi gì đó!!", "Error");
            });
    };
    return (
        <>
            <Row>
                <Col md="4">
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
                                                        Cửa hàng: <span style={{ fontWeight: 700 }}>{name}</span> sẽ bị xóa!!!{" "}
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
                                                        // setIsLoadingCircle(true);
                                                        let { password } = deleteModal.data.account;
                                                        if (password !== null) {
                                                            deleteUser(deleteModal.data.id, password);
                                                        }
                                                    }}
                                                    className="btn-neutral"
                                                    disabled={isLoadingCircle}
                                                    color="default"
                                                    size="lg"
                                                    style={{ background: "var(--primary)", color: "#fff", padding: "0.875rem 1rem" }}
                                                >
                                                    <div className="flex" style={{ alignItems: "center", width: 80, justifyContent: "center" }}>
                                                        {isLoadingCircle ? (
                                                            <Spinner style={{ color: "rgb(250,250,250)", width: "1.31rem", height: "1.31rem" }}>Loading...</Spinner>
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
                </Col>
            </Row>
        </>
    );
};
