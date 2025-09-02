import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import ResponsiveAppBar from "./assets/components/Navbar";
import { Toaster } from "sonner";
import SprintForm from "./assets/pages/SprintForm";
import Dashboard from "./assets/pages/Dashboard";
import DailyCheckIn from "./assets/pages/DailyCheckIn";

function App() {
  return (
    <Router>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/sprints" element={<SprintForm />} />
        <Route path="/checkin" element={<DailyCheckIn />} />
      </Routes>
      <Toaster position="bottom-left" />
    </Router>
  );
}

export default App;
