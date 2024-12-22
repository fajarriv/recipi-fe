import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        {/* <Route path="/search" element={<SearchResults />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} /> */}
      </Routes>
  </BrowserRouter>
)
