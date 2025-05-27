import React from 'react';
import RecentChanges from '../components/RecentChanges';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  Grid,
  GridItem,
  Flex,
  Image,
  Link,
  useColorModeValue,
  keyframes,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionGrid = motion(Grid);

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const leafFloat = keyframes`
  0% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(10px, -10px) rotate(5deg); }
  50% { transform: translate(0, -20px) rotate(0deg); }
  75% { transform: translate(-10px, -10px) rotate(-5deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
`;

const LandingPage = () => {
  const bgGradient = useColorModeValue(
    'linear(to-br, green.50, teal.50)',
    'linear(to-br, green.900, teal.900)'
  );

  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Box
      minH="100vh"
      bgGradient={bgGradient}
      py={12}
      position="relative"
      overflow="hidden"
    >
      {/* Decorative elements - Trees and leaves */}
      <Box
        position="absolute"
        top="0"
        left="0"
        zIndex={0}
        w={{ base: '120px', md: '200px' }}
        h={{ base: '120px', md: '200px' }}
        pointerEvents="none"
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <path d="M40 120 Q60 60 120 40 Q180 20 160 100 Q140 180 60 160 Q20 150 40 120Z" fill="#4ade80" fillOpacity="0.25" />
          <path d="M60 140 Q80 100 140 80 Q180 60 160 120 Q140 180 80 160 Q40 150 60 140Z" fill="#22c55e" fillOpacity="0.18" />
        </svg>
      </Box>
      <Box
        position="absolute"
        bottom="0"
        right="0"
        zIndex={0}
        w={{ base: '140px', md: '240px' }}
        h={{ base: '140px', md: '240px' }}
        pointerEvents="none"
      >
        <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <path d="M200 80 Q180 160 120 200 Q60 240 80 160 Q100 80 180 60 Q220 40 200 80Z" fill="#16a34a" fillOpacity="0.22" />
          <path d="M180 100 Q160 180 100 200 Q40 220 80 160 Q120 100 180 100Z" fill="#22d3ee" fillOpacity="0.13" />
        </svg>
      </Box>

      <Container maxW="7xl" position="relative">
        <VStack gap={12} align="center">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            textAlign="center"
            py={8}
          >
            <Heading
              as="h1"
              size="2xl"
              bgGradient="linear(to-r, green.600, teal.500)"
              bgClip="text"
              mb={4}
              fontSize={{ base: '3xl', md: '5xl' }}
              fontWeight="extrabold"
            >
              Bienvenue sur Library Project
            </Heading>
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              color={textColor}
              maxW="2xl"
              lineHeight="tall"
            >
              Découvrez notre vaste collection de livres et restez informé des dernières mises à jour de notre bibliothèque.
            </Text>
          </MotionBox>

          <MotionGrid
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
            gap={8}
            w="full"
          >
            <GridItem>
              <MotionBox
                bg={cardBg}
                p={8}
                borderRadius="2xl"
                boxShadow="xl"
                transition="all 0.3s"
                _hover={{
                  transform: 'translateY(-5px)',
                  boxShadow: '2xl',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                border="1.5px solid"
                borderColor="whiteAlpha.400"
                style={{
                  backdropFilter: 'blur(16px)',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 60%, rgba(200,255,220,0.18) 100%)',
                  WebkitBackdropFilter: 'blur(16px)',
                }}
                boxShadow="0 8px 32px 0 rgba(34,197,94,0.15)"
              >
                <VStack gap={6} align="start">
                  <Heading
                    size="lg"
                    bgGradient="linear(to-r, green.600, teal.500)"
                    bgClip="text"
                  >
                    À propos
                  </Heading>
                  <Text color={textColor} fontSize="lg" lineHeight="tall">
                    Library Project est une application moderne qui vous permet d'explorer
                    une vaste collection de livres. Vous pouvez rechercher des livres,
                    consulter leurs détails et suivre les mises à jour de la bibliothèque
                    en temps réel.
                  </Text>
                  <Link href="/books" _hover={{ textDecoration: 'none' }}>
                    <Button
                      colorScheme="green"
                      size="lg"
                      px={8}
                      py={6}
                      fontSize="lg"
                      _hover={{
                        bg: 'green.600',
                        transform: 'scale(1.05)',
                        boxShadow: 'lg',
                      }}
                      transition="all 0.3s"
                    >
                      Explorer les livres
                    </Button>
                  </Link>
                </VStack>
              </MotionBox>
            </GridItem>

            <GridItem>
              <MotionBox
                bg={cardBg}
                p={8}
                borderRadius="2xl"
                boxShadow="xl"
                transition="all 0.3s"
                _hover={{
                  transform: 'translateY(-5px)',
                  boxShadow: '2xl',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                border="1.5px solid"
                borderColor="whiteAlpha.400"
                style={{
                  backdropFilter: 'blur(16px)',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 60%, rgba(200,255,220,0.18) 100%)',
                  WebkitBackdropFilter: 'blur(16px)',
                }}
                boxShadow="0 8px 32px 0 rgba(34,197,94,0.15)"
              >
                <RecentChanges />
              </MotionBox>
            </GridItem>
          </MotionGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default LandingPage;
