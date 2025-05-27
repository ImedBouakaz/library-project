import React, { useState } from 'react';
import { Input, InputGroup, InputLeftElement, Button, Flex, useColorModeValue, Box } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

interface SearchbarProps {
  onSearch: (query: string) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const bg = useColorModeValue('white', 'gray.800');
  const border = useColorModeValue('green.200', 'green.700');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(query);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(query);
    }
  };

  return (
    <Flex
      align="center"
      gap={2}
      p={4}
      borderRadius="xl"
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
      <InputGroup size="lg">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="green.400" boxSize={5} />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Rechercher des livres..."
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          borderRadius="lg"
          bg={bg}
          borderColor={border}
          _focus={{ borderColor: 'green.400', boxShadow: '0 0 0 2px #38A16955' }}
          fontSize="lg"
        />
      </InputGroup>
      <Button
        colorScheme="green"
        size="lg"
        borderRadius="lg"
        px={6}
        leftIcon={<SearchIcon />}
        onClick={handleSearchClick}
        _hover={{ bg: 'green.500', boxShadow: '0 4px 16px 0 rgba(34,197,94,0.15)' }}
        transition="all 0.2s"
      >
        Rechercher
      </Button>
    </Flex>
  );
};

export default Searchbar;
