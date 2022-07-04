import React from "react";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
//Components
import AuthWrapper from "./components/Auth/AuthWrapper";
import Layout from "./components/Layouts/MainLayout";
import LandingPage from "./pages/LandingPage";
//Pages
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/dashboard"
            element={
              <AuthWrapper>
                <Dashboard />
              </AuthWrapper>
            }
          />
          <Route path="/signup" element={<Auth page={"signup"} />} />
          <Route path="/signin" element={<Auth page={"signin"} />} />
          <Route
            path="/profile"
            element={
              <AuthWrapper>
                <Profile />
              </AuthWrapper>
            }
          />
        </Routes>
      </Layout>
    </>
  );
}

export default App;

/*
  Tables
  //////
  1) Users
  2) Collections -- each collection is assosiated with a user -- store cards as json array 


  //Auth Process
  1) User signs in / up
  2) Taken to their collection page

  Collection Page
  ///////////////
  - User Can add new collection 
  - User Can delete a collection
  - User Can edit a collection

*/
