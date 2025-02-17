import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/login"
import Layout from "./components/auth-layout"
import Dashboard from "./pages/dashboard"
import Schedules from "./pages/schedules"
import DataLists from "./pages/dataLists"
import Track from "./pages/track"

function App() {

  return (
    <div className="font-inter">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="schedules" element={<Schedules />} />
            <Route path="schedules" element={<Schedules />} />
            <Route path="track" element={<Track />} />
            <Route path="data-lists" element={<DataLists />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
