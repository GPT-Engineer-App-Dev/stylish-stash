import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import AddProduct from "./pages/AddProduct.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
      <Route path="/product/:productId" element={<ProductDetail />} />
      <Route path="/add-product" element={<AddProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
