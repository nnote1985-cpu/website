/** Accessible page title for promotional artwork, without adding a layout row. */
export default function PromoProjectHeading({ name }: { name: string }) {
  return <h1 className="sr-only">{name}</h1>;
}
