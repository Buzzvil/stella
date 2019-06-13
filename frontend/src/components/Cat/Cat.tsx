import React from "react";
import Lottie from "react-lottie";

interface CatProps {
  isStopped?: boolean;
  isPaused?: boolean;
}

const Cat: React.SFC<CatProps> = ({
  isStopped = false,
  isPaused = false,
  ...props
}) => {
  const defaultOptions = {
    autoplay: true,
    loop: true,
    animationData: require('../../data/cat_data.json'),
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Lottie options={defaultOptions}
            height={300}
            width={300}
            isStopped={isStopped}
            isPaused={isPaused} />
  );
};

export default Cat;
