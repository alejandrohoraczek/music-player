import React, { useState, useRef } from 'react'
import './styles/app.scss'
import data from './utils'
import Player from './components/Player'
import Song from './components/Song'
import Library from './components/Library'
import Nav from './components/Nav'

function App() {
  //State
  const [songs, setSongs] = useState(data())
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [songInfo, setSongInfo] = useState({
    currentTime: null,
    duration: null,
  })

  //! REFFFFS

  const audioRef = useRef(null)
  const startTimeRef = useRef(null)
  const endTimeRef = useRef(null)
  const timeSliderRef = useRef(null)

  //!HANDLERS & FUNCTIONS

  const timeUpdateHandler = (e) => {
    //updates from second to second the outputs
    console.log(e.target)
    const currentTime = Math.floor(e.target.currentTime)
    // formatting
    const formattedTime = formatDuration(currentTime)

    setSongInfo({ ...songInfo, currentTime: formattedTime })
    console.log(timeSliderRef)
    timeSliderRef.current.value = currentTime
  }

  const setSongData = (e) => {
    //set metadata and outputs duration
    console.log(e.target.duration)
    const duration = formatDuration(Math.floor(e.target.duration))
    timeSliderRef.current.value = 0
    timeSliderRef.current.min = 0
    timeSliderRef.current.max = Math.floor(e.target.duration)
    setSongInfo({ ...songInfo, duration })
  }

  const formatDuration = (plainSeconds) => {
    const minutes = Math.floor((plainSeconds % 3600) / 60)
    const seconds = Math.floor(plainSeconds % 3600)
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${(
      seconds % 60
    )
      .toString()
      .padStart(2, '0')}`
    return formattedTime
  }

  //! RETURNING
  return (
    <div className="App">
      <Nav />
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        startTimeRef={startTimeRef}
        endTimeRef={endTimeRef}
        timeSliderRef={timeSliderRef}
        songInfo={songInfo}
      />
      <Library
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={setSongData}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  )
}

export default App
