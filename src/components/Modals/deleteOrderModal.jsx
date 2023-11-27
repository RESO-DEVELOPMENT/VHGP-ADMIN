import { async } from "@firebase/util";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Select from "react-select";
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
} from "reactstrap";
import { putStoreCategory } from "../../apis/categoryApiService";
import { cancelOrder, updateOrder } from "../../apis/orderApiService";
import { deleteStore } from "../../apis/storeApiService";
import { AppContext } from "../../context/AppProvider";
import { notify } from "../Toast/ToastCustom";
export const DeleteOrderModal = ({ handleReload }) => {
  const {
    // openDeleteModal,
    // deleteModal,
    // setOpenDeleteModal,
    // setStoreModal,
    openOrderDetailModel,
    setOpenOrderDetailModel,
    deleteOrderDetailModal,
    setDeleteOrderDetailModal,
  } = useContext(AppContext);
  const [orderId, setOrderId] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCircle, setIsLoadingCircle] = useState(false);
  let history = useHistory();

  useEffect(() => {
    if (deleteOrderDetailModal !== null) {
      setOrderId((deleteOrderDetailModal && deleteOrderDetailModal.id) || "");
    }
  }, [deleteOrderDetailModal]);

  const handleCancelOrder = (orderId) => {
    setIsLoadingCircle(true);
    cancelOrder(orderId)
      .then((res) => {
        if (res.data.message) {
          setIsLoadingCircle(false);
          notify(res.data.message, "Error");
        } else {
          setDeleteOrderDetailModal({});
          setOpenOrderDetailModel(false);
          setIsLoadingCircle(false);
          notify("Hủy đơn hàng thành công", "Success");
          handleReload();
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoadingCircle(false);
        notify("Đã xảy ra lỗi gì đó!!", "Error");
      });
  };

  const handleUpdateOrder = (orderId) => {
    let updatedOrder = {
      ...deleteOrderDetailModal,
      total: parseFloat(deleteOrderDetailModal.total),
      shipCost: parseFloat(deleteOrderDetailModal.shipCost),
      paymentType: parseInt(deleteOrderDetailModal.paymentName),
    };
    updatedOrder.paymentType = parseInt(deleteOrderDetailModal.paymentName);
    updateOrder(orderId, updatedOrder)
      .then((res) => {
        console.log(res);
        if (res.data.message) {
          setIsLoadingCircle(false);
          notify(res.data.message, "Error");
        } else {
          setOpenOrderDetailModel(false);
          setIsLoadingCircle(false);
          notify("Cập nhật đơn hàng thành công", "Success");
          handleReload();
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
            isOpen={openOrderDetailModel}
            toggle={() => {
              setOpenOrderDetailModel(false);
            }}
          >
            <div className="modal-body p-0">
              <Card className="bg-secondary border-0 mb-0">
                <div className="" style={{ paddingTop: 0 }}>
                  <Container
                    className=""
                    fluid
                    style={{ padding: "1.5rem 1.5rem 1rem 1.5rem " }}
                  >
                    <Row>
                      <div className="col-lg-12 ">
                        <h3>Bạn có chắc</h3>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            padding: "0px 0px 30px 0px",
                          }}
                          className=""
                        >
                          {deleteOrderDetailModal.deletedOption ? (
                            <>
                              <span className="mb-0">
                                Đơn hàng:{" "}
                                <span style={{ fontWeight: 700 }}>
                                  {orderId}
                                </span>{" "}
                                sẽ bị xóa!!!{" "}
                              </span>
                              <span className="mb-0">
                                Bạn sẽ không thể hoàn nguyên hành động này{" "}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}

                          {deleteOrderDetailModal.updatedOption ? (
                            <>
                              <span className="mb-0">
                                Đơn hàng{" "}
                                <span style={{ fontWeight: 700 }}>
                                  {orderId}
                                </span>{" "}
                                sẽ được cập nhật!!!{" "}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="col-md-12"></div>
                      </div>
                    </Row>
                    <Col className="text-md-right mb-3" lg="12" xs="5">
                      <Row style={{ justifyContent: "flex-end" }}>
                        {" "}
                        <Button
                          onClick={() => {
                            setOpenOrderDetailModel(false);
                          }}
                          // className="btn-neutral"
                          color="default"
                          size="lg"
                          style={{
                            background: "#fff",
                            color: "#000",
                            padding: "0.875rem 1rem",
                            border: "none",
                          }}
                        >
                          <div
                            className="flex"
                            style={{
                              alignItems: "center",
                              width: 80,
                              justifyContent: "center",
                            }}
                          >
                            <span>Đóng</span>
                          </div>
                        </Button>
                        <Button
                          onClick={() => {
                            if (deleteOrderDetailModal.deletedOption) {
                              handleCancelOrder(orderId);
                            } else if (deleteOrderDetailModal.updatedOption) {
                              handleUpdateOrder(orderId);
                            }
                          }}
                          className="btn-neutral"
                          disabled={isLoadingCircle}
                          color="default"
                          size="lg"
                          style={{
                            background: "var(--primary)",
                            color: "#fff",
                            padding: "0.875rem 1rem",
                          }}
                        >
                          <div
                            className="flex"
                            style={{
                              alignItems: "center",
                              width: 80,
                              justifyContent: "center",
                            }}
                          >
                            {isLoadingCircle ? (
                              <Spinner
                                style={{
                                  color: "rgb(250,250,250)",
                                  width: "1.31rem",
                                  height: "1.31rem",
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
        </Col>
      </Row>
    </>
  );
};
