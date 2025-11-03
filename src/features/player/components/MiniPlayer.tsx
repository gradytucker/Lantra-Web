import React from "react";
import Box from "@mui/material/Box";
import AlbumArt from "./AlbumArt";
import PlayButton from "./PlayButton";
import NextButton from "./NextButton";
import PrevButton from "./PrevButton";
import { useGetCurrentTrack } from "@/hooks/useGetCurrentTrack";
import { useGetAlbumArt } from "@/hooks/useGetAlbumArt";

const MiniPlayer: React.FC = () => {
  const { data: playerState } = useGetCurrentTrack();
  const { data: albumArtDataUrl } = useGetAlbumArt();

  return (
    <Box
      sx={{
        width: "100vw",
        maxWidth: "100vw",
        height: 64,
        background: "#222",
        boxShadow: "0 -2px 8px rgba(0,0,0,0.2)",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        px: 2,
      }}
    >
      {/* Album art and track info */}
      <Box
        sx={{
          width: 48,
          height: 48,
          minWidth: 0,
          minHeight: 0,
          borderRadius: 2,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mr: 1,
        }}
      >
        <AlbumArt
          url={albumArtDataUrl}
          alt={playerState?.trackDetails.album ?? "Album Art"}
        />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
        <Box
          sx={{
            textAlign: "left",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            color: "#fff",
          }}
        >
          <Box
            sx={{
              fontSize: 13,
              fontWeight: 600,
              lineHeight: 1.1,
              mb: 0.1,
              color: "#fff",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {playerState?.trackDetails.title ?? ""}
          </Box>
          <Box
            sx={{
              fontSize: 10,
              color: "#ccc",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              mb: 0.05,
            }}
          >
            {playerState?.trackDetails.album ?? ""}
          </Box>
          <Box
            sx={{
              fontSize: 10,
              color: "#ccc",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {playerState?.trackDetails.artist ?? ""}
          </Box>
        </Box>
      </Box>
      {/* Controls on the left */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          minWidth: 0,
          flexShrink: 1,
          maxWidth: 120,
          overflow: "hidden",
        }}
      >
        <PrevButton size={28} fontSize="small" />
        <PlayButton
          onClick={() => {}}
          isPlaying={!!playerState?.trackDetails.isPlaying}
          size={32}
          fontSize="medium"
        />
        <NextButton size={28} fontSize="small" />
      </Box>
    </Box>
  );
};

export default MiniPlayer;
