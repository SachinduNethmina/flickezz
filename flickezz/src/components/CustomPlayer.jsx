import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import "../styles/CustomPlayer.css";

const CustomPlayer = () => {
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const togglePlayPause = () => setPlaying(!playing);

  const handleVolumeChange = (e) => setVolume(parseFloat(e.target.value));

  const handleSeekChange = (e) => setPlayed(parseFloat(e.target.value));

  const handleSeekMouseUp = () => {
    playerRef.current.seekTo(played);
  };

  const handleProgress = (state) => {
    if (!state.seeking) setPlayed(state.played);
  };

  const handleDuration = (duration) => setDuration(duration);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" + secs : secs}`;
  };

  const toggleFullscreen = () => {
    if (!fullscreen) {
      playerContainerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setFullscreen(!fullscreen);
  };

  return (
    <div ref={playerContainerRef} className="player-container">
      <ReactPlayer
        ref={playerRef}
        url="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_10mb.mp4"
        playing={playing}
        volume={volume}
        muted={muted}
        onProgress={handleProgress}
        onDuration={handleDuration}
        width="100%"
        height="100%"
        style={{ backgroundColor: "black" }}
      />

      {/* Custom Controls */}
      <div className="controls">
        <button onClick={togglePlayPause} className="control-btn">
          {playing ? "Pause" : "Play"}
        </button>

        <div className="seek-bar">
          <span>{formatTime(played * duration)}</span>
          <input
            type="range"
            min={0}
            max={1}
            step="0.01"
            value={played}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
          />
          <span>{formatTime(duration)}</span>
        </div>

        <button
          onClick={() => setMuted(!muted)}
          className="control-btn volume-btn"
        >
          {muted ? "Unmute" : "Mute"}
        </button>

        <input
          type="range"
          min={0}
          max={1}
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />

        <button onClick={toggleFullscreen} className="control-btn">
          {fullscreen ? "Exit Fullscreen" : "Fullscreen"}
        </button>
      </div>
    </div>
  );
};

export default CustomPlayer;
