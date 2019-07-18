import React from "react";
import Lottie from "react-lottie";

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
  height = "100%",
  ...props
}) => {
  const defaultOptions = {
    autoplay: true,
    loop: true,
    animationData: require("../../data/cat_logo_data.json"),
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
