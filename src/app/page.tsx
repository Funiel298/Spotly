'use client'
import React, { useEffect, useState } from 'react';
import MusicSwiper from '@/components/Swiper';
import Modal from '@/components/Modal';
import Sidebar from '@/components/SideBar'; 
import Search from '@/components/Search';

const Home: React.FC = () => {
  const [radio, setRadio] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRadio, setSelectedRadio] = useState<any>(null);
  const [tracks, setTracks] = useState<any[]>([]);
  const [artistInfo, setArtistInfo] = useState<any>(null);
  const [songInfo, setSongInfo] = useState<any>(null);

  useEffect(() => {
    const fetchTrackData = async () => {
      const url = 'https://deezerdevs-deezer.p.rapidapi.com/radio/top';
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '865c712ecbmshb8b2fdbff62a03dp14dc2bjsn3e75f4400b65',
          'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setRadio(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchTrackData();
  }, []);

  const handleRadioClick = async (radioId: string) => {
    const url = `https://api.deezer.com/radio/${radioId}/tracks`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '865c712ecbmshb8b2fdbff62a03dp14dc2bjsn3e75f4400b65',
        'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to fetch tracks');
      }
      const data = await response.json();
      console.log('Fetched tracks:', data);
      setTracks(data.data);
      // Fetch additional information about the first track's artist
      if (data.data.length > 0) {
        const artistId = data.data[0].artist.id;
        const artistUrl = `https://api.deezer.com/artist/${artistId}`;
        const artistResponse = await fetch(artistUrl, options);
        if (!artistResponse.ok) {
          throw new Error('Failed to fetch artist information');
        }
        const artistData = await artistResponse.json();
        console.log('Fetched artist:', artistData);
        // Update state with artist information
        setArtistInfo(artistData);
      }
    } catch (error) {
      console.error('Error fetching tracks:', error);
      setError('Failed to fetch tracks');
    }
  };

  const handleSongClick = async (songId: string) => {
    const url = `https://api.deezer.com/track/${songId}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '865c712ecbmshb8b2fdbff62a03dp14dc2bjsn3e75f4400b65',
        'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to fetch song information');
      }
      const songData = await response.json();
      console.log('Fetched song:', songData);
      setSongInfo(songData);
    } catch (error) {
      console.error('Error fetching song information:', error);
      setError('Failed to fetch song information');
    }
  };

  useEffect(() => {
    console.log(selectedRadio);
    handleRadioClick(selectedRadio);
  }, [selectedRadio]);

  return (
    <div className="px-10">
      <div className="main-content">
        {loading && <div>Loading...</div>}
        {radio && (
          <div className="radio-swiper">
            <MusicSwiper
              title="Radio"
              items={radio.data.map((r: any) => ({
                title: r.title,
                picture: r.picture_medium,
                artist: r.title,
                action: () => setSelectedRadio(r.id)
              }))}
            />
          </div>
        )}
      </div>
      <div className="sidebar-container">
        {selectedRadio && (
          <Modal open={true} onClose={() => setSelectedRadio(null)} tracks={tracks}>
            <h2>Tracks</h2>
            <div className='overflow-y-scroll grid grid-cols-3 gap-6  max-h-[60vh]  '>
              {tracks?.map((track: any, index: number) => (
                <div key={index}>
                  <img  className='cursor-pointer rounded-2xl' onClick={() => handleSongClick(track.id)} src={track.album.cover_xl} alt="image" />
                  <h3  className='cursor-pointer' onClick={() => handleSongClick(track.id)}>{track.title}</h3>
                  <p onClick={() => handleSongClick(track.id)} className='text-sm text-gray-400 cursor-pointer'>{track.artist.name}</p>
                </div>
              ))}
            </div>
          </Modal>
        )}
        {artistInfo && (
          <Sidebar artistInfo={artistInfo} onClose={()=>setArtistInfo(null)} />
        )}
        {songInfo && (
          <Sidebar songInfo={songInfo} onClose={()=>setSongInfo(null)} />
        )}
      </div>
      <Search></Search>
    </div>
  );
};

export default Home;
