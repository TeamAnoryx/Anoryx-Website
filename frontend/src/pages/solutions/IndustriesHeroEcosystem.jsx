/**
 * Industries Hero Ecosystem — center-anchored animated intelligence ecosystem.
 * Core + 8 industry nodes, connection lines, floating particles. No left/right split.
 */

import { useState } from 'react';
import styles from './IndustriesHeroEcosystem.module.css';

const CENTER = { x: 200, y: 200 };

const INDUSTRY_NODES = [
  { id: 'saas', label: 'SaaS Platforms', angle: 0, radius: 135, color: 'rgba(30, 107, 255, 0.9)', desc: 'Scalable intelligence for software-as-a-service platforms' },
  { id: 'finance', label: 'Financial Systems', angle: 48, radius: 138, color: 'rgba(6, 182, 212, 0.9)', desc: 'Secure, audit-ready intelligence for financial infrastructure' },
  { id: 'healthcare', label: 'Healthcare Systems', angle: 98, radius: 132, color: 'rgba(20, 184, 166, 0.9)', desc: 'Privacy-first intelligence for healthcare infrastructure' },
  { id: 'ai', label: 'AI Infrastructure', angle: 155, radius: 140, color: 'rgba(139, 92, 246, 0.9)', desc: 'AI-native intelligence and model orchestration' },
  { id: 'enterprise', label: 'Enterprise IT', angle: 210, radius: 136, color: 'rgba(99, 102, 241, 0.9)', desc: 'Enterprise-grade IT and cloud intelligence' },
  { id: 'privacy', label: 'Privacy Systems', angle: 262, radius: 134, color: 'rgba(148, 163, 184, 0.95)', desc: 'Privacy and compliance-focused intelligence' },
  { id: 'autonomous', label: 'Autonomous Systems', angle: 308, radius: 139, color: 'rgba(30, 107, 255, 0.85)', desc: 'Autonomous agent and decision systems' },
  { id: 'secure', label: 'Secure Infrastructure', angle: 352, radius: 137, color: 'rgba(14, 165, 233, 0.9)', desc: 'Security-first intelligence infrastructure' },
];

function polarToCart(cx, cy, angleDeg, radius) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy - radius * Math.sin(rad),
  };
}

export default function IndustriesHeroEcosystem() {
  const [hoverNode, setHoverNode] = useState(null);

  return (
    <div className={styles.wrap} aria-hidden>
      {/* Floating micro-elements */}
      <div className={styles.microDots}>
        {[...Array(12)].map((_, i) => (
          <span key={i} className={styles.microDot} style={{ '--i': i }} />
        ))}
      </div>

      <svg className={styles.svg} viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="industriesCoreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(30, 107, 255, 0.5)" />
            <stop offset="50%" stopColor="rgba(30, 107, 255, 0.15)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="coreRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(30, 107, 255, 0.8)" />
            <stop offset="100%" stopColor="rgba(6, 182, 212, 0.4)" />
          </linearGradient>
        </defs>

        {/* Connection lines from nodes to core */}
        <g className={styles.linesGroup}>
          {INDUSTRY_NODES.map((node) => {
            const pos = polarToCart(CENTER.x, CENTER.y, node.angle, node.radius);
            const isHover = hoverNode === node.id;
            return (
              <line
                key={`line-${node.id}`}
                x1={CENTER.x}
                y1={CENTER.y}
                x2={pos.x}
                y2={pos.y}
                className={`${styles.connLine} ${isHover ? styles.connLineActive : ''}`}
                data-node={node.id}
              />
            );
          })}
        </g>

        {/* Intelligence Core */}
        <g className={styles.coreGroup}>
          <circle cx={CENTER.x} cy={CENTER.y} r="42" fill="url(#industriesCoreGlow)" className={styles.coreGlow} />
          <circle cx={CENTER.x} cy={CENTER.y} r="24" fill="rgba(30, 107, 255, 0.35)" stroke="rgba(30, 107, 255, 0.6)" strokeWidth="1.5" className={styles.coreInner} />
          <ellipse cx={CENTER.x} cy={CENTER.y} rx="32" ry="32" fill="none" stroke="url(#coreRingGrad)" strokeWidth="1.5" className={styles.coreRing} />
        </g>

        {/* Industry nodes */}
        {INDUSTRY_NODES.map((node) => {
          const pos = polarToCart(CENTER.x, CENTER.y, node.angle, node.radius);
          const isHover = hoverNode === node.id;
          return (
            <g
              key={node.id}
              className={`${styles.nodeGroup} ${isHover ? styles.nodeGroupHover : ''}`}
              style={{ '--node-x': pos.x, '--node-y': pos.y, '--node-color': node.color }}
              onMouseEnter={() => setHoverNode(node.id)}
              onMouseLeave={() => setHoverNode(null)}
            >
              <circle cx={pos.x} cy={pos.y} r="26" fill="rgba(2, 6, 23, 0.9)" stroke={node.color} strokeWidth="1.5" className={styles.nodeCircle} />
              <circle cx={pos.x} cy={pos.y} r="20" fill="none" stroke={node.color} strokeWidth="1" strokeOpacity="0.4" className={styles.nodeRing} />
              <text x={pos.x} y={pos.y - 32} textAnchor="middle" className={styles.nodeLabel}>{node.label}</text>
              {isHover && (
                <foreignObject x={pos.x - 90} y={pos.y + 38} width={180} height={44}>
                  <div className={styles.nodeTooltip} xmlns="http://www.w3.org/1999/xhtml">{node.desc}</div>
                </foreignObject>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
