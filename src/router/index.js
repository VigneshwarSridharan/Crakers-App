import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { PAGES } from "../utils/constants";

const HomePage = lazy(() => import('../pages/HomePage'))
const ContactUsPage = lazy(() => import('../pages/ContactUsPage'))

export const router = createBrowserRouter([
    {
        path: PAGES.HOME_PAGE,
        element: <HomePage />,
    },
    {
        path: PAGES.CONTACT_US_PAGE,
        element: <ContactUsPage />,
    },
]);