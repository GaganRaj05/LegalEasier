import entry from "./entry-file.json"; // this works because it's a static JSON file

export const config = {
  matcher: ["/", "/legal-easier/services", "/legal-easier/notary-service","/legal-easier/Terms&Conditions","/legal-easier/HelpAndFaq","/legal-easier/Privacy-Policy","/legal-easier/contact-us","/legal-easier/blog-page","/schedule","/landing-page/small-claims"],
};

export default async function middleware(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  const seoMap = {
    "/": {
      title: "Legal Forms Done Right - No Lawyer Needed | LegalEasier",
      description:
        "Fast, affordable legal document preparation for eviction, divorce, small claims, wills, and more. Professional legal forms without the lawyer fees. Get started today.",
      keywords:
        "legal forms, legal documents, eviction forms, divorce papers, small claims court, wills, power of attorney, legal document preparation, affordable legal services, no lawyer needed",
      image:
        "https://media.istockphoto.com/id/1449334081/photo/statue-of-lady-justice-on-desk-of-a-judge-or-lawyer.jpg?s=612x612&w=0&k=20&c=139ZS1ycMRXBqnPEWV3l08zBLNe40WPiAudVnmeQrl8=",
      url: "https://www.legaleasier.org/",
    },
    "/legal-easier/services": {
      title: "Legal Document Preparation Services | Legal Easier",
      description:
        "Professional legal document preparation for wills, trusts, divorce, bankruptcy, eviction notices, and more. Court-ready documents starting at $50. No attorney needed.",
      keywords:
        "legal document preparation, will preparation, trust documents, divorce papers, bankruptcy forms, eviction notices, power of attorney, name change petition, legal forms, court documents, affordable legal services",
      image:
        "https://media.istockphoto.com/id/1449334081/photo/statue-of-lady-justice-on-desk-of-a-judge-or-lawyer.jpg?s=612x612&w=0&k=20&c=139ZS1ycMRXBqnPEWV3l08zBLNe40WPiAudVnmeQrl8=",
      url: "https://www.legaleasier.org/legal-easier/services",
    },
    "/legal-easier/notary-service": {
      title: "Notary Referral Program - Earn 20% Commission | LegalEasier",
      description:
        "Join our notary referral program and earn 20% commission on every client referral. Partner with LegalEasier to offer legal document services and earn passive income.",
      keywords:
        "notary referral program, notary commission, notary partnership, legal document referrals, notary income, passive income for notaries, notary business opportunity, 20% commission, legal services affiliate",
      image:
        "https://media.istockphoto.com/id/1449334081/photo/statue-of-lady-justice-on-desk-of-a-judge-or-lawyer.jpg?s=612x612&w=0&k=20&c=139ZS1ycMRXBqnPEWV3l08zBLNe40WPiAudVnmeQrl8=",
      url: "https://www.legaleasier.org/legal-easier/notary-service",
    },
    "/legal-easier/Terms&Conditions": {
      title: "Terms and Conditions - LegalEasier Legal Document Services",
      description:
        "Terms and conditions for LegalEasier legal document preparation services. Information about SMS marketing, privacy, and service usage terms.",
      keywords:
        "terms and conditions, legal document service terms, SMS marketing terms, privacy policy, service agreement, legal terms, document preparation terms",
      image:
        "https://media.istockphoto.com/id/1449334081/photo/statue-of-lady-justice-on-desk-of-a-judge-or-lawyer.jpg?s=612x612&w=0&k=20&c=139ZS1ycMRXBqnPEWV3l08zBLNe40WPiAudVnmeQrl8=",
      url: "https://www.legaleasier.org/legal-easier/Terms&Conditions",
    },
    "/legal-easier/HelpAndFaq": {
      title:
        "Help & FAQ - SMS Marketing & Legal Document Services | LegalEasier",
      description:
        "Get answers to common questions about LegalEasier's SMS marketing service and legal document preparation. Find help with subscriptions, opt-out, and privacy.",
      keywords:
        "help center, FAQ, SMS marketing help, legal document FAQ, subscription help, opt-out SMS, privacy questions, customer support, legal services help, document preparation questions",
      image:
        "https://media.istockphoto.com/id/1449334081/photo/statue-of-lady-justice-on-desk-of-a-judge-or-lawyer.jpg?s=612x612&w=0&k=20&c=139ZS1ycMRXBqnPEWV3l08zBLNe40WPiAudVnmeQrl8=",
      url: "https://www.legaleasier.org/legal-easier/HelpAndFaq",
    },
    "/legal-easier/Privacy-Policy": {
      title: "Privacy Policy - Data Protection & SMS Marketing | LegalEasier",
      description:
        "LegalEasier privacy policy explaining how we collect, use, and protect your personal information including SMS marketing data. Learn about your privacy rights.",
      keywords:
        "privacy policy, data protection, SMS marketing privacy, personal information, data collection, privacy rights, legal document service privacy, contact information protection",
      image:
        "https://media.istockphoto.com/id/1449334081/photo/statue-of-lady-justice-on-desk-of-a-judge-or-lawyer.jpg?s=612x612&w=0&k=20&c=139ZS1ycMRXBqnPEWV3l08zBLNe40WPiAudVnmeQrl8=",
      url: "https://www.legaleasier.org/legal-easier/Privacy-Policy",
    },
    "/legal-easier/contact-us": {
      title: "Contact Us - Free Legal Document Consultation | LegalEasier",
      description:
        "Get a free evaluation of your legal document needs. Contact LegalEasier for affordable document preparation services. Call 407-891-5333 or email us today.",
      keywords:
        "contact legal document service, free legal consultation, legal document help, legal forms contact, document preparation contact, legal services phone, legal document evaluation",
      image:
        "https://media.istockphoto.com/id/1449334081/photo/statue-of-lady-justice-on-desk-of-a-judge-or-lawyer.jpg?s=612x612&w=0&k=20&c=139ZS1ycMRXBqnPEWV3l08zBLNe40WPiAudVnmeQrl8=",
      url: "https://www.legaleasier.org/legal-easier/contact-us",
    },
    "/legal-easier/blog-page": {
      title: "Blogs - Academia, Law Review & Legal Education | LegalEasier",
      description:
        "Expert insights on legal academia, law review processes, legal education, and scholarly writing. Stay updated with the latest in legal scholarship and document preparation.",
      keywords:
        "legal blog, legal academia, law review, legal education, legal scholarship, legal writing, legal citation, law school, legal documents, legal research",
      image:
        "https://media.istockphoto.com/id/1449334081/photo/statue-of-lady-justice-on-desk-of-a-judge-or-lawyer.jpg?s=612x612&w=0&k=20&c=139ZS1ycMRXBqnPEWV3l08zBLNe40WPiAudVnmeQrl8=",
      url: "https://www.legaleasier.org/legal-easier/blog-page",
    },
    "/schedule": {
      title:
        "Schedule a Meeting - Free Legal Document Consultation | LegalEasier",
      description:
        "Book a free consultation with LegalEasier legal document specialists. Schedule your meeting to discuss wills, divorce papers, and other legal document needs.",
      keywords:
        "schedule legal consultation, book meeting, legal documents, free legal consultation, schedule appointment, legal document meeting, consultation booking, legal services appointment",
      image:
        "https://media.istockphoto.com/id/1449334081/photo/statue-of-lady-justice-on-desk-of-a-judge-or-lawyer.jpg?s=612x612&w=0&k=20&c=139ZS1ycMRXBqnPEWV3l08zBLNe40WPiAudVnmeQrl8=",
      url: "https://www.legaleasier.org/schedule",
    },
    "/landing-page/small-claims": {
      title:
        "Small Claims Court Assistance | Expert Legal Document Help | LegalEasier",
      description:
        "Get expert small claims court assistance from LegalEasier. We help with complaint filing, court forms, trial preparation, and judgment collection. Affordable pricing starting at $175. Free consultation available. No lawyer required - DIY-friendly support with professional guidance.",
      keywords:
        "small claims court assistance,what is small claims?,small claims complaint filing,legal forms assistance, small claims court forms preparation,expert legal forms preparation, small claims court help Florida, judgment collection",
      image:
        "https://media.istockphoto.com/id/1449334081/photo/statue-of-lady-justice-on-desk-of-a-judge-or-lawyer.jpg?s=612x612&w=0&k=20&c=139ZS1ycMRXBqnPEWV3l08zBLNe40WPiAudVnmeQrl8=",
      url: "https://www.legaleasier.org/landing-page/small-claims",
    },
  };

  const seo = seoMap[pathname] || {
    title: "My Vite App",
    description: "Default description",
  };

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="icon" type="image/png" href="https://i.ibb.co/svm58ypR/company-logo.jpg" />

        <title>${seo.title}</title>
<meta name="msvalidate.01" content="7D65F65327857C0CA78AF558FA21F652" />
        <meta name="description" content="${seo.description}" />

<meta property="og:title" content="${seo.title}" />
<meta property="og:description" content="${seo.description}" />
<meta property="og:image" content="https://i.ibb.co/svm58ypR/company-logo.jpg" />
<meta property="og:url" content="${seo.url}" />
<meta property="og:type" content="website" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${seo.title}" />
<meta name="twitter:description" content="${seo.description}" />
<meta name="twitter:image" content="${seo.image}" />


<link rel="canonical" href="${url}" />

<meta name="google-site-verification" content="c4E_F5AAxqTTrujHkAVaF2KJTEHiSqcgj1h2yPO3aZE" />
        <link rel="icon" href="/favicon.svg" />
            <!-- Google Tag Manager -->
    <script>
      (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != "dataLayer" ? "&l=" + l : "";
        j.async = true;
        j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, "script", "dataLayer", "GTM-WDWB47MD");
    </script>
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-RDM3SERW8Z"
    ></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());

      gtag("config", "G-RDM3SERW8Z");
    </script>

      </head>
      <body>
          <!-- Google Tag Manager (noscript) -->
    <noscript
      ><iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-WDWB47MD"
        height="0"
        width="0"
        style="display: none; visibility: hidden"
      ></iframe
    ></noscript>
    <!-- End Google Tag Manager (noscript) -->

        <div id="root"></div>
        <script type="module" src="/${entry}"></script>
      </body>
    </html>
  `;

  return new Response(html, {
    headers: { "Content-Type": "text/html" },
  });
}
