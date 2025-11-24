import React from "react";
import { Box, Typography } from "@mui/material";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import type { SourceDevice } from "@/providers/AudioDeviceProvider.tsx";
import { ActiveBadge } from "./ActiveBadge";
import { LiquidCard } from "@/components/card/LiquidCard";

interface DeviceCardProps {
  device: SourceDevice;
  isSelected: boolean;
  onSelect: () => void;
}

export const DeviceCard: React.FC<DeviceCardProps> = ({
  device,
  isSelected,
  onSelect,
}) => {
  return (
    <LiquidCard isSelected={isSelected} onClick={onSelect}>
      {/* Top Row: Phone icon (left) + Streaming Badge (right) */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        {/* Phone Icon */}
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "20%",
            backgroundColor: "rgba(255,255,255,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(6px)",
          }}
        >
          <SmartphoneIcon fontSize="small" />
        </Box>

        {/* Streaming Badge */}
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.8,
            px: 1,
            py: 0.3,
            borderRadius: 1,
            border: "1px solid rgba(0,255,100,0.4)",
            backgroundColor: "rgba(0,255,100,0.1)",
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "rgb(0,255,80)",
              boxShadow: "0 0 6px rgba(0,255,80,0.8)",
            }}
          />
          <Typography
            variant="caption"
            sx={{ color: "rgb(0,190,70)", fontWeight: 600 }}
          >
            Streaming
          </Typography>
        </Box>
      </Box>

      {/* Centered Text */}
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="flex-start"
        flexGrow={1}
        mb={3}
      >
        <Typography
          variant="h6"
          sx={{ color: "#fff", textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
        >
          {device.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
          {device.type}
        </Typography>
      </Box>

      {/* Bottom Row: Active Badge in bottom left */}
      <Box display="flex" justifyContent="flex-start">
        <ActiveBadge />
      </Box>
    </LiquidCard>
  );
};
