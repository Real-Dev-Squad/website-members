import React from "react";
import styled from "styled-components";
import Lottie from "react-lottie";
import pageNotFoundAnimation from "public/lottie/pageNotFound.json";
import useGetDeviceType from "hooks/useGetDeviceType";

const Wrapper = styled.div`
  background: #0f2027;
  background: -webkit-linear-gradient(to right, #2c5364, #203a43, #0f2027);
  background: linear-gradient(to right, #2c5364, #203a43, #0f2027);
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default function PageNotFound() {
  const deviceType = useGetDeviceType();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: pageNotFoundAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Wrapper>
      <Lottie
        options={defaultOptions}
        height={deviceType === "tablet" ? 300 : 600}
        width={deviceType === "tablet" ? 300 : 600}
      />
    </Wrapper>
  );
}
