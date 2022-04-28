(function(window) {

  function Flyovers() {
    const _this = this;

    const componentClass = 'flyover';
    const styleClass = `${componentClass}-styles`;
    const DEFAULT_HIDE_AFTER_MS = 5000;

    let stylesContainer = document.head.querySelectorAll(`style.${styleClass}`);

    if (stylesContainer.length === 0) {
      stylesContainer = document.createElement('style');
      stylesContainer.className = styleClass;
      stylesContainer.textContent = `
      .${componentClass}-container {
        position:fixed;
        right: 10px;
        top: 10px;
        width: 320px;
        max-width: 40%;
        z-index:10000;
      }
      .${componentClass}-instance {
        background-color:black;
        color:white;
        padding: 10px 10px 10px 10px;
        font-size: 14px;
        word-break: break-word;
        margin-bottom: 10px;
        border: 1px solid #999;
        border: 1px solid rgba(0,0,0,.2);
        -webkit-border-radius: 6px;
        -moz-border-radius: 6px;
        border-radius: 6px;
        outline: 0;
        -webkit-box-shadow: 0 3px 7px rgba(0,0,0,.2);
        -moz-box-shadow: 0 3px 7px rgba(0,0,0,.2);
        box-shadow: 0 3px 7px rgba(0,0,0,.2);
        -webkit-background-clip: padding-box;
        -moz-background-clip: padding-box;
        background-clip: padding-box;
      }
      .${componentClass}:hover {
        cursor: pointer;
      }
      .${componentClass}-close-button {
        float: right;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        padding-left: 5px;
        padding-right: 5px;
      }
      .${componentClass}-title {
        font-size: 18px;
        font-weight: bold;
        padding-bottom: 10px;
      }
      .${componentClass}-show {
        transition: opacity 800ms;
        -webkit-transition: opacity 800ms;
        opacity: 1;
      }
      .${componentClass}-hide {
        transition: opacity 4000ms;
        -webkit-transition: opacity 4000ms;
        opacity: 0;
      }
    `;
      document.head.append(stylesContainer);
    }

    let flyoversContainer = document.createElement('div');
    flyoversContainer.classList.add(`${componentClass}-container`);

    document.body.appendChild(flyoversContainer);

    function checkContainerVisibility() {
      if (flyoversContainer.querySelectorAll(`.${componentClass}-instance`).length > 0) {
        flyoversContainer.style.display = '';
      } else {
        flyoversContainer.style.display = 'none';
      }
    }

    function scheduleForRemoval(flyoverOverlay) {
      flyoverOverlay.classList.remove(`${componentClass}-show`);
      flyoverOverlay.classList.add(`${componentClass}-hide`);
      flyoverOverlay.addEventListener('mouseenter', function() {
        flyoverOverlay.classList.add(`${componentClass}-show`);
        flyoverOverlay.classList.remove(`${componentClass}-hide`);
      });
      flyoverOverlay.addEventListener('mouseleave', function() {
        flyoverOverlay.classList.remove(`${componentClass}-show`);
        flyoverOverlay.classList.add(`${componentClass}-hide`);
      });
      let interval = window.setInterval(function() {
        if (window.getComputedStyle(flyoverOverlay).getPropertyValue('opacity') < 0.250) {
          flyoverOverlay.remove();
          checkContainerVisibility();
          window.clearInterval(interval);
        }
      }, 100);
    }

    function createFlyoverOverlay(title, content, settings, overrides) {
      if (content) {
        if (typeof content != 'string') {
          settings = content;
          content = title;
          title = '';
        }
      } else {
        content = title;
        title = '';
      }
      if (!overrides) {
        overrides = {};
      }
      const params = Object.assign({
        bgColor: '#fff',
        fgColor: '#000',
        permanent: false,
        timeout: DEFAULT_HIDE_AFTER_MS,
        beautify: function() {
        //
        }
      }, Object.assign(overrides, settings));

      let flyoverOverlay = document.createElement('div');

      flyoverOverlay.classList.add(`${componentClass}-instance`);
      flyoverOverlay.classList.add(`${componentClass}-hide`);
      flyoverOverlay.style.color = params.fgColor;
      flyoverOverlay.style.backgroundColor = params.bgColor;

      params.beautify(flyoverOverlay);

      flyoversContainer.appendChild(flyoverOverlay);

      checkContainerVisibility();

      let text = `<div class="${componentClass}-close-button">&times;</div>`;
      if (title) {
        text += `<div class="${componentClass}-title">${title}</div>`;
      }
      text += `<div class="${componentClass}-content">${content}</div>`;

      flyoverOverlay.innerHTML = text;

      flyoverOverlay.querySelector(`.${componentClass}-close-button`).addEventListener('click', function() {
        flyoverOverlay.remove();
        checkContainerVisibility();
      });

      window.setTimeout(function() {
        flyoverOverlay.classList.add(`${componentClass}-show`);
        flyoverOverlay.classList.remove(`${componentClass}-hide`);

        if (!params.permanent) {
          window.setTimeout(function() {
            scheduleForRemoval(flyoverOverlay)
          }, params.timeout);
        }
      })

      return this;
    }

    _this.showMessage = function(title, content, settings) {
      return createFlyoverOverlay(title, content, settings);
    };

    _this.showSuccess = function(title, content, settings) {
      return createFlyoverOverlay(title, content, settings, {
        fgColor: '#fff',
        bgColor: '#198754',
      });
    };

    _this.showError = function(title, content, settings) {
      return createFlyoverOverlay(title, content, settings, {
        fgColor: '#fff',
        bgColor: '#dc3545',
      });
    };

    _this.showWarning = function(title, content, settings) {
      return createFlyoverOverlay(title, content, settings, {
        fgColor: '#000',
        bgColor: '#ffc107',
      });
    };

    _this.showInfo = function(title, content, settings) {
      return createFlyoverOverlay(title, content, settings, {
        fgColor: '#000',
        bgColor: '#0dcaf0',
      });
    };

    return _this;
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = Flyovers; else window.Flyovers = Flyovers;

})(window);
