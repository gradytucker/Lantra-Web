import { keepPreviousData } from "@tanstack/react-query";
import { useQuery } from "@/api/client";
/**
 * useGetAlbumArt - Fetches album art URL.
 * @returns Query result with album art URL (string | undefined)
 */
export function useGetAlbumArt() {
  return useQuery("GET", "/current-aa", undefined, {
    gcTime: 1000 * 60 * 5, // 5 minutes
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    queryKey: ["album-art"],
    select: (data: any) => {
      if (data?.encodedAA) {
        // Return a data URL for the base64 image
        return `data:image/jpeg;base64,${data.encodedAA}`;
      }
      return undefined;
    },
  });
}
