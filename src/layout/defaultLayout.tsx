import { Outlet } from "react-router-dom";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function DefaultLayout() {
	//   const handle = match?.handle as {};

	return (
		<div>
			<Header />
			<div style={{ minHeight: "100vh" }}>
				<Outlet />
			</div>
			<Footer />
		</div>
	);
}
