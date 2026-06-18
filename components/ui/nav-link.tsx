'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function NavLink({ href, children, className }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className={cn('relative group', className)}>
      <span
        className={cn(
          'text-sm font-medium transition-colors duration-300',
          isActive ? 'text-brand-black' : 'text-brand-gray hover:text-brand-black'
        )}
      >
        {children}
      </span>
      <motion.span
        className="absolute -bottom-1 left-0 h-0.5 bg-brand-gold"
        initial={{ width: 0 }}
        animate={{ width: isActive ? '100%' : 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
    </Link>
  );
}
