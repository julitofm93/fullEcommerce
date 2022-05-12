import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

function App() {
  
  /* const user = useSelector((state) => state.user.currentUser); */

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
        <Routes>
          <Route path="/products/:category" element={<ProductList/>} />
        </Routes>
        <Routes>
          <Route path="/product/:id" element={<Product/>} />
        </Routes>
        <Routes>
          <Route path="/cart" element={<Cart/>} />
        </Routes>
        <Routes>
          <Route path="/login" element={<Login/>}/* element={user ? <Navigate to="/" replace/> : <Login/>}  *//>
        </Routes>
        <Routes>
        <Route path="/register" element={<Register/>}/* element={user ? <Navigate to="/" replace/> : <Register/>} */ />
        </Routes>
        <Routes>
          <Route path="/profile" element={<Profile/>}/* element={user ? <Navigate to="/" replace/> : <Login/>}  *//>
        </Routes>
      </Router>
      
  );
}

export default App;
