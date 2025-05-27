import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  Link,
  Button,
  useColorModeValue,
  Container,
  HStack,
  IconButton,
  useDisclosure,
  VStack,
  CloseButton,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('green.200', 'green.700');

  return (
    <Box
      position="relative"
      bgGradient="linear(to-r, green.100, teal.100, green.50)"
      px={4}
      borderBottom="2px"
      borderColor={borderColor}
      position="sticky"
      top={0}
      zIndex={1000}
      boxShadow="sm"
      overflow="hidden"
    >
      {/* Feuillage gauche */}
      <Box
        position="absolute"
        top={-8}
        left={-8}
        zIndex={0}
        w={{ base: '80px', md: '120px' }}
        h={{ base: '80px', md: '120px' }}
        pointerEvents="none"
      >
        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <path d="M20 80 Q30 40 60 20 Q100 0 90 60 Q80 120 40 100 Q10 90 20 80Z" fill="#4ade80" fillOpacity="0.22" />
        </svg>
      </Box>
      {/* Feuillage droit */}
      <Box
        position="absolute"
        top={-12}
        right={-12}
        zIndex={0}
        w={{ base: '100px', md: '160px' }}
        h={{ base: '100px', md: '160px' }}
        pointerEvents="none"
      >
        <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <path d="M120 40 Q110 100 60 140 Q10 180 40 100 Q70 20 120 40Z" fill="#16a34a" fillOpacity="0.18" />
        </svg>
      </Box>
      <Container maxW="7xl" position="relative" zIndex={1}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <Flex alignItems="center">
            <Text
              fontSize="2xl"
              fontWeight="bold"
              bgGradient="linear(to-r, green.600, teal.500)"
              bgClip="text"
            >
              Librairie
            </Text>
          </Flex>

          {/* Desktop Navigation */}
          <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
            <Link
              as={RouterLink}
              to="/"
              px={3}
              py={2}
              rounded="md"
              _hover={{
                textDecoration: 'none',
                bg: 'green.50',
                color: 'green.600',
              }}
            >
              Accueil
            </Link>
            <Link
              as={RouterLink}
              to="/books"
              px={3}
              py={2}
              rounded="md"
              _hover={{
                textDecoration: 'none',
                bg: 'green.50',
                color: 'green.600',
              }}
            >
              Livres
            </Link>
            <Link
              as={RouterLink}
              to="/about"
              px={3}
              py={2}
              rounded="md"
              _hover={{
                textDecoration: 'none',
                bg: 'green.50',
                color: 'green.600',
              }}
            >
              À propos
            </Link>
          </HStack>

          {/* Mobile Navigation Button */}
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onToggle}
            icon={isOpen ? <CloseButton /> : <HamburgerIcon />}
            variant="ghost"
            colorScheme="green"
            aria-label="Toggle Navigation"
          />
        </Flex>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <Box pb={4} display={{ md: 'none' }}>
            <VStack spacing={4} align="stretch">
              <Link
                as={RouterLink}
                to="/"
                px={3}
                py={2}
                rounded="md"
                _hover={{
                  textDecoration: 'none',
                  bg: 'green.50',
                  color: 'green.600',
                }}
              >
                Accueil
              </Link>
              <Link
                as={RouterLink}
                to="/books"
                px={3}
                py={2}
                rounded="md"
                _hover={{
                  textDecoration: 'none',
                  bg: 'green.50',
                  color: 'green.600',
                }}
              >
                Livres
              </Link>
              <Link
                as={RouterLink}
                to="/about"
                px={3}
                py={2}
                rounded="md"
                _hover={{
                  textDecoration: 'none',
                  bg: 'green.50',
                  color: 'green.600',
                }}
              >
                À propos
              </Link>
            </VStack>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Navbar;
