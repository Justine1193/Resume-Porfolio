import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import DesignGraphics from './pages/DesignGraphics.jsx'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/designs" element={<DesignGraphics />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
