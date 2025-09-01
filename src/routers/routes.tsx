import type { RouteObject } from "react-router-dom";

import DefaultLayout from "@layout/defaultLayout";
import Error404 from "@pages/error/404";

import Home from "@pages/home";

import PathContants from "./pathConstants";

export const routes: RouteObject[] = [
	{
		element: <DefaultLayout />,
		errorElement: <Error404 />,
		children: [{ path: PathContants.Home, element: <Home /> }],
	},
];
