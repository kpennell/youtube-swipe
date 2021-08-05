import React, { useRef, useState } from "react";
import VideoFooter from "./VideoFooter";
import VideoSidebar from "./VideoSidebar";
import "./Video.css";
import ReactPlayer from "react-player"

function Video({ url, channel, description, song, likes, messages, shares, height, width }) {
  const [videoPlaying, setVideoPlaying] = useState(true);
  const videoRef = useRef(null);

  const onVideoPress = () => {
    if (videoPlaying) {
      videoRef.current.pause();
      setVideoPlaying(false);
    } else {
      videoRef.current.play();
      setVideoPlaying(true);
    }
  };

  const videoUrl = `https://www.youtube.com/watch?v=${url}`

  return (
    <div className="video" style={{height:height, width:width}}>
 
       <ReactPlayer playing={videoPlaying}  className="video__player"  onClick={onVideoPress}  height={height - 5} width={width}  ref={videoRef} controls={false} url={videoUrl} />
      <VideoFooter channel={channel} description={description} song={song} />
      <VideoSidebar likes={likes} messages={messages} shares={shares} />
    </div>
  );
}

export default Video;

// <video
// className="video__player"
// loop
// onClick={onVideoPress}
// ref={videoRef}
// src={url}
// ></video>