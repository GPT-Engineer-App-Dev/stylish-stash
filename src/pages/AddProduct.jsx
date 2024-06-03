import { useState } from "react";
import { Container, Box, Heading, VStack, FormControl, FormLabel, Input, Textarea, Button, useToast } from "@chakra-ui/react";
import { useAddProduct } from "../integrations/supabase/index.js";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const toast = useToast();
  const addProductMutation = useAddProduct();

  const handleSubmit = (e) => {
    e.preventDefault();
    addProductMutation.mutate(
      { name, description, price: parseFloat(price), image_url: imageUrl },
      {
        onSuccess: () => {
          toast({
            title: "Product added",
            description: `${name} has been added to the store.`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setName("");
          setDescription("");
          setPrice("");
          setImageUrl("");
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
        <Heading as="h1" size="2xl" mb={4}>Add New Product</Heading>
      </Box>
      <Box mt={8}>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl id="description" isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            <FormControl id="price" isRequired>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormControl>
            <FormControl id="imageUrl" isRequired>
              <FormLabel>Image URL</FormLabel>
              <Input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" size="lg" width="full">
              Add Product
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
};

export default AddProduct;