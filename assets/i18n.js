/* Ignacio Núñez — portafolio. i18n ES/EN: detección automática del idioma del
   navegador, persistencia en localStorage, toggle manual y meta tags. */
(function () {
    'use strict';

    var DICT = {
        es: {
            'skip': 'Saltar al contenido',
            'nav.aria': 'Principal',
            'nav.about': 'Sobre Mí',
            'nav.experience': 'Experiencia',
            'nav.projects': 'Proyectos',
            'nav.skills': 'Habilidades',
            'nav.contact': 'Contacto',
            'menu.open': 'Abrir menú',
            'menu.close': 'Cerrar menú',

            'hero.greet': '&gt; Hola, soy',
            'hero.role': 'Ingeniero Civil Informático | Ingeniero de Seguridad en IA <br class="hidden md:block">| Construyendo Herramientas Agénticas para Blue Team',
            'hero.bio': 'Construyo agentes de IA para operaciones de seguridad, automatizando el trabajo aburrido del SOC para que los humanos se enfoquen en amenazas reales. Apasionado por el software seguro, la arquitectura hexagonal y la intersección entre los LLMs y el Blue Team.',
            'hero.metric1': '1° Lugar',
            'hero.credlyAria': 'Ver credencial CompTIA Security+ (SY0-701) en Credly',
            'hero.credlyTitle': 'Ver credencial en Credly',
            'hero.ctaProjects': 'Ver Proyectos',
            'hero.simLabel': 'Simulador de Defensa IA',
            'hero.simBtn': 'Simular Triaje SOC',
            'term.log1': '// Iniciando telemetría Blue Team &amp; Agentes IA...',
            'term.log2': '<span class="text-cyber-fuchsia">[OUROBOROS]</span> Escaneo adversario AML.T0051 completado (0 fugas).',
            'term.log3': '<span class="text-violet-400">[SOC-AGENT]</span> 142 alertas SIEM procesadas → 1 incidente escalado (HITL).',
            'term.log4': '<span class="text-cyber-accent">[CYBERDIAG]</span> Superficie EASM verificada vía Shodan API.',

            'about.title': 'Sobre Mí',
            'about.focus': 'Enfoque Principal',
            'about.bio1': 'Graduado de <strong class="text-white">Ingeniería Civil Informática</strong> de la Pontificia Universidad Católica de Valparaíso (PUCV).',
            'about.bio2': 'Ganador del <strong class="text-white">Primer Lugar</strong> en la competencia CTF Cybersummit 2025.',
            'about.bio3': 'Fiel defensor del código limpio (<strong class="text-white">Arquitectura Hexagonal</strong>) y del desarrollo open-source bajo licencias permisivas (MIT y Apache 2.0).',
            'about.bio4': 'En mi tiempo libre, disfruto explorando la mixología, entrenando kickboxing y jugando <strong class="text-cyber-cyan">Valheim</strong>.',

            'exp.title': 'Experiencia Laboral',
            'exp1.role': 'Responsable Técnico (Tech Lead/CIO) &amp; Desarrollador Fullstack',
            'exp1.dates': 'Jun 2025 — Presente',
            'exp1.siteAria': 'Sitio web de Conectaterapeuta',
            'exp1.b1': '<strong class="text-white">Desarrollo End-to-End:</strong> Arquitectura, desarrollo y mantención integral de la plataforma web (backend y frontend), garantizando alta disponibilidad y escalabilidad de la solución.',
            'exp1.b2': '<strong class="text-white">Administración de Servidores &amp; Cloud:</strong> Configuración y aprovisionamiento del servidor Linux de producción, gestión de dominios, registros DNS y monitoreo continuo de recursos y servicios.',
            'exp1.b3': '<strong class="text-white">Seguridad y Hardening:</strong> Implementación de políticas de bastionado en servidores Linux, gestión proactiva de parches de seguridad, auditorías periódicas y resolución de vulnerabilidades.',
            'exp1.b4': '<strong class="text-white">Gestión de Infraestructura:</strong> Administración del ciclo de vida operativo, despliegues continuos y resguardo de datos sensibles de la plataforma.',
            'exp2.role': 'Desarrollador de Software — Beca de Ayudantía',
            'exp2.dates': 'Dic 2025 — Feb 2026',
            'exp2.b1': 'Desarrollo de <strong class="text-white">Cyberdiag</strong>, plataforma web de ciberseguridad empresarial. Stack: Node.js, SQL, REST APIs, JavaScript.',
            'exp2.b2': '<strong class="text-white">EASM:</strong> detección de superficie de ataque externa mediante la API de Shodan, sin instalación de agentes.',
            'exp2.b3': '<strong class="text-white">Motor GRC:</strong> evaluación de madurez normativa cruzando respuestas con evidencia técnica (Leyes 21.719, 21.663, 21.459, 21.180, ISO/IEC 27001, NIST CSF 2.0).',
            'exp2.b4': '<strong class="text-white">CRQ:</strong> cuantificación financiera de riesgos traduciendo brechas técnicas en multas estimadas (UTM) y pérdidas operacionales.',
            'exp2.b5': '<strong class="text-white">Reportes:</strong> generación automática de PDF ejecutivo para directorio y exportación CSV para equipos de TI.',
            'exp3.role': 'Unidad de Soporte Computacional',
            'exp3.dates': 'Ene 2025',
            'exp3.b1': 'Desarrollo de una herramienta en Python con interfaz gráfica para automatizar y simplificar la instalación de software institucional.',
            'exp3.b2': 'Soporte a la unidad de ciberseguridad utilizando FortiNet.',
            'exp3.b3': 'Creación de un script en Bash para automatizar la configuración de nuevos equipos, reduciendo el tiempo de preparación manual.',
            'exp4.role': 'Apoyo Informático',
            'exp4.dates': 'Oct 2023 — Nov 2023',
            'exp4.badge': 'Soporte TI',
            'exp4.b1': 'Gestión de programa informático para conteo y obtención de datos de hardware en equipos institucionales.',

            'proj.title': 'Proyectos Destacados',
            'proj.subtitle': 'Arquitectura de seguridad, agentes autónomos para SOC y herramientas Red/Blue Team.',
            'proj.explore': 'Explorar repositorios en GitHub',
            'proj.p1': 'Framework integral de seguridad en IA y pruebas adversarias automatizadas para LLMs. Enfocado en detectar inyecciones de prompts, jailbreaks y extracción de datos. Mapeado directamente al framework MITRE ATLAS (AML. T0051).',
            'proj.p2': '<strong class="text-white">SOC Agéntico:</strong> Diseño de un Agente de Triaje con flujos Human-in-the-Loop. <br>\n                            <strong class="text-white">Extracción de IoCs con IA:</strong> Pipeline para extraer y sanitizar inteligencia de amenazas hacia MITRE ATT&amp;CK. <br>\n                            <strong class="text-white">Orquestador SOAR:</strong> Respuesta dinámica a incidentes.',
            'proj.p3': 'Framework seguro de Aprendizaje Federado (Federated Learning). Proyecto de título con preservación de privacidad diferencial, algoritmos tolerantes a fallos bizantinos y auditoría inmutable basada en blockchain para informática forense.',
            'proj.p4': 'Plataforma web integral para auditoría y gestión de riesgos en ciberseguridad (GRC). Cruza respuestas con evidencia técnica para evaluar la madurez normativa (ISO/IEC 27001, NIST CSF 2.0).',
            'proj.thesis': 'Tesis Ingeniería',

            'skills.languages': 'Lenguajes',
            'skills.ai': 'IA &amp; Agentes',
            'skills.security': 'Seguridad e Infraestructura',
            'skills.certifications': 'Certificaciones',
            'skills.forensics': 'Informática Forense',
            'cert.view': 'Ver credencial',
            'cert.credAria': 'Ver credencial verificada de CompTIA Security+ en Credly',
            'cert.badgeAlt': 'Badge digital CompTIA Security+ (SY0-701)',
            'cert.ccna.credAria': 'Ver credencial verificada de CCNA: Introduction to Networks en Credly',
            'cert.ccna.badgeAlt': 'Badge digital CCNA: Introduction to Networks',
            'cert.ccna.dates': 'Expedición: dic. de 2023',
            'cert.security.dates': 'Expedición: sept. de 2026 · Vencimiento: sept. de 2029',
            'cert.forensics.title': 'Peritaje e Informática Forense',
            'cert.forensics.dates': 'Expedición: abr. de 2026',
            'cert.ethical.title': 'Ciberseguridad &amp; Ethical Hacking',
            'cert.ethical.dates': 'Expedición: oct. de 2025',
            'oss.title': 'Arquitectura Hexagonal &amp; Open Source',
            'oss.sub': 'Licencias MIT / Apache 2.0 · Clean Code First',

            'contact.kicker': '06. Contacto',
            'contact.title': '¿Conectamos?',
            'contact.bio': 'Siempre abierto a conversar sobre arquitectura de agentes, seguridad en LLMs, operaciones Blue Team o desarrollo de software seguro. Mi bandeja de entrada está abierta.',
            'contact.mailAria': 'Enviar correo',
            'contact.cvAria': 'Descargar CV en PDF',
            'copy.copy': 'Copiar',
            'copy.copied': '¡Copiado!',
            'footer.built': 'Construido con estándares abiertos.',

            'sim.e1': 'Anomalía detectada: PowerShell encoded command (T1059.001).',
            'sim.e2': 'Agente de Triaje correlacionando IoCs con MITRE ATT&CK...',
            'sim.e3': 'Payload sanitizado contra Prompt Injection indirecto.',
            'sim.e4': 'Playbook listo: Host aislado preventivamente (Aprobado).',

            'meta.description': 'Portafolio de Ignacio Núñez: Ingeniero Informático (PUCV) e Ingeniero de Seguridad en IA. Agentes autónomos para SOC (Blue Team), red teaming de LLMs, GRC, arquitectura hexagonal y código limpio.'
        },

        en: {
            'skip': 'Skip to content',
            'nav.aria': 'Main',
            'nav.about': 'About Me',
            'nav.experience': 'Experience',
            'nav.projects': 'Projects',
            'nav.skills': 'Skills',
            'nav.contact': 'Contact',
            'menu.open': 'Open menu',
            'menu.close': 'Close menu',

            'hero.greet': '&gt; Hi, I\'m',
            'hero.role': 'Computer Engineer | AI Security Engineer <br class="hidden md:block">| Building Agentic Tools for Blue Team',
            'hero.bio': 'I build AI agents for security operations, automating the boring SOC grunt work so humans can focus on real threats. Passionate about secure software, hexagonal architecture, and the intersection of LLMs and the Blue Team.',
            'hero.metric1': '1st Place',
            'hero.credlyAria': 'View CompTIA Security+ (SY0-701) credential on Credly',
            'hero.credlyTitle': 'View credential on Credly',
            'hero.ctaProjects': 'View Projects',
            'hero.simLabel': 'AI Defense Simulator',
            'hero.simBtn': 'Run SOC Triage Simulation',
            'term.log1': '// Initializing Blue Team telemetry &amp; AI Agents...',
            'term.log2': '<span class="text-cyber-fuchsia">[OUROBOROS]</span> Adversary scan AML.T0051 completed (0 leaks).',
            'term.log3': '<span class="text-violet-400">[SOC-AGENT]</span> 142 SIEM alerts processed → 1 incident escalated (HITL).',
            'term.log4': '<span class="text-cyber-accent">[CYBERDIAG]</span> EASM attack surface verified via Shodan API.',

            'about.title': 'About Me',
            'about.focus': 'Primary Focus',
            'about.bio1': 'Graduate of <strong class="text-white">Computer Engineering</strong> at the Pontificia Universidad Católica de Valparaíso (PUCV).',
            'about.bio2': 'Winner of <strong class="text-white">1st Place</strong> at the CTF Cybersummit 2025 competition.',
            'about.bio3': 'Steadfast advocate of clean code (<strong class="text-white">Hexagonal Architecture</strong>) and open-source development under permissive licenses (MIT and Apache 2.0).',
            'about.bio4': 'In my free time, I enjoy exploring mixology, training kickboxing and playing <strong class="text-cyber-cyan">Valheim</strong>.',

            'exp.title': 'Work Experience',
            'exp1.role': 'Technical Lead (Tech Lead/CIO) &amp; Fullstack Developer',
            'exp1.dates': 'Jun 2025 — Present',
            'exp1.siteAria': 'Conectaterapeuta website',
            'exp1.b1': '<strong class="text-white">End-to-End Development:</strong> Full architecture, development and maintenance of the web platform (backend and frontend), ensuring high availability and scalability of the solution.',
            'exp1.b2': '<strong class="text-white">Server &amp; Cloud Administration:</strong> Configuration and provisioning of the production Linux server, domain and DNS record management, and continuous monitoring of resources and services.',
            'exp1.b3': '<strong class="text-white">Security &amp; Hardening:</strong> Implementation of hardening policies on Linux servers, proactive security patch management, periodic audits and vulnerability remediation.',
            'exp1.b4': '<strong class="text-white">Infrastructure Management:</strong> Operational lifecycle administration, continuous deployments and safeguarding of sensitive platform data.',
            'exp2.role': 'Software Developer — Teaching Assistant Fellowship',
            'exp2.dates': 'Dec 2025 — Feb 2026',
            'exp2.b1': 'Development of <strong class="text-white">Cyberdiag</strong>, an enterprise cybersecurity web platform. Stack: Node.js, SQL, REST APIs, JavaScript.',
            'exp2.b2': '<strong class="text-white">EASM:</strong> external attack surface detection via the Shodan API, with no agent installation.',
            'exp2.b3': '<strong class="text-white">GRC Engine:</strong> regulatory maturity assessment by cross-checking answers against technical evidence (Chilean Laws 21.719, 21.663, 21.459, 21.180, ISO/IEC 27001, NIST CSF 2.0).',
            'exp2.b4': '<strong class="text-white">CRQ:</strong> financial risk quantification translating technical gaps into estimated fines (UTM) and operational losses.',
            'exp2.b5': '<strong class="text-white">Reports:</strong> automatic generation of executive PDFs for the board and CSV exports for IT teams.',
            'exp3.role': 'Computational Support Unit',
            'exp3.dates': 'Jan 2025',
            'exp3.b1': 'Development of a Python GUI tool to automate and simplify the installation of institutional software.',
            'exp3.b2': 'Support to the cybersecurity unit using FortiNet.',
            'exp3.b3': 'Creation of a Bash script to automate the configuration of new machines, reducing manual preparation time.',
            'exp4.role': 'IT Support',
            'exp4.dates': 'Oct 2023 — Nov 2023',
            'exp4.badge': 'IT Support',
            'exp4.b1': 'Management of a software program for counting and collecting hardware data from institutional machines.',

            'proj.title': 'Featured Projects',
            'proj.subtitle': 'Security architecture, autonomous SOC agents and Red/Blue Team tools.',
            'proj.explore': 'Explore repositories on GitHub',
            'proj.p1': 'Comprehensive AI security framework with automated adversarial testing for LLMs. Focused on detecting prompt injections, jailbreaks and data extraction. Directly mapped to the MITRE ATLAS framework (AML. T0051).',
            'proj.p2': '<strong class="text-white">Agentic SOC:</strong> Design of a Triage Agent with Human-in-the-Loop flows. <br>\n                            <strong class="text-white">AI-Powered IoC Extraction:</strong> pipeline to extract and sanitize threat intelligence toward MITRE ATT&amp;CK. <br>\n                            <strong class="text-white">SOAR Orchestrator:</strong> dynamic incident response.',
            'proj.p3': 'Secure Federated Learning framework. Thesis project with differential privacy preservation, Byzantine fault-tolerant algorithms and blockchain-based immutable auditing for digital forensics.',
            'proj.p4': 'Comprehensive web platform for cybersecurity auditing and risk management (GRC). Cross-checks answers against technical evidence to assess regulatory maturity (ISO/IEC 27001, NIST CSF 2.0).',
            'proj.thesis': 'Engineering Thesis',

            'skills.languages': 'Languages',
            'skills.ai': 'AI &amp; Agents',
            'skills.security': 'Security &amp; Infrastructure',
            'skills.certifications': 'Certifications',
            'skills.forensics': 'Digital Forensics',
            'cert.view': 'View credential',
            'cert.credAria': 'View verified CompTIA Security+ credential on Credly',
            'cert.badgeAlt': 'CompTIA Security+ (SY0-701) digital badge',
            'cert.ccna.credAria': 'View verified CCNA: Introduction to Networks credential on Credly',
            'cert.ccna.badgeAlt': 'CCNA: Introduction to Networks digital badge',
            'cert.ccna.dates': 'Issued: Dec. 2023',
            'cert.security.dates': 'Issued: Sep. 2026 · Expires: Sep. 2029',
            'cert.forensics.title': 'Expert Witnessing &amp; Digital Forensics',
            'cert.forensics.dates': 'Issued: Apr. 2026',
            'cert.ethical.title': 'Cybersecurity &amp; Ethical Hacking',
            'cert.ethical.dates': 'Issued: Oct. 2025',
            'oss.title': 'Hexagonal Architecture &amp; Open Source',
            'oss.sub': 'MIT / Apache 2.0 Licenses · Clean Code First',

            'contact.kicker': '06. Contact',
            'contact.title': 'Let\'s Connect',
            'contact.bio': 'Always open to conversations about agent architecture, LLM security, Blue Team operations or secure software development. My inbox is open.',
            'contact.mailAria': 'Send email',
            'contact.cvAria': 'Download CV (PDF)',
            'copy.copy': 'Copy',
            'copy.copied': 'Copied!',
            'footer.built': 'Built with open standards.',

            'sim.e1': 'Anomaly detected: PowerShell encoded command (T1059.001).',
            'sim.e2': 'Triage Agent correlating IoCs with MITRE ATT&CK...',
            'sim.e3': 'Payload sanitized against indirect Prompt Injection.',
            'sim.e4': 'Playbook ready: Host preventively isolated (Approved).',

            'meta.description': 'Ignacio Núñez\'s portfolio: Computer Engineer (PUCV) and AI Security Engineer. Autonomous agents for the SOC (Blue Team), LLM red teaming, GRC, hexagonal architecture and clean code.'
        }
    };

    var STORAGE_KEY = ['la','ng'].join('');

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
        return 'en'; /* idioma global por defecto cuando el navegador no habla español */
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

        /* El botón del menú móvil muestra la etiqueta correcta si ya está abierto. */
        var menuBtn = document.getElementById('mobile-menu-btn');
        if (menuBtn && menuBtn.getAttribute('aria-expanded') === 'true') {
            var vc = t('menu.close');
            if (vc) menuBtn.setAttribute('aria-label', vc);
        }

        /* Meta tags dependientes del idioma. */
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

        /* Estado visual de los botones de toggle. */
        document.querySelectorAll('.lang-toggle').forEach(function (btn) {
            var es = btn.querySelector('.lang-es');
            var en = btn.querySelector('.lang-en');
            if (es) es.className = 'lang-es ' + (current === 'es' ? 'font-bold text-cyber-accent' : 'opacity-60');
            if (en) en.className = 'lang-en ' + (current === 'en' ? 'font-bold text-cyber-accent' : 'opacity-60');
        });
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

    /* API para main.js (eventos dinámicos del simulador, botón de copiar, menú). */
    window.i18n = {
        t: t,
        set: setLang,
        lang: function () { return current; }
    };
})();
