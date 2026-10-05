/**
 * EcosystemDiagram — hub-and-spoke view of the Anoryx EcoSystem.
 * Inline SVG so it stays sharp and themeable; the figcaption is the text alternative.
 */

import { Link } from 'react-router-dom';
import { getProduct } from '../../data/products.js';
import styles from './Ecosystem.module.css';

const NODES = [
  { slug: 'sentinel', x: 10, y: 30 },
  { slug: 'delta', x: 310, y: 30 },
  { slug: 'rendly', x: 160, y: 362 },
];

/* Each spoke: a two-way connection to the hub, labelled with what flows each way. */
const SPOKES = [
  { slug: 'sentinel', x1: 130, y1: 88, x2: 200, y2: 183, labelX: 150, labelY: 140, anchor: 'end', lines: ['events', 'signed policies'] },
  { slug: 'delta', x1: 390, y1: 88, x2: 320, y2: 183, labelX: 370, labelY: 140, anchor: 'start', lines: ['usage events', 'budget policies'] },
  { slug: 'rendly', x1: 260, y1: 257, x2: 260, y2: 360, labelX: 276, labelY: 300, anchor: 'start', lines: ['alerts & approvals', 'people signals'] },
];

const NODE_W = 200;
const NODE_H = 58;

export default function EcosystemDiagram({ compact = false }) {
  const hub = getProduct('orchestration');
  return (
    <figure className={`${styles.diagram} ${compact ? styles.diagramCompact : ''}`}>
      <svg
        className={styles.diagramSvg}
        viewBox="0 0 520 430"
        role="img"
        aria-labelledby="eco-diagram-title eco-diagram-desc"
      >
        <title id="eco-diagram-title">How the Anoryx EcoSystem connects</title>
        <desc id="eco-diagram-desc">
          The Anoryx Orchestration Layer sits at the centre. Anoryx Sentinel sends security and usage events to it and
          receives signed policies. Anoryx Delta receives usage events and returns budget policies. Anoryx Rendly
          receives alerts and approval requests and sends people signals back.
        </desc>
        <defs>
          <marker id="eco-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className={styles.diagramArrowHead} />
          </marker>
        </defs>

        {SPOKES.map((s) => (
          <g key={s.slug}>
            <line
              x1={s.x1}
              y1={s.y1}
              x2={s.x2}
              y2={s.y2}
              className={styles.diagramLink}
              markerStart="url(#eco-arrow)"
              markerEnd="url(#eco-arrow)"
            />
            <text x={s.labelX} y={s.labelY} textAnchor={s.anchor} className={styles.diagramLabel}>
              {s.lines.map((line, i) => (
                <tspan key={line} x={s.labelX} dy={i === 0 ? 0 : 17}>
                  {line}
                </tspan>
              ))}
            </text>
          </g>
        ))}

        {/* Hub */}
        <g className={styles.diagramHub}>
          <rect x="150" y="183" width="220" height="74" rx="14" />
          <text x="260" y="214" textAnchor="middle" className={styles.diagramHubTitle}>
            {hub.shortName}
          </text>
          <text x="260" y="236" textAnchor="middle" className={styles.diagramNodeSub}>
            {hub.category}
          </text>
        </g>

        {/* Spokes */}
        {NODES.map((n) => {
          const p = getProduct(n.slug);
          return (
            <g key={n.slug} className={`${styles.diagramNode} ${styles[`node_${p.accent}`] || ''}`}>
              <rect x={n.x} y={n.y} width={NODE_W} height={NODE_H} rx="12" />
              <text x={n.x + NODE_W / 2} y={n.y + 25} textAnchor="middle" className={styles.diagramNodeTitle}>
                {p.shortName}
              </text>
              <text x={n.x + NODE_W / 2} y={n.y + 44} textAnchor="middle" className={styles.diagramNodeSub}>
                {p.category}
              </text>
            </g>
          );
        })}
      </svg>
      {!compact && (
        <figcaption className={styles.diagramCaption}>
          <ul>
            <li>
              <Link to="/products/sentinel">Sentinel</Link> sends security and usage events to the Orchestration Layer and
              enforces the signed policies it receives.
            </li>
            <li>
              <Link to="/products/delta">Delta</Link> turns usage events into a live ledger and returns budget policies.
            </li>
            <li>
              <Link to="/products/rendly">Rendly</Link> delivers alerts and approval requests to the people who can act on
              them.
            </li>
          </ul>
        </figcaption>
      )}
    </figure>
  );
}
