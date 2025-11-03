import React from "react";
import Box from "@mui/material/Box";

interface AlbumArtProps {
  url?: string;
  alt?: string;
}

const AlbumArt: React.FC<AlbumArtProps> = ({ url, alt = "Album Art" }) => {
  return (
    <Box
      sx={{
        maxWidth: 480,
        maxHeight: 480,
        minWidth: 80,
        minHeight: 80,
        aspectRatio: "1 / 1",
        background: "#eee",
        borderRadius: 2,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 1,
        flexGrow: 1,
      }}
    >
      {url ? (
        <img
          src={url}
          alt={alt}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <span
          style={{ color: "#aaa", fontSize: 48 }}
          role="img"
          aria-label="CD"
        >
          💿
        </span>
      )}
    </Box>
  );
};

export default AlbumArt;
