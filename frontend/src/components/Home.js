import GameSelection from "./GameSelection";
import Header from "./common/Header";
import styled from "styled-components";

function Home() {

  return (
    <HomeContainer>
        <Header />
        <GameSelection />
    </HomeContainer>
  );
}

export default Home;

const HomeContainer = styled.div`
    background: linear-gradient(135deg, rgba(70,130,180,0.8) 0%, rgba(255,255,255,0) 100%),
    url('https://source.unsplash.com/random') no-repeat center center/cover;
    width: 100vw;
    height: 100vh;
`