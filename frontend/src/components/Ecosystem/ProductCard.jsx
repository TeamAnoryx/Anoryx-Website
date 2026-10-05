import { Link } from 'react-router-dom';
import ProductIcon from './ProductIcon.jsx';
import StatusPill from './StatusPill.jsx';
import page from '../../pages/products/Products.module.css';
import eco from './Ecosystem.module.css';

/** Product card driven by a products.js entry, in the products page overview-card style. */
export default function ProductCard({ product }) {
  const accent = eco[`accent_${product.accent}`] || '';
  return (
    <article className={`${page.overviewCard} ${eco.card} ${accent} ${product.isHub ? eco.cardHub : ''}`}>
      <div className={eco.cardTop}>
        <span className={`${page.overviewIcon} ${eco.cardIcon}`}>
          <ProductIcon name={product.icon} size={28} />
        </span>
        <StatusPill status={product.status} />
      </div>
      <h3 className={page.overviewCardTitle}>{product.name}</h3>
      <p className={eco.cardCategory}>{product.category}</p>
      {product.isHub && <p className={eco.hubNote}>Connects everything</p>}
      <p className={page.overviewCardDesc}>{product.tagline}</p>
      <ul className={eco.cardCaps}>
        {product.keyCapabilities.map((cap) => (
          <li key={cap}>{cap}</li>
        ))}
      </ul>
      <Link
        to={`/products/${product.slug}`}
        className={`${page.overviewCardLink} ${eco.cardLink}`}
        aria-label={`Learn more about ${product.name}`}
      >
        Learn more →
      </Link>
    </article>
  );
}
