// Intercept all /cart/add.js fetch calls (including from third-party apps)
// so they include sections data, allowing instant cart drawer render without a separate fetch.
(function () {
  const _fetch = window.fetch;
  window.fetch = function (input, init) {
    const url = typeof input === 'string' ? input : (input && input.url) || '';
    const isCartAdd = /\/cart\/add/.test(url);

    if (isCartAdd) {
      // Clone and modify the request to append sections for cart drawer
      const cartDrawer = document.querySelector('cart-drawer');
      if (cartDrawer) {
        const sections = cartDrawer.getSectionsToRender().map((s) => s.id).join(',');
        let modifiedInit = init ? { ...init } : {};

        if (modifiedInit.body instanceof FormData) {
          // Don't modify FormData from product-form.js (it already adds sections)
          // Only intercept JSON/string bodies from third-party apps
        } else if (typeof modifiedInit.body === 'string') {
          try {
            const bodyObj = JSON.parse(modifiedInit.body);
            if (!bodyObj.sections) {
              bodyObj.sections = sections;
              bodyObj.sections_url = window.location.pathname;
              modifiedInit.body = JSON.stringify(bodyObj);
            }
          } catch (e) { /* not JSON, leave as is */ }
        } else if (!modifiedInit.body) {
          // POST with no body or query string - add sections as query params
          const separator = url.includes('?') ? '&' : '?';
          input = url + separator + 'sections=' + encodeURIComponent(sections) + '&sections_url=' + encodeURIComponent(window.location.pathname);
        }

        return _fetch(input, modifiedInit).then((response) => {
          // Clone response to read it while also returning it
          const cloned = response.clone();
          cloned.json().then((data) => {
            if (data && data.sections && cartDrawer && typeof cartDrawer.renderContents === 'function') {
              // Only render if this wasn't already handled by product-form.js
              // product-form.js sets a flag on the response
              setTimeout(() => {
                if (!cartDrawer.classList.contains('active')) {
                  cartDrawer.renderContents(data);
                }
              }, 50);
            }
          }).catch(() => {});
          return response;
        });
      }
    }

    return _fetch(input, init);
  };
})();

class CartDrawer extends HTMLElement {
  constructor() {
    super();

    this.addEventListener('keyup', (evt) => evt.code === 'Escape' && this.close());
    this.querySelector('#CartDrawer-Overlay').addEventListener('click', this.close.bind(this));
    this.setHeaderCartIconAccessibility();
  }

  setHeaderCartIconAccessibility() {
    const cartLink = document.querySelector('#cart-icon-bubble');
    if (!cartLink) return;

    cartLink.setAttribute('role', 'button');
    cartLink.setAttribute('aria-haspopup', 'dialog');
    cartLink.addEventListener('click', (event) => {
      event.preventDefault();
      this.open(cartLink);
    });
    cartLink.addEventListener('keydown', (event) => {
      if (event.code.toUpperCase() === 'SPACE') {
        event.preventDefault();
        this.open(cartLink);
      }
    });
  }

  open(triggeredBy) {
    if (triggeredBy) this.setActiveElement(triggeredBy);
    const cartDrawerNote = this.querySelector('[id^="Details-"] summary');
    if (cartDrawerNote && !cartDrawerNote.hasAttribute('role')) this.setSummaryAccessibility(cartDrawerNote);
    // here the animation doesn't seem to always get triggered. A timeout seem to help
    setTimeout(() => {
      this.classList.add('animate', 'active');
    });

    this.addEventListener(
      'transitionend',
      () => {
        const containerToTrapFocusOn = this.classList.contains('is-empty')
          ? this.querySelector('.drawer__inner-empty')
          : document.getElementById('CartDrawer');
        const focusElement = this.querySelector('.drawer__inner') || this.querySelector('.drawer__close');
        trapFocus(containerToTrapFocusOn, focusElement);
      },
      { once: true }
    );

    document.body.classList.add('overflow-hidden');
  }

  close() {
    this.classList.remove('active');
    removeTrapFocus(this.activeElement);
    document.body.classList.remove('overflow-hidden');
  }

  setSummaryAccessibility(cartDrawerNote) {
    cartDrawerNote.setAttribute('role', 'button');
    cartDrawerNote.setAttribute('aria-expanded', 'false');

    if (cartDrawerNote.nextElementSibling.getAttribute('id')) {
      cartDrawerNote.setAttribute('aria-controls', cartDrawerNote.nextElementSibling.id);
    }

    cartDrawerNote.addEventListener('click', (event) => {
      event.currentTarget.setAttribute('aria-expanded', !event.currentTarget.closest('details').hasAttribute('open'));
    });

    cartDrawerNote.parentElement.addEventListener('keyup', onKeyUpEscape);
  }

  renderContents(parsedState) {
    this.querySelector('.drawer__inner').classList.contains('is-empty') &&
      this.querySelector('.drawer__inner').classList.remove('is-empty');
    this.productId = parsedState.id;
    this.getSectionsToRender().forEach((section) => {
      const sectionElement = section.selector
        ? document.querySelector(section.selector)
        : document.getElementById(section.id);

      if (!sectionElement) return;
      sectionElement.innerHTML = this.getSectionInnerHTML(parsedState.sections[section.id], section.selector);
    });

    setTimeout(() => {
      this.querySelector('#CartDrawer-Overlay').addEventListener('click', this.close.bind(this));
      this.open();
    });
  }

  getSectionInnerHTML(html, selector = '.shopify-section') {
    return new DOMParser().parseFromString(html, 'text/html').querySelector(selector).innerHTML;
  }

  getSectionsToRender() {
    return [
      {
        id: 'cart-drawer',
        selector: '#CartDrawer',
      },
      {
        id: 'cart-icon-bubble',
      },
    ];
  }

  getSectionDOM(html, selector = '.shopify-section') {
    return new DOMParser().parseFromString(html, 'text/html').querySelector(selector);
  }

  setActiveElement(element) {
    this.activeElement = element;
  }
}

customElements.define('cart-drawer', CartDrawer);

class CartDrawerItems extends CartItems {
  getSectionsToRender() {
    return [
      {
        id: 'CartDrawer',
        section: 'cart-drawer',
        selector: '.drawer__inner',
      },
      {
        id: 'cart-icon-bubble',
        section: 'cart-icon-bubble',
        selector: '.shopify-section',
      },
    ];
  }
}

customElements.define('cart-drawer-items', CartDrawerItems);
