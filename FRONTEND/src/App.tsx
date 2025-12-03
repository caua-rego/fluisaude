import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IndexPage from './Pages/Index.tsx'
import Login from './Pages/Login'
import Products from './Pages/Products'
import ProductDetail from './Pages/ProductDetail'
import { Layout } from './components/Layout'
import Admin from './Pages/Admin'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}> 
          <Route path="/" element={<IndexPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
