import type { ReactNode } from 'react';

import type { Metadata } from 'next';

import { ThemeProvider } from 'next-themes';

import '@/app/globals.css';

import Footer from './footer';
import Header from './header';

export const metadata: Metadata = {
    title: 'Next.js 16 Starter',
    description: 'Next.js 16 starter with React 19, TypeScript 5, and Tailwind CSS 4'
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        // ? https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
        // ? https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors
        <html suppressHydrationWarning lang='en'>
            <body className={`bg-background text-foreground flex min-h-dvh flex-col antialiased`}>
                <ThemeProvider attribute='class'>
                    <Header />
                    <main className='flex-grow'>{children}</main>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
};

export default Layout;
