import { useStreamAudio } from "@/providers/AudioStreamProvider.tsx";
import { Box } from "@mui/system";
import PlayButton from "./PlayButton";

const OpusPlayer: React.FC = () => {
  const { isPlaying, startPlayback, stopPlayback } = useStreamAudio();

  const onPlayButtonClick = () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
    }
  };

  return (
    <Box>
      <PlayButton isPlaying={isPlaying} onClick={onPlayButtonClick} />
    </Box>
  );
};

export default OpusPlayer;
