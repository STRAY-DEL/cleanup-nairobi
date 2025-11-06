
import React, { useState, useEffect } from 'react';
import CollectionStats from '../components/collections/CollectionStats';
import NewCollectionModal from '../components/collections/NewCollectionModal';
import CollectionHistoryTable from '../components/collections/CollectionHistoryTable';
import { collectionsData } from '../data/mockCollections.js';

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);

  // Fetch data on mount
  useEffect(() => {
    // TODO: Replace with actual API call
    setCollections(collectionsData);
  }, []);

  const handleAddCollection = (newCollection) => {
    setCollections([newCollection, ...collections]);
  };

  const handleEditCollection = (collectionToEdit) => {
    setEditingCollection(collectionToEdit);
    setIsModalOpen(true);
  };

  const handleDeleteCollection = (collectionId) => {
    setCollections(collections.filter(c => c.id !== collectionId));
  };

  const handleMarkAsComplete = (collectionId) => {
    setCollections(collections.map(c => c.id === collectionId ? { ...c, status: 'Completed' } : c));
  };

  const handleUpdateCollection = (updatedCollection) => {
    setCollections(collections.map(c => c.id === updatedCollection.id ? updatedCollection : c));
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Collections</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors">
          Log New Collection
        </button>
      </div>

      <CollectionStats collections={collections} />

      <CollectionHistoryTable
        collections={collections}
        onEdit={handleEditCollection}
        onDelete={handleDeleteCollection}
        onMarkAsComplete={handleMarkAsComplete}
      />

      <NewCollectionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCollection(null);
        }}
        onAddCollection={handleAddCollection}
        onUpdateCollection={handleUpdateCollection}
        collectionToEdit={editingCollection}
      />
    </div>
  );
};

export default Collections;
