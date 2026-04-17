import React from 'react';
import { useLayout, usePopup } from '../../../utils/hooks/';
import { PageStore } from '../../../utils/stores/';
import { HeaderConsumer, MemberConsumer, LinksConsumer } from '../../../utils/contexts/';
import {
  CircleIconButton, NavigationContentApp, NavigationMenuList,
  PopupTop, PopupMain, UserThumbnail,
} from '../../_shared';
import { HeaderThemeSwitcher } from './HeaderThemeSwitcher';
import { translateString } from '../../../utils/helpers/';

/* ── Heroicons — outline 24 × 24 ─────────────────────────────────────────── */
const SearchIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
    strokeWidth={1.5} stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);

const ArrowUpTrayIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
    strokeWidth={1.5} stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
  </svg>
);

const EllipsisVerticalIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
    strokeWidth={1.5} stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
  </svg>
);

const ArrowBackIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
    strokeWidth={1.5} stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
  </svg>
);

/* ── Popup page builder ────────────────────────────────────────────────────── */
function headerPopupPages(user, popupNavItems, hasHeaderThemeSwitcher) {
  const pages = { main: null };

  if (user.is.anonymous) {
    pages.main = (
      <div>
        <PopupMain><NavigationMenuList items={popupNavItems.middle} /></PopupMain>
      </div>
    );
  } else {
    const NavMenus = [];
    const insertNavMenus = (id, arr) => {
      if (arr.length) {
        if (NavMenus.length) NavMenus.push(<hr key={id + '-sep'} />);
        NavMenus.push(<NavigationMenuList key={id + '-nav'} items={arr} />);
      }
    };
    insertNavMenus('top',    popupNavItems.top);
    insertNavMenus('middle', popupNavItems.middle);
    insertNavMenus('bottom', popupNavItems.bottom);

    pages.main = (
      <div>
        <PopupTop>
          <a className="user-menu-top-link" href={user.pages.about} title={user.username}>
            <span><UserThumbnail size="medium" /></span>
            <span>
              <span className="username">
                {user?.name || user?.email || user?.username || 'User'}
              </span>
            </span>
          </a>
        </PopupTop>
        {NavMenus.length ? <PopupMain>{NavMenus}</PopupMain> : null}
      </div>
    );
  }

  if (hasHeaderThemeSwitcher) {
    pages['switch-theme'] = (
      <div>
        <PopupTop>
          <div>
            <span>
              <CircleIconButton className="menu-item-icon change-page" data-page-id="main" aria-label="Back">
                <ArrowBackIcon style={{ width: '20px', height: '20px' }} />
              </CircleIconButton>
            </span>
            <span>Switch theme</span>
          </div>
        </PopupTop>
        <PopupMain><HeaderThemeSwitcher /></PopupMain>
      </div>
    );
  }

  return pages;
}

/* ── Upload button ─────────────────────────────────────────────────────────── */
function UploadMediaButton({ user, links }) {
  const [popupContentRef, PopupContent, PopupTrigger] = usePopup();

  const uploadMenuItems = [
    { link: links.user.addMedia, icon: 'upload',   text: translateString('Upload') },
    { link: '/record_screen',    icon: 'videocam',  text: translateString('Record Screen') },
  ];

  return !user.is.anonymous && user.can.addMedia ? (
    <div className="header-action-item">
      <PopupTrigger contentRef={popupContentRef}>
        <button type="button" aria-label={translateString('Upload media')} className="header-icon-btn">
          <ArrowUpTrayIcon style={{ width: '22px', height: '22px' }} />
          <span className="hidden-txt">{translateString('Upload media')}</span>
        </button>
      </PopupTrigger>
      <PopupContent contentRef={popupContentRef}>
        <PopupMain><NavigationMenuList items={uploadMenuItems} /></PopupMain>
      </PopupContent>
    </div>
  ) : null;
}

/* ── Sign-in button ────────────────────────────────────────────────────────── */
function LoginButton({ user, link, hasHeaderThemeSwitcher }) {
  return user.is.anonymous && user.can.login ? (
    <div className={
      'sign-in-wrap ' +
      (hasHeaderThemeSwitcher ? 'hidden-only-in-small' : 'hidden-only-in-extra-small')
    }>
      <a href={link} className="button-link sign-in header-auth-btn" title={translateString('Sign in')}>
        {translateString('Sign in')}
      </a>
    </div>
  ) : null;
}

/* ── Register button ───────────────────────────────────────────────────────── */
function RegisterButton({ user, link, hasHeaderThemeSwitcher }) {
  return user.is.anonymous && user.can.register ? (
    <div className={
      'register-wrap ' +
      (hasHeaderThemeSwitcher ? 'hidden-only-in-small' : 'hidden-only-in-extra-small')
    }>
      <a href={link} className="button-link register-link header-auth-btn header-register-btn" title={translateString('Register')}>
        {translateString('Register')}
      </a>
    </div>
  ) : null;
}

/* ── Main HeaderRight export ───────────────────────────────────────────────── */
export function HeaderRight() {
  const { toggleMobileSearch } = useLayout();
  const [popupContentRef, PopupContent, PopupTrigger] = usePopup();

  return (
    <HeaderConsumer>
      {(header) => (
        <MemberConsumer>
          {(user) => (
            <LinksConsumer>
              {(links) => (
                <div className="header-right-inner">
                  {/* Mobile search toggle */}
                  <div className="mobile-search-toggle">
                    <button type="button" onClick={toggleMobileSearch}
                      aria-label="Search" className="header-icon-btn">
                      <SearchIcon style={{ width: '22px', height: '22px' }} />
                    </button>
                  </div>

                  {/* Upload */}
                  <UploadMediaButton user={user} links={links} />

                  {/* User avatar / settings */}
                  <div className={
                    (user.is.anonymous ? 'user-options' : 'user-thumb') +
                    (!user.is.anonymous || header.hasThemeSwitcher ? '' : ' visible-only-in-extra-small')
                  }>
                    <PopupTrigger contentRef={popupContentRef}>
                      {user.is.anonymous ? (
                        <button type="button" aria-label="Settings" className="header-icon-btn">
                          <EllipsisVerticalIcon style={{ width: '22px', height: '22px' }} />
                        </button>
                      ) : (
                        <UserThumbnail size="small" isButton={true} />
                      )}
                    </PopupTrigger>
                    <PopupContent contentRef={popupContentRef}>
                      <NavigationContentApp
                        initPage="main"
                        pages={headerPopupPages(user, header.popupNavItems, header.hasThemeSwitcher)}
                        pageChangeSelector=".change-page"
                        pageIdSelectorAttr="data-page-id"
                      />
                    </PopupContent>
                  </div>

                  {/* Sign-in / Register */}
                  <LoginButton    user={user} link={links.signin}   hasHeaderThemeSwitcher={header.hasThemeSwitcher} />
                  <RegisterButton user={user} link={links.register} hasHeaderThemeSwitcher={header.hasThemeSwitcher} />

                  {/* Injected HTML on the right */}
                  {PageStore.get('config-contents').header.right ? (
                    <div className="on-header-right"
                      dangerouslySetInnerHTML={{ __html: PageStore.get('config-contents').header.right }}
                    />
                  ) : null}
                </div>
              )}
            </LinksConsumer>
          )}
        </MemberConsumer>
      )}
    </HeaderConsumer>
  );
}
