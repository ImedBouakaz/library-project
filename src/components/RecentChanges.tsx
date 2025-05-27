import { useEffect } from 'react';
import useRecentChangesStore from '../store/useRecentChangesStore';
import {
  Box,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
  Badge,
  Flex,
  useColorModeValue,
  IconButton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';

const RecentChanges = () => {
  const { changes, loading, error, fetchRecentChanges } = useRecentChangesStore();

  useEffect(() => {
    fetchRecentChanges(5);
    // Rafraîchir les changements toutes les 5 minutes
    const interval = setInterval(() => {
      fetchRecentChanges(5);
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchRecentChanges]);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('fr-FR', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" p={4}>
        <Box as="span" className="animate-spin" borderRadius="full" h={8} w={8} borderBottom="2px solid" borderColor="green.400" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Alert status="error" borderRadius="lg" boxShadow="md" mt={2}>
        <AlertIcon boxSize={6} />
        <AlertTitle fontWeight="bold" mr={2}>Erreur :</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  const getChangeTypeInfo = (kind: string): { label: string; icon: string; color: string } => {
    const types: Record<string, { label: string; icon: string; color: string }> = {
      'add-book': {
        label: 'Nouveau livre',
        icon: '📚',
        color: 'green'
      },
      'edit-book': {
        label: 'Modification de livre',
        icon: '✏️',
        color: 'blue'
      },
      'merge-authors': {
        label: 'Fusion d\'auteurs',
        icon: '🤝',
        color: 'purple'
      },
      'add-cover': {
        label: 'Nouvelle couverture',
        icon: '🖼️',
        color: 'yellow'
      },
      'create-work': {
        label: 'Nouvelle œuvre',
        icon: '📖',
        color: 'green'
      },
      'edit-work': {
        label: 'Modification d\'œuvre',
        icon: '✍️',
        color: 'blue'
      },
      'create-edition': {
        label: 'Nouvelle édition',
        icon: '📕',
        color: 'teal'
      },
      'edit-edition': {
        label: 'Modification d\'édition',
        icon: '📝',
        color: 'blue'
      }
    };
    return types[kind] || { label: kind, icon: '📌', color: 'gray' };
  };

  return (
    <Box
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
      w="full"
    >
      <Flex align="center" justify="space-between" mb={6}>
        <HStack spacing={2}>
          <span style={{ fontSize: 24 }}>🌱</span>
          <Heading as="h2" size="lg" color="green.700">Activité Récente</Heading>
        </HStack>
        <IconButton
          aria-label="Rafraîchir"
          icon={<RepeatIcon />}
          colorScheme="green"
          variant="ghost"
          size="sm"
          onClick={() => fetchRecentChanges(5)}
        />
      </Flex>
      <VStack spacing={4} align="stretch">
        {changes.map((change) => {
          const typeInfo = getChangeTypeInfo(change.kind);
          return (
            <Flex
              key={change.id}
              align="center"
              justify="space-between"
              p={4}
              borderRadius="xl"
              bg={useColorModeValue('whiteAlpha.700', 'gray.900')}
              boxShadow="sm"
              borderWidth="1px"
              borderColor={useColorModeValue('green.50', 'green.900')}
              _hover={{ boxShadow: 'md', borderColor: 'green.200', bg: 'green.50' }}
              transition="all 0.2s"
              gap={4}
            >
              <Box flex={1} minW={0}>
                <HStack spacing={2} mb={1}>
                  <Badge colorScheme={typeInfo.color} borderRadius="full" px={2} py={1} fontSize="xs">
                    <span style={{ marginRight: 4 }}>{typeInfo.icon}</span>
                    {typeInfo.label}
                  </Badge>
                </HStack>
                <Text color="gray.700" fontSize="sm" noOfLines={2}>
                  {change.comment || 'Pas de commentaire'}
                </Text>
                {change.author && (
                  <Text color="gray.500" fontSize="xs" mt={1}>
                    Par {change.author.name || 'Anonyme'}
                  </Text>
                )}
              </Box>
              <Badge colorScheme="teal" variant="subtle" borderRadius="full" px={2} fontSize="xs">
                {formatDate(change.timestamp)}
              </Badge>
            </Flex>
          );
        })}
      </VStack>
    </Box>
  );
};

export default RecentChanges; 