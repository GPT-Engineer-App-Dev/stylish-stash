import { Box, Image, Text, Heading, VStack, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";

const ProductInfo = ({ product }) => {
  const toast = useToast();
  const [cart, setCart] = useState([]);

  const addToCart = () => {
    setCart([...cart, product]);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const removeFromCart = () => {
    setCart(cart.filter(item => item.id !== product.id));
    toast({
      title: "Removed from cart",
      description: `${product.name} has been removed from your cart.`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
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
      <Button colorScheme="teal" size="lg" onClick={addToCart}>Add to Cart</Button>
      <Button colorScheme="red" size="lg" onClick={removeFromCart}>Remove from Cart</Button>
    </VStack>
  );
};

export default ProductInfo;