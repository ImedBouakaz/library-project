import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useBookStore from '../store/useBookStore';
import type { Book, BookAuthor } from '../store/useBookStore';
import type { SearchFilters } from '../components/AdvancedSearch';
import Searchbar from '../components/searchbar';
import SearchbarSkeleton from '../components/SearchbarSkeleton';
import AdvancedSearch from '../components/AdvancedSearch';
import AdvancedSearchSkeleton from '../components/AdvancedSearchSkeleton';
import BookSkeleton from '../components/BookSkeleton';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  SimpleGrid,
  useColorModeValue,
  VStack,
  HStack,
  Image,
  Badge,
  Flex,
  keyframes,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const BookPage = () => {
  const navigate = useNavigate();
  const { books, loading, error, fetchBooks } = useBookStore();
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  const bgGradient = useColorModeValue(
    'linear(to-br, green.50, teal.50)',
    'linear(to-br, green.900, teal.900)'
  );
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  useEffect(() => {
    fetchBooks('programming');
  }, [fetchBooks]);

  const handleSearch = (query: string) => {
    fetchBooks(query);
  };

  const handleAdvancedSearch = (filters: SearchFilters) => {
    fetchBooks(filters);
    setShowAdvancedSearch(false);
  };

  const handleBookClick = (bookKey: string) => {
    const cleanKey = bookKey.replace('/works/', '');
    navigate(`/book/${cleanKey}`);
  };

  const renderSearchSection = () => {
    if (loading) {
      return showAdvancedSearch ? <AdvancedSearchSkeleton /> : <SearchbarSkeleton />;
    }

    return !showAdvancedSearch ? (
      <VStack spacing={4} align="stretch">
        <Searchbar onSearch={handleSearch} />
        <Button
          onClick={() => setShowAdvancedSearch(true)}
          variant="link"
          colorScheme="green"
          size="sm"
          ml={4}
        >
          Recherche avancée
        </Button>
      </VStack>
    ) : (
      <VStack spacing={4} align="stretch">
        <AdvancedSearch onSearch={handleAdvancedSearch} />
        <Button
          onClick={() => setShowAdvancedSearch(false)}
          variant="link"
          colorScheme="green"
          size="sm"
          ml={4}
        >
          Retour à la recherche simple
        </Button>
      </VStack>
    );
  };

  if (error) {
    return (
      <Alert status="error" borderRadius="lg" boxShadow="md" mt={8} justifyContent="center">
        <Box as="span" fontSize="2xl" mr={2} role="img" aria-label="Plante fanée">🥀</Box>
        <AlertTitle fontWeight="bold" mr={2}>Erreur :</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Box
      minH="100vh"
      bgGradient={bgGradient}
      py={12}
      position="relative"
      overflow="hidden"
    >
      {/* Decorative elements */}
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
        <VStack spacing={8} align="stretch">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Heading
              as="h1"
              size="2xl"
              textAlign="center"
              bgGradient="linear(to-r, green.600, teal.500)"
              bgClip="text"
              mb={6}
            >
              Découvrir des Livres
            </Heading>
            
            <Box mb={6}>
              {renderSearchSection()}
            </Box>
          </MotionBox>

          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
            spacing={6}
            mt={6}
          >
            {loading ? (
              [...Array(8)].map((_, index) => (
                <BookSkeleton key={index} />
              ))
            ) : (
              books.map((book: Book) => {
                const coverId = book.cover_i || book.cover_id;
                const coverUrl = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : null;
                const maxLangs = 3;
                const langs = book.language ? book.language.slice(0, maxLangs) : [];
                const extraLangs = book.language && book.language.length > maxLangs ? book.language.length - maxLangs : 0;
                const authors = book.author_name || (book.authors ? book.authors.map((author: BookAuthor) => author.name) : []);

                return (
                  <MotionBox
                    key={book.key}
                    p={0}
                    borderRadius="2xl"
                    cursor="pointer"
                    onClick={() => handleBookClick(book.key)}
                    whileHover={{ scale: 1.04, rotate: 1 }}
                    whileTap={{ scale: 0.98 }}
                    transition="all 0.3s"
                    position="relative"
                    border="1.5px solid"
                    borderColor="whiteAlpha.400"
                    minH="420px"
                    style={{
                      backdropFilter: 'blur(16px)',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 60%, rgba(200,255,220,0.18) 100%)',
                      WebkitBackdropFilter: 'blur(16px)',
                      boxShadow: '0 8px 32px 0 rgba(34,197,94,0.15)'
                    }}
                    _hover={{
                      borderColor: 'green.300',
                    }}
                  >
                    {/* Badge Année */}
                    {book.first_publish_year && (
                      <Badge
                        colorScheme="green"
                        borderRadius="full"
                        px={3}
                        py={1}
                        fontSize="sm"
                        position="absolute"
                        top={3}
                        right={3}
                        zIndex={2}
                        boxShadow="md"
                      >
                        {book.first_publish_year}
                      </Badge>
                    )}
                    <VStack spacing={0} align="center" w="full" h="full">
                      {/* Couverture */}
                      <Box
                        w="full"
                        h="220px"
                        bg="whiteAlpha.700"
                        borderTopRadius="2xl"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        boxShadow="sm"
                        overflow="hidden"
                        position="relative"
                      >
                        {coverUrl ? (
                          <Image
                            src={coverUrl}
                            alt={`Couverture de ${book.title}`}
                            w="36"
                            h="52"
                            objectFit="cover"
                            borderRadius="lg"
                            boxShadow="md"
                          />
                        ) : (
                          <Box
                            w="36"
                            h="52"
                            bg="gray.100"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            borderRadius="lg"
                            boxShadow="sm"
                          >
                            <Text color="gray.500" fontSize="sm">
                              Pas de couverture
                            </Text>
                          </Box>
                        )}
                      </Box>
                      {/* Contenu */}
                      <VStack spacing={2} align="center" w="full" px={4} py={4}>
                        <Heading size="md" textAlign="center" noOfLines={2} color="green.800" fontWeight="bold">
                          {book.title}
                        </Heading>
                        {/* Auteurs en badges */}
                        <HStack spacing={1} wrap="wrap" justify="center">
                          {authors.length > 0 ? authors.slice(0, 3).map((author, idx) => (
                            <Badge key={idx} colorScheme="teal" variant="solid" borderRadius="full" px={2} fontSize="xs">
                              {author}
                            </Badge>
                          )) : (
                            <Badge colorScheme="gray" variant="subtle" borderRadius="full" px={2} fontSize="xs">
                              Auteur inconnu
                            </Badge>
                          )}
                          {authors.length > 3 && (
                            <Badge colorScheme="teal" variant="outline" borderRadius="full" px={2} fontSize="xs">
                              +{authors.length - 3} autres
                            </Badge>
                          )}
                        </HStack>
                        {/* Langues limitées */}
                        <HStack spacing={1} wrap="wrap" justify="center">
                          {langs.map((lang, idx) => (
                            <Badge key={idx} colorScheme="green" variant="subtle" borderRadius="full" px={2} fontSize="xs">
                              {lang.toUpperCase()}
                            </Badge>
                          ))}
                          {extraLangs > 0 && (
                            <Badge colorScheme="green" variant="outline" borderRadius="full" px={2} fontSize="xs">
                              +{extraLangs} autres
                            </Badge>
                          )}
                        </HStack>
                      </VStack>
                    </VStack>
                  </MotionBox>
                );
              })
            )}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default BookPage;
