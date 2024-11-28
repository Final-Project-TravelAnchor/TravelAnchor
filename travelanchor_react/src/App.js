import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Main from './pages/Main';
import Login from './pages/member/Login';
import Error from './pages/Error';
import MyPage from './pages/member/MyPage';
import MyPageUpdate from './pages/member/MyPageUpdate';
import Population from './components/items/Population';
import PopulationDetail from './components/items/PopulationDetail';
import PopulationCreate from './components/items/PopulationCreate';
import PopulationModify from './components/items/PopulationModify';
import ChatRoom from './components/items/ChatRoom';
import TravelReport from './pages/reports/TravelReport';
import TravelReportList from './pages/reports/TravelReportList';
import TravelReportDetail from './pages/reports/TravelReportDetail';
import TravelReportByMember from './pages/reports/TravelReportByMember';
import TravelReportCreate from './pages/reports/TravelReportCreate';
// import TravelReportCreateForm from './pages/reports/TravelReportCreateForm';
import TravelReportModify from './pages/reports/TravelReportModify';
import AddReportDate from './pages/reports/AddReportDate';
import AddReportDestination from './pages/reports/AddReportDestination';
import Map from './apis/MapAPICalls';
import ShareKakao from './apis/ShareKakao';
import Weather from './pages/features/Weather';
import Flight from './pages/travels/Flight';
import Accommodation from './pages/travels/Accommodation';
import Restaurants from './pages/restaurants/Restaurants';
import RestaurantDetail from './pages/restaurants/RestaurantDetail';
import Translation from './pages/features/Translation';
import ExpenseList from './pages/plans/ExpenseList';
import ExpenseInsert from './pages/plans/ExpenseInsert';
import ExpenseUpdate from './pages/plans/ExpenseUpdate';
import ExpenseSettlement from './pages/plans/ExpenseSettlement';
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
import TravelDestinations from './pages/travels/TravelDestinations';
import TravelDestinationDetail from './pages/travels/TravelDestinationDetail';
import SavedTravelDestination from './pages/travels/SavedTravelDestination';
import LandmarkDetail from './pages/travels/LandmarkDetail';
import TravelPlan from './pages/plans/TravelPlan';
import TravelPlanDetail from './pages/plans/TravelPlanDetail';
// import AddPlanDate from './pages/plans/AddPlanDate';
// import AddPlanDestination from './pages/plans/AddPlanDestination';
import TravelPlanCreate from './pages/plans/TravelPlanCreate';
import ActivityUpdate from './pages/plans/ActivityUpdate';
import AddByDayPlan from './pages/plans/AddByDayPlan';
import DayPlanDetail from './pages/plans/DayPlanDetail'; 
// import UpdatePlanDate from './pages/plans/UpdatePlanDate';
// import UpdatePlanDestination from './pages/plans/UpdatePlanDestination';
import TravelPlanUpdate from './pages/plans/TravelPlanUpdate';
import UnderConstruction from './components/common/UnderConstruction';


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
              <Route path="TravelPlan" element={<TravelPlan />} />
              <Route path=":travelCode" element={<TravelPlanDetail />} />
              {/* <Route path="AddPlanDate" element={<AddPlanDate />} />
              <Route path="AddPlanDestination" element={<AddPlanDestination />} /> */}
              <Route path="TravelPlanCreate" element={<TravelPlanCreate />} />
              {/* <Route path="UpdatePlanDate" element={<UpdatePlanDate />} />
              <Route path="UpdatePlanDestination" element={<UpdatePlanDestination />} /> */}
              <Route path="TravelPlanUpdate/:travelCode" element={<TravelPlanUpdate />} />
              <Route path="ActivityUpdate/:activityCode" element={<ActivityUpdate />} />
              <Route path="AddByDayPlan" element={<AddByDayPlan />} />
              <Route path="day/:day" element={<DayPlanDetail />} />
              <Route path="ExpenseList" element={<ExpenseList />} />
              <Route path="ExpenseInsert" element={<ExpenseInsert />} />
              <Route path="ExpenseUpdate/:expenseDetailCode" element={<ExpenseUpdate />} />
              <Route path="ExpenseSettlement" element={<ExpenseSettlement />} />
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
            <Route path="travelReport">
              <Route index element={ <TravelReport/> }/>
              <Route path='AddReportDate' element={ <AddReportDate/> }/>
              <Route path="AddReportDestination" element={ <AddReportDestination/> }/>
              <Route path=":reportCode" element={ <TravelReportDetail/> }/>
              <Route path='travelReportCreate' element={ <TravelReportCreate/> }/>
              <Route path="travelReportModify/:reportCode" element={ <TravelReportModify/> }/>
              <Route path='travelReportList' element={ <TravelReportList/> }/>
              <Route path="member/:memberCode" element={ <TravelReportByMember/> }/>
              <Route path='Report' element={ <Report/> }/>
              <Route path='Map' element={ <Map/> }/>
              {/* <Route path='travelReportList' element={ <TravelReportList/> }/> */}
              {/* <Route path='Report' element={ <Report/> }/>
              <Route path='Map' element={ <Map/> }/> */}
              {/* <Route path='ShareKakao' element={ <ShareKakao/> }/> */}
            </Route>
            <Route path="MyPage/:memberId" element={ <MyPage/> }/>  
            <Route path="MyPageUpdate/:memberId" element={ <MyPageUpdate/> }/>  
            <Route path="Accommodation" element={ <Accommodation/> }/>
            <Route path="Weather" element={ <Weather/> }/>
            <Route path="Translation" element={ <Translation/> }/>
            <Route path="Flight" element={ <Flight/> }/>
            <Route path="ExchangeRate" element={ <ExchangeRate/> }/>
            <Route path="login" element={ <Login/> } />
            <Route path="Restaurants" element={ <Restaurants/> }/>
            <Route path="Restaurants/:place_id" element={ <RestaurantDetail/> }/>
            <Route path="/findid" element={ <FindId/> } />
            <Route path="/findpw" element={ <FindPw/>} />
            <Route path="TravelDestinations" element={ <TravelDestinations/> }/>
            <Route path="TravelDestinations/:place_id" element={ <TravelDestinationDetail/> }/>
            <Route path="/SavedTravelDestination/:memberCode" element={ <SavedTravelDestination/> }/>
            <Route path="/Landmarks/:landmark_id" element={ <LandmarkDetail /> }/>
            <Route path="/register" element={ <Register/> } />
            <Route path="/other" element={ <UnderConstruction/> } />
          </Route>
          <Route path='*' element={ <Error/> }/>
        </Routes>

      </BrowserRouter>
  );
}
