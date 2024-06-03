import { Box, Image, Text, Heading, VStack, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useAddToCart, useRemoveFromCart, useShoppingCart } from "../integrations/supabase/index.js";
import { useUser } from '@supabase/supabase-js';

const ProductInfo = ({ product }) => {
  const toast = useToast();
  const { data: cartItems } = useShoppingCart();
  const addToCartMutation = useAddToCart();
  const removeFromCartMutation = useRemoveFromCart();
  const { user } = useUser();

  const addToCart = () => {
    const userId = user?.id;
    if (!userId) {
      toast({
        title: "Error",
        description: "You must be logged in to add items to the cart.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    addToCartMutation.mutate(
      { user_id: userId, product_id: product.id, quantity: 1 },
      {
        onSuccess: () => {
          toast({
            title: "Added to cart",
            description: `${product.name} has been added to your cart.`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        },
        onError: (error) => {
          console.error("Error adding to cart:", error);
          toast({
            title: "Error",
            description: "Failed to add item to cart.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        },
      }
    );
  };

  const removeFromCart = () => {
    const cartItem = cartItems.find(item => item.product_id === product.id);
    if (cartItem) {
      removeFromCartMutation.mutate(cartItem.id, {
        onSuccess: () => {
          toast({
            title: "Removed from cart",
            description: `${product.name} has been removed from your cart.`,
            status: "info",
            duration: 3000,
            isClosable: true,
          });
        }
      });
    }
  };

  return (
    <VStack spacing={8} align="stretch">
      <Box textAlign="center">
        <Heading as="h1" size="2xl" mb={4}>{product.name}</Heading>
        <Text fontSize="xl" color="gray.600">{product.price}</Text>
      </Box>
      <Box>
        <Image src={product.image_url} alt={product.name} borderRadius="md" />
      </Box>
      <Box>
        <Text fontSize="md">{product.description}</Text>
      </Box>
      <Button colorScheme="teal" size="lg" onClick={addToCart}>Add to Cart</Button>
      <Button colorScheme="red" size="lg" onClick={removeFromCart}>Remove from Cart</Button>
    </VStack>
  );
};

export default ProductInfo;