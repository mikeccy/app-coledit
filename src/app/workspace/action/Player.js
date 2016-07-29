export const playerStartPlaying = () => {
  return {
    type: 'PLAYER_START_PLAYING',
  }
}

export const playerStopPlaying = () => {
  return {
    type: 'PLAYER_STOP_PLAYING',
  }
}

export const playerEditSeek = (seekPos) => {
  return {
    type: 'PLAYER_EDIT_SEEK',
    seekPos,
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
