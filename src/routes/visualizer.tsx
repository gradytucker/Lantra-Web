import { createFileRoute } from "@tanstack/react-router";
import MiniPlayer from "@/features/player/components/MiniPlayer";
import { Box } from "@mui/material";

export const Route = createFileRoute("/visualizer")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      <MiniPlayer />
    </Box>
  );
}
