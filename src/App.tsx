import {
  BrowserRouter as Router, Routes, Route,
} from "react-router-dom"

// pages
import HomePage from "./pages/home/home.page"
import MyProfilePage from "./pages/my_profile/my_profile.page"
import ProfilePage from "./pages/profile/profile.page"



function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/me" element={<MyProfilePage />} />
        
        <Route path="/profile/:id" element={<ProfilePage />} />
        
        <Route path="/" element={<HomePage />} />
        
        <Route path="*" element={<HomePage />} />

      </Routes>
    </Router>
  )
}

export default App
