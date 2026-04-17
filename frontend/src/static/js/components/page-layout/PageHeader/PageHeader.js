import React, { useEffect } from 'react';
/* Inter Variable font — imported as JS so webpack resolves woff2 URLs correctly */
import '@fontsource-variable/inter';
import { PageStore } from '../../../utils/stores/';
import { useUser, useLayout } from '../../../utils/hooks/';
import { addClassname } from '../../../utils/helpers/';
import { SearchField } from './SearchField';
import { HeaderRight } from './HeaderRight';
import { HeaderLeft } from './HeaderLeft';

import '../../../../css/styles.scss';
import './PageHeader.scss';
import '../PageMain.scss';

function Alerts() {
  function onClickAlertClose() {
    const alertElem = this.parentNode;
    addClassname(alertElem, 'hiding');
    setTimeout(
      function () {
        if (alertElem && alertElem.parentNode) {
          alertElem.parentNode.removeChild(alertElem);
        }
      }.bind(this),
      400
    );
  }

  setTimeout(
    function () {
      const closeBtn = document.querySelectorAll('.alert.alert-dismissible .close');
      let i;
      if (closeBtn.length) {
        i = 0;
        while (i < closeBtn.length) {
          closeBtn[i].addEventListener('click', onClickAlertClose);
          i += 1;
        }
      }
    }.bind(this),
    1000
  );
}

function MediaUploader() {
  const uploaderWrap = document.querySelector('.media-uploader-wrap');
  if (uploaderWrap) {
    const el = document.createElement('div');
    el.setAttribute('class', 'pre-upload-msg');
    el.innerHTML = PageStore.get('config-contents').uploader.belowUploadArea;
    uploaderWrap.appendChild(el);
  }
}

export function PageHeader() {
  const { isAnonymous } = useUser();
  const { visibleMobileSearch } = useLayout();

  useEffect(() => {
    Alerts();
    if (void 0 === PageStore.get('current-page') || 'add-media' === PageStore.get('current-page')) {
      MediaUploader();
    }
  }, []);

  const baseClass = [
    'page-header',
    visibleMobileSearch ? 'mobile-search-field' : '',
    isAnonymous       ? 'anonymous-user'        : '',
  ].filter(Boolean).join(' ');

  return (
    <header className={baseClass}>
      {/* ── Left: sidebar toggle + logo ──────────────────────────────────── */}
      <div className="page-header-left">
        <HeaderLeft />
      </div>

      {/* ── Centre: search ───────────────────────────────────────────────── */}
      <div className="page-header-center">
        <SearchField />
      </div>

      {/* ── Right: upload · theme switch · user menu ─────────────────────── */}
      <div className="page-header-right">
        <HeaderRight />
      </div>
    </header>
  );
}
