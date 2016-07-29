export const playerStartPlaying = () => {
  return {
    type: 'PLAYER_START_PLAYING',
  }
}

export const playerPausePlaying = () => {
  return {
    type: 'PLAYER_PAUSE_PLAYING',
  }
}

export const playerStopPlaying = (userSeekPos) => {
  return {
    type: 'PLAYER_STOP_PLAYING',
    userSeekPos,
  }
}

export const playerEditSeek = (userSeekPos) => {
  return {
    type: 'PLAYER_EDIT_SEEK',
    userSeekPos,
  }
}

export const playerEditedSeek = () => {
  return {
    type: 'PLAYER_EDITED_SEEK',
  }
}

export const playerAutoUpdateSeek = (seekPos) => {
  return {
    type: 'PLAYER_AUTO_UPDATE_SEEK',
    seekPos,
  }
}

export const playerEditDuration = (duration) => {
  return {
    type: 'PLAYER_EDIT_DURATION',
    duration,
  }
}
