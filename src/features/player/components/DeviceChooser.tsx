import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import type { SourceDevice } from "@/providers/AudioDeviceProvider.tsx";

interface DeviceChooserProps {
  devices: SourceDevice[];
  selectedDevice: SourceDevice | undefined;
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
    <Box display="flex" flexWrap="wrap" gap={2} justifyContent="flex-start">
      {devices.map((device) => {
        const isSelected = selectedDevice?.id === device.id;
        return (
          <Card
            key={device.id}
            variant={isSelected ? "outlined" : "elevation"}
            sx={{
              width: 200, // fixed width for all cards
              borderColor: isSelected ? "primary.main" : undefined,
              borderWidth: isSelected ? 2 : undefined,
              boxShadow: isSelected ? 4 : 1,
              cursor: "pointer",
            }}
            onClick={() => setSelectedDevice(device)}
          >
            <CardActionArea>
              <CardContent>
                <Typography variant="h6">{device.id}</Typography>
                <Typography variant="body2" color="text.secondary">
                  ID: {device.id}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        );
      })}
    </Box>
  );
};

export default DeviceChooser;
