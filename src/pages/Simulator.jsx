import React, { useState, useEffect } from 'react'
    import Plot from 'react-plotly.js'

    const generateRandomData = (length) => {
      const data = []
      let price = 100
      for (let i = 0; i < length; i++) {
        price += (Math.random() - 0.5) * 5
        data.push(price)
      }
      return data
    }

    const calculateMovingAverage = (data, windowSize) => {
      return data.map((val, idx, arr) => {
        if (idx < windowSize - 1) return null
        const window = arr.slice(idx - windowSize + 1, idx + 1)
        return window.reduce((a, b) => a + b, 0) / windowSize
      })
    }

    const Simulator = () => {
      const [dataLength, setDataLength] = useState(50)
      const [shortWindow, setShortWindow] = useState(10)
      const [longWindow, setLongWindow] = useState(20)
      const [priceData, setPriceData] = useState([])
      const [shortMA, setShortMA] = useState([])
      const [longMA, setLongMA] = useState([])
      const [trades, setTrades] = useState([])
      const [metrics, setMetrics] = useState({
        sharpe: 0,
        maxDrawdown: 0,
        annualReturn: 0
      })

      useEffect(() => {
        generateNewData()
      }, [dataLength])

      useEffect(() => {
        calculateMetrics()
      }, [trades])

      const generateNewData = () => {
        const newData = generateRandomData(dataLength)
        const shortMA = calculateMovingAverage(newData, shortWindow)
        const longMA = calculateMovingAverage(newData, longWindow)
        const newTrades = calculateTrades(newData, shortMA, longMA)
        
        setPriceData(newData)
        setShortMA(shortMA)
        setLongMA(longMA)
        setTrades(newTrades)
      }

      const calculateTrades = (prices, shortMA, longMA) => {
        const trades = []
        let position = null
        for (let i = longWindow; i < prices.length; i++) {
          if (shortMA[i] > longMA[i] && position !== 'long') {
            trades.push({ type: 'buy', index: i, price: prices[i] })
            position = 'long'
          } else if (shortMA[i] < longMA[i] && position !== 'short') {
            trades.push({ type: 'sell', index: i, price: prices[i] })
            position = 'short'
          }
        }
        return trades
      }

      const calculateMetrics = () => {
        if (trades.length < 2) return

        const returns = []
        for (let i = 1; i < trades.length; i++) {
          const ret = (trades[i].price - trades[i - 1].price) / trades[i - 1].price
          returns.push(ret)
        }

        const meanReturn = returns.reduce((a, b) => a + b, 0) / returns.length
        const stdDev = Math.sqrt(returns.reduce((a, b) => a + Math.pow(b - meanReturn, 2), 0) / returns.length)
        const sharpe = meanReturn / stdDev * Math.sqrt(252)

        let maxDrawdown = 0
        let peak = trades[0].price
        for (const trade of trades) {
          if (trade.price > peak) peak = trade.price
          const drawdown = (trade.price - peak) / peak
          if (drawdown < maxDrawdown) maxDrawdown = drawdown
        }

        const annualReturn = Math.pow(1 + meanReturn, 252) - 1

        setMetrics({
          sharpe: sharpe.toFixed(2),
          maxDrawdown: (maxDrawdown * 100).toFixed(1),
          annualReturn: (annualReturn * 100).toFixed(1)
        })
      }

      const plotData = [
        {
          x: [...Array(priceData.length).keys()],
          y: priceData,
          type: 'scatter',
          name: 'Price',
          line: { color: '#00C4CC' }
        },
        {
          x: [...Array(shortMA.length).keys()],
          y: shortMA,
          type: 'scatter',
          name: `MA(${shortWindow})`,
          line: { color: '#FF6B6B' }
        },
        {
          x: [...Array(longMA.length).keys()],
          y: longMA,
          type: 'scatter',
          name: `MA(${longWindow})`,
          line: { color: '#4CAF50' }
        },
        ...trades.map(trade => ({
          x: [trade.index],
          y: [trade.price],
          mode: 'markers',
          marker: {
            color: trade.type === 'buy' ? '#4CAF50' : '#FF5252',
            size: 10
          },
          name: trade.type === 'buy' ? 'Buy Signal' : 'Sell Signal',
          showlegend: false
        }))
      ]

      return (
        <div className="bg-gray-900 min-h-screen">
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8 text-white">Algorithmic Trading Simulator</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-accent">Moving Average Crossover Strategy</h2>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Data Points</label>
                    <input
                      type="number"
                      value={dataLength}
                      onChange={e => setDataLength(Number(e.target.value))}
                      className="w-full p-2 bg-gray-700 rounded-lg text-white"
                      min="20"
                      max="200"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Short MA Window</label>
                    <input
                      type="number"
                      value={shortWindow}
                      onChange={e => setShortWindow(Number(e.target.value))}
                      className="w-full p-2 bg-gray-700 rounded-lg text-white"
                      min="5"
                      max="50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Long MA Window</label>
                    <input
                      type="number"
                      value={longWindow}
                      onChange={e => setLongWindow(Number(e.target.value))}
                      className="w-full p-2 bg-gray-700 rounded-lg text-white"
                      min="10"
                      max="100"
                    />
                  </div>
                </div>
                <button
                  className="pop-button bg-accent text-white px-6 py-3 rounded-lg hover:bg-opacity-90 mb-6"
                  onClick={generateNewData}
                >
                  Generate New Data
                </button>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2 text-white">Performance Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <p className="text-sm text-gray-300">Sharpe Ratio</p>
                      <p className="text-xl font-bold text-white">{metrics.sharpe}</p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <p className="text-sm text-gray-300">Max Drawdown</p>
                      <p className="text-xl font-bold text-white">{metrics.maxDrawdown}%</p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <p className="text-sm text-gray-300">Annual Return</p>
                      <p className="text-xl font-bold text-white">{metrics.annualReturn}%</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <Plot
                  data={plotData}
                  layout={{ 
                    width: '100%',
                    height: 500,
                    title: 'Moving Average Crossover Strategy',
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    font: { 
                      color: '#ffffff',
                      family: 'Raleway'
                    },
                    xaxis: { 
                      gridcolor: '#2D3748',
                      title: 'Time',
                      showgrid: true
                    },
                    yaxis: { 
                      gridcolor: '#2D3748',
                      title: 'Price',
                      tickprefix: '$',
                      showgrid: true
                    },
                    margin: { 
                      l: 50, 
                      r: 50, 
                      t: 100,
                      b: 50 
                    },
                    autosize: true,
                    showlegend: true,
                    legend: { 
                      x: 0.5,
                      y: 1.1,
                      xanchor: 'center',
                      orientation: 'h',
                      font: {
                        size: 14
                      }
                    }
                  }}
                  config={{ 
                    responsive: true,
                    displayModeBar: false
                  }}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>
      )
    }

    export default Simulator
