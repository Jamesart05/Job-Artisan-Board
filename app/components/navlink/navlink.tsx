'use client'; // this is required to make it a Client Component

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
}

const NavLink = ({ href, children, className = '', activeClassName = '' }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const combinedClassName = isActive
    ? `${className} ${activeClassName}`.trim()
    : className;

  return (
    <Link href={href} className={combinedClassName}>
      {children}
    </Link>
  );
};

export default NavLink;
