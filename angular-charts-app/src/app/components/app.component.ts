import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

// Importing EChart configuration
import { initOptions } from './echarts-config/initOptions';
import { eChartOption } from './echarts-config/options';

// Importing interfaces
import { EChartsInitOptions } from './interface/echartInitOptions';
import { InventoryStats } from './interface/inventoryStats';

declare const CHARTS_BACKEND_API_URL: string;
const backendAPI = CHARTS_BACKEND_API_URL || 'http://localhost:3000';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'angular-charts-app';

  initOpts: EChartsInitOptions = initOptions;
  options: EChartsOption = eChartOption;
  mergeOptions = {};

  constructor(private http : HttpClient) {}

  updateChartsData(userId: string) {
    this.http.get(`${backendAPI}/charts/${userId}`)
      .subscribe(Response => {
        const API_Response: any = Response;

        if (Response && API_Response) {

          // Formating data according to Charts
          const formatedData: Object = this.formatData(API_Response);

          // Updating Charts
          this.mergeOptions = formatedData;
        }
      });
  }

  ngOnInit() {
    const userDataKey = localStorage.getItem('userDataKey') || '0';
    const user = JSON.parse(localStorage.getItem(userDataKey) || '{}');
    this.updateChartsData(user.Username);

    // Added a event listener to update the charts based on the data received on the 'CHARTS_UPDATE_EVENT' event
    window.addEventListener('CHARTS_UPDATE_EVENT', (customEvent: any) => {
      this.updateChartsData(user.Username);
    }, {
      passive: true
    });
  }

  formatData(inventoryStats: InventoryStats): Object {

    // Clubbing shopping categories
    const electronicsStats = Number(inventoryStats.mobilePhones) + Number(inventoryStats.cameras) + Number(inventoryStats.laptops);
    const apparel = Number(inventoryStats.jeans) + Number(inventoryStats.shirts) + Number(inventoryStats.shoes);
    const furniture = Number(inventoryStats.chairs) + Number(inventoryStats.tables) + Number(inventoryStats.wardrobes);

    const formatedData = {
      series: [{
        data: [
          { value: electronicsStats, name: 'Electronics' },
          { value: apparel, name: 'Apparel' },
          { value: furniture, name: 'Furniture' }
        ]
      }, {
        data: [
          { value: inventoryStats.mobilePhones, name: 'Mobile Phones' },
          { value: inventoryStats.cameras, name: 'Cameras' },
          { value: inventoryStats.laptops, name: 'Laptops' },
          { value: inventoryStats.jeans, name: 'Jeans' },
          { value: inventoryStats.shirts, name: 'Shirts' },
          { value: inventoryStats.shoes, name: 'Shoes' },
          { value: inventoryStats.chairs, name: 'Chairs' },
          { value: inventoryStats.tables, name: 'Tables' },
          { value: inventoryStats.wardrobes, name: 'Wardrobes' }
        ]
      }]
    };
    return formatedData;
  }
}
