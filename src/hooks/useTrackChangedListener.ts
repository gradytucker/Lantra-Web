// useSSERefetch.ts
import { useEffect } from "react";

const SSE_URL = import.meta.env.VITE_API_URL + "/api/track-changed-events";

type ChangeEventType = {
  event: "track_changed" | "aa_changed";
};

type UseTrackRefetchEventListenerProps = {
  updateTrack: () => void;
  updateAlbumArt: () => void;
};
export const useTrackRefetchEventListener = ({
  updateTrack,
  updateAlbumArt,
}: UseTrackRefetchEventListenerProps) => {
  useEffect(() => {
    const evtSource = new EventSource(SSE_URL);

    evtSource.onmessage = (message) => {
      const eventData = JSON.parse(message.data) as ChangeEventType;

      console.log(eventData.event);

      switch (eventData.event) {
        case "track_changed":
          console.log("Track changed event received");

          updateTrack();
          break;
        case "aa_changed":
          console.log("AA changed event received");

          updateAlbumArt();
          break;
        default:
          return;
      }
    };

    evtSource.onerror = (err) => {
      console.error("SSE connection error:", err);
      evtSource.close();
    };

    return () => {
      evtSource.close(); // clean up on unmount
    };
  }, [updateAlbumArt, updateTrack]);
};
