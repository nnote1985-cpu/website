'use client';

import { useEffect, useRef, useState } from 'react';
import type { ComponentType, ReactNode } from 'react';

type Promotion = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  project: string;
  discount: string;
  validUntil: string;
  ctaText: string;
  ctaUrl: string;
  isActive: boolean;
};

type Project = {
  id: string;
  slug: string;
  name: string;
  status: string;
  priceMin: number;
  priceMax?: number;
  location: string;
  bts?: string;
};

function useDeferredImport<TProps>(
  loader: () => Promise<{ default: ComponentType<TProps> }>,
  rootMargin = '700px'
) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [Component, setComponent] = useState<ComponentType<TProps> | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || Component) return;

    const load = () => {
      loader().then((mod) => setComponent(() => mod.default));
    };

    if (!('IntersectionObserver' in window)) {
      load();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        load();
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [Component, loader, rootMargin]);

  return { ref, Component };
}

function DeferredShell({ children, className = '' }: { children?: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function DeferredPromoBanner({ promos }: { promos: Promotion[] }) {
  const { ref, Component } = useDeferredImport<{ promos: Promotion[] }>(
    () => import('@/components/home/PromoBanner'),
    '900px'
  );

  return (
    <div ref={ref}>
      {Component ? <Component promos={promos} /> : <DeferredShell className="h-[140px] bg-white sm:h-[110px] md:h-[88px]" />}
    </div>
  );
}

export function DeferredSearchSection({ projects }: { projects: Project[] }) {
  const { ref, Component } = useDeferredImport<{ projects: Project[] }>(
    () => import('@/components/home/SearchSection'),
    '900px'
  );

  return (
    <div ref={ref}>
      {Component ? (
        <Component projects={projects} />
      ) : (
        <DeferredShell className="h-[150px] rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:h-[92px]" />
      )}
    </div>
  );
}

export function DeferredMortgageCalculator({ projects }: { projects: Project[] }) {
  const { ref, Component } = useDeferredImport<{ projects: Project[] }>(
    () => import('@/components/home/MortgageCalculator'),
    '700px'
  );

  return (
    <div ref={ref}>
      {Component ? (
        <Component projects={projects} />
      ) : (
        <DeferredShell className="mx-auto h-[520px] max-w-4xl rounded-2xl border border-slate-200 bg-slate-100/70" />
      )}
    </div>
  );
}
