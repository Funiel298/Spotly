import React from 'react';

const SideBar: React.FC<{ artistInfo: any, songInfo: any }> = ({ artistInfo, songInfo }) => {
  const sidebarClass = artistInfo || songInfo ? 'sidebar show' : 'sidebar';

  return (
    <div className={sidebarClass + " fixed top-0 right-0 w-72 h-full bg-white transition-transform ease-out duration-300 overflow-y-auto"}>
      {artistInfo && (
        <div>
          <h3>{artistInfo.name}</h3>
          <img src={artistInfo.picture_medium} alt={artistInfo.name} />
          <p>{artistInfo.bio}</p>
        </div>
      )}
      {songInfo && (
        <div>
          <h3>{songInfo.title}</h3>
          <p>{songInfo.duration}</p>
        </div>
      )}
    </div>
  );
};

export default SideBar;
