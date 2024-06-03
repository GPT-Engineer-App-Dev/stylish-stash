import { Box, Flex, Button, Heading, Spacer } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth, useSignOut } from "../integrations/supabase/index.js";

const Navbar = () => {
  const { user } = useAuth();
  const signOutMutation = useSignOut();

  const handleSignOut = () => {
    signOutMutation.mutate();
  };

  return (
    <Box bg="teal.500" p={4}>
      <Flex align="center">
        <Heading as="h1" size="lg" color="white">
          <Link to="/">Online Clothing Store</Link>
        </Heading>
        <Spacer />
        {user ? (
          <>
            <Button colorScheme="teal" variant="outline" size="md" onClick={handleSignOut}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button as={Link} to="/login" colorScheme="teal" variant="outline" size="md" mr={2}>
              Login
            </Button>
            <Button as={Link} to="/register" colorScheme="teal" variant="outline" size="md">
              Register
            </Button>
          </>
        )}
        <Button as={Link} to="/shopping-cart" colorScheme="teal" variant="outline" size="md" ml={4}>
          Shopping Cart
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;