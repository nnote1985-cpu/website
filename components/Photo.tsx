type Props = { name: string; alt: string; className?: string; sizes?: string; priority?: boolean; parallax?: number };
export default function Photo({ name, alt, className = '', sizes = '100vw', priority = false, parallax }: Props) {
  return <img className={className} data-parallax={parallax} src={`/media/${name}-1200.webp`} srcSet={`/media/${name}-640.webp 640w, /media/${name}-1200.webp 1200w, /media/${name}-1920.webp 1920w`} sizes={sizes} alt={alt} width="1920" height="1080" loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" />;
}
