import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const Home = lazy(() => import('../pages/Home'));
const Services = lazy(() => import('../pages/Services'));
const Notary = lazy(() => import('../pages/Notary'));
const TermsAndConditions = lazy(() => import('../pages/TermsAndConditions'));
const HelpAndFaq = lazy(() => import('../pages/HelpAndFaq'));
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy'));
const Contact = lazy(() => import('../pages/Contact'));
const Blog = lazy(() => import('../pages/Blog'));
const Schedule = lazy(() => import('../pages/Schedule'));
const Admin = lazy(() => import('../pages/Admin'));
const LandingPage = lazy(() => import('../pages/LandingPage'));

import Loader from '../components/layout/Loader';

const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loader />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: '/legal-easier/services',
    element: (
      <Suspense fallback={<Loader />}>
        <Services />
      </Suspense>
    ),
  },
  {
    path: 'legal-easier/notary-service',
    element: (
      <Suspense fallback={<Loader />}>
        <Notary />
      </Suspense>
    ),
  },
  {
    path: 'legal-easier/Terms&Conditions',
    element: (
      <Suspense fallback={<Loader />}>
        <TermsAndConditions />
      </Suspense>
    ),
  },
  {
    path: 'legal-easier/HelpAndFaq',
    element: (
      <Suspense fallback={<Loader />}>
        <HelpAndFaq />
      </Suspense>
    ),
  },
  {
    path: 'legal-easier/Privacy-Policy',
    element: (
      <Suspense fallback={<Loader />}>
        <PrivacyPolicy />
      </Suspense>
    ),
  },
  {
    path: 'legal-easier/contact-us',
    element: (
      <Suspense fallback={<Loader />}>
        <Contact />
      </Suspense>
    ),
  },
  {
    path: 'legal-easier/blog-page',
    element: (
      <Suspense fallback={<Loader />}>
        <Blog />
      </Suspense>
    ),
  },
  {
    path: '/schedule',
    element: (
      <Suspense fallback={<Loader />}>
        <Schedule />
      </Suspense>
    ),
  },
  {
    path: '/admin/upload-blogs',
    element: (
      <Suspense fallback={<Loader />}>
        <Admin />
      </Suspense>
    ),
  },
  {
    path: '/landing-page/small-claims',
    element: (
      <Suspense fallback={<Loader />}>
        <LandingPage />
      </Suspense>
    ),
  },

]);

const Router = () => {
  return <RouterProvider router={routes} />;
};

export default Router;
