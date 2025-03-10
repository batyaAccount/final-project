import { createBrowserRouter, Outlet } from "react-router";
import Layout from "./Layout";
import HomePage from "./HomePage";

export const router = createBrowserRouter(
    [
        {
            path: "/", element:
                <Layout />,
            children: [
                { path: "/HomePage", element: <><HomePage/><Outlet/></> },
                 
            ]
        },

    ]

)