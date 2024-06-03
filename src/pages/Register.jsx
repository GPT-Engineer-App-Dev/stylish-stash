import { useState } from "react";
import { Container, Box, Heading, VStack, FormControl, FormLabel, Input, Button, useToast } from "@chakra-ui/react";
import { useSignUp } from "../integrations/supabase/index.js";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const signUpMutation = useSignUp();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    signUpMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          toast({
            title: "Registered",
            description: "You have successfully registered.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          navigate("/login");
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: error.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        },
      }
    );
  };

  return (
    <Container maxW="container.md" p={4}>
      <Box bg="gray.100" p={10} borderRadius="md" textAlign="center">
        <Heading as="h1" size="2xl" mb={4}>Register</Heading>
      </Box>
      <Box mt={8}>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" size="lg" width="full">
              Register
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
};

export default Register;