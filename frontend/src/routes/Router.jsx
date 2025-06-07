import {createBrowserRouter, ScrollRestoration} from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';
import Services from '../pages/Services';
import Notary from "../pages/Notary";
import TermsAndConditions from '../pages/TermsAndConditions';
import HelpAndFaq from '../pages/HelpAndFaq';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import Contact from '../pages/Contact';
import Blog from '../pages/Blog';
import Verification from '../pages/Verification';
import Schedule from '../pages/Schedule';
const routes = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path:'/1bb89613aa75c37f72a131644ee19ccb.html',
        element:<Verification/>
    },
    {
        path:"/legal-easier/services",
        element:<Services/>
    },
    {
        path:'legal-easier/notary-service',
        element:<Notary/>
    },
    {
        path:"legal-easier/Terms&Conditions",
        element:<TermsAndConditions/>
    },
    {
        path:"legal-easier/HelpAndFaq",
        element:<HelpAndFaq/>
    },
    {
        path:"legal-easier/Privacy-Policy",
        element:<PrivacyPolicy/>
    },
    {
        path:'legal-easier/contact-us',
        element:<Contact/>
    },
    {
        path:'legal-easier/blog-page',
        element:<Blog/>
    },
    {
        path:'/schedule',
        element:<Schedule/>
    }
])

const Router = () => {
    return (
        <RouterProvider router={routes} />
    )
}
export default Router;