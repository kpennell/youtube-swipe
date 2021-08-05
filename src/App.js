import React, { useState, useEffect } from "react";
import Video from "./Video";

import "./App.css";

import { CircularProgress, Grid, Box, Divider, Grow, ListItem, ListItemIcon, ListItemText, ListSubheader, Typography } from "@material-ui/core";

import { FixedSizeList as List } from "react-window";
import useWindowDimensions from "./useWindowDimensions";

function App() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { height, width } = useWindowDimensions();

  useEffect(() => {
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/1Ykwd4zmQsPWxwQ7UaSGpkLKLaSE1By5e_WfhQgR7vXM/values:batchGet?ranges=export2&majorDimension=ROWS&key=AIzaSyC1XWLfbg_9cbaq6dw-eFROFVDpfp2XhxE`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => reformatRows(data.valueRanges[0].values)); 
  }, []);

  function reformatRows(data) {
    let rows = [];
    for (var i = 1; i < data.length; i++) {
      var rowObject = {};
      for (var j = 0; j < data[i].length; j++) {
        rowObject[data[0][j]] = data[i][j];
      }
      rows.push(rowObject);
    }
    // console.log(rows)

    setVideos(rows);
    setIsLoading(false);
  }

  const renderRow = ({ data, index, style }) => {
    // console.log(index)
    // console.log(data)

    // console.log(data[index])

    const { url, channel, description, song, likes, messages, shares } = data[index];

    return <Video url={url} channel={channel} song={song} likes={likes} messages={messages} description={description} shares={shares} height={height} width={width} />;
  };

  // this works
  // return (

  //   <div className="app">
  //     <div className="app__videos" style={{height:height, width:width}}>
  //       {videos.map(
  //         ({ url, channel, description, song, likes, messages, shares }) => (
  //           <Video
  //             url={url}
  //             height={height}
  //             width={width}
  //             channel={channel}
  //             song={song}
  //             likes={likes}
  //             messages={messages}
  //             description={description}
  //             shares={shares}
  //           />
  //         )
  //       )}
  //     </div>
  //   </div>
  // );



  // this kind of works

  if (isLoading) {
    return <CircularProgress style={{ margin: "0 auto" }} />;
  } else {
    return (
      <div className='app'>
        <List height={height} width={width} itemSize={height} itemData={videos} itemCount={videos.length + 1} className='app__videos'>
          {renderRow}
        </List>
      </div>
    );
  }
}

export default App;
