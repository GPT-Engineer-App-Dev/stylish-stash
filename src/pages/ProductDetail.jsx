import { Container, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ProductInfo from "../components/ProductInfo";
import { useProducts } from "../integrations/supabase/index.js";

const ProductDetail = () => {
  const { productId } = useParams();
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading product details</Text>;

  const product = products.find(p => p.id === parseInt(productId));

  if (!product) return <Text>Product not found</Text>;

  return (
    <Container maxW="container.md" p={4}>
      <ProductInfo product={product} />
    </Container>
  );
};

export default ProductDetail;