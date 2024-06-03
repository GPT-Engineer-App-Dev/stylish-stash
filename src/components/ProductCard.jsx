import { Box, Image, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={product.image} alt={product.name} />
      <Box p={6}>
        <Heading as="h3" size="lg" mb={2}>{product.name}</Heading>
        <Text mb={4}>{product.description}</Text>
        <Button as={Link} to={`/product/${product.id}`} colorScheme="teal" size="md">View Details</Button>
      </Box>
    </Box>
  );
};

export default ProductCard;