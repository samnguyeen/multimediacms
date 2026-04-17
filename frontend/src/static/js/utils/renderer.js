import React from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LayoutProvider } from './contexts/LayoutContext';
import { UserProvider } from './contexts/UserContext';
import { inEmbeddedApp } from './helpers';
import { PageHeader, PageSidebar } from '../components/page-layout';

const AppProviders = ({ children }) => (
    <LayoutProvider>
        <ThemeProvider>
            <UserProvider>{children}</UserProvider>
        </ThemeProvider>
    </LayoutProvider>
);

export function renderPage(idSelector, PageComponent) {
    if (inEmbeddedApp()) {
        globalThis.document.body.classList.add('embedded-app');
        globalThis.document.body.classList.remove('visible-sidebar');

        const appContent = idSelector ? document.getElementById(idSelector) : undefined;
        if (appContent && PageComponent) {
            createRoot(appContent).render(
                <AppProviders>
                    <PageComponent />
                </AppProviders>
            );
        }
        return;
    }

    const appContent = idSelector ? document.getElementById(idSelector) : undefined;
    const appHeader  = document.getElementById('app-header');
    const appSidebar = document.getElementById('app-sidebar');

    if (appContent && PageComponent) {
        createRoot(appContent).render(
            <AppProviders>
                {appHeader  ? createPortal(<PageHeader />, appHeader) : null}
                {appSidebar ? createPortal(<PageSidebar />, appSidebar) : null}
                <PageComponent />
            </AppProviders>
        );
    } else if (appHeader && appSidebar) {
        createRoot(appSidebar).render(
            <AppProviders>
                {createPortal(<PageHeader />, appHeader)}
                <PageSidebar />
            </AppProviders>
        );
    } else if (appHeader) {
        createRoot(appHeader).render(
            <LayoutProvider>
                <ThemeProvider>
                    <UserProvider>
                        <PageHeader />
                    </UserProvider>
                </ThemeProvider>
            </LayoutProvider>
        );
    } else if (appSidebar) {
        createRoot(appSidebar).render(
            <AppProviders>
                <PageSidebar />
            </AppProviders>
        );
    }
}

export function renderEmbedPage(idSelector, PageComponent) {
    const appContent = idSelector ? document.getElementById(idSelector) : undefined;
    if (appContent && PageComponent) {
        createRoot(appContent).render(<PageComponent />);
    }
}
