import React from "react";
import Lottie from "react-lottie";
import animationData from "../../data/cat_logo_data.json";

interface MainLogoProps {
  isStopped?: boolean;
  isPaused?: boolean;
  width?: string | number | undefined;
  height?: string | number | undefined;
}

const MainLogo: React.SFC<MainLogoProps> = ({
  isStopped = false,
  isPaused = false,
  width = "100%",
  height = "100%"
}) => {
  const defaultOptions = {
    autoplay: true,
    loop: true,
    animationData: animationData,
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

export default MainLogo;
