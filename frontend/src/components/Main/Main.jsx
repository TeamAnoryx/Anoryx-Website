import { Link } from 'react-router-dom';
import styles from './Main.module.css';
import main1Image from '../../assets/main1.png';
import main5Image from '../../assets/main5.jpg';
import main2Image from '../../assets/main2.jpg';

function Main() {
  return (
    <section className={styles.main}>
      {/* Testimonial Section */}
      <div className={styles.testimonialSection}>
        {/* Left - Image */}
        <div className={styles.testimonialImage}>
          <img src={main1Image} alt="Anoryx Testimonial" />
        </div>

        {/* Right - Content */}
        <div className={styles.testimonialContent}>
          <div className={styles.testimonialCard}>
            <h3 className={styles.testimonialTitle}>
              Building Intelligent Systems for Digital Transformation
            </h3>

            {/* Feature Boxes */}
            <div className={styles.featuresGrid}>
              {/* Box 1 */}
              <div className={styles.featureBox}>
                <div className={styles.featureIconWrapper} style={{ backgroundColor: '#DEEBFF' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" fill="#0052CC" />
                  </svg>
                </div>
                <h4 className={styles.featureTitle}>Streamline Workflows</h4>
                <p className={styles.featureText}>Automate complex processes and eliminate manual work</p>
              </div>

              {/* Box 2 */}
              <div className={styles.featureBox}>
                <div className={styles.featureIconWrapper} style={{ backgroundColor: '#D7F8DC' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#36B37E" />
                  </svg>
                </div>
                <h4 className={styles.featureTitle}>Enhanced Decisions</h4>
                <p className={styles.featureText}>AI-powered insights for smarter decision-making</p>
              </div>

              {/* Box 3 */}
              <div className={styles.featureBox}>
                <div className={styles.featureIconWrapper} style={{ backgroundColor: '#FFF7D6' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="#FF9500" />
                  </svg>
                </div>
                <h4 className={styles.featureTitle}>Drive Innovation</h4>
                <p className={styles.featureText}>Focus on growth while we handle the complexity</p>
              </div>
            </div>

            <div className={styles.divider}></div>

            <p className={styles.testimonialSubtext}>
              We are <span className={styles.highlight}>open to collaborations, partnerships, and pilot projects</span> with forward-thinking organizations
              ready to transform their operations.
            </p>

            <Link to="/company/about" className={styles.testimonialAuthor} style={{ textDecoration: 'none', color: 'inherit' }} aria-label="Go to About page">
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>Anoryx Tech Solutions</span>
                <span className={styles.authorTitle}>AI-Powered Enterprise Solutions</span>
              </div>
              <div className={styles.arrowIcon}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Horizontal Line - Before main5.jpg */}
      <div className={styles.horizontalLine}></div>

      {/* Image Section */}
      <div className={styles.imageSection}>
        <div className={styles.imageWrapper}>
        <img src={main5Image} alt="Anoryx Solutions" className={styles.sectionImage} />
          {/* About Anoryx Section - Positioned inside image wrapper */}
          <div className={styles.aboutSection}>
            <h2 className={styles.aboutTitle}>Intelligent Systems for Enterprise Success</h2>
            <p className={styles.aboutSubtitle}>We transform businesses through AI-powered automation and data intelligence, enabling organizations to operate smarter and faster.</p>
          </div>
        </div>
      </div>

      {/* Decorative arrow — visible on mobile only */}
      <div className={styles.mobileArrow}>
        <svg width="24" height="40" viewBox="0 0 24 40" fill="none">
          <line x1="12" y1="0" x2="12" y2="30" stroke="#0052CC" strokeWidth="2" strokeDasharray="4 3"/>
          <path d="M6 26 L12 36 L18 26" stroke="#0052CC" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Featured Content Section */}
      <div className={styles.featuredSection}>
        <div className={styles.featuredBox}>
          {/* Left - n8n Workflow Builder. AFFU: keep / remove? Pre-EcoSystem workflow-automation visual. */}
          <div className={styles.featuredLeft}>
            {/* Status Badges - Top Right of Workflow Area */}
            <div className={styles.statusBadgesRow}>
              <span className={styles.statusBadge}>
                <span className={styles.statusDot}></span>
                Deployed
              </span>
              <span className={styles.statusBadge}>API Key: sk-...xyz</span>
            </div>
            
            <div className={styles.workflowCanvas}>
              {/* Row 1: Webhook -> AI Agent -> OpenAI -> Claude */}
              <div className={styles.workflowRow}>
                <div className={`${styles.workflowNode} ${styles.nodeWebhook}`}>
                  <div className={styles.nodeIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                    </svg>
                  </div>
                  <span className={styles.nodeLabel}>Webhook</span>
                </div>
                <div className={styles.workflowConnector}>
                  <svg viewBox="0 0 30 10" fill="none">
                    <path d="M0 5 L22 5" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 2"/>
                    <path d="M18 2 L25 5 L18 8" fill="#94a3b8"/>
                  </svg>
                </div>
                <div className={`${styles.workflowNode} ${styles.nodeAI}`}>
                  <div className={styles.nodeIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                  </div>
                  <span className={styles.nodeLabel}>AI Agent</span>
                </div>
                <div className={styles.workflowConnector}>
                  <svg viewBox="0 0 30 10" fill="none">
                    <path d="M0 5 L22 5" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 2"/>
                    <path d="M18 2 L25 5 L18 8" fill="#94a3b8"/>
                  </svg>
                </div>
                <div className={`${styles.workflowNode} ${styles.nodeOpenAI}`}>
                  <div className={styles.nodeIcon}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.28 9.37a5.48 5.48 0 0 0-.47-4.49 5.55 5.55 0 0 0-6-2.51 5.48 5.48 0 0 0-4.1-1.83 5.55 5.55 0 0 0-5.3 3.85 5.48 5.48 0 0 0-3.66 2.66 5.55 5.55 0 0 0 .68 6.51 5.48 5.48 0 0 0 .47 4.49 5.55 5.55 0 0 0 6 2.51 5.48 5.48 0 0 0 4.1 1.83 5.55 5.55 0 0 0 5.3-3.85 5.48 5.48 0 0 0 3.66-2.66 5.55 5.55 0 0 0-.68-6.51Z"/>
                    </svg>
                  </div>
                  <span className={styles.nodeLabel}>OpenAI</span>
                </div>
                <div className={styles.workflowConnector}>
                  <svg viewBox="0 0 30 10" fill="none">
                    <path d="M0 5 L22 5" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 2"/>
                    <path d="M18 2 L25 5 L18 8" fill="#94a3b8"/>
                  </svg>
                </div>
                <div className={`${styles.workflowNode} ${styles.nodeClaude}`}>
                  <div className={styles.nodeIcon}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <span className={styles.nodeLabel}>Claude</span>
                </div>
              </div>

              {/* Vertical Connectors from Row 1 */}
              <div className={styles.verticalConnectorRow}>
                <div className={styles.verticalConnectorSpacer}></div>
                <div className={styles.verticalConnector}>
                  <svg viewBox="0 0 10 20" fill="none">
                    <path d="M5 0 L5 14" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 2"/>
                    <path d="M2 11 L5 18 L8 11" fill="#94a3b8"/>
                  </svg>
                </div>
                <div className={styles.verticalConnectorSpacer}></div>
                <div className={styles.verticalConnector}>
                  <svg viewBox="0 0 10 20" fill="none">
                    <path d="M5 0 L5 14" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 2"/>
                    <path d="M2 11 L5 18 L8 11" fill="#94a3b8"/>
                  </svg>
                </div>
                <div className={styles.verticalConnectorSpacer}></div>
                <div className={styles.verticalConnector}>
                  <svg viewBox="0 0 10 20" fill="none">
                    <path d="M5 0 L5 14" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 2"/>
                    <path d="M2 11 L5 18 L8 11" fill="#94a3b8"/>
                  </svg>
                </div>
              </div>

              {/* Row 2: Slack <- Database <- Gmail */}
              <div className={styles.workflowRow}>
                <div className={styles.workflowNodeSpacer}></div>
                <div className={`${styles.workflowNode} ${styles.nodeSlack}`}>
                  <div className={styles.nodeIcon}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z"/>
                    </svg>
                  </div>
                  <span className={styles.nodeLabel}>Slack</span>
                </div>
                <div className={styles.workflowConnectorReverse}>
                  <svg viewBox="0 0 30 10" fill="none">
                    <path d="M25 5 L3 5" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 2"/>
                    <path d="M7 2 L0 5 L7 8" fill="#94a3b8"/>
                  </svg>
                </div>
                <div className={`${styles.workflowNode} ${styles.nodeDatabase}`}>
                  <div className={styles.nodeIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <ellipse cx="12" cy="5" rx="9" ry="3"/>
                      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                    </svg>
                  </div>
                  <span className={styles.nodeLabel}>Database</span>
                </div>
                <div className={styles.workflowConnectorReverse}>
                  <svg viewBox="0 0 30 10" fill="none">
                    <path d="M25 5 L3 5" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 2"/>
                    <path d="M7 2 L0 5 L7 8" fill="#94a3b8"/>
                  </svg>
                </div>
                <div className={`${styles.workflowNode} ${styles.nodeGmail}`}>
                  <div className={styles.nodeIcon}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                    </svg>
                  </div>
                  <span className={styles.nodeLabel}>Gmail</span>
                </div>
              </div>

              {/* Vertical Connector to Output */}
              <div className={styles.verticalConnectorRow}>
                <div className={styles.verticalConnectorSpacer}></div>
                <div className={styles.verticalConnector}>
                  <svg viewBox="0 0 10 20" fill="none">
                    <path d="M5 0 L5 14" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 2"/>
                    <path d="M2 11 L5 18 L8 11" fill="#94a3b8"/>
                  </svg>
                </div>
              </div>

              {/* Row 3: Output */}
              <div className={styles.workflowRow}>
                <div className={styles.workflowNodeSpacer}></div>
                <div className={`${styles.workflowNode} ${styles.nodeOutput}`}>
                  <div className={styles.nodeIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  </div>
                  <span className={styles.nodeLabel}>Output</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Title and Subtitle */}
          <div className={styles.featuredRight}>
            <h3 className={styles.featuredTitle}>Autonomous Intelligence Infrastructure for Enterprise Systems</h3>
            <p className={styles.featuredDescription}>Explore our latest insights and resources</p>
          </div>
        </div>
      </div>

      {/* Two Column Feature Cards */}
      <div className={styles.featureCardsContainer}>
        {/* Decorative Spiral Arrow */}
        <div className={styles.spiralArrowContainer}>
          <svg width="220" height="280" viewBox="0 0 220 280" fill="none">
            {/* Arrow: starts left, goes right-up, curls clockwise, ends pointing down */}
            <path 
              d="M5 80
                 Q 40 70, 80 50
                 Q 140 20, 190 40
                 Q 230 60, 210 110
                 Q 190 160, 140 150
                 Q 100 140, 110 100
                 Q 120 60, 170 70
                 Q 210 80, 195 130
                 Q 180 180, 170 240" 
              stroke="#0052CC" 
              strokeWidth="2.5" 
              strokeDasharray="6 4" 
              fill="none" 
              strokeLinecap="round"
            />
            {/* Arrow head pointing down */}
            <path 
              d="M162 232 L170 248 L178 232" 
              stroke="#0052CC" 
              strokeWidth="2.5" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {/* Left Card - Stripe-Style Accounts Table */}
        <div className={styles.featureCard}>
          <div className={`${styles.featureCardImage} ${styles.featureCardImageLeft}`}>
            {/* Animated Curved Flowing Lines Background */}
            <div className={styles.flowingLines}>
              <svg viewBox="0 0 400 300" preserveAspectRatio="none" className={styles.flowingSvg}>
                <path className={styles.flowPath1} d="M-100 220 Q 50 180, 150 200 T 350 160 T 550 180" stroke="#3b82f6" strokeWidth="3" fill="none"/>
                <path className={styles.flowPath2} d="M-100 240 Q 70 200, 170 220 T 370 180 T 570 200" stroke="#6366f1" strokeWidth="4" fill="none"/>
                <path className={styles.flowPath3} d="M-100 260 Q 90 220, 190 240 T 390 200 T 590 220" stroke="#8b5cf6" strokeWidth="5" fill="none"/>
                <path className={styles.flowPath4} d="M-100 280 Q 110 240, 210 260 T 410 220 T 610 240" stroke="#a855f7" strokeWidth="6" fill="none"/>
                <path className={styles.flowPath5} d="M-100 300 Q 130 260, 230 280 T 430 240 T 630 260" stroke="#c084fc" strokeWidth="7" fill="none"/>
              </svg>
            </div>
            {/* Stripe-Style Browser Mockup */}
            <div className={styles.stripeMockup}>
              {/* Animated Cursor - Real Arrow */}
              <div className={styles.fakeCursor}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#1a1a2e">
                  <path d="M4 4l16 8-8 4-2 6-6-18z"/>
                </svg>
              </div>
              {/* Notification Toast with Bell */}
              <div className={styles.notificationToast}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#f59e0b"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/></svg>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#22c55e"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                <span>Payment received</span>
              </div>
              {/* Floating Chart Icon */}
              <div className={`${styles.floatingElement} ${styles.floatChart}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5">
                  <path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>
                </svg>
              </div>
              {/* Floating Dollar Icon */}
              <div className={`${styles.floatingElement} ${styles.floatDollar}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5">
                  <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                </svg>
              </div>
              {/* Floating Sync Icon */}
              <div className={`${styles.floatingElement} ${styles.floatSync}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.5">
                  <path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
                </svg>
              </div>
              <div className={styles.stripeWindow}>
                {/* Browser Chrome */}
                <div className={styles.browserChrome}>
                  <div className={styles.browserDots}>
                    <span style={{background: '#ff5f57'}}></span>
                    <span style={{background: '#febc2e'}}></span>
                    <span style={{background: '#28c840'}}></span>
                  </div>
                  <div className={styles.browserUrl}>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="#94a3b8"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2z"/></svg>
                    <span>dashboard.anoryx.com</span>
                  </div>
                </div>
                {/* App Content */}
                <div className={styles.stripeContent}>
                  {/* Sidebar */}
                  <div className={styles.stripeSidebar}>
                    <div className={styles.sidebarLogo}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#6366f1"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                    </div>
                    <div className={styles.sidebarNav}>
                      <div className={styles.navItem + ' ' + styles.navActive}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
                      </div>
                      <div className={styles.navItem}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>
                      </div>
                      <div className={styles.navItem}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                      </div>
                    </div>
                  </div>
                  {/* Main Table Area */}
                  <div className={styles.stripeMain}>
                    <div className={styles.tableTitle}>Connected Accounts</div>
                    {/* Table Header */}
                    <div className={styles.stripeTableHeader}>
                      <span>Account</span>
                      <span>Country</span>
                      <span>Balance</span>
                      <span>Volume</span>
                    </div>
                    {/* Table Rows */}
                    <div className={styles.stripeTableBody}>
                      <div className={`${styles.stripeRow} ${styles.hoverRow1}`}>
                        <span className={styles.accountCell}>
                          <span className={styles.accountIcon} style={{background: '#ef4444'}}>V</span>
                          Vital Flow
                        </span>
                        <span>Canada</span>
                        <span className={styles.balanceCell}>₹667,840</span>
                        <span className={`${styles.volumeCell} ${styles.animateValue1}`}>$5,725,038</span>
                      </div>
                      <div className={`${styles.stripeRow} ${styles.hoverRow2}`}>
                        <span className={styles.accountCell}>
                          <span className={styles.accountIcon} style={{background: '#f59e0b'}}>D</span>
                          Daybreak
                        </span>
                        <span>US</span>
                        <span className={styles.balanceCell}>₹120,160</span>
                        <span className={`${styles.volumeCell} ${styles.animateValue2}`}>$710,320</span>
                      </div>
                      <div className={`${styles.stripeRow} ${styles.hoverRow3}`}>
                        <span className={styles.accountCell}>
                          <span className={styles.accountIcon} style={{background: '#22c55e'}}>S</span>
                          Sacred Space
                        </span>
                        <span>UK</span>
                        <span className={styles.balanceCell}>₹99,760</span>
                        <span className={`${styles.volumeCell} ${styles.animateValue3}`}>$1,965,527</span>
                      </div>
                      <div className={`${styles.stripeRow} ${styles.hoverRow4}`}>
                        <span className={styles.accountCell}>
                          <span className={styles.accountIcon} style={{background: '#3b82f6'}}>J</span>
                          Jackson Hot
                        </span>
                        <span>Australia</span>
                        <span className={styles.balanceCell}>₹292,800</span>
                        <span className={`${styles.volumeCell} ${styles.animateValue4}`}>$1,011,464</span>
                      </div>
                      <div className={`${styles.stripeRow} ${styles.hoverRow5}`}>
                        <span className={styles.accountCell}>
                          <span className={styles.accountIcon} style={{background: '#ec4899'}}>H</span>
                          Harmony
                        </span>
                        <span>US</span>
                        <span className={styles.balanceCell}>₹2,474,400</span>
                        <span className={`${styles.volumeCell} ${styles.animateValue5}`}>$23,573,572</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.featureCardContent}>
            <span className={styles.featureCardTag}>AUTONOMOUS ENTERPRISE OPERATIONS</span>
            <h3 className={styles.featureCardTitle}>Focus on What Actually Matters</h3>
            <p className={styles.featureCardText}>Reduce operational noise using autonomous AI workflows that analyze data, automate decisions, and eliminate repetitive manual processes across enterprise systems.</p>
          </div>
          <Link to="/solutions/enterprise-automation" className={styles.featureCardLink}>Explore Autonomous Workflows →</Link>
        </div>

        {/* Right Card - Security with Floating Icons */}
        <div className={styles.featureCard}>
          <div className={`${styles.featureCardImage} ${styles.featureCardImageRight}`}>
            {/* Floating Animated Icons */}
            <div className={`${styles.floatingIcon} ${styles.floatIcon1}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
            </div>
            <div className={`${styles.floatingIcon} ${styles.floatIcon2}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5">
                <path d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"/>
              </svg>
            </div>
            <div className={`${styles.floatingIcon} ${styles.floatIcon3}`}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.5">
                <path d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
              </svg>
            </div>
            <div className={`${styles.floatingIcon} ${styles.floatIcon4}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="1.5">
                <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>
              </svg>
            </div>
            <div className={`${styles.floatingIcon} ${styles.floatIcon5}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            {/* Security Dashboard Mockup */}
            <div className={styles.securityMockup}>
              <div className={styles.securityWindow}>
                <div className={styles.securityToolbar}>
                  <div className={styles.toolbarDots}>
                    <span style={{background: '#ff5f57'}}></span>
                    <span style={{background: '#febc2e'}}></span>
                    <span style={{background: '#28c840'}}></span>
                  </div>
                  <span className={styles.securityTitle}>Security Center</span>
                  <div className={styles.toolbarBadge}>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="#22c55e"><circle cx="12" cy="12" r="10"/></svg>
                  </div>
                </div>
                <div className={styles.securityContent}>
                  {/* App Grid */}
                  <div className={styles.appGrid}>
                    <div className={styles.appItem}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                      <span>Browser</span>
                      <div className={styles.checkBadge}>✓</div>
                    </div>
                    <div className={styles.appItem}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#8b5cf6"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/></svg>
                      <span>Files</span>
                      <div className={styles.checkBadge}>✓</div>
                    </div>
                    <div className={styles.appItem}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#22c55e"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/></svg>
                      <span>Email</span>
                      <div className={styles.checkBadge}>✓</div>
                    </div>
                    <div className={styles.appItem}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b"><circle cx="12" cy="12" r="10"/></svg>
                      <span>Network</span>
                      <div className={styles.checkBadge}>✓</div>
                    </div>
                  </div>
                  {/* Status Bar */}
                  <div className={styles.statusBar}>
                    <div className={styles.statusIcon}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="#22c55e"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
                    </div>
                    <span>All Systems Protected</span>
                  </div>
                  <div className={styles.progressSection}>
                    <div className={styles.progressTrack}>
                      <div className={styles.progressFillAnim}></div>
                    </div>
                    <span className={styles.progressLabel}>256-bit Encryption</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.featureCardContent}>
            <span className={`${styles.featureCardTag} ${styles.featureCardTagDark}`}>AI-POWERED PRIVACY & SECURITY</span>
            <h3 className={styles.featureCardTitle}>Stay Secure While You Scale</h3>
            <p className={styles.featureCardText}>Use any LLM without sending it your secrets. Anoryx Sentinel redacts PII and credentials before prompts leave your network, blocks prompt injection and keeps a tamper-evident audit log of every model call.</p>
          </div>
          <Link to="/products/sentinel" className={styles.featureCardLink}>Explore Anoryx Sentinel →</Link>
        </div>
      </div>

      {/* Horizontal Line - After feature cards */}
      <div className={styles.horizontalLine}></div>

      {/* Full Width Background Image Section */}
      <div className={styles.backgroundImageSection} style={{ backgroundImage: `url(${main2Image})` }}>
      </div>
    </section>
  );
}

export default Main;


