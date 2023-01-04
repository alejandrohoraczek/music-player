import React from 'react'
import { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons'

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  startTimeRef,
  endTimeRef,
  timeSliderRef,
  songInfo,
}) => {
  //Ref

  //Events
  const playSongHandler = () => {
    if (!isPlaying) {
      //if not playing, then play
      audioRef.current
        .play()
        .then(() => {})
        .catch((e) => {
          console.log(e)
        })
    } else {
      //otherwise pause it
      audioRef.current.pause()
    }

    isPlaying === false ? setIsPlaying(true) : setIsPlaying(false) //set the play state
  }

  const updateSongTime = (e) => {
    // skip to the selected time
    const timeSet = e.target.value
    audioRef.current.currentTime = timeSet
  }

  //STATE

  return (
    <div className="player">
      <div className="time-control">
        <p ref={startTimeRef}>
          {songInfo.currentTime === null ? `00:00` : songInfo.currentTime}
        </p>
        <input
          ref={timeSliderRef}
          onChange={updateSongTime}
          type="range"
          name=""
          id=""
        />
        <p ref={endTimeRef}>{songInfo.duration}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  )
}

export default Player
