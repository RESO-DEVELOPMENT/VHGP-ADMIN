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
// nodejs library to set properties for components
import PropTypes from "prop-types";
// reactstrap components
import { Breadcrumb, BreadcrumbItem, Button, Container, Row, Col } from "reactstrap";

function SimpleHeader({ name, parentName }) {
    return (
        <>
            <div className="header header-dark pb-6 content__title content__title--calendar" >
                <Container fluid>
                    <div className="header-body">
                        <Row className="align-items-center py-4">
                            <Col lg="6" xs="7" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                <h6 className="fullcalendar-title h1 text-black d-inline-block mb-0">{name}</h6>{" "}
                                <Breadcrumb className="d-none d-md-inline-block " listClassName="breadcrumb-links breadcrumb-dark ">
                                    <BreadcrumbItem>
                                        <a href="#pablo" style={{ color: "rgb(80, 80 ,80)", fontWeight: 600 }} onClick={(e) => e.preventDefault()}>
                                            <i className="fas fa-home " style={{ color: "rgb(80, 80 ,80)" }} />
                                        </a>
                                    </BreadcrumbItem>
                                    <BreadcrumbItem>
                                        <a href="#pablo" style={{ color: "#32325d",fontWeight: 500 }} onClick={(e) => e.preventDefault()}>
                                            {parentName}
                                        </a>
                                    </BreadcrumbItem>
                                    <BreadcrumbItem aria-current="page" className="" style={{ color: "#32325d",fontWeight: 500 }}>
                                        {name}
                                    </BreadcrumbItem>
                                </Breadcrumb>
                            </Col>
                            {/* <Col className="mt-3 mt-md-0 text-md-right" lg="6" xs="5">
                <Button className="btn-neutral" color="default" size="sm">
                  New
                </Button>
                <Button className="btn-neutral" color="default" size="sm">
                  Filters
                </Button>
              </Col> */}
                        </Row>
                    </div>
                </Container>
            </div>
        </>
    );
}

SimpleHeader.propTypes = {
    name: PropTypes.string,
    parentName: PropTypes.string,
};

export default SimpleHeader;
