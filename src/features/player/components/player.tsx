import { useStreamAudio } from "@/providers/AudioStreamProvider.tsx";
import { Container } from "@mui/system";
import PlayButton from "./PlayButton";
import {
  type SourceDevice,
  useAudioDevices,
} from "@/providers/AudioDeviceProvider.tsx";
import { useState } from "react";
import DeviceChooser from "@/features/deviceChooser/components/DeviceChooser.tsx";
import { Button } from "@mui/material";

const OpusPlayer: React.FC = () => {
  const { isPlaying, startPlayback, stopPlayback } = useStreamAudio();
  const [selectedDevice, setSelectedDevice] = useState<
    SourceDevice | undefined
  >();
  const { devices } = useAudioDevices();

  const onPlayButtonClick = () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
    }
  };

  const handleBackButtonClick = () => {
    setSelectedDevice(undefined);
    stopPlayback();
  };

  return selectedDevice ? (
    <Container>
      <Button onClick={handleBackButtonClick}>back</Button>
      <PlayButton isPlaying={isPlaying} onClick={onPlayButtonClick} />
    </Container>
  ) : (
    <DeviceChooser
      devices={devices}
      setSelectedDevice={setSelectedDevice}
      selectedDevice={selectedDevice}
    />
  );
};

export default OpusPlayer;
