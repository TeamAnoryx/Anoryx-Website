import { useLayoutEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Home from './pages/Home.jsx';
import PlatformOverview from './pages/platform/Overview.jsx';
import PlatformArchitecturePage from './pages/platform/Architecture.jsx';
import PlatformIntelligenceCore from './pages/platform/IntelligenceCore.jsx';
import PlatformAutonomousAgentSystem from './pages/platform/AutonomousAgentSystem.jsx';
import PlatformSecurityTrust from './pages/platform/SecurityTrust.jsx';
import SolutionsEnterpriseAutomation from './pages/solutions/EnterpriseAutomation.jsx';
import SolutionsAIInfrastructure from './pages/solutions/AIInfrastructure.jsx';
import SolutionsPrivacyFirstAI from './pages/solutions/PrivacyFirstAI.jsx';
import SolutionsAutonomousDecisionSystems from './pages/solutions/AutonomousDecisionSystems.jsx';
import SolutionsIndustryApplications from './pages/solutions/IndustryApplications.jsx';
import Solutions from './pages/solutions/Solutions.jsx';
import CompanyAbout from './pages/company/About.jsx';
import CompanyFoundersNote from './pages/company/FoundersNote.jsx';
import CompanyVisionMission from './pages/company/VisionMission.jsx';
import CompanyBusinessProposal from './pages/company/BusinessProposal.jsx';
import Contact from './pages/contact/Contact.jsx';
import Products from './pages/products/Products.jsx';
import ProductDetail from './pages/products/ProductDetail.jsx';

/* Always start a newly opened page at the top: on route change and on reload.
 * The browser's own scroll restoration is turned off so a reload doesn't jump back
 * to where the visitor was (e.g. the footer). Scrolling is instant, overriding the
 * global `scroll-behavior: smooth`, so the old position never animates into view.
 * In-page anchors (#hash) are handled by each page. */
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useLayoutEffect(() => {
    if (!hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);
  return null;
}

function App() {
  return (
    <AuthProvider>
      <div className="appLayout">
        <ScrollToTop />
        <Navbar />
      <main className="appMain">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/platform/overview" element={<PlatformOverview />} />
          <Route path="/platform/architecture" element={<PlatformArchitecturePage />} />
          <Route path="/platform/intelligence-core" element={<PlatformIntelligenceCore />} />
          <Route path="/platform/autonomous-agent-system" element={<PlatformAutonomousAgentSystem />} />
          <Route path="/platform/security-trust" element={<PlatformSecurityTrust />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/solutions/enterprise-automation" element={<SolutionsEnterpriseAutomation />} />
          <Route path="/solutions/ai-infrastructure" element={<SolutionsAIInfrastructure />} />
          <Route path="/solutions/privacy-first-ai" element={<SolutionsPrivacyFirstAI />} />
          <Route path="/solutions/autonomous-decision-systems" element={<SolutionsAutonomousDecisionSystems />} />
          <Route path="/solutions/industry-applications" element={<SolutionsIndustryApplications />} />
          <Route path="/company/about" element={<CompanyAbout />} />
          <Route path="/company/founders-note" element={<CompanyFoundersNote />} />
          <Route path="/company/vision-mission" element={<CompanyVisionMission />} />
          <Route path="/company/business-proposal" element={<CompanyBusinessProposal />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
        </Routes>
      </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
