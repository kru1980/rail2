import React from "react";
import Link from "next/link";
import auth0 from "../../services/auth0";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const BsNavLink = props => {
  const { route, title } = props;
  return (
    <Link href={route}>
      <a className="nav-link port-navbar-link">{title}</a>
    </Link>
  );
};

const BsNavLinkDropDown = ({ route, title }) => {
  return (
    <Link href={route}>
      <a className="dropdown-item ">{title}</a>
    </Link>
  );
};

const Login = () => {
  return (
    <span onClick={auth0.login} className="nav-link port-navbar-link clickable">
      Login
    </span>
  );
};
const Logout = () => {
  return (
    <span
      onClick={auth0.logout}
      className="nav-link port-navbar-link clickable"
    >
      Logout
    </span>
  );
};

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const { isAuthenticated, user } = this.props;
    // console.log("user header", user);
    // console.log("props header", this.props);
    // console.log("isAuthenticated header", isAuthenticated);

    return (
      <div>
        <Navbar
          color="dark"
          dark
          expand="sm"
          className="port-navbar port-default absolute"
        >
          <NavbarBrand className="port-navbar-brand" href="/">
            АЗИЯ ТРАНС ТРЕЙД
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="port-navbar-item">
                <BsNavLink title="Компания" route="/about" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink title="Каталог" route="/catalog" />
              </NavItem>

              {!isAuthenticated && (
                <NavItem className="port-navbar-item">
                  <Login />
                </NavItem>
              )}

              {isAuthenticated && (
                <NavItem className="port-navbar-item">
                  <Logout />
                </NavItem>
              )}

              {/* <NavItem>
                <BsNavLink title="Условия" route="/conditions" />
              </NavItem>
              <NavItem>
                <BsNavLink title="Новости" route="/news" />
              </NavItem> */}
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {/* span вынести в файл стилей, добавить ховер и стили для after компонента port-navbar-link nav-link*/}
                  <span
                    style={{
                      fontWeight: "bold",
                      letterSpacing: "0.8px",
                      fontSize: "18px",
                      textTransform: "uppercase",
                      color: "white"
                    }}
                  >
                    Продукция
                  </span>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <BsNavLinkDropDown title="Рельсы" route="/rails_rr" />
                  </DropdownItem>
                  <DropdownItem>
                    <BsNavLinkDropDown title="Шпалы" route="/ties" />
                  </DropdownItem>
                  <DropdownItem>
                    <BsNavLinkDropDown
                      title="Рельсовые накладки"
                      route="/bolts"
                    />
                  </DropdownItem>
                  <DropdownItem>
                    <BsNavLinkDropDown title="Метизы" route="/spikes" />
                  </DropdownItem>
                  <DropdownItem>
                    <BsNavLinkDropDown
                      title="Колодки, башмаки"
                      route="/blocks"
                    />
                  </DropdownItem>
                  <DropdownItem>
                    <BsNavLinkDropDown title="Подкладки" route="/linings" />
                  </DropdownItem>
                  <DropdownItem>
                    <BsNavLinkDropDown
                      title="Стрелочные переводы"
                      route="/nuts"
                    />
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
