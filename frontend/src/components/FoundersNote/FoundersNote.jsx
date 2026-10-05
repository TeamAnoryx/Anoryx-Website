import { Link } from 'react-router-dom';
import styles from './FoundersNote.module.css';
import founderImage from '../../assets/founder.webp';

const FOUNDER = {
  name: 'Afnan Pasha',
  title: 'Founder & Director, Anoryx Tech Solutions',
  imageUrl: founderImage,
};

const EXCERPT = `I did not start Anoryx to simply build software. I started it because I saw a world moving faster than its ability to protect, understand, and empower the people living in it. Technology was evolving, but trust, security, and meaningful digital connection were not evolving at the same pace. I wanted to change that. Anoryx was born from a deep belief that technology should not just be powerful—it should be intelligent, responsible, and deeply human-centric. Every product we build carries a single underlying purpose: to solve real problems that affect real lives at scale.`;

export default function FoundersNote() {
  return (
    <section id="founders-note" className={styles.section} aria-labelledby="founders-note-heading">
      <div className={styles.container}>
        <div className={styles.layout}>
          {/* Left: Founder identity */}
          <aside className={styles.identity}>
            <div className={styles.imageWrapper}>
              {FOUNDER.imageUrl ? (
                <img
                  src={FOUNDER.imageUrl}
                  alt={`${FOUNDER.name}, ${FOUNDER.title}`}
                  className={styles.image}
                  width={400}
                  height={500}
                  loading="lazy"
                />
              ) : (
                <div className={styles.imagePlaceholder} aria-hidden="true" />
              )}
            </div>
            <h3 className={styles.founderName}>{FOUNDER.name}</h3>
            <p className={styles.founderTitle}>{FOUNDER.title}</p>
          </aside>

          {/* Right: Note preview + CTA */}
          <div className={styles.content}>
            <span className={styles.label}>Founder's Note</span>
            <h2 id="founders-note-heading" className={styles.headline}>
              A Personal Vision for Autonomous Enterprise Intelligence
            </h2>
            <p className={styles.excerpt}>{EXCERPT}</p>
            <Link to="/company/founders-note" className={styles.cta}>
              Read Full Founder's Note
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
