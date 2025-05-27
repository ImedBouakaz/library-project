import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  useColorModeValue,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

export interface SearchFilters {
  query: string;
  language?: string;
  year?: string;
  hasCovers?: boolean;
  type?: string;
}

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ onSearch }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    language: '',
    year: '',
    hasCovers: false,
    type: ''
  });

  const bg = useColorModeValue('white', 'gray.800');

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (event.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(filters);
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      borderRadius="2xl"
      p={8}
      w="full"
      borderWidth="1.5px"
      borderColor="whiteAlpha.400"
      style={{
        backdropFilter: 'blur(16px)',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 60%, rgba(200,255,220,0.18) 100%)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 8px 32px 0 rgba(34,197,94,0.15)'
      }}
    >
      <VStack spacing={6} align="stretch">
        <FormControl>
          <FormLabel>Recherche</FormLabel>
          <Input
            type="text"
            name="query"
            placeholder="Rechercher des livres..."
            value={filters.query}
            onChange={handleInputChange}
            borderRadius="lg"
            bg={bg}
            borderColor="green.200"
            _focus={{ borderColor: 'green.400', boxShadow: '0 0 0 2px #38A16955' }}
            fontSize="lg"
          />
        </FormControl>
        <HStack spacing={4} align="stretch" flexWrap="wrap">
          <FormControl flex={1} minW="180px">
            <FormLabel>Langue</FormLabel>
            <Select
              name="language"
              value={filters.language}
              onChange={handleInputChange}
              borderRadius="lg"
              bg={bg}
              borderColor="green.200"
              _focus={{ borderColor: 'green.400', boxShadow: '0 0 0 2px #38A16955' }}
            >
              <option value="">Toutes les langues</option>
              <option value="fre">Français</option>
              <option value="eng">Anglais</option>
              <option value="spa">Espagnol</option>
              <option value="ger">Allemand</option>
            </Select>
          </FormControl>
          <FormControl flex={1} minW="180px">
            <FormLabel>Année de publication</FormLabel>
            <Input
              type="number"
              name="year"
              placeholder="Année de publication"
              value={filters.year}
              onChange={handleInputChange}
              min={1000}
              max={new Date().getFullYear()}
              borderRadius="lg"
              bg={bg}
              borderColor="green.200"
              _focus={{ borderColor: 'green.400', boxShadow: '0 0 0 2px #38A16955' }}
            />
          </FormControl>
          <FormControl flex={1} minW="180px">
            <FormLabel>Type de document</FormLabel>
            <Select
              name="type"
              value={filters.type}
              onChange={handleInputChange}
              borderRadius="lg"
              bg={bg}
              borderColor="green.200"
              _focus={{ borderColor: 'green.400', boxShadow: '0 0 0 2px #38A16955' }}
            >
              <option value="">Tous les types</option>
              <option value="fiction">Fiction</option>
              <option value="non-fiction">Non-fiction</option>
              <option value="biography">Biographie</option>
              <option value="poetry">Poésie</option>
            </Select>
          </FormControl>
          <FormControl display="flex" alignItems="center" minW="180px" pt={7}>
            <Checkbox
              id="hasCovers"
              name="hasCovers"
              isChecked={filters.hasCovers}
              onChange={handleInputChange}
              colorScheme="green"
              borderRadius="md"
            >
              Avec couverture uniquement
            </Checkbox>
          </FormControl>
        </HStack>
        <Flex justify="end">
          <Button
            type="submit"
            colorScheme="green"
            size="lg"
            borderRadius="lg"
            leftIcon={<SearchIcon />}
            px={8}
            _hover={{ bg: 'green.500', boxShadow: '0 4px 16px 0 rgba(34,197,94,0.15)' }}
            transition="all 0.2s"
          >
            Rechercher
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default AdvancedSearch; 