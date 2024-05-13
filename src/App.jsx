import { useContext } from "react";
import Header from "./Components/Header";
import PageContent from "./Components/PageContent";
import SideMenu from "./Components/SideMenu";
import { AuthContext } from "./context/AuthContext";
import { Link } from "react-router-dom";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Header />
      {user && (
        <div className=" flex gap-6">
          <SideMenu />
          <div className="container p-10">
            <PageContent />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
