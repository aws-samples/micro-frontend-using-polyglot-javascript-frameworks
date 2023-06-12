import { Button } from '@aws-amplify/ui-react';
import { MDBContainer, MDBNavbar, MDBNavbarBrand } from 'mdb-react-ui-kit';
import React from 'react';
import logo from '../../assets/app_logo.png';
import './header.css';

// Header Props for getting signOut function for Amplify Authentication
export type HeaderProps = { signOut?: any; user?: any };

// Header component for the application
class Header extends React.Component<HeaderProps> {

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <>
        <MDBNavbar light bgColor='light'>
          <MDBContainer fluid>
            <MDBNavbarBrand href='#'>
              <img
                src={logo}
                height='30'
                width='30'
                alt='logo'
                loading='lazy'
              />
              Charts App
            </MDBNavbarBrand>
            <div className="d-flex align-items-center">
              <Button className="signout-button" onClick={this.props.signOut}>Sign Out</Button>
            </div>
          </MDBContainer>
        </MDBNavbar>
      </>
    );
  }
}

export default Header;