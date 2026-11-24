/* Ignacio Núñez — portafolio. Interacciones sin dependencias. */
(function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var $ = function (sel, root) { return (root || document).querySelector(sel); };
    var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
    var lang = function () { return window.i18n ? window.i18n.lang() : 'es'; };
    var t = function (key, fallback) {
        var v = window.i18n ? window.i18n.t(key) : null;
        return v == null ? fallback : v;
    };

    /* 1. Año del footer */
    var yearEl = $('#year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* 2. Menú móvil */
    var menuBtn = $('#mobile-menu-btn');
    var mobile = $('#mobile-menu');
    var desktopQuery = window.matchMedia('(min-width: 981px)');

    function setMenu(open) {
        if (!menuBtn || !mobile) return;
        mobile.hidden = !open;
        menuBtn.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
        var use = menuBtn.querySelector('use');
        if (use) use.setAttribute('href', open ? '#i-close' : '#i-menu');
        menuBtn.setAttribute('aria-label', t(open ? 'menu.close' : 'menu.open', open ? 'Cerrar menú' : 'Abrir menú'));
    }

    if (menuBtn && mobile) {
        menuBtn.addEventListener('click', function () {
            setMenu(mobile.hidden);
        });
        $$('a', mobile).forEach(function (link) {
            link.addEventListener('click', function () { setMenu(false); });
        });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && !mobile.hidden) {
                setMenu(false);
                menuBtn.focus();
            }
        });
        var onBreakpoint = function (event) { if (event.matches) setMenu(false); };
        if (desktopQuery.addEventListener) desktopQuery.addEventListener('change', onBreakpoint);
        else if (desktopQuery.addListener) desktopQuery.addListener(onBreakpoint);
    }

    /* 3. Progreso de lectura y borde del nav */
    var nav = $('#nav');
    var progress = $('#scroll-progress');
    var ticking = false;

    function onScroll() {
        ticking = false;
        if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 8);
        if (progress) {
            var max = document.documentElement.scrollHeight - window.innerHeight;
            progress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
        }
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            ticking = true;
            window.requestAnimationFrame(onScroll);
        }
    }, { passive: true });
    onScroll();

    /* 4. Aparición al hacer scroll */
    var revealItems = $$('.reveal');
    if ('IntersectionObserver' in window && !reduceMotion) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
        revealItems.forEach(function (el) { revealObserver.observe(el); });
    } else {
        revealItems.forEach(function (el) { el.classList.add('is-in'); });
    }

    /* 5. Sección activa en la navegación */
    var navLinks = $$('.nav__links a[data-nav]');
    var sections = navLinks.map(function (link) { return document.getElementById(link.getAttribute('data-nav')); }).filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
        var spy = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                navLinks.forEach(function (link) {
                    link.classList.toggle('is-active', link.getAttribute('data-nav') === entry.target.id);
                });
            });
        }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
        sections.forEach(function (section) { spy.observe(section); });
    }

    /* 6. Simulador de triaje SOC */
    var simBtn = $('#simulate-incident-btn');
    var logs = $('#terminal-logs');
    var alertEl = $('#alert-count');
    var threatEl = $('#threat-score');
    var consoleEl = simBtn && simBtn.closest ? simBtn.closest('.console') : null;
    var state = { alerts: 142, escalated: 1, score: 2 };

    function pad2(n) { return (n < 10 ? '0' : '') + n; }

    /* Uptime del nodo: el reloj del dossier — siempre corriendo */
    var uptimeEl = $('#console-uptime');
    if (uptimeEl) {
        var uptimeBase = 41 * 86400 + 7 * 3600 + 12 * 60 + 6;
        var uptimeT0 = Date.now();
        var tickUptime = function () {
            var s = uptimeBase + Math.floor((Date.now() - uptimeT0) / 1000);
            var d = Math.floor(s / 86400); s -= d * 86400;
            uptimeEl.textContent = 'UP ' + d + 'd ' + pad2(Math.floor(s / 3600)) + ':' + pad2(Math.floor((s % 3600) / 60)) + ':' + pad2(s % 60);
        };
        tickUptime();
        window.setInterval(tickUptime, 1000);
    }

    /* Sellos de tiempo de telemetría */
    var staticTimes = null;
    function stampLine(line, when) {
        var s = document.createElement('span');
        s.className = 'log-stamp';
        s.setAttribute('aria-hidden', 'true');
        s.textContent = pad2(when.getHours()) + ':' + pad2(when.getMinutes()) + ':' + pad2(when.getSeconds());
        line.insertBefore(s, line.firstChild);
    }

    function stampStaticLines() {
        if (!logs) return;
        var statics = $$('.console__log > div:not(.log-line)', logs);
        if (!staticTimes) {
            staticTimes = statics.map(function (line, i) {
                return new Date(Date.now() - (statics.length - i) * 47000 - 9000);
            });
        }
        statics.forEach(function (line, i) {
            var old = line.querySelector('.log-stamp');
            if (old) old.remove();
            stampLine(line, staticTimes[i] || new Date());
        });
    }

    function renderMetrics() {
        if (alertEl) alertEl.textContent = state.alerts + ' → ' + state.escalated;
        if (threatEl) {
            var label = state.score > 0 ? (lang() === 'es' ? 'Bajo' : 'Low') : (lang() === 'es' ? 'Nulo' : 'None');
            threatEl.textContent = '0.0' + state.score + ' · ' + label;
        }
    }

    var events = [
        { tag: '[SIEM-ALERT]', cls: 'log-tag--hot', key: 'sim.e1' },
        { tag: '[LANGGRAPH]', cls: '', key: 'sim.e2' },
        { tag: '[OUROBOROS]', cls: 'log-tag--dim', key: 'sim.e3' },
        { tag: '[SOAR-HITL]', cls: 'log-tag--hot', key: 'sim.e4' }
    ];
    var simIndex = 0;
    var dynamicKeys = [];

    function renderLog() {
        if (!logs) return;
        $$('.log-line', logs).forEach(function (line) { line.remove(); });
        dynamicKeys.forEach(function (evt) {
            logs.appendChild(buildLine(evt));
        });
        logs.scrollTop = logs.scrollHeight;
    }

    function buildLine(evt) {
        var line = document.createElement('div');
        line.className = 'log-line';
        if (reduceMotion) line.style.animation = 'none';
        var tag = document.createElement('b');
        tag.className = 'log-tag ' + evt.cls;
        tag.textContent = evt.tag;
        line.appendChild(tag);
        line.appendChild(document.createTextNode(' ' + t(evt.key, '')));
        stampLine(line, new Date());
        return line;
    }

    var alarmTimer = null;
    if (simBtn && logs) {
        simBtn.addEventListener('click', function () {
            var evt = events[simIndex % events.length];
            simIndex += 1;
            state.alerts += 7;
            if (simIndex % 2 === 0) state.escalated += 1;
            state.score = state.score > 0 ? state.score - 1 : 0;

            dynamicKeys.push(evt);
            logs.appendChild(buildLine(evt));
            if (dynamicKeys.length > 4) {
                dynamicKeys.shift();
                var oldest = logs.querySelector('.log-line');
                if (oldest) oldest.remove();
            }
            logs.scrollTop = logs.scrollHeight;
            renderMetrics();

            if (consoleEl && !reduceMotion) {
                consoleEl.classList.add('is-alarm');
                if (alarmTimer) window.clearTimeout(alarmTimer);
                alarmTimer = window.setTimeout(function () {
                    consoleEl.classList.remove('is-alarm');
                }, 2600);
            }
        });
    }

    renderMetrics();
    stampStaticLines();
    document.addEventListener('langchange', function () {
        renderMetrics();
        renderLog();
        stampStaticLines();
    });

    /* 7. Copiar correo */
    var EMAIL = 'inunezm.dev@gmail.com';
    var copyBtn = $('#copy-email-btn');
    var copyText = $('#copy-email-text');

    function copied() {
        if (!copyBtn) return;
        copyBtn.classList.add('is-done');
        if (copyText) copyText.textContent = t('copy.copied', '¡Copiado!');
        window.setTimeout(function () {
            copyBtn.classList.remove('is-done');
            if (copyText) copyText.textContent = t('copy.copy', 'Copiar');
        }, 2200);
    }

    function legacyCopy() {
        var input = document.createElement('input');
        input.value = EMAIL;
        input.setAttribute('aria-hidden', 'true');
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.select();
        try { document.execCommand('copy'); copied(); } catch (e) { /* sin soporte */ }
        document.body.removeChild(input);
    }

    if (copyBtn) {
        copyBtn.addEventListener('click', function () {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(EMAIL).then(copied, legacyCopy);
            } else {
                legacyCopy();
            }
        });
    }

    /* 8. Captura de Cyberdiag */
    var modal = $('#cyberdiag-modal');
    var modalClose = $('#cyberdiag-modal-close');
    var shotBtn = $('#cyberdiag-image-btn');
    var openBtn = $('#cyberdiag-open-btn');
    var lastFocus = null;

    function setModal(open) {
        if (!modal) return;
        modal.hidden = !open;
        document.body.style.overflow = open ? 'hidden' : '';
        if (open) {
            lastFocus = document.activeElement;
            if (modalClose) modalClose.focus();
        } else if (lastFocus && lastFocus.focus) {
            lastFocus.focus();
        }
    }

    if (modal) {
        [shotBtn, openBtn].forEach(function (btn) {
            if (btn) btn.addEventListener('click', function () { setModal(true); });
        });
        if (modalClose) modalClose.addEventListener('click', function () { setModal(false); });
        modal.addEventListener('click', function (event) {
            if (event.target === modal) setModal(false);
        });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && !modal.hidden) setModal(false);
        });
    }
})();
