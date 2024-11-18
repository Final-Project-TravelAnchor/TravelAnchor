import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
// import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import LayoutCSS from "./Layout.module.css";

function Layout() {
	return (
		<div className={LayoutCSS.all}>
			<Header />
			{/* <Navbar /> */}
			<main className={LayoutCSS.main}>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}

export default Layout;
//Layout