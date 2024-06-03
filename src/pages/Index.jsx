import { Container, Text, VStack, Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProducts } from "../integrations/supabase/index.js";
import ProductCard from "../components/ProductCard";

const Index = () => {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading products</Text>;

  return (
    <Container maxW="container.xl" p={4}>
      <VStack spacing={8} align="stretch">
        <Box bg="gray.100" p={10} borderRadius="md" textAlign="center">
          <Heading as="h1" size="2xl" mb={4}>Welcome to Our Online Clothing Store</Heading>
          <Text fontSize="xl">Discover the latest trends in fashion and shop your favorite outfits.</Text>
        </Box>

        <Box textAlign="center" mt={4}>
          <Button as={Link} to="/add-product" colorScheme="teal" size="md">
            Add New Product
          </Button>
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