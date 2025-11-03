import React from "react";

interface VolumeControlProps {
  value: number;
  onChange: (value: number) => void;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ value, onChange }) => (
  <input
    type="range"
    min={0}
    max={100}
    value={value}
    onChange={(e) => onChange(Number(e.target.value))}
    aria-label="Volume"
    style={{ width: "60px" }}
  />
);

export default VolumeControl;
