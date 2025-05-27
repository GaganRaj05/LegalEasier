import {createBrowserRouter} from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';
import Services from '../pages/Services';
import Notary from "../pages/Notary";
import TermsAndConditions from '../pages/TermsAndConditions';
import HelpAndFaq from '../pages/HelpAndFaq';
import PrivacyPolicy from '../pages/PrivacyPolicy';
const routes = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
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
    }
])

const Router = () => {
    return (
        <RouterProvider router={routes} />
    )
}
export default Router;