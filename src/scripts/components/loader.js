class Loader extends HTMLElement{
    constructor(){
        this.load();
    }

    load(){
        const gsap = window.gsap;
        gsap.from(".clip-top, .clip-bottom", 0.5, {
            delay: 0.5,
            height: "50vh",
            ease: "power4.inOut"
        })
    
        gsap.to(".marquee", 1, {
            delay: 0.35,
            top: "50%",
            ease: "power4.inOut"
        })
    
        gsap.from(".clip-top .marquee, .clip-bottom .marquee", 2, {
            delay: 0.5,
            left: "100%",
            ease: "power4.inOut"
        })
    
        gsap.from(".clip-center .marquee", 2, {
            delay: 0.5,
            left: "-50%",
            ease: "power4.inOut"
        })
    
        gsap.to(".clip-top", 0.5, {
            delay: 2,
            clipPath: "inset(0 0 100% 0)",
            ease: "power4.inOut"
        })
    
        gsap.to(".clip-bottom", 0.5, {
            delay: 2,
            clipPath: "inset(100% 0 0 0)",
            ease: "power4.inOut"
        })
    
        gsap.to(".clip-top .marquee, .clip-bottom .marquee, .clip-center .marquee span", 0.3, {
            delay: 2,
            opacity: 0,
            ease: "power2.inOut"
        })
    
      (function () {
        if (window.NodeList && !NodeList.prototype.forEach) {
          NodeList.prototype.forEach = Array.prototype.forEach;
        }
    
        function removeLastSlash(str) {
          let retStr = str;
          if (str.charAt(str.length - 1) === '/') {
            retStr = str.slice(0, -1);
          }
          return retStr;
        }
    
        function containsExcluded(class_list, excluded_classes) {
          for (let el of class_list) {
            for (let elExcluded of excluded_classes) {
              if (el.includes(elExcluded)) return true;
            }
          }
          return false;
        }
    
        document.addEventListener('DOMContentLoaded', () => {
          const links = document.querySelectorAll('a');
          const preloaderHtml = document.getElementsByClassName('loader')[0];
          const windowLocationPathnameTrim = removeLastSlash(window.location.pathname);
          const domain = '{{shop.domain}}';
          const permanent_domain = '{{shop.permanent_domain}}';
          const excluded_classes = ['js-', 'cart', 'ajax', 'toggle'];
          if (preloaderHtml) {
            links.forEach((link) => {
              const isExcluded = containsExcluded(link.classList, excluded_classes);
              const url = link.getAttribute('href');
              const isNewWindow = link.getAttribute('target');
              const isSameDomain = link.hostname === domain || link.hostname === permanent_domain;
              const linkPathnameTrim = removeLastSlash(link.pathname);
              let navigatingWithinPage = true;
              if (isSameDomain) {
                navigatingWithinPage =
                  url.startsWith('#') ||
                  (linkPathnameTrim === windowLocationPathnameTrim && url.includes(link.pathname + '#'));
              }
              if (!isNewWindow && isSameDomain && !navigatingWithinPage && !isExcluded) {
                link.addEventListener('click', function (event) {
                  event.preventDefault();
                  const url = this.getAttribute('href');
                  preloaderHtml.classList.add('loader--fadeOut');
                  setTimeout(() => (window.location.href = url), 1 * 1000);
                });
              }
            });
          }
        });
    
        window.addEventListener('pageshow', function (event) {
          if (event.persisted) {
            const preloaderHtml = document.getElementsByClassName('loader')[0];
            preloaderHtml.classList.remove('loader--fadeOut');
          }
        });
      })();
    
      window.onload = function () {
        if (localStorage.getItem('loading') === null || localStorage.getItem('loading') != '1') {
          localStorage.setItem('loading', '1');
        }
      };
    }
}

customElements.define("loader", Loader)