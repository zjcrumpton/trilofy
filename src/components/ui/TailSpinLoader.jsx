import React from "react";
import Loader from "react-loader-spinner";

const TailSpinLoader = () => {
  return (
    <Loader
      type="TailSpin"
      color="#adbdcc"
      height={100}
      width={100}
      className="centered-loader"
    />
  );
};

export default TailSpinLoader;
