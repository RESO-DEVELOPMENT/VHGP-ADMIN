import React, { useContext, useEffect, useState } from "react";
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
import { AppContext } from "../../context/AppProvider";
import { notify } from "../Toast/ToastCustom";
import { removeProductFromMenu } from "../../apis/menuApiService";
export const RemoveProductFromMenuModal = ({ handleReload }) => {
  const {
    menu,
    deleteModal,
    setDeleteModal,
    openRemoveProductFromMenuModal,
    setOpenRemoveProductFromMenuModal,
  } = useContext(AppContext);
  const [name, setName] = useState("");
  const [isLoadingCircle, setIsLoadingCircle] = useState(false);

  useEffect(() => {
    if (deleteModal !== null) {
      setName((deleteModal.data && deleteModal.data.name) || "");
    }
  }, [deleteModal]);

  const handleRemoveProdct = () => {
    setIsLoadingCircle(true);
    removeProductFromMenu(menu, [deleteModal.data.id])
      .then((res) => {
        setOpenRemoveProductFromMenuModal(false);
        notify("Xóa sản phẩm thành công", "Success");
        setDeleteModal({});
        handleReload();
      })
      .catch((error) => {
        console.log(error);
        notify("Đã xảy ra lỗi gì đó!!", "Error");
      })
      .finally(() => {
        setIsLoadingCircle(false);
      });
  };

  return (
    <>
      <Row>
        <Col md="4">
          <Modal
            className="modal-dialog-centered"
            size="sm"
            isOpen={openRemoveProductFromMenuModal}
            toggle={() => {
              setOpenRemoveProductFromMenuModal(false);
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
                        <h3>Bạn có chắc muốn xóa?</h3>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            padding: "0px 0px 30px 0px",
                          }}
                          className=""
                        >
                          <span className="mb-0">
                            Sản phẩm:{" "}
                            <span style={{ fontWeight: 700 }}>{name}</span> sẽ
                            bị xóa khỏi menu.{" "}
                          </span>
                        </div>
                        <div className="col-md-12"></div>
                      </div>
                    </Row>
                    <Col className="text-md-right mb-3" lg="12" xs="5">
                      <Row style={{ justifyContent: "flex-end" }}>
                        {" "}
                        <Button
                          onClick={() => {
                            setOpenRemoveProductFromMenuModal(false);
                          }}
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
                            handleRemoveProdct();
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
