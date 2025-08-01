/**
 * AOS (Animate On Scroll) - Lightweight JavaScript Implementation
 * Custom implementation for TruthRise
 */

(function() {
  'use strict';

  let elements = [];
  let initialized = false;

  // Default settings
  const defaultSettings = {
    offset: 120,
    delay: 0,
    duration: 400,
    easing: 'ease',
    once: false,
    mirror: false,
    anchorPlacement: 'top-bottom',
    disable: false,
    startEvent: 'DOMContentLoaded'
  };

  let settings = {};

  // Utility functions
  function extend(target, source) {
    for (let key in source) {
      if (source.hasOwnProperty(key)) {
        target[key] = source[key];
      }
    }
    return target;
  }

  function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      top: rect.top + window.pageYOffset,
      left: rect.left + window.pageXOffset
    };
  }

  function getInlineOption(el, option) {
    return el.getAttribute('data-aos-' + option);
  }

  function getPositionIn(el, defaultOffset, defaultAnchorPlacement) {
    const windowHeight = window.innerHeight;
    const anchoring = getInlineOption(el, 'anchor-placement') || defaultAnchorPlacement;
    const finalOffset = parseInt(getInlineOption(el, 'offset') || defaultOffset);
    const elementOffsetTop = getOffset(el).top;
    let elementOffsetBottom = elementOffsetTop + el.offsetHeight;
    let targetPositionTop, targetPositionBottom;

    switch (anchoring) {
      case 'top-bottom':
        targetPositionTop = elementOffsetTop + finalOffset;
        targetPositionBottom = elementOffsetTop + finalOffset;
        break;
      case 'center-bottom':
        targetPositionTop = elementOffsetTop + el.offsetHeight / 2 + finalOffset;
        targetPositionBottom = elementOffsetTop + el.offsetHeight / 2 + finalOffset;
        break;
      case 'bottom-bottom':
        targetPositionTop = elementOffsetBottom + finalOffset;
        targetPositionBottom = elementOffsetBottom + finalOffset;
        break;
      case 'top-center':
        targetPositionTop = elementOffsetTop + finalOffset;
        targetPositionBottom = elementOffsetTop + finalOffset - windowHeight / 2;
        break;
      case 'center-center':
        targetPositionTop = elementOffsetTop + el.offsetHeight / 2 + finalOffset;
        targetPositionBottom = elementOffsetTop + el.offsetHeight / 2 + finalOffset - windowHeight / 2;
        break;
      case 'bottom-center':
        targetPositionTop = elementOffsetBottom + finalOffset;
        targetPositionBottom = elementOffsetBottom + finalOffset - windowHeight / 2;
        break;
      case 'top-top':
        targetPositionTop = elementOffsetTop + finalOffset;
        targetPositionBottom = elementOffsetTop + finalOffset - windowHeight;
        break;
      case 'bottom-top':
        targetPositionTop = elementOffsetBottom + finalOffset;
        targetPositionBottom = elementOffsetBottom + finalOffset - windowHeight;
        break;
      case 'center-top':
        targetPositionTop = elementOffsetTop + el.offsetHeight / 2 + finalOffset;
        targetPositionBottom = elementOffsetTop + el.offsetHeight / 2 + finalOffset - windowHeight;
        break;
      default:
        targetPositionTop = elementOffsetTop + finalOffset;
        targetPositionBottom = elementOffsetTop + finalOffset;
    }

    return {
      top: targetPositionTop,
      bottom: targetPositionBottom
    };
  }

  function shouldAnimate(el, shouldMirror) {
    const windowTop = window.pageYOffset;
    const windowBottom = windowTop + window.innerHeight;
    const positions = getPositionIn(el, settings.offset, settings.anchorPlacement);
    const elementTop = positions.top;
    const elementBottom = positions.bottom;
    const offset = getInlineOption(el, 'offset') || settings.offset;

    if (shouldMirror) {
      return (elementTop <= windowBottom) && (elementBottom >= windowTop);
    }

    return (elementTop <= windowBottom);
  }

  function applyDelayIfNeeded(el) {
    const delay = getInlineOption(el, 'delay') || settings.delay;
    if (delay && parseInt(delay) > 0) {
      el.style.transitionDelay = delay + 'ms';
    }
  }

  function animate(el) {
    el.classList.add('aos-animate');
    applyDelayIfNeeded(el);
  }

  function unanimate(el) {
    el.classList.remove('aos-animate');
    el.style.transitionDelay = '';
  }

  function handleScroll() {
    elements.forEach(function(el, i) {
      const shouldMirror = getInlineOption(el, 'mirror') === 'true' || settings.mirror;
      const once = getInlineOption(el, 'once') === 'true' || settings.once;
      
      if (shouldAnimate(el, shouldMirror)) {
        animate(el);
      } else if (!once && shouldMirror) {
        unanimate(el);
      }
    });
  }

  function prepare(element) {
    const elementOptions = {
      offset: element.getAttribute('data-aos-offset'),
      delay: element.getAttribute('data-aos-delay'),
      duration: element.getAttribute('data-aos-duration'),
      easing: element.getAttribute('data-aos-easing'),
      once: element.getAttribute('data-aos-once'),
      mirror: element.getAttribute('data-aos-mirror'),
      anchorPlacement: element.getAttribute('data-aos-anchor-placement')
    };

    // Apply inline options to element style if they exist
    if (elementOptions.duration) {
      element.style.transitionDuration = elementOptions.duration + 'ms';
    }
    if (elementOptions.easing) {
      element.style.transitionTimingFunction = elementOptions.easing;
    }

    return element;
  }

  function refresh() {
    elements = Array.prototype.slice.call(document.querySelectorAll('[data-aos]'));
    elements = elements.map(prepare);
    handleScroll();
  }

  function refreshHard() {
    elements = Array.prototype.slice.call(document.querySelectorAll('[data-aos]'));
    elements.forEach(function(el) {
      el.classList.remove('aos-animate');
    });
    refresh();
  }

  function disable() {
    elements.forEach(function(el) {
      el.classList.remove('aos-animate');
    });
  }

  function isDisabled() {
    return settings.disable === true || 
           (typeof settings.disable === 'string' && 
            document.documentElement.classList.contains(settings.disable)) ||
           (typeof settings.disable === 'function' && settings.disable());
  }

  function init(customSettings) {
    settings = extend(defaultSettings, customSettings || {});

    if (isDisabled()) {
      return {
        init: function() {},
        refresh: function() {},
        refreshHard: function() {}
      };
    }

    if (!initialized) {
      if (document.readyState === 'complete' || 
          (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
        refresh();
      } else {
        document.addEventListener('DOMContentLoaded', refresh);
      }

      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', refreshHard);
      window.addEventListener('orientationchange', refreshHard);
      
      initialized = true;
    }

    return {
      init: init,
      refresh: refresh,
      refreshHard: refreshHard
    };
  }

  // Export AOS object
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = { init: init };
  } else {
    window.AOS = { init: init };
  }

})();
