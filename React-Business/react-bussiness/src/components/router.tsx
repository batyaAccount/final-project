import { createBrowserRouter, Outlet } from "react-router";
import Layout from "./Layout";
import HomePage from "./HomePage";
import ShowInvoices from "./invoises/showInvoises";
import FileUploader from "./Files/FileUploader";

export const router = createBrowserRouter(
    [
        {
            path: "/", element:
                <Layout />,
            children: [
                { path: "/HomePage", element: <><HomePage /><Outlet /></> },
                { path: "/ShowInvoices", element: <><ShowInvoices /><Outlet /></> },
                { path: "/Uplaod Invoice", element: <><FileUploader /><Outlet /></> },
                { path: "/Layout", element: <><Layout /></> },

            ]
        },

    ]

)