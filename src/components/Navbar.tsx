import React from "react";
import { Link } from "@tanstack/react-router";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";

const Navbar: React.FC = () => {
  const isPortrait = useMediaQuery("(orientation: portrait)");
  return (
    <Box
      component="nav"
      sx={{
        position: isPortrait ? "fixed" : "static",
        bottom: isPortrait ? 0 : undefined,
        left: isPortrait ? 0 : undefined,
        width: isPortrait ? "100vw" : 40,
        height: isPortrait ? 56 : "100vh",
        display: "flex",
        flexDirection: isPortrait ? "row" : "column",
        gap: isPortrait ? 0 : 1,
        py: isPortrait ? 0 : 1,
        px: isPortrait ? 2 : 0,
        background: "#222",
        color: "#fff",
        alignItems: "center",
        justifyContent: isPortrait ? "space-evenly" : "flex-start",
        boxShadow: isPortrait
          ? "0 -2px 8px rgba(0,0,0,0.1)"
          : "2px 0 8px rgba(0,0,0,0.1)",
        zIndex: 100,
      }}
    >
      <IconButton
        component={Link}
        to="/player"
        sx={{
          color: "#fff",
          width: 28,
          height: 28,
          mb: isPortrait ? 0 : 1,
          borderRadius: 2,
          "&.active, &[aria-current='page']": {
            background: "#444",
          },
        }}
        aria-label="Player"
      >
        <MusicNoteIcon fontSize="small" />
      </IconButton>
      <IconButton
        component={Link}
        to="/library"
        sx={{
          color: "#fff",
          width: 28,
          height: 28,
          mb: isPortrait ? 0 : 1,
          borderRadius: 2,
          "&.active, &[aria-current='page']": {
            background: "#444",
          },
        }}
        aria-label="Library"
      >
        <LibraryMusicIcon fontSize="small" />
      </IconButton>
      <IconButton
        component={Link}
        to="/visualizer"
        sx={{
          color: "#fff",
          width: 28,
          height: 28,
          mb: isPortrait ? 0 : 1,
          borderRadius: 2,
          "&.active, &[aria-current='page']": {
            background: "#444",
          },
        }}
        aria-label="Library"
      >
        <GraphicEqIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default Navbar;
