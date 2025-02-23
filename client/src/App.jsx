import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Setup from "./pages/Setup";
import Landing from "./pages/Landing";
import SetupList from "./pages/SetupList";
import TopPunches from "./pages/TopPunches";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { useState } from "react";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route
            path="/setups"
            element={
              <>
                <SignedIn>
                  <SetupList />
                </SignedIn>
                <SignedOut>
                  <Navigate to="/login" />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/setups/:id"
            element={
              <>
                <SignedIn>
                  <Setup />
                </SignedIn>
                <SignedOut>
                  <Navigate to="/login" />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/setups/:id/top-punches"
            element={
              <>
                <SignedIn>
                  <TopPunches />
                </SignedIn>
                <SignedOut>
                  <Navigate to="/login" />
                </SignedOut>
              </>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

const Layout = ({ children }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-screen flex">
      {location.pathname !== "/" &&
        location.pathname !== "/login" &&
        location.pathname !== "/signup" && (
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        )}
      {children}
    </div>
  );
};

export default App;
