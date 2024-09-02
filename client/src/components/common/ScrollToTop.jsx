import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {

	const { pathname } = useLocation();

	useLayoutEffect(() => {
		window.scroll({ top: 0, behavior: 'smooth' });
	}, [pathname]);

	return null;
}

export default ScrollToTop;