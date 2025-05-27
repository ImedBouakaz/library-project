import { useEffect } from 'react';
import useRecentChangesStore from '../store/useRecentChangesStore';

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
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        {error}
      </div>
    );
  }

  const getChangeTypeInfo = (kind: string): { label: string; icon: string; color: string } => {
    const types: Record<string, { label: string; icon: string; color: string }> = {
      'add-book': {
        label: 'Nouveau livre',
        icon: '📚',
        color: 'bg-green-100 text-green-800'
      },
      'edit-book': {
        label: 'Modification de livre',
        icon: '✏️',
        color: 'bg-blue-100 text-blue-800'
      },
      'merge-authors': {
        label: 'Fusion d\'auteurs',
        icon: '🤝',
        color: 'bg-purple-100 text-purple-800'
      },
      'add-cover': {
        label: 'Nouvelle couverture',
        icon: '🖼️',
        color: 'bg-yellow-100 text-yellow-800'
      },
      'create-work': {
        label: 'Nouvelle œuvre',
        icon: '📖',
        color: 'bg-green-100 text-green-800'
      },
      'edit-work': {
        label: 'Modification d\'œuvre',
        icon: '✍️',
        color: 'bg-blue-100 text-blue-800'
      },
      'create-edition': {
        label: 'Nouvelle édition',
        icon: '📕',
        color: 'bg-indigo-100 text-indigo-800'
      },
      'edit-edition': {
        label: 'Modification d\'édition',
        icon: '📝',
        color: 'bg-blue-100 text-blue-800'
      }
    };
    return types[kind] || { label: kind, icon: '📌', color: 'bg-gray-100 text-gray-800' };
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Activité Récente</h2>
        <button
          onClick={() => fetchRecentChanges(5)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Rafraîchir
        </button>
      </div>
      <div className="space-y-4">
        {changes.map((change) => {
          const typeInfo = getChangeTypeInfo(change.kind);
          return (
            <div key={change.id} className="border-b border-gray-200 pb-4 last:border-b-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm ${typeInfo.color}`}>
                      <span className="mr-1">{typeInfo.icon}</span>
                      {typeInfo.label}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{change.comment || 'Pas de commentaire'}</p>
                  {change.author && (
                    <p className="text-sm text-gray-500 mt-1">
                      Par {change.author.name || 'Anonyme'}
                    </p>
                  )}
                </div>
                <time className="text-sm text-gray-500 whitespace-nowrap ml-4">
                  {formatDate(change.timestamp)}
                </time>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentChanges; 