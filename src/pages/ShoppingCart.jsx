import { Container, Text, VStack, Box, Heading, SimpleGrid, Button } from "@chakra-ui/react";
import { useShoppingCart, useRemoveFromCart } from "../integrations/supabase/index.js";
import { useEffect, useState } from "react";

const ShoppingCart = () => {
  const { data: cartItems, isLoading, error } = useShoppingCart();
  const [cartProducts, setCartProducts] = useState([]);
  const removeFromCartMutation = useRemoveFromCart();

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const fetchProductDetails = async () => {
        const productIds = cartItems.map(item => item.product_id);
        const { data: products, error } = await supabase
          .from('products')
          .select('*')
          .in('id', productIds);
        if (error) {
          console.error("Error fetching product details:", error);
        } else {
          const cartProducts = cartItems.map(item => {
            const product = products.find(p => p.id === item.product_id);
            return { ...item, product };
          });
          setCartProducts(cartProducts);
        }
      };
      fetchProductDetails();
    }
  }, [cartItems]);

  const removeFromCart = (cartItemId) => {
    removeFromCartMutation.mutate(cartItemId, {
      onSuccess: () => {
        setCartProducts(cartProducts.filter(item => item.id !== cartItemId));
      },
      onError: (error) => {
        console.error("Error removing item from cart:", error);
      }
    });
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading cart items</Text>;

  return (
    <Container maxW="container.md" p={4}>
      <VStack spacing={8} align="stretch">
        <Box bg="gray.100" p={10} borderRadius="md" textAlign="center">
          <Heading as="h1" size="2xl" mb={4}>Your Shopping Cart</Heading>
        </Box>
        <SimpleGrid columns={{ base: 1, md: 1 }} spacing={10}>
          {cartProducts.length === 0 ? (
            <Text>Your cart is empty</Text>
          ) : (
            cartProducts.map(item => (
              <Box key={item.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
                <Heading as="h3" size="lg" mb={2}>{item.product.name}</Heading>
                <Text mb={4}>Quantity: {item.quantity}</Text>
                <Text mb={4}>Price: {item.product.price}</Text>
                <Button colorScheme="red" size="md" onClick={() => removeFromCart(item.id)}>Remove</Button>
              </Box>
            ))
          )}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default ShoppingCart;