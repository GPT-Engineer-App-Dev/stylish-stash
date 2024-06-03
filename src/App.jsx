import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import ShoppingCart from "./pages/ShoppingCart.jsx"; // Import the ShoppingCart page
import Navbar from "./components/Navbar.jsx"; // Import the Navbar component
import Login from "./pages/Login.jsx"; // Import the Login page
import Register from "./pages/Register.jsx"; // Import the Register page

function App() {
  return (
    <Router>
      <Navbar /> {/* Add the Navbar component */}
      <Routes>
        <Route exact path="/" element={<Index />} />
      <Route path="/product/:productId" element={<ProductDetail />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/shopping-cart" element={<ShoppingCart />} /> {/* Add the ShoppingCart route */}
      <Route path="/login" element={<Login />} /> {/* Add the Login route */}
        <Route path="/register" element={<Register />} /> {/* Add the Register route */}
      </Routes>
    </Router>
  );
}

export default App;
