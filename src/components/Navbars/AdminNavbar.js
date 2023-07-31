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
// nodejs library that concatenates classes
import classnames from "classnames";
import { getAuth, signOut } from "firebase/auth";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { useContext } from "react";
import { useHistory } from "react-router";
// reactstrap components
import { Collapse, Container, DropdownItem, DropdownMenu, DropdownToggle, Media, Nav, Navbar, UncontrolledDropdown } from "reactstrap";
import { AppContext } from "../../context/AppProvider";

function AdminNavbar({ theme, sidenavOpen, toggleSidenav }) {
    let history = useHistory();
    // function that on mobile devices makes the search open
    const { setUser } = useContext(AppContext);
    const openSearch = () => {
        document.body.classList.add("g-navbar-search-showing");
        setTimeout(function () {
            document.body.classList.remove("g-navbar-search-showing");
            document.body.classList.add("g-navbar-search-show");
        }, 150);
        setTimeout(function () {
            document.body.classList.add("g-navbar-search-shown");
        }, 300);
    };
    // function that on mobile devices makes the search close
    const closeSearch = () => {
        document.body.classList.remove("g-navbar-search-shown");
        setTimeout(function () {
            document.body.classList.remove("g-navbar-search-show");
            document.body.classList.add("g-navbar-search-hiding");
        }, 150);
        setTimeout(function () {
            document.body.classList.remove("g-navbar-search-hiding");
            document.body.classList.add("g-navbar-search-hidden");
        }, 300);
        setTimeout(function () {
            document.body.classList.remove("g-navbar-search-hidden");
        }, 500);
    };

    return (
        <>
            <Navbar className={classnames("navbar-top navbar-expand border-bottom", { "navbar-dark primary-color": theme === "dark" }, { "navbar-light bg-secondary": theme === "light" })}>
                <Container fluid>
                    <Collapse navbar isOpen={true}>
                        {/* <Form
              className={classnames(
                "navbar-search form-inline mr-sm-3",
                { "navbar-search-light": theme === "dark" },
                { "navbar-search-dark": theme === "light" }
              )}
            >
              <FormGroup className="mb-0">
                <InputGroup className="input-group-alternative input-group-merge">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-search" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Search" type="text" />
                </InputGroup>
              </FormGroup>
              <button
                aria-label="Close"
                className="close"
                type="button"
                onClick={closeSearch}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </Form> */}

                        <Nav className="align-items-center ml-md-auto" navbar></Nav>
                        <Nav className="align-items-center ml-auto ml-md-0 " navbar>
                            <UncontrolledDropdown nav>
                                <DropdownToggle className="nav-link pr-0" color="" tag="a">
                                    <Media className="align-items-center">
                                        <span className="avatar avatar-sm rounded-circle">
                                            <img alt="..." src={"/images/logo_2.png"} />
                                        </span>
                                        <Media className="ml-2 d-none d-lg-block">
                                            <span className="mb-0 font-weight-bold nav-bar-text">VHGP.NET-Admin</span>
                                        </Media>
                                    </Media>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem className="noti-title" header tag="div">
                                        <h6 className="text-overflow m-0">Welcome!</h6>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem
                                        href="#pablo"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const authentication = getAuth();
                                            signOut(authentication).then((res) => {
                                                localStorage.removeItem("user");
                                                setUser({});
                                                history.replace("/login");
                                            });
                                        }}
                                    >
                                        <i className="ni ni-user-run" />
                                        <span>Logout</span>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </>
    );
}

AdminNavbar.defaultProps = {
    toggleSidenav: () => {},
    sidenavOpen: false,
    theme: "dark",
};
AdminNavbar.propTypes = {
    toggleSidenav: PropTypes.func,
    sidenavOpen: PropTypes.bool,
    theme: PropTypes.oneOf(["dark", "light"]),
};

export default AdminNavbar;
