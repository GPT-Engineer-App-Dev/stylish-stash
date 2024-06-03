import { Container, Text, VStack, Box, Heading, SimpleGrid } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";

const Index = () => {
  const products = [
    {
      id: 1,
      name: "Stylish Jacket",
      description: "Stay warm and stylish with our latest collection of jackets.",
      image: "/images/clothing1.jpg"
    },
    {
      id: 2,
      name: "Casual T-Shirt",
      description: "Perfect for everyday wear, our casual t-shirts come in various colors.",
      image: "/images/clothing2.jpg"
    },
    {
      id: 3,
      name: "Elegant Dress",
      description: "Turn heads with our elegant and stylish dresses for any occasion.",
      image: "/images/clothing3.jpg"
    }
  ];

  return (
    <Container maxW="container.xl" p={4}>
      <VStack spacing={8} align="stretch">
        <Box bg="gray.100" p={10} borderRadius="md" textAlign="center">
          <Heading as="h1" size="2xl" mb={4}>Welcome to Our Online Clothing Store</Heading>
          <Text fontSize="xl">Discover the latest trends in fashion and shop your favorite outfits.</Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Index;