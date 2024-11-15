import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Main from './pages/Main';
import Login from './pages/member/Login';
import Error from './pages/Error';
import Population from './components/items/Population';
import PopulationDetail from './components/items/PopulationDetail';
import PopulationModify from './components/items/PopulationModify';
import TravelReport from './pages/reports/TravelReport';
import AddReportDate from './pages/reports/AddReportDate';
import AddReportDestination from './pages/reports/AddReportDestination';
import Report from './apis/MapAPICalls';
import Weather from './pages/features/Weather';
import Flight from './pages/travels/Flight';
import Accommodation from './pages/travels/Accommodation';

export default function App() {
  return (
      <BrowserRouter>

        <Routes>

          <Route path="/" element={ <Layout/> }>
            <Route index element={ <Main/> }/>
            <Route path="items">
              <Route path="population" element={<Population />} />
              <Route path=":populationCode" element={<PopulationDetail />} />
              <Route path="populationModify/:populationCode" element={<PopulationModify />} />
            </Route>
            <Route path='TravelReport' element={ <TravelReport/> }/>
            <Route path='AddReportDate' element={ <AddReportDate/> }/>
            <Route path='AddReportDestination' element={ <AddReportDestination/> }/>
            <Route path='Report' element={ <Report/> }/>
            <Route path="Accommodation" element={ <Accommodation/> }/>
            <Route path="Weather" element={ <Weather/> }/>
            <Route path="Flight" element={ <Flight/> }/>
            <Route path="/login" element={ <Login/> } />
          </Route>
          <Route path='*' element={ <Error/> }/>
        </Routes>

      </BrowserRouter>
  );
}
