/**
 * useSectionsInView — the fade-in-on-scroll pattern used across Anoryx pages.
 * `register(key)` returns a ref callback; `inView[key]` turns true once the section is seen.
 */

import { useCallback, useEffect, useRef, useState } from 'react';

export default function useSectionsInView() {
  const [inView, setInView] = useState({});
  const observerRef = useRef(null);
  const nodesRef = useRef(new Map());

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setInView(Object.fromEntries([...nodesRef.current.keys()].map((k) => [k, true])));
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = entry.target.dataset.section;
            setInView((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '-5% 0px -5% 0px', threshold: 0 }
    );
    observerRef.current = observer;
    nodesRef.current.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const register = useCallback(
    (key) => (node) => {
      if (!node) return;
      node.dataset.section = key;
      if (!nodesRef.current.has(key)) {
        nodesRef.current.set(key, node);
        observerRef.current?.observe(node);
      }
    },
    []
  );

  return [inView, register];
}
