import React from "react";
import { useQuery } from "@/api/client";
import SkipNextIcon from "@mui/icons-material/SkipNext";

type MuiIconFontSize = "small" | "medium" | "large" | "inherit";
interface NextButtonProps {
  size?: number;
  fontSize?: MuiIconFontSize;
}

const NextButton: React.FC<NextButtonProps> = ({
  size = 32,
  fontSize = "small",
}) => {
  const { refetch: requestNextTrack } = useQuery(
    "GET",
    "/remote/next",
    undefined,
    {
      enabled: false,
      queryKey: ["next-track"],
    }
  );

  const handleNextClick = () => {
    requestNextTrack();
  };

  return (
    <button
      onClick={handleNextClick}
      aria-label="Next"
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
      <SkipNextIcon fontSize={fontSize} />
    </button>
  );
};

export default NextButton;
