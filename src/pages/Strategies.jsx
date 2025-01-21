import React from 'react'
    import Plot from 'react-plotly.js'

    const strategies = [
      {
        name: 'Statistical Arbitrage',
        description: `This strategy identifies and exploits pricing inefficiencies between related securities. It typically involves pairs trading, where two correlated assets are traded against each other when their price relationship deviates from historical norms.`,
        importance: `This strategy is important because:
        - It provides market-neutral returns
        - Reduces exposure to overall market movements
        - Works well in both trending and range-bound markets
        - Can be applied across various asset classes`,
        metrics: {
          sharpe: 1.8,
          maxDrawdown: -10.5,
          annualReturn: 20.3
        },
        chart: (
          <Plot
            data={[
              {
                x: [1, 2, 3, 4, 5],
                y: [10, 15, 13, 17, 21],
                type: 'scatter',
                name: 'Asset A',
                line: { color: '#00C4CC' }
              },
              {
                x: [1, 2, 3, 4, 5],
                y: [12, 14, 13, 16, 20],
                type: 'scatter',
                name: 'Asset B',
                line: { color: '#FF6B6B' }
              }
            ]}
            layout={{ 
              width: '100%',
              height: 400,
              title: 'Statistical Arbitrage',
              paper_bgcolor: 'rgba(0,0,0,0)',
              plot_bgcolor: 'rgba(0,0,0,0)',
              font: { color: '#ffffff' },
              xaxis: { gridcolor: '#2D3748' },
              yaxis: { gridcolor: '#2D3748' },
              margin: { l: 50, r: 50, t: 50, b: 50 },
              autosize: true
            }}
            config={{ responsive: true }}
            style={{ width: '100%' }}
          />
        )
      },
      {
        name: 'Volatility Arbitrage',
        description: `This strategy exploits discrepancies between implied volatility (from options pricing) and realized volatility. It typically involves delta-neutral options strategies to profit from volatility mispricings.`,
        importance: `This strategy is important because:
        - It provides exposure to volatility as an asset class
        - Can generate returns in both rising and falling markets
        - Helps hedge against tail risk
        - Works well during periods of market uncertainty`,
        metrics: {
          sharpe: 1.6,
          maxDrawdown: -12.2,
          annualReturn: 18.9
        },
        chart: (
          <Plot
            data={[
              {
                x: [1, 2, 3, 4, 5],
                y: [20, 25, 22, 28, 30],
                type: 'scatter',
                name: 'Implied Volatility',
                line: { color: '#00C4CC' }
              },
              {
                x: [1, 2, 3, 4, 5],
                y: [18, 20, 19, 22, 25],
                type: 'scatter',
                name: 'Realized Volatility',
                line: { color: '#FF6B6B' }
              }
            ]}
            layout={{ 
              width: '100%',
              height: 400,
              title: 'Volatility Arbitrage',
              paper_bgcolor: 'rgba(0,0,0,0)',
              plot_bgcolor: 'rgba(0,0,0,0)',
              font: { color: '#ffffff' },
              xaxis: { gridcolor: '#2D3748' },
              yaxis: { gridcolor: '#2D3748' },
              margin: { l: 50, r: 50, t: 50, b: 50 },
              autosize: true
            }}
            config={{ responsive: true }}
            style={{ width: '100%' }}
          />
        )
      },
      {
        name: 'Factor-Based Investing',
        description: `This strategy constructs portfolios based on factors like value, momentum, quality, and size. It uses quantitative models to identify stocks with the highest expected returns based on these factors.`,
        importance: `This strategy is important because:
        - It provides a systematic approach to portfolio construction
        - Offers diversification across multiple factors
        - Can be applied to both long-only and long-short portfolios
        - Works well for institutional asset allocation`,
        metrics: {
          sharpe: 1.9,
          maxDrawdown: -9.8,
          annualReturn: 22.5
        },
        chart: (
          <Plot
            data={[
              {
                x: [1, 2, 3, 4, 5],
                y: [10, 12, 14, 16, 18],
                type: 'scatter',
                name: 'Momentum Factor',
                line: { color: '#00C4CC' }
              },
              {
                x: [1, 2, 3, 4, 5],
                y: [12, 11, 13, 15, 17],
                type: 'scatter',
                name: 'Value Factor',
                line: { color: '#FF6B6B' }
              }
            ]}
            layout={{ 
              width: '100%',
              height: 400,
              title: 'Factor-Based Investing',
              paper_bgcolor: 'rgba(0,0,0,0)',
              plot_bgcolor: 'rgba(0,0,0,0)',
              font: { color: '#ffffff' },
              xaxis: { gridcolor: '#2D3748' },
              yaxis: { gridcolor: '#2D3748' },
              margin: { l: 50, r: 50, t: 50, b: 50 },
              autosize: true
            }}
            config={{ responsive: true }}
            style={{ width: '100%' }}
          />
        )
      }
    ]

    export default function Strategies() {
      return (
        <div className="bg-gray-900 min-h-screen">
          <div className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8 text-white">Trading Strategies</h2>
            <div className="space-y-8">
              {strategies.map((strategy, index) => (
                <div key={index} className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-accent">{strategy.name}</h3>
                      <p className="text-gray-300 mb-4">{strategy.description}</p>
                      <div className="bg-gray-700 p-4 rounded-lg mb-6">
                        <h4 className="text-lg font-semibold mb-2 text-white">Why It's Important</h4>
                        <p className="text-gray-300 whitespace-pre-line">{strategy.importance}</p>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-4">
                        <h4 className="text-lg font-semibold mb-3 text-white">Performance Metrics</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-600 p-3 rounded-lg">
                            <p className="text-sm text-gray-300">Sharpe Ratio</p>
                            <p className="text-xl font-bold text-white">{strategy.metrics.sharpe}</p>
                          </div>
                          <div className="bg-gray-600 p-3 rounded-lg">
                            <p className="text-sm text-gray-300">Max Drawdown</p>
                            <p className="text-xl font-bold text-white">{strategy.metrics.maxDrawdown}%</p>
                          </div>
                          <div className="bg-gray-600 p-3 rounded-lg">
                            <p className="text-sm text-gray-300">Annual Return</p>
                            <p className="text-xl font-bold text-white">{strategy.metrics.annualReturn}%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      {strategy.chart}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
