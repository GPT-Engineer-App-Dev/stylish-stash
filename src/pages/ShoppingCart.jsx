import { Container, Text, VStack, Box, Heading, SimpleGrid, Button } from "@chakra-ui/react";
import { useShoppingCart } from "../integrations/supabase/index.js";

const ShoppingCart = () => {
  const { data: cartItems, isLoading, error } = useShoppingCart();

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading cart items</Text>;

  return (
    <Container maxW="container.md" p={4}>
      <VStack spacing={8} align="stretch">
        <Box bg="gray.100" p={10} borderRadius="md" textAlign="center">
          <Heading as="h1" size="2xl" mb={4}>Your Shopping Cart</Heading>
        </Box>
        <SimpleGrid columns={{ base: 1, md: 1 }} spacing={10}>
          {cartItems.length === 0 ? (
            <Text>Your cart is empty</Text>
          ) : (
            cartItems.map(item => (
              <Box key={item.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
                <Heading as="h3" size="lg" mb={2}>{item.product_id}</Heading>
                <Text mb={4}>Quantity: {item.quantity}</Text>
                <Button colorScheme="red" size="md">Remove</Button>
              </Box>
            ))
          )}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default ShoppingCart;