import axios from 'axios';
import { MDBRow, MDBInputGroup, MDBTypography, MDBBtn } from 'mdb-react-ui-kit';
import React from 'react';

import './style.css';

// ChartState interface
interface ChartState {
  mobilePhones: number;
  cameras: number;
  laptops: number;
  chairs: number;
  tables: number;
  wardrobes: number;
  jeans: number;
  shirts: number;
  shoes: number;
  userId: string;
}

const backendAPI = process.env.CHARTS_BACKEND_API_URL || 'http://localhost:3000';

// ChartData Props
export type ChartDataProps = { user?: any };

// ChartData Component
export class ChartData extends React.Component<ChartDataProps, ChartState> {
  constructor(props: {user: any}) {
    super(props);

    this.state = {
      mobilePhones: 0,
      cameras: 0,
      laptops: 0,
      chairs: 0,
      tables: 0,
      wardrobes: 0,
      jeans: 0,
      shirts: 0,
      shoes: 0,
      userId: (this.props.user)? this.props.user.username : ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.getChartsData = this.getChartsData.bind(this);
    this.saveData = this.saveData.bind(this);
  }

  // Get ChartData and update the state
  async getChartsData() {

    // Getting ChartData from API
    try {
      const res = await axios.get( `${backendAPI}/charts/${this.props.user.username}`);
      const { data, status } = await res;
      if (status === 200) {
        this.setState(data);
      }
    } catch (err) {
      console.log('Something went wrong!');

    }
  }

  // Persist chart data to the database using API
  async updateChartsData() {
    if (this.props.user) {
      await axios.post(`${backendAPI}/charts`, this.state);
    } else {
      alert('Not a vaild user!');
    }
  }

  // Called immediately after a component is mounted
  componentDidMount() {
    if (this.props.user) {
      this.getChartsData().then(() => {}).catch((err) => {});
    }
  }

  saveData(event) {
    // Creating Custom Event
    const chartUpdateEvent = new CustomEvent('CHARTS_UPDATE_EVENT', { detail: this.state });
    
    this.updateChartsData().then(() => {
      // Dispatching Event
      window.dispatchEvent(chartUpdateEvent);
    }).catch((err) => {});

    event.preventDefault();
  }

  // Trigged when change event is detected on the input box
  handleChange(event) {
    const { name, value } = event.target;

    const newChartState: ChartState = this.state;
    newChartState[name] = value;

    this.setState(newChartState);
  }

  // Renders the HTML code
  render() {
    return (
      <><div className='chartsDataApp'>
        <h5 className="text-center chartsDataAppText">Product Categories Data </h5>
        <form className="chartsDataAppForm">

          <label><MDBTypography variant='h6'>Electronics</MDBTypography></label>
          <MDBRow>
            <MDBInputGroup className='mb-3' textBefore='Mobile Phones'>
              <input className='form-control' type='number' aria-label="Mobile Phones" name="mobilePhones" value={this.state.mobilePhones} onChange={this.handleChange} />
            </MDBInputGroup>

            <MDBInputGroup className='mb-3' textBefore='Cameras'>
              <input className='form-control' type='number' aria-label="Cameras" name="cameras" value={this.state.cameras} onChange={this.handleChange} />
            </MDBInputGroup>

            <MDBInputGroup className='mb-3' textBefore='Laptops'>
              <input className='form-control' type='number' aria-label="Laptops" name="laptops" value={this.state.laptops} onChange={this.handleChange} />
            </MDBInputGroup>
          </MDBRow>

          <label><MDBTypography variant='h6'>Furnitures</MDBTypography></label>
          <MDBRow>
            <MDBInputGroup className='mb-3' textBefore='Chairs'>
              <input className='form-control' type='number' aria-label="Chairs" name="chairs" value={this.state.chairs} onChange={this.handleChange} />
            </MDBInputGroup>

            <MDBInputGroup className='mb-3' textBefore='Tables'>
              <input className='form-control' type='number' aria-label="Tables" name="tables" value={this.state.tables} onChange={this.handleChange} />
            </MDBInputGroup>

            <MDBInputGroup className='mb-3' textBefore='Wardrobes'>
              <input className='form-control' type='number' aria-label="Wardrobes" name="wardrobes" value={this.state.wardrobes} onChange={this.handleChange} />
            </MDBInputGroup>
          </MDBRow>

          <label><MDBTypography variant='h6'>Apparels</MDBTypography></label>
          <MDBRow>
            <MDBInputGroup className='mb-3' textBefore='Jeans'>
              <input className='form-control' type='number' aria-label="Jeans" name="jeans" value={this.state.jeans} onChange={this.handleChange} />
            </MDBInputGroup>

            <MDBInputGroup className='mb-3' textBefore='Shirts'>
              <input className='form-control' type='number' aria-label="Shirts" name="shirts" value={this.state.shirts} onChange={this.handleChange} />
            </MDBInputGroup>
            <MDBInputGroup className='mb-3' textBefore='shoes'>
              <input className='form-control' type='number' aria-label="Shoes" name="shoes" value={this.state.shoes} onChange={this.handleChange} />
            </MDBInputGroup>
          </MDBRow>

          <div className="text-center submitButton">
            <button type="button" className="btn btn-primary" onClick={this.saveData}>Update Chart</button>
          </div>
        </form>
      </div></>
    );
  }
}