import React from 'react'
    import { Link } from 'react-router-dom'
    import Strategies from './Strategies'

    export default function Home() {
      const scrollToStrategies = () => {
        document.getElementById('strategies-section').scrollIntoView({ behavior: 'smooth' })
      }

      return (
        <div className="bg-gray-900 min-h-screen">
          {/* Hero Section */}
          <div className="bg-gradient-to-b from-primary to-secondary text-white">
            <div className="container mx-auto px-4 py-20">
              <div className="max-w-2xl mx-auto text-center">
                <h1 className="text-5xl font-bold mb-6">
                  Haagen Trades
                </h1>
                <p className="text-xl mb-8">
                  Advanced Algorithmic Trading Strategies
                </p>
                <div className="space-x-4">
                  <button
                    onClick={scrollToStrategies}
                    className="animated-button bg-accent text-white px-6 py-3 rounded-lg hover:bg-opacity-90"
                  >
                    View Strategies
                  </button>
                  <Link
                    to="/blog"
                    className="animated-button border border-accent text-accent px-6 py-3 rounded-lg hover:bg-accent hover:text-white"
                  >
                    Read Blog
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Strategies Section */}
          <div id="strategies-section" className="py-12">
            <Strategies />
          </div>
        </div>
      )
    }
