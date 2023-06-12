import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { MDBContainer, MDBCol } from 'mdb-react-ui-kit';
import '@aws-amplify/ui-react/styles.css';
import React from 'react';
import './style.css';

/* ***************Importing Mircofronted App Component ********
************************** Lazy Load *****************************/

//Importing React Charts Data App
const CharDataApp = React.lazy(() => import('reactChartsDataApp/ChartData').then(({ ChartData }) => ({ default: ChartData })));

//Importing Angular Charts App
const ChartsApp = React.lazy(() => import('../../utils/external-angular-app'));

export type ContainerProps = { user?: any };

class Container extends React.Component<ContainerProps> {
  render() {
    return (
      <><div className="ContanierHeader"> <i>@React Container App</i> </div>
        <MDBContainer className='fluid mainContainer'>
          <div className="d-flex align-items-start bg-light mb-1">
            <MDBCol className="BMIInputBox ">
              <div className="BMIDataAppHeader">
                <i>@React App</i>
              </div>
              <CharDataApp className="reactChartsDataApp" user={this.props.user}></CharDataApp>
            </MDBCol>
            <MDBCol className="BMIGraph">
              <div className="BMIChartsAppHeader">
                <i>@Angular App</i>
              </div>
              <ChartsApp userDataKey={this.props.user.userDataKey}/>
            </MDBCol>
          </div>
        </MDBContainer></>

    );
  }
}

export default Container;
