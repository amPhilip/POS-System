import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import 'antd/dist/antd.min.css';
import './App.css';
import Home from './pages/home/Home';
import Products from './pages/products/Products';
import Cart from './pages/cart/Cart';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Bills from './pages/bills/Bills';
import Customers from './pages/customers/Customers';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={
            <ProtectedRouter>
              <Home />
            </ProtectedRouter>
            } />
          <Route path="/products" element={
            <ProtectedRouter>
              <Products />
            </ProtectedRouter>
            } />
          <Route path="/cart" element={
            <ProtectedRouter>
              <Cart />
            </ProtectedRouter>
            } />
            <Route path="/bills" element={
            <ProtectedRouter>
              <Bills />
            </ProtectedRouter>
            } />
            <Route path="/customers" element={
            <ProtectedRouter>
              <Customers />
            </ProtectedRouter>
            } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

export function ProtectedRouter({children}) {
  if(localStorage.getItem("auth")) {
    return children;
  } else {
    return <Navigate to="/login" />
  }
}
