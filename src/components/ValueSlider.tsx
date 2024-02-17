import React from "react";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";

interface ValueSliderProps {
  value: number;
  onChange: (value: number) => void;
  maxValue: number;
}

const ValueSlider: React.FC<ValueSliderProps> = ({ value, onChange, maxValue }) => {
  const marks = {
    0: "0%",
    [`${(maxValue * 0.25).toFixed(2)}`]: "25%",
    [`${(maxValue * 0.5).toFixed(2)}`]: "50%",
    [`${(maxValue * 0.75).toFixed(2)}`]: "75%",
    [`${maxValue.toFixed(2)}`]: "100%",
  };
  const handleSliderChange = (sliderValue: number | number[]) => {
    onChange(sliderValue as number);
  };

  return (
    <div className="flex w-full max-sm:px-5 xl:w-1/2 self-center">
      <Slider
        min={0}
        max={maxValue}
        step={0.01}
        marks={marks}
        onChange={handleSliderChange}
        value={value}
        dotStyle={{ backgroundColor: "#323232", borderColor: "#323232", borderWidth: 5 }}
        activeDotStyle={{ backgroundColor: "#e7db01", borderColor: "#e7db01" }}
        styles={{
          track: { backgroundColor: "#e7db01" },
          rail: { backgroundColor: "#141414" },
          handle: { backgroundColor: "#e7db01", borderColor: "#e7db01" },
        }}
        className="focus-visible:shadow-green-600"
        disabled={maxValue === 0}
      />
    </div>
  );
};

export default ValueSlider;
