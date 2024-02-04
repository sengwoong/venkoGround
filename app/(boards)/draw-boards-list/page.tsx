import { getAllBoardsForUserWithSearch } from '@/lib/boards-service';
import React, { useState, useEffect, ChangeEvent } from 'react';

interface Board {
  id: string;
  title: string;
  // Add more properties as needed
}

function BoardsService() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    // Load initial data when the component mounts
    loadBoards();
  }, []);

  const loadBoards = async () => {
    // You may want to get boards based on user's groups, boards they created, or all boards with search
    // You can modify this based on your application's logic
    // For now, let's load all boards for the user with a search term
    try {
      const userId = 'user-id'; // Replace with the actual user ID
      const loadedBoards = await getAllBoardsForUserWithSearch(userId, searchTerm);
      setBoards(loadedBoards);
    } catch (error) {
      console.error('Error loading boards:', error);
    }
  };

  const handleSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    // Reload boards when the search term changes
    loadBoards();
  };

  return (
    <div>
      <h1>Boards</h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search boards..."
        value={searchTerm}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
      />

      {/* List of boards */}
      <ul>
        {boards.map((board) => (
          <li key={board.id}>
            {board.title}
            {/* Add more details or actions as needed */}
          </li>
        ))}
      </ul>

      {/* Add board button */}
      <button onClick={() => console.log('Implement board creation logic here')}>
        Create Board
      </button>
    </div>
  );
}

export default BoardsService;
