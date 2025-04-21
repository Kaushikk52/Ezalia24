import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomeMain from './components/pages/home/HomeMain';

function App() {

  return (
    <BrowserRouter>
     <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomeMain />} />
        </Route>
     </Routes>
    </BrowserRouter>
  )
}

export default App
