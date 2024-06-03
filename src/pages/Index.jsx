import { Container, Text, VStack, Box, Image, Button, Heading, SimpleGrid } from "@chakra-ui/react";

const Index = () => {
  return (
    <Container maxW="container.xl" p={4}>
      <VStack spacing={8} align="stretch">
        <Box bg="gray.100" p={10} borderRadius="md" textAlign="center">
          <Heading as="h1" size="2xl" mb={4}>Welcome to Our Online Clothing Store</Heading>
          <Text fontSize="xl">Discover the latest trends in fashion and shop your favorite outfits.</Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image src="/images/clothing1.jpg" alt="Clothing Item 1" />
            <Box p={6}>
              <Heading as="h3" size="lg" mb={2}>Stylish Jacket</Heading>
              <Text mb={4}>Stay warm and stylish with our latest collection of jackets.</Text>
              <Button colorScheme="teal" size="md">Shop Now</Button>
            </Box>
          </Box>

          <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image src="/images/clothing2.jpg" alt="Clothing Item 2" />
            <Box p={6}>
              <Heading as="h3" size="lg" mb={2}>Casual T-Shirt</Heading>
              <Text mb={4}>Perfect for everyday wear, our casual t-shirts come in various colors.</Text>
              <Button colorScheme="teal" size="md">Shop Now</Button>
            </Box>
          </Box>

          <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image src="/images/clothing3.jpg" alt="Clothing Item 3" />
            <Box p={6}>
              <Heading as="h3" size="lg" mb={2}>Elegant Dress</Heading>
              <Text mb={4}>Turn heads with our elegant and stylish dresses for any occasion.</Text>
              <Button colorScheme="teal" size="md">Shop Now</Button>
            </Box>
          </Box>
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Index;