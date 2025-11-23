import React from "react";
import { Box, Typography } from "@mui/material";

interface DeviceHeroProps {
  title: string;
  subtitle: string;
}

export const DeviceChooserHeading: React.FC<DeviceHeroProps> = ({
  title,
  subtitle,
}) => {
  return (
    <Box textAlign="center" mb={5} zIndex={1}>
      <Typography
        variant="h3"
        fontWeight={700}
        mb={1}
        sx={{
          color: "#fff",
          textShadow: "0 2px 10px rgba(0,0,0,0.5)",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          fontSize: "1.1rem",
          color: "rgba(255,255,255,0.85)",
          textShadow: "0 1px 5px rgba(0,0,0,0.4)",
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};
