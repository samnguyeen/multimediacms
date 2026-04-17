import React from 'react';
import { PageStore } from '../../../utils/stores/';
import { LinksConsumer, SiteConsumer } from '../../../utils/contexts/';
import { useLayout, useTheme } from '../../../utils/hooks/';
import { CircleIconButton } from '../../_shared';
import { Logo } from './Logo';

/* Heroicons — outline, 24 × 24 */
const ArrowLeftIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
    />
  </svg>
);

const Bars3Icon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
);

export function HeaderLeft() {
  const { logo } = useTheme();
  const { enabledSidebar, toggleMobileSearch, toggleSidebar } = useLayout();

  return (
    <SiteConsumer>
      {(site) => (
        <LinksConsumer>
          {(links) => (
            <div className="header-left-inner">
              {/* Back arrow — shown in mobile-search-field mode */}
              <div className="close-search-field">
                <CircleIconButton onClick={toggleMobileSearch} aria-label="Close search">
                  <ArrowLeftIcon style={{ width: '20px', height: '20px' }} />
                </CircleIconButton>
              </div>

              {/* Sidebar hamburger toggle */}
              {enabledSidebar && (
                <div className="toggle-sidebar">
                  <CircleIconButton onClick={toggleSidebar} aria-label="Toggle sidebar">
                    <Bars3Icon style={{ width: '20px', height: '20px' }} />
                  </CircleIconButton>
                </div>
              )}

              {/* Logo / brand */}
              <Logo src={logo} href={links.home} title={site.title} />

              {/* Optional HTML injected to the right of the logo */}
              {PageStore.get('config-contents').header.onLogoRight ? (
                <div
                  className="on-logo-right"
                  dangerouslySetInnerHTML={{
                    __html: PageStore.get('config-contents').header.onLogoRight,
                  }}
                />
              ) : null}
            </div>
          )}
        </LinksConsumer>
      )}
    </SiteConsumer>
  );
}
