import Image from 'next/image';

export function BrandLogo({ size = 'header', inverted = false }: { size?: 'header' | 'footer' | 'admin'; inverted?: boolean }) {
  return <span className={`brand-logo brand-logo-${size}${inverted ? ' brand-logo-inverted' : ''}`}>
    <Image src="/assets/brand/idcraft-logo.png" alt="ID Craft — Votre identité faite sur mesure" width={2481} height={2481} priority={size === 'header'} unoptimized />
  </span>;
}
