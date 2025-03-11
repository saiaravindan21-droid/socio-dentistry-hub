
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
  activeClassName?: string;
  inactiveClassName?: string;
}

const NavLink = ({
  to,
  children,
  className,
  activeClassName = "text-primary font-medium",
  inactiveClassName = "text-foreground/70 hover:text-foreground",
  ...props
}: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "transition-all duration-200 relative py-2",
        isActive ? activeClassName : inactiveClassName,
        className
      )}
      {...props}
    >
      {children}
      <span 
        className={cn(
          "absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full transform scale-x-0 transition-transform duration-200",
          isActive && "scale-x-100"
        )}
      />
    </Link>
  );
};

export default NavLink;
