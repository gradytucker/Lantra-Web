export type PlayerStateType = {
  trackDetails: TrackState;
};

/**
 * Track information
 * album: album name
 * artist: artist name
 * title: track title
 * duration: duration in milliseconds
 * position: unique track identifier
 */
interface TrackState {
  album: string;
  artist: string;
  title: string;
  duration: number;
  position: number;
  isPlaying: number;
}
