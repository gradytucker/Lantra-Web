import React from "react";
import { useQuery } from "@/api/client";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

type MuiIconFontSize = "small" | "medium" | "large" | "inherit";
interface PrevButtonProps {
  size?: number;
  fontSize?: MuiIconFontSize;
}

const PrevButton: React.FC<PrevButtonProps> = ({
  size = 32,
  fontSize = "small",
}) => {
  const { refetch: requestPrevTrack } = useQuery(
    "GET",
    "/remote/prev",
    undefined,
    {
      enabled: false,
      queryKey: ["prev-track"],
    }
  );

  const handlePrevClick = () => {
    requestPrevTrack();
  };

  return (
    <button
      onClick={handlePrevClick}
      aria-label="Previous"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: "2px solid #fff",
        background: "rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        transition: "background 0.2s, border-color 0.2s",
        cursor: "pointer",
        outline: "none",
      }}
    >
      <SkipPreviousIcon fontSize={fontSize} />
    </button>
  );
};

export default PrevButton;
