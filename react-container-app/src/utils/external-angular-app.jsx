import { useEffect, useRef } from "react";
import { mount } from "angularChartsApp/angularChartsApp";

const AngularChartsAppModule = (userDataKey) => {
  const ref = useRef(null);
  useEffect(()=> {
    // Passing Cogito userDataKey to Angular app
    mount(userDataKey);  
  }, []);   
  return <app-root></app-root>;
};

export default AngularChartsAppModule;