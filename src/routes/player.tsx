import { createFileRoute } from "@tanstack/react-router";
import Player from "../features/player/components/player";

export const Route = createFileRoute("/player")({
  component: Player,
});
