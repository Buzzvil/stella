import React from "react";
import Lottie from "react-lottie";

interface CatProps {
  isStopped?: boolean;
  isPaused?: boolean;
  width?: string | number | undefined;
  height?: string | number | undefined;
}

const Cat: React.SFC<CatProps> = ({
  isStopped = false,
  isPaused = false,
  width = 300,
  height = 300,
  ...props
}) => {
  const defaultOptions = {
    autoplay: true,
    loop: true,
    animationData: require("../../data/cat_data.json"),
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <Lottie
      options={defaultOptions}
      width={width}
      height={height}
      isStopped={isStopped}
      isPaused={isPaused}
    />
  );
};

export default Cat;
