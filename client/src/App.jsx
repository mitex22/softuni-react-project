import { Routes, Route } from "react-router-dom"

import { AuthProvider } from "./contexts/authContext"
import PATH from "./paths/paths"

import Header from "./components/header/Header"
import Home from "./components/home/Home"
import Register from "./components/register/Register"
import Login from "./components/login/Login"
import NFTList from "./components/game-list/NFTList"
import NFTPortfolio from "./components/game-list/game-portfolio/NFTPortfolio"
import GameCreate from "./components/game-create/GameCreate"
import NFTDetails from "./components/nft-details/NFTDetails"
import GameEdit from "./components/game-edit/GameEdit"
import Logout from "./components/logout/Logout"
import RouteGuard from "./components/common/RouteGuard"
import Footer from "./components/footer/Footer"

function App() {
	return (
		<>
			<AuthProvider>
				<Header />
				<Routes>
					<Route path={PATH.HOME} element={<Home />} />
					<Route path={PATH.REGISTER} element={<Register />} />
					<Route path={PATH.LOGIN} element={<Login />} />
					<Route path={PATH.NFTs} element={<NFTList />} />
					<Route path={PATH.NFT_DETAILS} element={<NFTDetails />} />
					<Route element={<RouteGuard />}>
						<Route path={PATH.NFT_PORTFOLIO} element={<NFTPortfolio />} />
						<Route path={PATH.NFT_CREATE} element={<GameCreate />} />
						<Route path={PATH.NFT_EDIT} element={<GameEdit />} />
						<Route path={PATH.LOGOUT} element={<Logout />} />
					</Route>
				</Routes>
				<Footer />
			</AuthProvider>
		</>
	)
}

export default App;
