import React, { useEffect } from 'react';
import { routeInfo, metadata } from './catalog';
import { workProjects } from './work-projects';
export { preload, preloadAll } from './content/preload';
import { SiteProvider } from './lib/site-context';
import Layout from './components/Layout';
import Home from './pages/Home';
import { ServicesPage, ServicePage, SubServicePage } from './pages/ServicePages';
import { BlogPage, ArticlePage } from './pages/BlogPages';
import { IndustriesPage, IndustryPage, WorkPage, WorkDetail, AboutPage, TeamPage, CareersPage, ContactPage, LegalPage, DemoStudioPage, NotFound } from './pages/OtherPages';

export default function App({ path }) {
  const p = (path || (typeof window !== 'undefined' ? window.location.pathname : '/')).replace(/\/$/, '') || '/';
  const r = routeInfo(p);
  useEffect(() => {
    const m = metadata(p);
    document.title = m.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', m.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', 'https://cubusify.com' + (p === '/' ? '/' : p));
  }, [p]);
  let page;
  switch (r.type) {
    case 'home': page = <Home />; break;
    case 'services': page = <ServicesPage />; break;
    case 'service': page = <ServicePage service={r.service} />; break;
    case 'subservice': page = <SubServicePage service={r.service} sub={r.sub} />; break;
    case 'industries': page = <IndustriesPage />; break;
    case 'industry': page = <IndustryPage industry={r.industry} />; break;
    case 'demos': page = <DemoStudioPage />; break;
    case 'work': page = <WorkPage />; break;
    case 'work-detail': page = <WorkDetail project={workProjects.find(x => x.slug === r.slug)} />; break;
    case 'blog': page = <BlogPage />; break;
    case 'article': page = <ArticlePage article={r.article} />; break;
    case 'about': page = <AboutPage />; break;
    case 'team': page = <TeamPage />; break;
    case 'careers': page = <CareersPage />; break;
    case 'contact': page = <ContactPage />; break;
    case 'privacy': case 'terms': page = <LegalPage type={r.type} />; break;
    default: page = <NotFound />;
  }
  return <SiteProvider><Layout>{page}</Layout></SiteProvider>;
}
