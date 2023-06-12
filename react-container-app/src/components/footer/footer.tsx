import { MDBFooter, MDBContainer, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import React from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './footer.css';

class Footer extends React.Component {
  render() {
    return (
      <MDBFooter className='bg-light text-center text-white position-relative footer '>
        <MDBContainer className='p-4 pb-0'>
          <section className='mb-4'>
            <MDBBtn
              floating
              className='m-1'
              style={{ backgroundColor: '#3b5998' }}
              href='#!'
              role='button'
              aria-label='Facebook'
            >
              <MDBIcon fab icon='facebook-f' />
            </MDBBtn>

            <MDBBtn
              floating
              className='m-1'
              style={{ backgroundColor: '#55acee' }}
              href='#!'
              role='button'
              aria-label='Twitter'
            >
              <MDBIcon fab icon='twitter' />
            </MDBBtn>

            <MDBBtn
              floating
              className='m-1'
              style={{ backgroundColor: '#dd4b39' }}
              href='#!'
              role='button'
              aria-label='Google'
            >
              <MDBIcon fab icon='google' />
            </MDBBtn>
            <MDBBtn
              floating
              className='m-1'
              style={{ backgroundColor: '#ac2bac' }}
              href='#!'
              role='button'
              aria-label='Instagram'
            >
              <MDBIcon fab icon='instagram' />
            </MDBBtn>

            <MDBBtn
              floating
              className='m-1'
              style={{ backgroundColor: '#0082ca' }}
              href='#!'
              role='button'
              aria-label='Linkedin'
            >
              <MDBIcon fab icon='linkedin-in' />
            </MDBBtn>

            <MDBBtn
              floating
              className='m-1'
              style={{ backgroundColor: '#333333' }}
              href='#!'
              role='button'
              aria-label='Github'
            >
              <MDBIcon fab icon='github' />
            </MDBBtn>

            <div className='text-center p-2 text-black' style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}>
              © 2023 Copyright:
              <a className='website-link text-black' href='#!'>
              ChartApp.com
              </a>
            </div>
          </section>

        </MDBContainer>
      </MDBFooter>
    );
  }
}

export default Footer;
