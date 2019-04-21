// import React from "react";
// import Link from "next/link";

// const Header = () => {
//   return (
//     <nav>
//       <ul className="menu-ul">
//         <li className="menu-items">
//           <Link prefetch href="/">
//             <a>Home</a>
//           </Link>
//         </li>
//         <li>
//           <Link prefetch href="/about">
//             <a>About</a>
//           </Link>
//         </li>
//         <li>
//           <Link prefetch href="/contacts">
//             <a>Contact</a>
//           </Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Header;

import React from "react";
import Link from "next/link";
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

const BsNavLink = ({ route, title }) => {
  return (
    <Link href={route}>
      <a className="nav-link">{title}</a>
    </Link>
  );
};
const BsNavLinkDropDown = ({ route, title }) => {
  return (
    <Link href={route}>
      <a className="dropdown-item">{title}</a>
    </Link>
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
              {/* <NavItem>
                <BsNavLink title="Условия" route="/conditions" />
              </NavItem>
              <NavItem>
                <BsNavLink title="Новости" route="/news" />
              </NavItem> */}
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Продукция
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
