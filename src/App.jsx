
import About from './pages/about/About'
import Contact from './pages/contact/Contact'
import Home from './pages/home/Home'
import Header from './layout/header/Header'
import Footer from './layout/footer/Footer'
import { Route, Routes } from 'react-router'
import AdminProducts from './pages/admin/products/AdminProducts'
import ProductDetail from './pages/product-detail/ProductDetail'
import Order from "./pages/order/Order"
import Products from './pages/products/Products'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import AdminUsers from "./pages/admin/users/AdminUsers";
function App() {

    return (
        <>
            <Header />

            <main className='main-container'>

                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/admin/products' element={<AdminProducts />} />
                    <Route path='/product-detail/:id' element={<ProductDetail />} />
                    <Route path="/carrito" element={<Order />} />
                    <Route path='/products' element={<Products />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path="/admin/users" element={<AdminUsers />} />
                </Routes>

            </main>

            <Footer />
        </>
    )
}

export default App