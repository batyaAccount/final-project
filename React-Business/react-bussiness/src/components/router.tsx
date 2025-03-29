import { createBrowserRouter, Outlet } from "react-router";
import Layout from "./Layout";
import HomePage from "./HomePage";
import ShowInvoices from "./invoises/showInvoises";
import FileUploader from "./Files/FileUploader";
import AccountantHome from "./invoises/AccountantHome"
import ShowInvoicesWrapper from "./invoises/ShowInvoicesWrapper";
export const router = createBrowserRouter(

    [
        {
            path: "/", element:
                <Layout />,
            children: [
                { path: "/HomePage", element: <><HomePage /><Outlet /></> },
                { path: "/ShowInvoices", element: <ShowInvoicesWrapper></ShowInvoicesWrapper> },
                { path: "/ShowInvoices/:id", element: <><ShowInvoices /><Outlet /></> },
                { path: "/Uplaod Invoice", element: <><FileUploader /><Outlet /></> },
                { path: "/Uplaod Invoice/:userId_Accountant", element: <><FileUploader /><Outlet /></> },

                { path: "/Accountant", element: <><AccountantHome /><Outlet /></> },
                { path: "/Layout", element: <><Layout /></> },

            ]
        },

    ]

)