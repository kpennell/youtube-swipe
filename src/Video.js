import React, {useState, useEffect, useRef, useCallback} from "react"
import VideoFooter from "./VideoFooter";
import VideoSidebar from "./VideoSidebar";
import "./Video.css";
import ReactPlayer from "react-player"

function Video({ url, channel, description, song, likes, messages, shares, height, width }) {
    //console.log(data)

       // const {url, channel, description, song, likes, messages, shares, height, width } = data 
    const videoUrl = `https://www.youtube.com/watch?v=${url}`
    

    const [Playing, setPlaying] = useState(true)
    const currentPlayer = useRef()
    const handleScroll = useCallback(([entry])=>{
        console.log(entry)
        if(entry.isIntersecting){
            setPlaying(true)
        }else{
            setPlaying(false)
        }
    },[])

    useEffect(() => {
        setTimeout(() => {
        const {current} = currentPlayer
        if(current){
         
            
            let observer = new IntersectionObserver(handleScroll, {threshold : 0.9});
            observer.observe(current)

            return ()=> observer && observer.disconnect()
        }}, 1000)
    }, [handleScroll])

  

//  console.log(url)

  return (
    <div ref={currentPlayer} className="video" style={{width:width, height: height}}>

   
   <ReactPlayer
        url={videoUrl}
        width='100%'
        height={height}
        playing={Playing}
        className="video__player"
    /> 
        
    
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