'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CalendarDays, ChevronLeft, ChevronRight, X } from 'lucide-react';

const MONTHS = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
const MONTHS_SHORT = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
const WEEKDAYS = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];
const POPOVER_WIDTH = 304;

// Dates are handled as local YYYY-MM-DD strings, the same format the native date input produced.
const toISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const fromISO = (s: string) => {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
};
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

interface Props {
  id: string;
  value: string;
  min: string;
  onChange: (value: string) => void;
  className?: string;
  /** Theme: accent colour, text colour on the accent, and popover background. Defaults to the Elysium gold on navy. */
  accent?: string;
  onAccent?: string;
  panel?: string;
}

export default function LuxeDatePicker({
  id, value, min, onChange, className = '',
  accent = '#C2A363', onAccent = '#0b1630', panel = 'rgba(11,22,48,0.95)',
}: Props) {
  const theme = { '--dp-accent': accent, '--dp-on-accent': onAccent, '--dp-panel': panel } as React.CSSProperties;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const minDate = fromISO(min);
  const [focused, setFocused] = useState<Date>(() => (value ? fromISO(value) : minDate));
  const [view, setView] = useState({ year: focused.getFullYear(), month: focused.getMonth() });

  // Positioned directly on the DOM node: the popover is portaled to <body> so the card can't clip it.
  const place = useCallback(() => {
    const r = triggerRef.current?.getBoundingClientRect();
    const el = popoverRef.current;
    if (!r || !el) return;
    const height = el.offsetHeight;
    const below = r.bottom + 8;
    const top = below + height > window.innerHeight - 8 && r.top - height - 8 > 8 ? r.top - height - 8 : below;
    // Centre on phones; align to the field's right edge on wider screens.
    const left = window.innerWidth < 480
      ? Math.max(8, (window.innerWidth - POPOVER_WIDTH) / 2)
      : Math.min(Math.max(8, r.right - POPOVER_WIDTH), window.innerWidth - POPOVER_WIDTH - 8);
    el.style.top = `${top}px`;
    el.style.left = `${left}px`;
  }, []);

  const openPicker = () => {
    const start = value ? fromISO(value) : minDate;
    setFocused(start);
    setView({ year: start.getFullYear(), month: start.getMonth() });
    setOpen(true);
  };

  const close = useCallback((refocus = true) => {
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  }, []);

  useLayoutEffect(() => {
    if (open) place();
  }, [open, view, place]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!popoverRef.current?.contains(t) && !triggerRef.current?.contains(t)) close(false);
    };
    window.addEventListener('mousedown', onDown);
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    return () => {
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
    };
  }, [open, close, place]);

  // Keep keyboard focus on the focused day.
  useEffect(() => {
    if (open) popoverRef.current?.querySelector<HTMLButtonElement>(`[data-day="${toISO(focused)}"]`)?.focus({ preventScroll: true });
  }, [open, focused, view]);

  const moveFocus = (d: Date) => {
    const next = d < minDate ? minDate : d;
    setFocused(next);
    setView({ year: next.getFullYear(), month: next.getMonth() });
  };

  const onGridKey = (e: React.KeyboardEvent) => {
    const steps: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (e.key in steps) {
      e.preventDefault();
      moveFocus(addDays(focused, steps[e.key]));
    } else if (e.key === 'PageUp' || e.key === 'PageDown') {
      e.preventDefault();
      const delta = e.key === 'PageUp' ? -1 : 1;
      moveFocus(new Date(focused.getFullYear(), focused.getMonth() + delta, focused.getDate()));
    } else if (e.key === 'Escape') {
      e.preventDefault();
      close();
    }
  };

  const select = (d: Date) => {
    onChange(toISO(d));
    close();
  };

  const shiftMonth = (delta: number) => {
    const d = new Date(view.year, view.month + delta, 1);
    setView({ year: d.getFullYear(), month: d.getMonth() });
  };

  const firstOfMonth = new Date(view.year, view.month, 1);
  const cells: (Date | null)[] = [
    ...Array.from({ length: firstOfMonth.getDay() }, () => null),
    ...Array.from({ length: new Date(view.year, view.month + 1, 0).getDate() }, (_, i) => new Date(view.year, view.month, i + 1)),
  ];
  const canGoBack = new Date(view.year, view.month, 1) > new Date(minDate.getFullYear(), minDate.getMonth(), 1);
  const todayISO = toISO(new Date());

  const label = value
    ? (() => {
        const d = fromISO(value);
        return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear() + 543}`;
      })()
    : 'เลือกวันที่';

  return (
    <>
      <div className="relative">
        <button
          ref={triggerRef}
          id={id}
          type="button"
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => (open ? close(false) : openPicker())}
          className={`flex items-center justify-between text-left ${className} ${value ? '' : '!text-white/50'}`}
        >
          <span>{label}</span>
          <CalendarDays size={16} style={{ color: accent }} />
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label="ล้างวันที่"
            className="absolute right-6 top-1/2 -translate-y-1/2 p-1 text-white/60 hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {open &&
        createPortal(
          <div
            ref={popoverRef}
            role="dialog"
            aria-label="เลือกวันที่นัดหมาย"
            style={{ top: 0, left: 0, width: POPOVER_WIDTH, ...theme }}
            className="fixed z-[200] rounded-2xl border border-[color-mix(in_srgb,var(--dp-accent)_30%,transparent)] bg-[var(--dp-panel)] p-4 text-white shadow-[0_24px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl"
          >
            <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-[var(--dp-accent)] to-transparent" />

            <div className="mb-3 flex items-center justify-between">
              <button
                type="button"
                onClick={() => shiftMonth(-1)}
                disabled={!canGoBack}
                aria-label="เดือนก่อนหน้า"
                className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--dp-accent)] transition-colors hover:bg-white/10 disabled:opacity-25 disabled:hover:bg-transparent"
              >
                <ChevronLeft size={16} />
              </button>
              <p className="text-sm font-semibold tracking-wide" aria-live="polite">
                {MONTHS[view.month]} {view.year + 543}
              </p>
              <button
                type="button"
                onClick={() => shiftMonth(1)}
                aria-label="เดือนถัดไป"
                className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--dp-accent)] transition-colors hover:bg-white/10"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="mb-1 grid grid-cols-7 text-center text-[10px] font-semibold tracking-wider text-[var(--dp-accent)]">
              {WEEKDAYS.map((w) => <span key={w} className="py-1">{w}</span>)}
            </div>

            <div role="grid" className="grid grid-cols-7 gap-1" onKeyDown={onGridKey}>
              {cells.map((d, i) => {
                if (!d) return <span key={`blank-${i}`} />;
                const iso = toISO(d);
                const disabled = d < minDate;
                const selected = iso === value;
                const isToday = iso === todayISO;
                const isFocused = iso === toISO(focused);
                return (
                  <button
                    key={iso}
                    type="button"
                    data-day={iso}
                    tabIndex={isFocused ? 0 : -1}
                    disabled={disabled}
                    aria-pressed={selected}
                    aria-label={`${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear() + 543}`}
                    onClick={() => select(d)}
                    className={`h-9 rounded-full text-[13px] tabular-nums outline-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80 ${
                      selected
                        ? 'bg-[var(--dp-accent)] font-bold text-[var(--dp-on-accent)] shadow-[0_4px_14px_color-mix(in_srgb,var(--dp-accent)_45%,transparent)] hover:brightness-110'
                        : disabled
                          ? 'cursor-not-allowed text-white/30'
                          : isToday
                            ? 'font-semibold text-white ring-1 ring-inset ring-[var(--dp-accent)] hover:bg-white/10'
                            : 'text-white/85 hover:bg-white/10'
                    }`}
                  >
                    {d.getDate()}
                  </button>
                );
              })}
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-xs">
              <button type="button" onClick={() => select(fromISO(todayISO) < minDate ? minDate : fromISO(todayISO))} className="text-[var(--dp-accent)] hover:brightness-125 transition">
                วันนี้
              </button>
              <button type="button" onClick={() => close()} className="text-white/70 hover:text-white transition-colors">
                ปิด
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
