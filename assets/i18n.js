/* Ignacio Núñez — portafolio. i18n ES/EN: detección del idioma del navegador,
   persistencia en localStorage, toggle manual, metadatos y título. */
(function () {
    'use strict';

    var DICT = {
        es: {
            'skip': 'Saltar al contenido',
            'nav.aria': 'Principal',
            'nav.about': 'Perfil',
            'nav.experience': 'Trayectoria',
            'nav.projects': 'Trabajo',
            'nav.skills': 'Capacidades',
            'nav.contact': 'Contacto',
            'menu.open': 'Abrir menú',
            'menu.close': 'Cerrar menú',

            'hero.role': 'Ingeniero Informático · Seguridad en IA',
            'hero.lead': 'Construyo la capa defensiva que vigila, triagea y responde: agentes de IA para operaciones de seguridad.',
            'hero.bio': 'Ingeniería Informática en la PUCV. Trabajo en la intersección entre LLMs y Blue Team —seguridad ofensiva de modelos, SOC agéntico con Human-in-the-Loop y plataformas GRC— con arquitectura hexagonal y código auditable.',
            'hero.ev1k': 'Reconocimiento',
            'hero.ev1v': '1.er lugar · CTF Cybersummit 2025',
            'hero.ev2k': 'Certificación',
            'hero.ev2v': 'CompTIA Security+ SY0-701',
            'hero.ev3k': 'Marcos',
            'hero.ev3v': 'MITRE ATT&amp;CK · ATLAS',
            'hero.ctaProjects': 'Ver trabajo',
            'hero.cv': 'Solicitar currículum',
            'hero.cvAria': 'Solicitar información y currículum por correo',
            'hero.github': 'GitHub',
            'hero.live': 'En línea',
            'hero.guardrails': 'Guardrails',
            'hero.guardrailsValue': 'Activo',
            'hero.threatLabel': 'Riesgo',
            'hero.threatValue': '0.02 · Bajo',
            'hero.alertsLabel': 'Alertas',
            'hero.alertsValue': '142 → 1',
            'hero.simLabel': 'Simulador de defensa',
            'hero.simBtn': 'Simular triaje',
            'term.log1': '// Telemetría Blue Team · agentes activos',
            'term.log2': '<b class="log-tag log-tag--hot">[OUROBOROS]</b> Escaneo AML.T0051 completado · 0 fugas.',
            'term.log3': '<b class="log-tag">[SOC-AGENT]</b> 142 alertas SIEM → 1 incidente escalado (HITL).',
            'term.log4': '<b class="log-tag log-tag--dim">[CYBERDIAG]</b> Superficie EASM verificada vía Shodan API.',
            'term.log5': '<b class="log-tag">[ATT&amp;CK]</b> 14 IoCs mapeados a T1059 · T1071 · T1566 → cola SOAR.',

            'about.title': 'Perfil',
            'about.portraitAlt': 'Retrato de Ignacio Núñez con traje formal frente al sello de la PUCV',
            'about.caption': 'Ignacio Núñez · Ingeniero Informático PUCV',
            'about.statement': 'Ingeniería informática aplicada a que los sistemas se defiendan solos.',
            'about.p1': 'Me formé como Ingeniero Informático en la PUCV y hoy trabajo donde la seguridad se encuentra con la IA: agentes que leen telemetría, clasifican amenazas y dejan la decisión final a una persona.',
            'about.p2': 'Defiendo el código limpio, la arquitectura hexagonal y el open source con licencias permisivas. En mi tiempo libre: mixología, boxing y Valheim.',
            'about.k1': 'Formación',
            'about.v1': 'Ingeniería Informática · PUCV',
            'about.k2': 'Enfoque',
            'about.v2': 'Seguridad en IA · Blue Team · GRC',
            'about.k3': 'Reconocimiento',
            'about.v3': '1.er lugar · CTF Cybersummit 2025',
            'about.k4': 'Práctica',
            'about.v4': 'Arquitectura hexagonal · MIT / Apache 2.0',
            'about.k5': 'Fuera del teclado',
            'about.v5': 'Mixología · boxing · Valheim',

            'exp.title': 'Trayectoria',
            'exp1.role': 'Responsable Técnico (Tech Lead / CIO) &amp; Desarrollador Fullstack',
            'exp1.dates': 'Jun 2025 — Presente',
            'exp1.tag': 'Tech Lead · SecOps',
            'exp1.org': 'Conexiones para el Bienestar SpA',
            'exp1.link': 'conectaterapeuta.cl',
            'exp1.siteAria': 'Sitio web de Conectaterapeuta',
            'exp1.b1': '<strong>Desarrollo end-to-end</strong> de la plataforma web: arquitectura, backend y frontend, con foco en disponibilidad y escalabilidad.',
            'exp1.b2': '<strong>Servidor y cloud:</strong> aprovisionamiento del Linux de producción, dominios, DNS y monitoreo continuo.',
            'exp1.b3': '<strong>Seguridad y hardening:</strong> bastionado, gestión de parches, auditorías periódicas y resolución de vulnerabilidades.',
            'exp1.b4': '<strong>Infraestructura:</strong> ciclo de vida operativo, despliegues continuos y resguardo de datos sensibles.',
            'exp2.role': 'Desarrollador de Software — Beca de Ayudantía',
            'exp2.dates': 'Dic 2025 — Feb 2026',
            'exp2.tag': 'GRC · EASM',
            'exp2.org': 'Pontificia Universidad Católica de Valparaíso',
            'exp2.b1': '<strong>Cyberdiag:</strong> plataforma web de ciberseguridad empresarial con Node.js, SQL, REST APIs y JavaScript.',
            'exp2.b2': '<strong>EASM:</strong> detección de superficie de ataque externa vía API de Shodan, sin agentes instalados.',
            'exp2.b3': '<strong>Motor GRC:</strong> madurez normativa contra Leyes 21.719, 21.663, 21.459 y 21.180, ISO/IEC 27001 y NIST CSF 2.0.',
            'exp2.b4': '<strong>CRQ:</strong> brechas técnicas traducidas a multas estimadas (UTM) y pérdida operacional.',
            'exp2.b5': '<strong>Reportes:</strong> PDF ejecutivo para directorio y CSV para equipos de TI.',
            'exp3.role': 'Unidad de Soporte Computacional',
            'exp3.dates': 'Ene 2025',
            'exp3.tag': 'Automatización · Soporte',
            'exp3.org': 'Tesorería General de la República',
            'exp3.b1': 'Herramienta Python con interfaz gráfica para automatizar la instalación de software institucional.',
            'exp3.b2': 'Soporte a la unidad de ciberseguridad con FortiNet.',
            'exp3.b3': 'Script Bash para configurar equipos nuevos, reduciendo el tiempo de preparación manual.',
            'exp4.role': 'Apoyo Informático',
            'exp4.dates': 'Oct 2023 — Nov 2023',
            'exp4.tag': 'Soporte TI',
            'exp4.org': 'DSIC · Pontificia Universidad Católica de Valparaíso',
            'exp4.b1': 'Programa para conteo y levantamiento de datos de hardware en equipos institucionales.',

            'proj.title': 'Trabajo seleccionado',
            'proj.subtitle': 'Cinco sistemas entre producción, investigación y repositorio abierto.',
            'proj.t1': 'Fig. 01 · Red teaming de LLMs',
            'proj.t2': 'Fig. 02 · SOC agéntico',
            'proj.t3': 'Fig. 03 · Privacidad y forense',
            'proj.t4': 'Fig. 04 · GRC y EASM',
            'proj.t5': 'Fig. 05 · Plataforma de teleterapia',
            'proj.p1': 'Framework de pruebas adversarias para modelos de lenguaje: inyección de prompts, jailbreaks y extracción de datos, mapeado a MITRE ATLAS (AML.T0051).',
            'proj.p2': 'Triaje Human-in-the-Loop, extracción de IoCs hacia ATT&amp;CK y orquestación SOAR para respuesta dinámica a incidentes.',
            'proj.p3': 'Aprendizaje federado con privacidad diferencial, tolerancia a fallos bizantinos y auditoría inmutable en blockchain. Proyecto de título.',
            'proj.p4': 'Plataforma en producción para auditar madurez normativa contra evidencia técnica (ISO/IEC 27001, NIST CSF 2.0) y cuantificar el riesgo en UTM.',
            'proj.p5': 'Plataforma de agendamiento de terapias en producción: desarrollo end-to-end —arquitectura, backend y frontend— sobre servidor propio, con pagos y videollamadas integradas.',
            'proj.ctAlt': 'Portada de la plataforma Conectaterapeuta',
            'proj.repo': 'Repositorio',
            'proj.thesis': 'Tesis de Ingeniería',
            'proj.shot': 'Ampliar captura',

            'skills.title': 'Capacidades',
            'skills.languages': 'Lenguajes',
            'skills.ai': 'IA y agentes',
            'skills.security': 'Seguridad e infraestructura',
            'skills.practice': 'Prácticas',
            'skills.certifications': 'Certificaciones',
            'skills.forensics': 'Informática forense',
            'cert.view': 'Ver credencial',
            'cert.credAria': 'Ver credencial verificada en Credly o Credsverse',
            'cert.badgeAlt': 'Badge digital CompTIA Security+ (SY0-701)',
            'cert.ccna.credAria': 'Ver credencial verificada de CCNA: Introduction to Networks en Credly',
            'cert.ccna.badgeAlt': 'Badge digital CCNA: Introduction to Networks',
            'cert.ccna.dates': 'Dic 2023',
            'cert.security.dates': 'Sept 2026 → Sept 2029',
            'cert.forensics.title': 'Peritaje e Informática Forense',
            'cert.forensics.dates': 'Abr 2026',
            'cert.ethical.title': 'Ciberseguridad &amp; Ethical Hacking',
            'cert.ethical.dates': 'Oct 2025',

            'contact.title': '¿Conectamos<span class="dot-ink">?</span>',
            'contact.bio': 'Estoy abierto a conversaciones sobre arquitectura de agentes, seguridad de LLMs, operaciones Blue Team y desarrollo seguro. Escríbeme y respondo.',
            'contact.status': 'Abierto a conversaciones · Chile / remoto',
            'contact.mailAria': 'Enviar correo a Ignacio Núñez',
            'contact.cvAria': 'Solicitar información y currículum por correo',
            'copy.copy': 'Copiar',
            'copy.copied': '¡Copiado!',
            'footer.built': 'Construido con estándares abiertos.',
            'footer.stack': 'Sitio estático · sin frameworks en el cliente.',

            'sim.e1': 'Anomalía detectada: comando PowerShell codificado (T1059.001).',
            'sim.e2': 'Agente de triaje correlacionando IoCs con MITRE ATT&CK...',
            'sim.e3': 'Payload sanitizado contra prompt injection indirecto.',
            'sim.e4': 'Playbook listo: host aislado preventivamente (aprobado).',

            'meta.title': 'Ignacio Núñez | AI Security Engineer',
            'meta.description': 'Portafolio de Ignacio Núñez: Ingeniero Informático (PUCV) e Ingeniero de Seguridad en IA. Agentes autónomos para SOC (Blue Team), red teaming de LLMs, GRC, arquitectura hexagonal y código limpio.'
        },

        en: {
            'skip': 'Skip to content',
            'nav.aria': 'Main',
            'nav.about': 'Profile',
            'nav.experience': 'Experience',
            'nav.projects': 'Work',
            'nav.skills': 'Capabilities',
            'nav.contact': 'Contact',
            'menu.open': 'Open menu',
            'menu.close': 'Close menu',

            'hero.role': 'Computer Engineer · AI Security Engineer',
            'hero.lead': 'I build the defensive layer that watches, triages and responds: AI agents for security operations.',
            'hero.bio': 'Computer Engineering at PUCV. I work where LLMs meet the Blue Team — model red teaming, agentic SOC with Human-in-the-Loop and GRC platforms — with hexagonal architecture and auditable code.',
            'hero.ev1k': 'Recognition',
            'hero.ev1v': '1st place · CTF Cybersummit 2025',
            'hero.ev2k': 'Certification',
            'hero.ev2v': 'CompTIA Security+ SY0-701',
            'hero.ev3k': 'Frameworks',
            'hero.ev3v': 'MITRE ATT&amp;CK · ATLAS',
            'hero.ctaProjects': 'View work',
            'hero.cv': 'Request résumé',
            'hero.cvAria': 'Request information and résumé by email',
            'hero.github': 'GitHub',
            'hero.live': 'Online',
            'hero.guardrails': 'Guardrails',
            'hero.guardrailsValue': 'Active',
            'hero.threatLabel': 'Threat',
            'hero.threatValue': '0.02 · Low',
            'hero.alertsLabel': 'Alerts',
            'hero.alertsValue': '142 → 1',
            'hero.simLabel': 'Defense simulator',
            'hero.simBtn': 'Run triage',
            'term.log1': '// Blue Team telemetry · agents online',
            'term.log2': '<b class="log-tag log-tag--hot">[OUROBOROS]</b> AML.T0051 scan complete · 0 leaks.',
            'term.log3': '<b class="log-tag">[SOC-AGENT]</b> 142 SIEM alerts → 1 incident escalated (HITL).',
            'term.log4': '<b class="log-tag log-tag--dim">[CYBERDIAG]</b> EASM surface verified via Shodan API.',
            'term.log5': '<b class="log-tag">[ATT&amp;CK]</b> 14 IoCs mapped to T1059 · T1071 · T1566 → SOAR queue.',

            'about.title': 'Profile',
            'about.portraitAlt': 'Portrait of Ignacio Núñez in a formal suit in front of the PUCV seal',
            'about.caption': 'Ignacio Núñez · Computer Engineer, PUCV',
            'about.statement': 'Computer engineering applied to making systems defend themselves.',
            'about.p1': 'I trained as a Computer Engineer at PUCV and now work where security meets AI: agents that read telemetry, classify threats and leave the final call to a human.',
            'about.p2': 'I stand for clean code, hexagonal architecture and permissive open source. Off the clock: mixology, boxing and Valheim.',
            'about.k1': 'Education',
            'about.v1': 'Computer Engineering · PUCV',
            'about.k2': 'Focus',
            'about.v2': 'AI security · Blue Team · GRC',
            'about.k3': 'Recognition',
            'about.v3': '1st place · CTF Cybersummit 2025',
            'about.k4': 'Practice',
            'about.v4': 'Hexagonal architecture · MIT / Apache 2.0',
            'about.k5': 'Off the clock',
            'about.v5': 'Mixology · boxing · Valheim',

            'exp.title': 'Experience',
            'exp1.role': 'Technical Lead (Tech Lead / CIO) &amp; Fullstack Developer',
            'exp1.dates': 'Jun 2025 — Present',
            'exp1.tag': 'Tech Lead · SecOps',
            'exp1.org': 'Conexiones para el Bienestar SpA',
            'exp1.link': 'conectaterapeuta.cl',
            'exp1.siteAria': 'Conectaterapeuta website',
            'exp1.b1': '<strong>End-to-end development</strong> of the web platform: architecture, backend and frontend, focused on availability and scalability.',
            'exp1.b2': '<strong>Server and cloud:</strong> provisioning of the production Linux host, domains, DNS and continuous monitoring.',
            'exp1.b3': '<strong>Security and hardening:</strong> bastioning, patch management, periodic audits and vulnerability remediation.',
            'exp1.b4': '<strong>Infrastructure:</strong> operational lifecycle, continuous deployments and protection of sensitive data.',
            'exp2.role': 'Software Developer — Teaching Assistant Fellowship',
            'exp2.dates': 'Dec 2025 — Feb 2026',
            'exp2.tag': 'GRC · EASM',
            'exp2.org': 'Pontificia Universidad Católica de Valparaíso',
            'exp2.b1': '<strong>Cyberdiag:</strong> enterprise cybersecurity web platform built with Node.js, SQL, REST APIs and JavaScript.',
            'exp2.b2': '<strong>EASM:</strong> external attack surface detection via the Shodan API, with no installed agents.',
            'exp2.b3': '<strong>GRC engine:</strong> regulatory maturity against Chilean Laws 21.719, 21.663, 21.459 and 21.180, ISO/IEC 27001 and NIST CSF 2.0.',
            'exp2.b4': '<strong>CRQ:</strong> technical gaps translated into estimated fines (UTM) and operational loss.',
            'exp2.b5': '<strong>Reports:</strong> executive PDF for the board and CSV for IT teams.',
            'exp3.role': 'Computational Support Unit',
            'exp3.dates': 'Jan 2025',
            'exp3.tag': 'Automation · Support',
            'exp3.org': 'Tesorería General de la República',
            'exp3.b1': 'Python tool with a graphical interface to automate institutional software installation.',
            'exp3.b2': 'Support to the cybersecurity unit with FortiNet.',
            'exp3.b3': 'Bash script to configure new machines, cutting manual setup time.',
            'exp4.role': 'IT Support',
            'exp4.dates': 'Oct 2023 — Nov 2023',
            'exp4.tag': 'IT Support',
            'exp4.org': 'DSIC · Pontificia Universidad Católica de Valparaíso',
            'exp4.b1': 'Program for counting and collecting hardware data on institutional machines.',

            'proj.title': 'Selected work',
            'proj.subtitle': 'Five systems across production, research and open repositories.',
            'proj.t1': 'Fig. 01 · LLM red teaming',
            'proj.t2': 'Fig. 02 · Agentic SOC',
            'proj.t3': 'Fig. 03 · Privacy &amp; forensics',
            'proj.t4': 'Fig. 04 · GRC &amp; EASM',
            'proj.t5': 'Fig. 05 · Teletherapy platform',
            'proj.p1': 'Adversarial testing framework for language models: prompt injection, jailbreaks and data extraction, mapped to MITRE ATLAS (AML.T0051).',
            'proj.p2': 'Human-in-the-Loop triage, IoC extraction into ATT&amp;CK and SOAR orchestration for dynamic incident response.',
            'proj.p3': 'Federated learning with differential privacy, Byzantine fault tolerance and blockchain-based immutable auditing. Engineering thesis.',
            'proj.p4': 'Production platform that audits regulatory maturity against technical evidence (ISO/IEC 27001, NIST CSF 2.0) and quantifies risk in UTM.',
            'proj.p5': 'Therapy-scheduling platform in production: end-to-end development —architecture, backend and frontend— on a self-managed server with integrated payments and video calls.',
            'proj.ctAlt': 'Conectaterapeuta platform homepage',
            'proj.repo': 'Repository',
            'proj.thesis': 'Engineering thesis',
            'proj.shot': 'Enlarge screenshot',

            'skills.title': 'Capabilities',
            'skills.languages': 'Languages',
            'skills.ai': 'AI &amp; agents',
            'skills.security': 'Security &amp; infrastructure',
            'skills.practice': 'Practices',
            'skills.certifications': 'Certifications',
            'skills.forensics': 'Digital forensics',
            'cert.view': 'View credential',
            'cert.credAria': 'View verified credential on Credly or Credsverse',
            'cert.badgeAlt': 'CompTIA Security+ (SY0-701) digital badge',
            'cert.ccna.credAria': 'View verified CCNA: Introduction to Networks credential on Credly',
            'cert.ccna.badgeAlt': 'CCNA: Introduction to Networks digital badge',
            'cert.ccna.dates': 'Dec 2023',
            'cert.security.dates': 'Sep 2026 → Sep 2029',
            'cert.forensics.title': 'Expert Witnessing &amp; Digital Forensics',
            'cert.forensics.dates': 'Apr 2026',
            'cert.ethical.title': 'Cybersecurity &amp; Ethical Hacking',
            'cert.ethical.dates': 'Oct 2025',

            'contact.title': 'Let’s connect<span class="dot-ink">.</span>',
            'contact.bio': 'Open to conversations about agent architecture, LLM security, Blue Team operations and secure development. Write to me and I will answer.',
            'contact.status': 'Open to conversations · Chile / remote',
            'contact.mailAria': 'Send an email to Ignacio Núñez',
            'contact.cvAria': 'Request information and résumé by email',
            'copy.copy': 'Copy',
            'copy.copied': 'Copied!',
            'footer.built': 'Built with open standards.',
            'footer.stack': 'Static site · no client-side frameworks.',

            'sim.e1': 'Anomaly detected: encoded PowerShell command (T1059.001).',
            'sim.e2': 'Triage agent correlating IoCs with MITRE ATT&CK...',
            'sim.e3': 'Payload sanitized against indirect prompt injection.',
            'sim.e4': 'Playbook ready: host preventively isolated (approved).',

            'meta.title': 'Ignacio Núñez | AI Security Engineer',
            'meta.description': 'Ignacio Núñez portfolio: Computer Engineer (PUCV) and AI Security Engineer. Autonomous agents for the SOC (Blue Team), LLM red teaming, GRC, hexagonal architecture and clean code.'
        }
    };

    var STORAGE_KEY = ['la', 'ng'].join('');

    function detectLang() {
        try {
            var saved = window.localStorage.getItem(STORAGE_KEY);
            if (saved && DICT[saved]) return saved;
        } catch (e) { /* almacenamiento no disponible */ }
        var candidates = (navigator.languages && navigator.languages.length)
            ? navigator.languages
            : [navigator.language || navigator.userLanguage || ''];
        for (var i = 0; i < candidates.length; i++) {
            var tag = String(candidates[i] || '').toLowerCase();
            if (tag.indexOf('es') === 0) return 'es';
            if (tag.indexOf('en') === 0) return 'en';
        }
        return 'en';
    }

    var current = detectLang();

    function t(key) {
        var v = DICT[current] ? DICT[current][key] : null;
        if (v == null) v = DICT.es[key];
        return v != null ? v : null;
    }

    function applyLang() {
        document.documentElement.setAttribute('lang', current);

        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var v = t(el.getAttribute('data-i18n'));
            if (v != null) el.innerHTML = v;
        });

        [['data-i18n-aria-label', 'aria-label'], ['data-i18n-title', 'title'], ['data-i18n-alt', 'alt']].forEach(function (pair) {
            document.querySelectorAll('[' + pair[0] + ']').forEach(function (el) {
                var v = t(el.getAttribute(pair[0]));
                if (v != null) el.setAttribute(pair[1], v);
            });
        });

        var menuBtn = document.getElementById('mobile-menu-btn');
        if (menuBtn && menuBtn.getAttribute('aria-expanded') === 'true') {
            var vc = t('menu.close');
            if (vc) menuBtn.setAttribute('aria-label', vc);
        }

        var title = t('meta.title');
        if (title) document.title = title;

        var desc = t('meta.description');
        var md = document.querySelector('meta[name="description"]');
        if (md && desc) md.setAttribute('content', desc);
        var ogd = document.querySelector('meta[property="og:description"]');
        if (ogd && desc) ogd.setAttribute('content', desc);
        var twd = document.querySelector('meta[name="twitter:description"]');
        if (twd && desc) twd.setAttribute('content', desc);
        var ogl = document.querySelector('meta[property="og:locale"]');
        if (ogl) ogl.setAttribute('content', current === 'es' ? 'es_CL' : 'en_US');
        var ogls = document.querySelector('meta[property="og:locale:alternate"]');
        if (!ogls) {
            ogls = document.createElement('meta');
            ogls.setAttribute('property', 'og:locale:alternate');
            document.head.appendChild(ogls);
        }
        ogls.setAttribute('content', current === 'es' ? 'en_US' : 'es_CL');

        document.querySelectorAll('.lang-toggle').forEach(function (btn) {
            btn.querySelectorAll('[data-lang]').forEach(function (span) {
                span.classList.toggle('is-on', span.getAttribute('data-lang') === current);
            });
        });

        document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: current } }));
    }

    function setLang(lang) {
        if (!DICT[lang] || lang === current) return;
        current = lang;
        try { window.localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* sin persistencia */ }
        applyLang();
    }

    function init() {
        applyLang();
        document.querySelectorAll('.lang-toggle').forEach(function (btn) {
            btn.addEventListener('click', function () {
                setLang(current === 'es' ? 'en' : 'es');
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.i18n = {
        t: t,
        set: setLang,
        lang: function () { return current; }
    };
})();
