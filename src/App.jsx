import { BrowserRouter, Routes, Route } from 'react-router-dom'
    import Home from './pages/Home'
    import Strategies from './pages/Strategies'
    import Simulator from './pages/Simulator'
    import RiskDashboard from './pages/RiskDashboard'
    import Contact from './pages/Contact'
    import Navbar from './components/Navbar'
    import Footer from './components/Footer'

    function App() {
      return (
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/strategies" element={<Strategies />} />
                <Route path="/simulator" element={<Simulator />} />
                <Route path="/risk" element={<RiskDashboard />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      )
    }

    export default App
