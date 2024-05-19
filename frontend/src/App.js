import styled from "styled-components";
import bg from "./img/bg.png";
import { MainLayout } from "./style/Layout";
import Orb from "./components/Orb/Orb";
import Navigation from "./components/Navigation/Navigation";
import { useEffect, useMemo, useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Income from "./components/Income/Income";
import Expenses from "./components/Expenses/Expenses";
import { useGlobalContext } from "./context/globalContext";
import Login from "./components/Login/Login";
import Transactions from "./components/Transactions/Transactions";
function App() {
  const [active, setActive] = useState(1);
  const { loggedIn } = useGlobalContext();
  const displayData = () => {
    if (!loggedIn) {
      return <Login />;
    }
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Transactions />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <AppStyle bg={bg} className="App">
      {orbMemo}
      <MainLayout>
        {!loggedIn ? "" : <Navigation active={active} setActive={setActive} />}
        <main>{displayData()}</main>
      </MainLayout>
    </AppStyle>
  );
}

const AppStyle = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;
  main {
    flex: 1;
    overflow: auto;
    overflow-x: hidden;
    border-radius: 32px;
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    background: rgba(252, 246, 249, 0.78);
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
