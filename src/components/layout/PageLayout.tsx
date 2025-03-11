
import { ReactNode } from 'react';
import Navbar from '../navigation/Navbar';
import Footer from '../navigation/Footer';
import { cn } from '@/lib/utils';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const PageLayout = ({ 
  children, 
  className,
  fullWidth = false
}: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={cn(
        "flex-grow pt-20",
        className
      )}>
        {fullWidth ? (
          children
        ) : (
          <div className="container px-4 mx-auto py-8 md:py-12">
            {children}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
