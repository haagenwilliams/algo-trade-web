import React from 'react'
    import { Link } from 'react-router-dom'

    export default function Navbar() {
      return (
        <nav className="bg-primary p-4 text-white">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">
              Haagen Trades
            </Link>
            <div className="space-x-4">
              <Link to="/strategies" className="pop-button hover:text-accent px-4 py-2 rounded-lg">
                Strategies
              </Link>
              <Link to="/simulator" className="pop-button hover:text-accent px-4 py-2 rounded-lg">
                Simulator
              </Link>
              <Link to="/risk" className="pop-button hover:text-accent px-4 py-2 rounded-lg">
                Risk Management
              </Link>
              <Link to="/contact" className="pop-button hover:text-accent px-4 py-2 rounded-lg">
                Contact
              </Link>
            </div>
          </div>
        </nav>
      )
    }
