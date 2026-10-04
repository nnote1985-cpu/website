export const nearbyCategories = [
  { id: 'transport', label: 'การเดินทาง' },
  { id: 'lifestyle', label: 'ไลฟ์สไตล์' },
  { id: 'education', label: 'สถานศึกษา' },
  { id: 'health', label: 'โรงพยาบาล' },
] as const;
export type NearbyPlace = { category: string; name: string; distance: string };
export type ProjectSections = {
  nearbyTitle: string; nearbyDescription: string; places: NearbyPlace[];
  progressEnabled: boolean; progressDate: string; progressOverall: number;
  progressItems: { name: string; percent: number }[]; progressVideo: string;
};
const text = (v: unknown) => typeof v === 'string' ? v.trim().slice(0, 2000) : '';
const percent = (v: unknown) => Math.round(Math.min(100, Math.max(0, Number(v) || 0)) * 100) / 100;
export function normalizeProjectSections(raw: unknown): ProjectSections {
  const v = raw && typeof raw === 'object' ? raw as Record<string, unknown> : {};
  return {
    nearbyTitle: text(v.nearbyTitle), nearbyDescription: text(v.nearbyDescription),
    places: (Array.isArray(v.places) ? v.places : []).slice(0,80).filter(p => p && typeof p === 'object' && nearbyCategories.some(c => c.id === p.category)).map(p => ({ category:p.category, name:text(p.name), distance:text(p.distance) })),
    progressEnabled: v.progressEnabled === true,
    progressDate: /^\d{4}-(0[1-9]|1[0-2])$/.test(text(v.progressDate)) ? text(v.progressDate) : '',
    progressOverall: percent(v.progressOverall),
    progressItems: (Array.isArray(v.progressItems) ? v.progressItems : []).slice(0,20).filter(p => p && typeof p === 'object').map(p => ({ name:text(p.name), percent:percent(p.percent) })),
    progressVideo: text(v.progressVideo),
  };
}
export function progressEmbed(raw: string): string | null {
  try {
    const url = new URL(raw);
    if (url.protocol !== 'https:') return null;
    const host = url.hostname.replace(/^www\./, '');
    const id = host === 'youtu.be' ? url.pathname.slice(1) : ['youtube.com','m.youtube.com','youtube-nocookie.com'].includes(host) ? (url.searchParams.get('v') || url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1]) : null;
    return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  } catch { return null; }
}
