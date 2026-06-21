import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import WhatsAppFloat from './components/WhatsAppFloat'
import Home from './pages/Home'
import Listings from './pages/Listings'
import BusinessProfile from './pages/BusinessProfile'
import ForBusinesses from './pages/ForBusinesses'
import ComoFunciona from './pages/ComoFunciona'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-warm-bg">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/establecimientos" element={<Listings />} />
          <Route path="/negocio/:slug" element={<BusinessProfile />} />
          <Route path="/para-negocios" element={<ForBusinesses />} />
          <Route path="/como-funciona" element={<ComoFunciona />} />
        </Routes>
        <WhatsAppFloat />
      </div>
    </BrowserRouter>
  )
}
