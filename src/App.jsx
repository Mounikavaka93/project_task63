import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import About from "./pages/About"
import Coaches from "./pages/Coaches"
import Contact from "./pages/Contact"
import Events from "./pages/Events"
import Home from "./pages/Home"
import Membership from "./pages/Membership"
import NotFound from "./pages/NotFound"
import Sports from "./pages/Sports"

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="sports" element={<Sports />} />
        <Route path="membership" element={<Membership />} />
        <Route path="coaches" element={<Coaches />} />
        <Route path="events" element={<Events />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
