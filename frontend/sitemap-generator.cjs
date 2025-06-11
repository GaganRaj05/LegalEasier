
const fs = require("fs");
const path = require("path");
const { Sitemap } = require("react-router-sitemap");

const routerPaths = [
  '/',
  '/1bb89613aa75c37f72a131644ee19ccb.html',
  '/legal-easier/services',
  '/legal-easier/notary-service',
  '/legal-easier/Terms&Conditions',
  '/legal-easier/HelpAndFaq',
  '/legal-easier/Privacy-Policy',
  '/legal-easier/contact-us',
  '/legal-easier/blog-page',
  '/schedule',
  '/admin/upload-blogs',
  '/landing-page/small-claims'
];

const sitemap = new Sitemap(routerPaths.map((url) => ({ url })))
  .build('https://legaleasier.org')  
  .save(path.resolve(__dirname, 'public', 'sitemap.xml'));
