import { Routes, Route } from "react-router-dom"

import { AuthProvider } from "./contexts/authContext"
import PATH from "./paths/paths"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

import Header from "./components/header/Header"
import Home from "./components/home/Home"
import Register from "./components/register/Register"
import Login from "./components/login/Login"
import NFTList from "./components/nft-list/NFTList"
import NFTPortfolio from "./components/nft-list/nft-portfolio/NFTPortfolio"
import NFTCreate from "./components/nft-create/NFTCreate"
import NFTDetails from "./components/nft-details/NFTDetails"
import NFTEdit from "./components/nft-edit/NFTEdit"
import Logout from "./components/logout/Logout"
import RouteGuard from "./components/common/RouteGuard"
import Footer from "./components/footer/Footer"
import ScrollToTop from "./components/common/ScrollToTop"

function App() {
	

	return (
		<>
			<AuthProvider>
				<ScrollToTop />
				<Header />
				<ToastContainer />
				<Routes>
					<Route path={PATH.HOME} element={<Home />} />
					<Route path={PATH.REGISTER} element={<Register />} />
					<Route path={PATH.LOGIN} element={<Login />} />
					<Route path={PATH.NFTs} element={<NFTList />} />
					<Route path={PATH.NFT_DETAILS} element={<NFTDetails />} />
					<Route element={<RouteGuard />}>
						<Route path={PATH.NFT_PORTFOLIO} element={<NFTPortfolio />} />
						<Route path={PATH.NFT_CREATE} element={<NFTCreate />} />
						<Route path={PATH.NFT_EDIT} element={<NFTEdit />} />
						<Route path={PATH.LOGOUT} element={<Logout />} />
					</Route>
				</Routes>
				<Footer />
			</AuthProvider>
		</>
	)
}

export default App;
