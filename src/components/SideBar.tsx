import React, { useState } from 'react';

const SideBar: React.FC<{ artistInfo?: any; songInfo?: any; onClose: () => void }> = ({ artistInfo, songInfo, onClose }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  // Close the sidebar when clicking outside of it
  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.sidebar-content')) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="fixed right-0 top-0 bottom-0 w-80 bg-white overflow-y-auto shadow-lg">
        <div className="p-4" onClick={handleOutsideClick}>
          {artistInfo && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">{artistInfo.name}</h3>
              <img src={artistInfo.picture_medium} alt={artistInfo.name} className="w-full mb-2" />
              <p className="text-gray-600">{artistInfo.bio}</p>
            </div>
          )}
          {songInfo && (
            <div>
                <h3 className="text-lg font-semibold mb-2">{songInfo.title}</h3>
                <p className="text-gray-600 mb-2">Duration: {songInfo.duration} seconds</p>
                <p className="text-gray-600 mb-2">Release Date: {songInfo.release_date}</p>
                <p className="text-gray-600 mb-2">Rank: {songInfo.rank}</p>
                <p className="text-gray-600 mb-2">Explicit Lyrics: {songInfo.explicit_lyrics ? 'Yes' : 'No'}</p>
                {songInfo.preview && (
                    <audio controls className="mb-2">
                    <source src={songInfo.preview} type="audio/mpeg" />
                    Your browser does not support the audio element.
                    </audio>
                )}
                {songInfo.album && (
                    <div className="mt-2">
                    <h4 className="text-sm font-semibold mb-1">Album:</h4>
                    <p className="text-gray-600">{songInfo.album.title}</p>
                    <img src={songInfo.album.cover_medium} alt={songInfo.album.title} className="w-full rounded-xl mt-2" />
                    </div>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
