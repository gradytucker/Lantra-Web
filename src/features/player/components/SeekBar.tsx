import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";

interface SeekBarProps {
  position: number; // current position in seconds
  duration: number; // total duration in seconds
  playing: boolean;
}

const SeekBar: React.FC<SeekBarProps> = ({ position, duration, playing }) => {
  const [visualPos, setVisualPos] = useState(position);
  const [dragValue, setDragValue] = useState<number | null>(null);

  // Reset visual position when song changes or position jumps
  useEffect(() => {
    setVisualPos(position);
    setDragValue(null);
  }, [position, duration]);

  // Animate thumb every second if playing and not dragging
  useEffect(() => {
    if (!playing || dragValue !== null) return;
    if (visualPos >= duration) return;
    const interval = setInterval(() => {
      setVisualPos((prev) => Math.min(prev + 1, duration));
    }, 1000);
    return () => clearInterval(interval);
  }, [playing, dragValue, visualPos, duration]);

  // Format seconds in mm:ss
  const formatSec = (sec: number) => {
    const min = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${min}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
      <Box
        sx={{
          width: 56,
          textAlign: "right",
          pr: 1,
          color: "#fff",
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        {formatSec(dragValue !== null ? dragValue : visualPos)}
      </Box>
      <Slider
        min={0}
        max={duration}
        value={dragValue !== null ? dragValue : visualPos}
        onChange={(_, v) => {
          setDragValue(Number(v));
        }}
        onChangeCommitted={() => {
          setDragValue(null);
        }}
        aria-label="Seek"
        sx={{
          color: "#fff",
          height: 8,
          borderRadius: 4,
          px: 1,
          flex: 1,
          "& .MuiSlider-thumb": {
            width: 18,
            height: 14,
            borderRadius: 7,
            border: "2px solid #fff",
            backgroundColor: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            transition: "background 0.2s, border-color 0.2s",
          },
          "& .MuiSlider-rail": {
            opacity: 0.18,
            backgroundColor: "#fff",
          },
          "& .MuiSlider-track": {
            backgroundColor: "#fff",
          },
          "&:hover .MuiSlider-thumb": {
            boxShadow: "0 0 0 6px rgba(255,255,255,0.08)",
          },
        }}
      />
      <Box
        sx={{
          width: 56,
          textAlign: "left",
          pl: 2,
          color: "#fff",
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        {formatSec(duration)}
      </Box>
    </Box>
  );
};

export default SeekBar;
