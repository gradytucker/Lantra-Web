import React from "react";
import { Box, Typography } from "@mui/material";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";

interface ActiveBadgeProps {
  label?: string;
}

export const ActiveBadge: React.FC<ActiveBadgeProps> = ({
  label = "active now",
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        opacity: 0.9,
      }}
    >
      <GraphicEqIcon
        sx={{
          animation: "wave 1.3s infinite ease-in-out",
          "@keyframes wave": {
            "0%": { opacity: 0.4 },
            "50%": { opacity: 1 },
            "100%": { opacity: 0.4 },
          },
          color: "rgb(0,255,80)",
        }}
        fontSize="small"
      />
      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.8)" }}>
        {label}
      </Typography>
    </Box>
  );
};
