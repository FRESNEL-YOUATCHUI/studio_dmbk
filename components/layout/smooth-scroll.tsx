'use client';

import { useEffect } from 'react';

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cleanup: (() => void) | undefined;
    let mounted = true;

    async function start() {
      const [{ default: Lenis }, gsapModule, scrollTriggerModule] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);

      if (!mounted) return;

      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({ duration: 0.9, smoothWheel: true, wheelMultiplier: 0.95 });
      const update = (time: number) => lenis.raf(time * 1000);

      gsap.ticker.add(update);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        gsap.ticker.remove(update);
        lenis.destroy();
      };
    }

    const idle = window.requestIdleCallback || ((callback: IdleRequestCallback) => window.setTimeout(callback, 1));
    const idleId = idle(() => start());

    return () => {
      mounted = false;
      cleanup?.();
      if ('cancelIdleCallback' in window) window.cancelIdleCallback(idleId as number);
    };
  }, []);

  return null;
}
