import React from 'react'
import { useRef } from 'react'
import data from '../utils'

const LibrarySong = ({
  song,
  songs,
  setSongs,
  setCurrentSong,
  audioRef,
  isPlaying,
}) => {
  const songRef = useRef(null)

  const songSelectHandler = () => {
    const setActivePlayState = songs.map((x) => {
      if (x.active) {
        x.active = false
      }

      if (x.id === songRef.current.dataset.id) x.active = true
      return x
    })
    const songIndex = songs.findIndex(
      (song) => song.id === songRef.current.dataset.id
    )

    const selectedSong = setActivePlayState.filter(
      (song) => song.id === songRef.current.dataset.id
    )[0]
    setActivePlayState[songIndex].active = true
    setSongs(setActivePlayState)
    setCurrentSong(selectedSong)

    if (isPlaying) {
      const audioCanPlay = audioRef.current.play()
      console.log(audioCanPlay)
      if (audioCanPlay !== undefined) {
        audioCanPlay.then(() => {
          console.log(audioCanPlay)
          audioRef.current.play()
        })
      }
    }
  }
  return (
    <div
      onClick={songSelectHandler}
      data-id={song.id}
      className={`library-song ${song.active ? 'selected' : null}`}
      ref={songRef}
    >
      <img src={song.cover} alt="" />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  )
}

export default LibrarySong
