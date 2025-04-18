import "./App.css";
import React  from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import NavBar from "./components/NavBar";
import TicketPage from "./pages/TicketPage";
import TicketConversation from "./pages/TicketConversation";
import { Toaster } from "react-hot-toast";
import useAuth from "./hooks/useAuth";

function App() {
  const { authUser } = useAuth();

  return (
    <>
      <Toaster />
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/home"} />}
        />
        <Route
          path="/home"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/home"} />}
        />
        <Route
          path="/ticketpage"
          element={authUser ? <TicketPage /> : <Navigate to="/" />}
        />
        <Route
          path="/ticketopen/:_id"
          element={authUser ? <TicketConversation /> : <Navigate to="/login" />}
        />
      </Routes>
    </> 
  );
}

export default App;
