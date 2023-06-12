import type { EChartsOption } from 'echarts';

export const eChartOption: EChartsOption = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    bottom: 5,
    align: 'auto',
    data: [
      'Electronics',
      'Apparel',
      'Furniture',
      'Mobile Phones',
      'Cameras',
      'Laptops',
      'Jeans',
      'Shirts',
      'Shoes',
      'Chairs',
      'Tables',
      'Wardrobes'
    ]
  },
  series: [
    {
      name: 'Prodcut Categories',
      type: 'pie',
      selectedMode: 'single',
      radius: [0, '35%'],
      label: {
        position: 'inner',
        fontSize: 12
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 0, name: 'Electronics' },
        { value: 0, name: 'Apparel' },
        { value: 0, name: 'Furniture' }
      ]
    },
    {
      name: 'Product',
      type: 'pie',
      radius: ['45%', '60%'],
      labelLine: {
        length: 30
      },
      label: {
        formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
        backgroundColor: '#F6F8FC',
        borderColor: '#8C8D8E',
        borderWidth: 1,
        borderRadius: 4,
        rich: {
          a: {
            color: '#6E7079',
            lineHeight: 22,
            align: 'center'
          },
          hr: {
            borderColor: '#8C8D8E',
            width: '100%',
            borderWidth: 1,
            height: 0
          },
          b: {
            color: '#4C5058',
            fontSize: 12,
            fontWeight: 'bold',
            lineHeight: 33
          },
          per: {
            color: '#fff',
            backgroundColor: '#4C5058',
            padding: [3, 4],
            borderRadius: 4
          }
        }
      },
      data: [
        { value: 0, name: 'Mobile Phones' },
        { value: 0, name: 'Cameras' },
        { value: 0, name: 'Laptops' },
        { value: 0, name: 'Jeans' },
        { value: 0, name: 'Shirts' },
        { value: 0, name: 'Shoes' },
        { value: 0, name: 'Chairs' },
        { value: 0, name: 'Tables' },
        { value: 0, name: 'Wardrobes' }
      ]
    }
  ]
};