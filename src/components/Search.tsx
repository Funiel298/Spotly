import React, { useState } from 'react';
import { FaCompactDisc } from 'react-icons/fa';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    setLoading(true);

    try {
      const response = await fetch(`https://api.deezer.com/search?q=${term}`, {
        headers: {
          'x-rapidapi-key': '865c712ecbmshb8b2fdbff62a03dp14dc2bjsn3e75f4400b65',
          'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }

      const data = await response.json();

      // Fetch additional information for each search result
      const resultsWithDetails = await Promise.all(data.data.map(async (result: any) => {
        const trackResponse = await fetch(`https://api.deezer.com/track/${result.id}`);
        const trackData = await trackResponse.json();
        return { ...result, duration: trackData.duration };
      }));

      setSearchResults(resultsWithDetails);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div id="search" className="p-5">
      <input
        type="text"
        className="w-full mb-3 p-2 border border-gray-300 rounded-2xl"
        placeholder="Search tracks and artists..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {loading && <FaCompactDisc className="animate-spin h-8 w-8 mx-auto" />}
      <div className='grid grid-cols-3 gap-6'>
        {searchResults?.map((result: any) => (
          <div key={result.id}>
            <img className='rounded-2xl' src={result.album.cover_big} alt="" />
            <h3>{result.title}</h3>
            <p className='text-gray-400 text-sm'>{result.artist.name}</p>
            <p className='text-gray-400 text-sm'>Duration: {result.duration} seconds</p>
          </div>
        ))}
      </div>
    </div>
  );
};
