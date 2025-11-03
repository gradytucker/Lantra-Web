import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

type MuiIconFontSize = "small" | "medium" | "large" | "inherit";

interface PlayButtonProps {
    onClick: () => void;
    isPlaying: boolean;
    size?: number;
    fontSize?: MuiIconFontSize;
}

const PlayButton: React.FC<PlayButtonProps> = ({
                                                   onClick,
                                                   isPlaying,
                                                   size = 38,
                                                   fontSize = "medium",
                                               }) => {
    const handlePlayPause = (onClick: () => void) => {
        onClick();
    };

    return (
        <button
            onClick={() => handlePlayPause(onClick)}
            aria-label={isPlaying ? "Pause" : "Play"}
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
            {isPlaying ? (
                <PauseIcon fontSize={fontSize}/>
            ) : (
                <PlayArrowIcon fontSize={fontSize}/>
            )}
        </button>
    );
};

export default PlayButton;
