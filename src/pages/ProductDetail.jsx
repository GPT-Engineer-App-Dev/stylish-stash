import { Container, Box, Image, Text, Heading, VStack, Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { productId } = useParams();
  
  // Mock product data
  const product = {
    id: productId,
    name: "Stylish Jacket",
    description: "Stay warm and stylish with our latest collection of jackets.",
    price: "$99.99",
    images: ["/images/clothing1.jpg", "/images/clothing2.jpg", "/images/clothing3.jpg"]
  };

  return (
    <Container maxW="container.md" p={4}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={4}>{product.name}</Heading>
          <Text fontSize="xl" color="gray.600">{product.price}</Text>
        </Box>
        <Box>
          <Image src={product.images[0]} alt={product.name} borderRadius="md" />
        </Box>
        <Box>
          <Text fontSize="md">{product.description}</Text>
        </Box>
        <Button colorScheme="teal" size="lg">Add to Cart</Button>
      </VStack>
    </Container>
  );
};

export default ProductDetail;