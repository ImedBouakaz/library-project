import type { WikiInfo } from '../store/useBookStore';
import {
  Box,
  Heading,
  Text,
  Image,
  Badge,
  Link,
  HStack,
  VStack,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';

interface WikiSectionProps {
  wikiInfo: WikiInfo;
}

const WikiSection = ({ wikiInfo }: WikiSectionProps) => {
  if (!wikiInfo || (!wikiInfo.extract && !wikiInfo.thumbnail)) {
    return null;
  }

  const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <Box
      mt={8}
      borderRadius="2xl"
      p={6}
      borderWidth="1.5px"
      borderColor="whiteAlpha.400"
      style={{
        backdropFilter: 'blur(16px)',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 60%, rgba(200,255,220,0.18) 100%)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 8px 32px 0 rgba(34,197,94,0.15)'
      }}
    >
      <HStack mb={4} spacing={3} align="center">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/32px-Wikipedia-logo-v2.svg.png"
          alt="Wikipedia"
          boxSize={6}
        />
        <Heading as="h3" size="md" color="green.700">
          Informations Wikipédia
        </Heading>
      </HStack>
      <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
        {wikiInfo.thumbnail && (
          <Box minW="120px" maxW="180px" alignSelf="center">
            <Image
              src={wikiInfo.thumbnail}
              alt="Illustration"
              borderRadius="lg"
              boxShadow="md"
              w="full"
              h="auto"
            />
          </Box>
        )}
        <VStack align="start" spacing={3} flex={1}>
          {wikiInfo.extract && (
            <Text color="gray.700" fontSize="md" lineHeight="tall">
              {wikiInfo.extract}
            </Text>
          )}
          {wikiInfo.categories && wikiInfo.categories.length > 0 && (
            <Box>
              <Text fontSize="sm" fontWeight="semibold" color="green.700" mb={1}>Catégories :</Text>
              <HStack spacing={2} wrap="wrap">
                {wikiInfo.categories.map((category) => (
                  <Badge
                    key={category}
                    colorScheme="green"
                    variant="subtle"
                    borderRadius="full"
                    px={2}
                    fontSize="xs"
                  >
                    {category}
                  </Badge>
                ))}
              </HStack>
            </Box>
          )}
          {wikiInfo.langlinks && Object.keys(wikiInfo.langlinks).length > 0 && (
            <Box>
              <Text fontSize="sm" fontWeight="semibold" color="green.700" mb={1}>Disponible en :</Text>
              <HStack spacing={2} wrap="wrap">
                {Object.entries(wikiInfo.langlinks).map(([lang, url]) => (
                  <Link
                    key={lang}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="teal.600"
                    fontSize="xs"
                    px={2}
                    py={1}
                    borderRadius="full"
                    bg="teal.50"
                    _hover={{ bg: 'teal.100', textDecoration: 'underline' }}
                    fontWeight="semibold"
                  >
                    {lang.toUpperCase()}
                  </Link>
                ))}
              </HStack>
            </Box>
          )}
          {wikiInfo.url && (
            <Box pt={2}>
              <Link
                href={wikiInfo.url}
                target="_blank"
                rel="noopener noreferrer"
                color="green.700"
                fontWeight="bold"
                fontSize="sm"
                display="inline-flex"
                alignItems="center"
                _hover={{ color: 'teal.600', textDecoration: 'underline' }}
              >
                Lire l'article complet
                <svg
                  style={{ marginLeft: 4 }}
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>
            </Box>
          )}
        </VStack>
      </Flex>
    </Box>
  );
};

export default WikiSection; 