/**
 * ErrorBoundary — keeps a render error inside one page from unmounting the whole app
 * (which leaves a blank white screen). Shows a short message with a reload button instead.
 * `resetKey` (the current path) clears the error when the visitor navigates elsewhere.
 */

import { Component } from 'react';
import styles from './ErrorBoundary.module.css';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidUpdate(prevProps) {
    if (this.state.error && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ error: null });
    }
  }

  componentDidCatch(error, info) {
    console.error('Page failed to render:', error, info?.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <section className={styles.box} role="alert">
        <h1>This page didn&apos;t load properly</h1>
        <p>The site may have just been updated. Reloading usually fixes it.</p>
        <button type="button" className={styles.button} onClick={() => window.location.reload()}>
          Reload the page
        </button>
      </section>
    );
  }
}
