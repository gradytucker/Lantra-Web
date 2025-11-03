import Box from "@mui/material/Box";

interface TrackInfoProps {
  title: string;
  artist: string;
  album: string;
}

const TrackInfo: React.FC<TrackInfoProps> = ({ title, album, artist }) => (
  <Box
    sx={{
      m: { xs: 1, sm: 1.5, md: 2 },
      textAlign: "left",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      flexGrow: 1,
      minWidth: 0,
      color: "#fff",
    }}
  >
    <Box
      sx={{
        fontSize: { xs: 16, sm: 22, md: 34, lg: 38 },
        fontWeight: 700,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        lineHeight: 1.12,
        color: "#fff",
        mb: { xs: 0.2, sm: 0.3, md: 0.5 },
      }}
    >
      {title}
    </Box>
    <Box
      sx={{
        fontSize: { xs: 11, sm: 13, md: 18, lg: 20 },
        color: "#ccc",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        lineHeight: 1.15,
        mb: { xs: 0.1, sm: 0.15, md: 0.25 },
      }}
    >
      {album}
    </Box>
    <Box
      sx={{
        fontSize: { xs: 11, sm: 13, md: 18, lg: 20 },
        color: "#ccc",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        lineHeight: 1.15,
      }}
    >
      {artist}
    </Box>
  </Box>
);

export default TrackInfo;
