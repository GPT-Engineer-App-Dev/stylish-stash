import { Box, Flex, Button, Heading, Spacer } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Box bg="teal.500" p={4}>
      <Flex align="center">
        <Heading as="h1" size="lg" color="white">
          <Link to="/">Online Clothing Store</Link>
        </Heading>
        <Spacer />
        <Button as={Link} to="/shopping-cart" colorScheme="teal" variant="outline" size="md">
          Shopping Cart
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;