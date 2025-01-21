import React, { useState, useEffect } from 'react'
    import Plot from 'react-plotly.js'

    const calculateVaR = (returns, confidenceLevel = 0.95) => {
      if (!returns.length) return 0
      const sortedReturns = [...returns].sort((a, b) => a - b)
      const index = Math.floor(sortedReturns.length * (1 - confidenceLevel))
      return sortedReturns[index] || 0
    }

    const calculateStressScenarios = (returns) => {
      if (!returns.length) return { worstDay: 0, bestDay: 0, average: 0 }
      return {
        worstDay: Math.min(...returns),
        bestDay: Math.max(...returns),
        average: returns.reduce((a, b) => a + b, 0) / returns.length
      }
    }

    const RiskDashboard = () => {
      const [portfolioValue, setPortfolioValue] = useState(1000000)
      const [returns, setReturns] = useState([
        -0.02, 0.01, -0.015, 0.03, -0.01, 0.02, -0.025, 0.015, -0.03, 0.01
      ])
      const [confidenceLevel, setConfidenceLevel] = useState(0.95)
      const [varValue, setVarValue] = useState(0)
      const [stressScenarios, setStressScenarios] = useState({
        worstDay: 0,
        bestDay: 0,
        average: 0
      })

      useEffect(() => {
        const newVar = calculateVaR(returns, confidenceLevel)
        const newStress = calculateStressScenarios(returns)
        setVarValue(newVar)
        setStressScenarios(newStress)
      }, [returns, confidenceLevel])

      const handleAddReturn = () => {
        const newReturn = (Math.random() - 0.5) * 0.1
        setReturns([...returns, newReturn])
      }

      return (
        <div className="bg-gray-900 min-h-screen">
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8 text-white">Risk Management Dashboard</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-accent">Portfolio Risk Analysis</h2>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Portfolio Value ($)</label>
                    <input
                      type="number"
                      value={portfolioValue}
                      onChange={e => setPortfolioValue(Number(e.target.value))}
                      className="w-full p-2 bg-gray-700 rounded-lg text-white"
                      min="1000"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Confidence Level</label>
                    <select
                      value={confidenceLevel}
                      onChange={e => setConfidenceLevel(Number(e.target.value))}
                      className="w-full p-2 bg-gray-700 rounded-lg text-white"
                    >
                      <option value={0.90}>90%</option>
                      <option value={0.95}>95%</option>
                      <option value={0.99}>99%</option>
                    </select>
                  </div>
                  <button
                    onClick={handleAddReturn}
                    className="pop-button bg-accent text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
                  >
                    Add Random Return
                  </button>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold mb-2 text-white">Value at Risk (VaR)</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <p className="text-sm text-gray-300">Daily VaR</p>
                      <p className="text-xl font-bold text-white">
                        ${(portfolioValue * Math.abs(varValue)).toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <p className="text-sm text-gray-300">VaR Percentage</p>
                      <p className="text-xl font-bold text-white">
                        {(varValue * 100).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2 text-white">Stress Testing</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <p className="text-sm text-gray-300">Worst Day</p>
                      <p className="text-xl font-bold text-red-400">
                        {(stressScenarios.worstDay * 100).toFixed(2)}%
                      </p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <p className="text-sm text-gray-300">Best Day</p>
                      <p className="text-xl font-bold text-green-400">
                        {(stressScenarios.bestDay * 100).toFixed(2)}%
                      </p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <p className="text-sm text-gray-300">Average Return</p>
                      <p className="text-xl font-bold text-white">
                        {(stressScenarios.average * 100).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <Plot
                  data={[
                    {
                      x: [...Array(returns.length).keys()],
                      y: returns,
                      type: 'scatter',
                      name: 'Daily Returns',
                      line: { color: '#00C4CC' }
                    },
                    {
                      x: [0, returns.length - 1],
                      y: [varValue, varValue],
                      type: 'scatter',
                      name: 'VaR Threshold',
                      line: { color: '#FF6B6B', dash: 'dash' }
                    }
                  ]}
                  layout={{ 
                    width: '100%',
                    height: 500,
                    title: 'Portfolio Returns Distribution',
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    font: { 
                      color: '#ffffff',
                      family: 'Raleway'
                    },
                    xaxis: { 
                      gridcolor: '#2D3748',
                      title: 'Day',
                      showgrid: true
                    },
                    yaxis: { 
                      gridcolor: '#2D3748',
                      title: 'Return',
                      tickformat: '.1%',
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

    export default RiskDashboard
