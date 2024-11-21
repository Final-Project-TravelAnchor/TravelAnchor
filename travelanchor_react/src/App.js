import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Main from './pages/Main';
import Login from './pages/member/Login';
import Error from './pages/Error';
import Population from './components/items/Population';
import PopulationDetail from './components/items/PopulationDetail';
import PopulationCreate from './components/items/PopulationCreate';
import PopulationModify from './components/items/PopulationModify';
import ChatRoom from './components/items/ChatRoom';
import TravelReport from './pages/reports/TravelReport';
import AddReportDate from './pages/reports/AddReportDate';
import AddReportDestination from './pages/reports/AddReportDestination';
import Map from './apis/MapAPICalls';
import ShareKakao from './apis/ShareKakao';
import Weather from './pages/features/Weather';
import Flight from './pages/travels/Flight';
import Accommodation from './pages/travels/Accommodation';
import Restaurants from './pages/restaurants/Restaurants';
import Translation from './pages/features/Translation';
import ExpenseList from './pages/plans/ExpenseList';
import ExpenseInsert from './pages/plans/ExpenseInsert';
import ExpenseUpdate from './pages/plans/ExpenseUpdate';
import Report from './pages/reports/Report';
import ExchangeRate from './pages/features/ExchangeRate';
import Register from './pages/member/Register';
import Notice from './pages/notice/Notice';
import NoticeDetail from './pages/notice/NoticeDetail';
import NoticeModify from './pages/notice/NoticeModify';
import NoticeCreate from './pages/notice/NoticeCreate';
import FreeBoard from './pages/boards/FreeBoard';
import FreeBoardDetail from './pages/boards/FreeBoardDetail';
import FreeBoardModify from './pages/boards/FreeBoardModify';
import FreeBoardCreate from './pages/boards/FreeBoardCreate';
import FindId from './pages/member/FindId';
import FindPw from './pages/member/FindPw';

export default function App() {
  return (
      <BrowserRouter>

        <Routes>

          <Route path="/" element={ <Layout/> }>
            <Route index element={ <Main/> }/>
            <Route path="items">
              <Route path="population" element={<Population />} />
              <Route path=":populationCode" element={<PopulationDetail />} />
              <Route path="populationCreate" element={<PopulationCreate />} />
              <Route path="populationModify/:populationCode" element={<PopulationModify />} />
              <Route path="chatroom/:populationCode" element={<ChatRoom />} />
            </Route>
            <Route path="plans">
              <Route path="ExpenseList" element={<ExpenseList />} />
              <Route path="ExpenseInsert" element={<ExpenseInsert />} />
              <Route path="ExpenseUpdate/:expenseDetailCode" element={<ExpenseUpdate />} />
            </Route>
            <Route path="notice">
              <Route index element={<Notice />} />
              <Route path=":noticeCode" element={<NoticeDetail />} />
              <Route path="noticeModify/:noticeCode" element={<NoticeModify />} />
              <Route path="noticeCreate" element={<NoticeCreate />} />
            </Route>
            <Route path="freeboard">
              <Route index element={<FreeBoard />} />
              <Route path=":freeboardCode" element={<FreeBoardDetail />} />
              <Route path="freeboardModify/:freeboardCode" element={<FreeBoardModify />} />
              <Route path="freeboardCreate" element={<FreeBoardCreate />} />
            </Route>
            <Route path='TravelReport' element={ <TravelReport/> }/>
            <Route path='AddReportDate' element={ <AddReportDate/> }/>
            <Route path='AddReportDestination' element={ <AddReportDestination/> }/>
            <Route path='Report' element={ <Report/> }/>
            <Route path='Map' element={ <Map/> }/>
            {/* <Route path='ShareKakao' element={ <ShareKakao/> }/> */}
            <Route path="Accommodation" element={ <Accommodation/> }/>
            <Route path="Weather" element={ <Weather/> }/>
            <Route path="Translation" element={ <Translation/> }/>
            <Route path="Flight" element={ <Flight/> }/>
            <Route path="ExchangeRate" element={ <ExchangeRate/> }/>
            <Route path="/login" element={ <Login/> } />
            <Route path="Restaurants" element={ <Restaurants/> }/>
            <Route path="/findid" element={ <FindId/> } />
            <Route path="/findpw" element={ <FindPw/>} />
          </Route>
          <Route path='*' element={ <Error/> }/>
          <Route path="/register" element={ <Register/> } />
        </Routes>

      </BrowserRouter>
  );
}
