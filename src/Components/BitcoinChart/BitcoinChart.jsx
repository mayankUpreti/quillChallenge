import React from 'react'
import Chart from '../chart'
import './BitcoinChart.styles.css'
class BitcoinChart extends React.Component {
  constructor() {
    super();
    this.state = {
      productId: 'ETH-USD',
      lineChartData: {
        labels: [],
        datasets: [
          {
            label: 'Best Bid',
            data: [],
            backgroundColor: [
              'rgba(255,99,132,0.6)'
            ]
          }
        ]
      }
    }

  }

  componentDidMount() {
    this.ws = new WebSocket('wss://ws-feed.pro.coinbase.com');
    this.ws.onopen = () => {
      this.ws.send(JSON.stringify(
        {
          "type": "subscribe",
          "product_ids": [
            `${this.state.productId}`,  // "ETH-EUR"   or 'ETH-USD' change accordingly what u want
          ],
          "channels": [
            {
              "name": "ticker",
            }
          ]
        }
      ));
    };

    this.ws.onmessage = (event) => {
     
      const value = JSON.parse(event.data);
      // console.log(value)
      const oldDataSet = this.state.lineChartData.datasets[0];
      const newDataSet = { ...oldDataSet };
      newDataSet.data.push(value.price);

      const newChartData = {
        ...this.state.lineChartData,
        datasets: [newDataSet],
        labels: this.state.lineChartData.labels.concat(
          new Date().toLocaleTimeString()
        )
      };
      this.setState({ lineChartData: newChartData });

    }

  }
  componentWillUnmount() {
    this.ws.close();
  }


  render() {
    return <div className='HomePage'>
      <h1 className='title'>BitCoin Real Time Analysis</h1>
      <div className='graphArea'>
        <Chart
          data={this.state.lineChartData}
        />
      </div>
</div>
  }

}

export default BitcoinChart