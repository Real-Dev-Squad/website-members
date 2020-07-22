import Head from "next/head";
import styled from "styled-components";
import Lottie from "react-lottie";
import animationData from "../public/lottie/paperFlight.json";

const Wrapper = styled.div`
  background: #0f2027;
  background: -webkit-linear-gradient(to right, #2c5364, #203a43, #0f2027);
  background: linear-gradient(to right, #2c5364, #203a43, #0f2027);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const HeroText = styled.p`
  font-size: 100px;
  color: #caf0f8;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 50px;
  }
`;

export default function Home() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Wrapper>
      <Head>
        <title>Home</title>
      </Head>
      <Lottie options={defaultOptions} height={300} width={300} />
      <HeroText>WORK IN PROGRESS</HeroText>
    </Wrapper>
  );
}
