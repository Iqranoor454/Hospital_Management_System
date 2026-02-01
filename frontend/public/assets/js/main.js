document.addEventListener("DOMContentLoaded", function () {

  (function() {
    "use strict";

    function toggleScrolled() {
      const selectBody = document.querySelector('body');
      const selectHeader = document.querySelector('#header');
      if (!selectHeader) return; // 🔥 prevents null error
      if (!selectHeader.classList.contains('scroll-up-sticky') && 
          !selectHeader.classList.contains('sticky-top') && 
          !selectHeader.classList.contains('fixed-top')) return;

      window.scrollY > 100 
        ? selectBody.classList.add('scrolled') 
        : selectBody.classList.remove('scrolled');
    }

    document.addEventListener('scroll', toggleScrolled);
    window.addEventListener('load', toggleScrolled);

    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

    if (mobileNavToggleBtn) {   // 🔥 prevents null crash
      function mobileNavToogle() {
        document.querySelector('body').classList.toggle('mobile-nav-active');
        mobileNavToggleBtn.classList.toggle('bi-list');
        mobileNavToggleBtn.classList.toggle('bi-x');
      }
      mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
    }

    document.querySelectorAll('#navmenu a').forEach(navmenu => {
      navmenu.addEventListener('click', () => {
        if (document.querySelector('.mobile-nav-active')) {
          mobileNavToggle();
        }
      });
    });

    document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
      navmenu.addEventListener('click', function(e) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      });
    });

    const preloader = document.querySelector('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        preloader.remove();
      });
    }

    let scrollTop = document.querySelector('.scroll-top');

    function toggleScrollTop() {
      if (scrollTop) {
        window.scrollY > 100 
          ? scrollTop.classList.add('active') 
          : scrollTop.classList.remove('active');
      }
    }

    if (scrollTop) {
      scrollTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);

    function aosInit() {
      if (typeof AOS !== "undefined") {
        AOS.init({
          duration: 600,
          easing: 'ease-in-out',
          once: true,
          mirror: false
        });
      }
    }
    window.addEventListener('load', aosInit);

    if (typeof GLightbox !== "undefined") {
      const glightbox = GLightbox({
        selector: '.glightbox'
      });
    }

    if (typeof PureCounter !== "undefined") {
      new PureCounter();
    }

    document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
      faqItem.addEventListener('click', () => {
        faqItem.parentNode.classList.toggle('faq-active');
      });
    });

    function initSwiper() {
      if (typeof Swiper === "undefined") return;

      document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
        const config = JSON.parse(
          swiperElement.querySelector(".swiper-config").innerHTML.trim()
        );

        new Swiper(swiperElement, config);
      });
    }

    window.addEventListener("load", initSwiper);

    window.addEventListener('load', function(e) {
      if (window.location.hash) {
        const section = document.querySelector(window.location.hash);
        if (section) {
          setTimeout(() => {
            let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
            window.scrollTo({
              top: section.offsetTop - parseInt(scrollMarginTop),
              behavior: 'smooth'
            });
          }, 100);
        }
      }
    });

    let navmenulinks = document.querySelectorAll('.navmenu a');

    function navmenuScrollspy() {
      navmenulinks.forEach(navmenulink => {
        if (!navmenulink.hash) return;

        let section = document.querySelector(navmenulink.hash);
        if (!section) return;

        let position = window.scrollY + 200;
        if (position >= section.offsetTop &&
            position <= (section.offsetTop + section.offsetHeight)) {

          document.querySelectorAll('.navmenu a.active')
            .forEach(link => link.classList.remove('active'));

          navmenulink.classList.add('active');
        } else {
          navmenulink.classList.remove('active');
        }
      })
    }

    window.addEventListener('load', navmenuScrollspy);
    document.addEventListener('scroll', navmenuScrollspy);

  })();

});
