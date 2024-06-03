import { Container } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ProductInfo from "../components/ProductInfo";

const ProductDetail = () => {
  const { productId } = useParams();
  const product = {
    id: productId,
    name: "Stylish Jacket",
    description: "Stay warm and stylish with our latest collection of jackets.",
    price: "$99.99",
    images: ["/images/clothing1.jpg", "/images/clothing2.jpg", "/images/clothing3.jpg"]
  };

  return (
    <Container maxW="container.md" p={4}>
      <ProductInfo product={product} />
    </Container>
  );
};

export default ProductDetail;