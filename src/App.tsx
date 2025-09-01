import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import ModalContainer from "./components/ModalContainer";
import router from "./routers";
import { useThemeStore } from "./stores/themeStore";
import "@assets/styles/base/_reset.scss";
import { useAxiosInterceptor } from "./utils/axiosInstance";
function App() {
	const { mode } = useThemeStore(["mode"]);
	useAxiosInterceptor();
	useEffect(() => {
		console.log("mode:", mode);
		document.documentElement.setAttribute("data-theme", mode);
	}, [mode]);

	return (
		<div
			style={{
				height: "100dvh",
				backgroundColor: "var(--background)",
			}}
		>
			<RouterProvider router={router} />
			<ModalContainer />
		</div>
	);
}

export default App;
