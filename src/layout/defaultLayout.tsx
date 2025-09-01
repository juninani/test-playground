import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
	//   const handle = match?.handle as {};

	return (
		<div>
			<Outlet />
		</div>
	);
}
