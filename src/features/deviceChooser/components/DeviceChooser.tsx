import React from "react";
import { Box, Container } from "@mui/material";
import type { SourceDevice } from "@/providers/AudioDeviceProvider.tsx";
import Plasma from "@/components/background/Plasma.tsx";
import { DeviceCard } from "@/features/deviceChooser/components/DeviceCard.tsx";
import { DeviceChooserHeading } from "@/features/deviceChooser/components/DeviceChooserHeading.tsx";

interface DeviceChooserProps {
  devices: SourceDevice[];
  selectedDevice?: SourceDevice;
  setSelectedDevice: React.Dispatch<
    React.SetStateAction<SourceDevice | undefined>
  >;
}

const DeviceChooser: React.FC<DeviceChooserProps> = ({
  devices,
  selectedDevice,
  setSelectedDevice,
}) => {
  return (
    <Container sx={{ position: "absolute" }}>
      <Plasma />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        {devices.length > 0 ? (
          <DeviceChooserHeading
            title="Your audio, anywhere you want"
            subtitle="Pick a device and stream without limits."
          />
        ) : (
          <DeviceChooserHeading
            title="Its quite over here"
            subtitle="Start Lantra on any device to start streaming."
          />
        )}
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap={3}
          maxWidth={700}
          width="100%"
        >
          {devices.map((device) => (
            <DeviceCard
              key={device.id}
              device={device}
              isSelected={selectedDevice?.id === device.id}
              onSelect={() => setSelectedDevice(device)}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default DeviceChooser;
