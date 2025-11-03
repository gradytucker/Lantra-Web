import { useQuery } from "@/api/client";
import type { PlayerStateType } from "@/features/player/types";
export const useGetCurrentTrack = () => {
  // Mocked data for current track
  return useQuery<PlayerStateType>("GET", "/current-track", undefined, {
    initialData: {
      trackDetails: {
        title: "Unknown Title",
        artist: "Unknown Artist",
        album: "Unknown Album",
        duration: 0,
        position: 0,
        isPlaying: 0,
      },
    },
    queryKey: ["current-player-state"],
    gcTime: 1000 * 60 * 5, // 5 minutes
  });
};
