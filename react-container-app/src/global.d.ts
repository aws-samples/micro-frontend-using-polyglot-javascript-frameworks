declare module 'chartsApp/chartsApp' {
  export { mount } from 'chartsApp/chartsApp';
}

declare module 'reactChartsDataApp/ChartData' {
  export { ChartData } from 'reactChartsDataApp/ChartData';
}

declare module "*.png" {
  const value: any;
  export = value;
}