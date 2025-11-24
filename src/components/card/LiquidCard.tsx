import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  type SxProps,
  type Theme,
} from "@mui/material";

interface LiquidCardProps {
  children: React.ReactNode;
  isSelected?: boolean;
  onClick?: () => void;
  sx?: SxProps<Theme>;
}

export const LiquidCard: React.FC<LiquidCardProps> = ({
  children,
  isSelected = false,
  onClick,
  sx = {},
}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: 300,
        position: "relative",
        borderRadius: 3,
        cursor: onClick ? "pointer" : "default",
        background: "rgba(0,0,0,0.3)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        transition: "all 0.3s ease",
        "&:hover": {
          background: onClick ? "rgba(0,0,0,0.4)" : undefined,
          boxShadow: onClick ? "0 12px 48px rgba(0,0,0,0.3)" : undefined,
          transform: onClick ? "translateY(-3px)" : undefined,
        },
        borderColor: isSelected ? "rgba(255,255,255,0.5)" : undefined,
        ...sx,
      }}
      onClick={onClick}
    >
      <CardActionArea>
        <CardContent sx={{ position: "relative" }}>{children}</CardContent>
      </CardActionArea>
    </Card>
  );
};
