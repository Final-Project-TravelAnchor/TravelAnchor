import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Main from './pages/Main';
import Error from './pages/Error';
import Population from './components/items/Population';

export default function App() {
  return (
      <BrowserRouter>

        <Routes>

          <Route path="/" element={ <Layout/> }>
            <Route index element={ <Main/> }/>
            <Route path='items/population' element={ <Population/> }/>
          </Route>
          <Route path='*' element={ <Error/> }/>
        </Routes>

      </BrowserRouter>
  );
}


//app