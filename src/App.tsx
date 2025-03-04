import React, { useState, useRef, useEffect, useCallback } from 'react';
import playlistsData from './data/playlists.json';

// Components
import { PlaylistSidebar } from './components/PlaylistSidebar/PlaylistSidebar';
import { PlaylistHeader } from './components/PlaylistHeader/PlaylistHeader';
import { VolumeSlider } from './components/VolumeSlider/VolumeSlider';
import { ProgressBar } from './components/ProgressBar/ProgressBar';
import { IconButton } from './components/IconButton/IconButton';
import { TrackList } from './components/TrackList/TrackList';

interface Track {
  name: string;
  url: string;
  duration: number;
}

interface Playlist {
  name: string;
  artist?: string;
  year?: number;
  tracks: Track[];
}

interface PlaylistsJson {
  playlists: Playlist[];
}

function App() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [selectedPlaylistIndex, setSelectedPlaylistIndex] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  // Import the data
  const { playlists } = playlistsData as PlaylistsJson;
  const currentPlaylist = playlists[selectedPlaylistIndex];
  const currentTrack = currentPlaylist.tracks[currentTrackIndex];
  const prevTrackRef = useRef<typeof currentTrack | null>(null);

  // Whenever the track or playlist changes, load and optionally play
  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    // Stop any currently playing track
    audio.pause();

    // Update the src and load
    const isFirstLoadOrNewTrack = !prevTrackRef.current || prevTrackRef.current.url !== currentTrack.url;
    if (isFirstLoadOrNewTrack) {
      audio.src = currentTrack.url;
      prevTrackRef.current = currentTrack;
      setCurrentTime(0);
      audio.load();
    }

    // If we were playing, auto-play the new track
    if (isPlaying) {
      audio.play().catch((err) => {
        // handle auto-play blocking or any error
        console.error('Auto-play error:', err);
      });
    }
  }, [currentTrackIndex, selectedPlaylistIndex, isPlaying, currentTrack]);

  // Go to next track (loop to start if at end)
  // Memoize handleNextTrack so it doesn't change on every render
  const handleNextTrack = useCallback(() => {
    setCurrentTrackIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex < currentPlaylist.tracks.length ? nextIndex : 0;
    });
  }, [setCurrentTrackIndex, currentPlaylist.tracks.length]);

  // Go to previous track (loop to end if at start)
  const handlePrevTrack = () => {
    setCurrentTrackIndex((prevIndex) => {
      const prev = prevIndex - 1;
      return prev >= 0 ? prev : currentPlaylist.tracks.length - 1;
    });
  };

  // Handle audio events
  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTrackEnd = () => {
      handleNextTrack();
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleTrackEnd);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleTrackEnd);
    };
  }, [handleNextTrack]);


  // Keep volume in sync
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Toggle play/pause
  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
    if (audioRef.current) {
      if (!isPlaying) {
        audioRef.current.play().catch((err) => console.error(err));
      } else {
        audioRef.current.pause();
      }
    }
  };

  // When user drags the progress bar
  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  // When user selects a new track from the track list
  const handleTrackSelect = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  return (
    <div className='container'>
      <div className='sidebar'>
        {/* Sidebar */}
        <PlaylistSidebar
          playlists={playlists}
          selectedIndex={selectedPlaylistIndex}
          onSelect={(index) => {
            setSelectedPlaylistIndex(index);
            setCurrentTrackIndex(0);
            setIsPlaying(false);
          }}
        />

        {/* Playlist Info & Track List */}
        <div className='playlist-info-container'>
          <PlaylistHeader currentPlaylist={currentPlaylist} currentTrack={currentTrack} />
          <TrackList
            tracks={currentPlaylist.tracks}
            currentTrackIndex={currentTrackIndex}
            onTrackSelect={handleTrackSelect}
          />
        </div>
      </div>

      {/* Player Controls */}
      <div className='player-controls'>
        <IconButton onClick={handlePrevTrack} iconPath='/assets/icons/previous.svg' ariaLabel='Previous Track'/>
        <IconButton onClick={handlePlayPause} iconPath={isPlaying ? '/assets/icons/pause.svg' : '/assets/icons/play.svg'} ariaLabel={isPlaying ? 'Pause' : 'Play'} />
        <IconButton onClick={handleNextTrack} iconPath='/assets/icons/next.svg' ariaLabel='Next Track' />
        <ProgressBar currentTime={currentTime} duration={duration} onSeek={onSeek} />
        <VolumeSlider value={volume} onChange={setVolume} />
      </div>
      {/* Hidden Audio Element */}
      <audio ref={audioRef} />
    </div>
  );

}

export default App;
