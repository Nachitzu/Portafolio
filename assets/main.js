/* Ignacio Núñez — portafolio. Script principal (sin dependencias). */
(function () {
    'use strict';

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Año actual en el footer
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // 2. Menú móvil (accesible: aria-expanded + aria-label dinámico + swap de ícono)
    var menuBtn = document.getElementById('mobile-menu-btn');
    var menu = document.getElementById('mobile-menu');

    function setMenu(open) {
        if (!menu || !menuBtn) return;
        menu.classList.toggle('hidden', !open);
        menuBtn.setAttribute('aria-expanded', String(open));
        menuBtn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
        var use = menuBtn.querySelector('use');
        if (use) use.setAttribute('href', open ? '#ic-times' : '#ic-bars');
    }

    if (menuBtn && menu) {
        menuBtn.addEventListener('click', function () {
            setMenu(menu.classList.contains('hidden'));
        });
        menu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () { setMenu(false); });
        });
    }

    // 3. Barra de progreso de scroll + sombra del nav (throttleado con rAF, listener passive)
    var nav = document.querySelector('nav');
    var scrollProgress = document.getElementById('scroll-progress');
    var scrollTicking = false;

    function onScroll() {
        if (nav) nav.classList.toggle('nav-scrolled', window.scrollY > 10);
        if (scrollProgress) {
            var docHeight = document.documentElement.scrollHeight - window.innerHeight;
            var pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
            scrollProgress.style.width = pct + '%';
        }
        scrollTicking = false;
    }

    window.addEventListener('scroll', function () {
        if (!scrollTicking) {
            scrollTicking = true;
            requestAnimationFrame(onScroll);
        }
    }, { passive: true });
    onScroll();

    // 4. Scroll reveal (IntersectionObserver)
    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(function (el) { revealObserver.observe(el); });

    // 5. Spotlight que sigue el mouse en las tarjetas .cyber-border (throttleado con rAF)
    var spotlightQueued = false;
    var lastMoveEvent = null;

    function applySpotlight() {
        spotlightQueued = false;
        var e = lastMoveEvent;
        if (!e) return;
        var point = document.elementFromPoint(e.clientX, e.clientY);
        if (!point) return;
        var card = point.closest('.cyber-border');
        if (!card) return;
        var rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
        card.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
    }

    if (!prefersReducedMotion) {
        document.addEventListener('mousemove', function (e) {
            lastMoveEvent = e;
            if (!spotlightQueued) {
                spotlightQueued = true;
                requestAnimationFrame(applySpotlight);
            }
        }, { passive: true });
    }

    // 6. Simulador de telemetría SOC (sin innerHTML: nodos construidos a mano)
    var simBtn = document.getElementById('simulate-incident-btn');
    var logsContainer = document.getElementById('terminal-logs');
    var socEvents = [
        { tag: '[SIEM-ALERT]', color: 'text-fuchsia-400', msg: 'Anomalía detectada: PowerShell encoded command (T1059.001).' },
        { tag: '[LANGGRAPH]', color: 'text-cyber-cyan', msg: 'Agente de Triaje correlacionando IoCs con MITRE ATT&CK...' },
        { tag: '[OUROBOROS]', color: 'text-purple-300', msg: 'Payload sanitizado contra Prompt Injection indirecto.' },
        { tag: '[SOAR-HITL]', color: 'text-cyber-accent', msg: 'Playbook listo: Host aislado preventivamente (Aprobado).' }
    ];
    var simIndex = 0;

    if (simBtn && logsContainer) {
        simBtn.addEventListener('click', function () {
            var evt = socEvents[simIndex % socEvents.length];
            simIndex++;
            var line = document.createElement('div');
            line.className = 'text-gray-200' + (prefersReducedMotion ? '' : ' animate-pulse');
            var tag = document.createElement('span');
            tag.className = evt.color + ' font-bold';
            tag.textContent = evt.tag;
            line.appendChild(tag);
            line.appendChild(document.createTextNode(' ' + evt.msg));
            logsContainer.appendChild(line);
            if (!prefersReducedMotion) {
                setTimeout(function () { line.classList.remove('animate-pulse'); }, 800);
            }
            while (logsContainer.children.length > 5) {
                logsContainer.removeChild(logsContainer.firstChild);
            }
        });
    }

    // 7. Copiar email al portapapeles (Clipboard API con fallback)
    var copyEmailBtn = document.getElementById('copy-email-btn');
    var copyEmailText = document.getElementById('copy-email-text');
    var EMAIL = 'inunezm.dev@gmail.com';

    function emailCopied() {
        if (!copyEmailText) return;
        copyEmailText.textContent = '¡Copiado!';
        setTimeout(function () { copyEmailText.textContent = 'Copiar'; }, 2000);
    }

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', function () {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(EMAIL).then(emailCopied, function () { legacyCopy(); });
            } else {
                legacyCopy();
            }
        });
    }

    function legacyCopy() {
        var tempInput = document.createElement('input');
        tempInput.value = EMAIL;
        tempInput.setAttribute('aria-hidden', 'true');
        tempInput.style.position = 'absolute';
        tempInput.style.left = '-9999px';
        document.body.appendChild(tempInput);
        tempInput.select();
        try { document.execCommand('copy'); emailCopied(); } catch (e) { /* sin soporte */ }
        document.body.removeChild(tempInput);
    }

    // 8. Canvas neural de fondo — se pausa con la pestaña oculta y se omite con reduced motion
    var canvas = document.getElementById('cyber-canvas');

    function startCanvas() {
        if (!canvas || prefersReducedMotion) { if (canvas) canvas.style.display = 'none'; return; }
        var ctx = canvas.getContext('2d');
        if (!ctx) return;

        var width, height, particles, rafId = null;
        var mouse = { x: null, y: null, radius: 130 };

        window.addEventListener('mousemove', function (e) {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        }, { passive: true });

        function initCanvas() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            var count = Math.min(Math.floor((width * height) / 18000), 65);
            particles = [];
            for (var i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.45,
                    vy: (Math.random() - 0.5) * 0.45,
                    size: Math.random() * 1.8 + 1,
                    color: Math.random() > 0.5 ? '#a855f7' : '#8b5cf6'
                });
            }
        }

        function animateCanvas() {
            ctx.clearRect(0, 0, width, height);
            for (var i = 0; i < particles.length; i++) {
                var p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();

                for (var j = i + 1; j < particles.length; j++) {
                    var p2 = particles[j];
                    var dx = p.x - p2.x;
                    var dy = p.y - p2.y;
                    var dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 135) {
                        ctx.beginPath();
                        ctx.strokeStyle = 'rgba(168, 85, 247, ' + ((1 - dist / 135) * 0.2) + ')';
                        ctx.lineWidth = 0.8;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }

                if (mouse.x !== null) {
                    var mdx = p.x - mouse.x;
                    var mdy = p.y - mouse.y;
                    var mdist = Math.sqrt(mdx * mdx + mdy * mdy);
                    if (mdist < mouse.radius) {
                        ctx.beginPath();
                        ctx.strokeStyle = 'rgba(217, 70, 239, ' + ((1 - mdist / mouse.radius) * 0.38) + ')';
                        ctx.lineWidth = 1;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }
            rafId = requestAnimationFrame(animateCanvas);
        }

        function stopCanvas() {
            if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
        }

        initCanvas();
        animateCanvas();
        window.addEventListener('resize', initCanvas);
        document.addEventListener('visibilitychange', function () {
            if (document.hidden) stopCanvas();
            else if (rafId === null) animateCanvas();
        });
    }

    if (document.readyState === 'complete') startCanvas();
    else window.addEventListener('load', startCanvas);
})();
