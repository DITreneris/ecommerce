/**
 * DI Promptų biblioteka e-komercijai (Spin-off Nr. 8) — vanilla JS
 * Įkelia prompts.{locale}.json, generuoja skyrius ir korteles, tada inicializuoja UX modulius.
 */
(function () {
  'use strict';

  /** Lietuviška užduočių žodžio forma (1 užduotis, 2 užduotys, 5 užduočių, …). */
  function ltTaskForm(n) {
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return 'užduotis';
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'užduotys';
    return 'užduočių';
  }

  function ltSearchResultsCount(n) {
    return `Rasta ${n} ${ltTaskForm(n)}`;
  }

  function enSearchResultsCount(n) {
    return n === 1 ? '1 task found' : `${n} tasks found`;
  }

  function etSearchResultsCount(n) {
    return n === 1 ? '1 ülesanne leitud' : `${n} ülesannet leitud`;
  }

  function lvSearchResultsCount(n) {
    return n === 1 ? 'Atrasts 1 uzdevums' : `Atrasti ${n} uzdevumi`;
  }

  const SUPPORTED_DATA_LOCALES = ['lt', 'en', 'et', 'lv'];
  const LANG_PREF_STORAGE_KEY = 'prompt-library-lang';

  /** Keep language switcher URLs in sync with current ?q= (and other search params). */
  function syncLangLinksQuery() {
    document.querySelectorAll('a.lang-link').forEach(anchor => {
      const raw = anchor.getAttribute('href');
      if (!raw || raw.startsWith('#')) return;
      const u = new URL(raw, window.location.href);
      u.search = window.location.search;
      anchor.setAttribute('href', u.pathname + u.search + u.hash);
    });
  }

  let langLinkPreferenceBound = false;
  function initLangLinkPreference() {
    if (langLinkPreferenceBound) return;
    langLinkPreferenceBound = true;
    document.querySelectorAll('a.lang-link[data-lang]').forEach(anchor => {
      anchor.addEventListener('click', () => {
        const lang = anchor.getAttribute('data-lang');
        if (!lang || !SUPPORTED_DATA_LOCALES.includes(lang)) return;
        try {
          localStorage.setItem(LANG_PREF_STORAGE_KEY, lang);
        } catch (e) {
          /* ignore */
        }
      });
    });
  }

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  const STRINGS = {
    lt: {
      copyBtn: 'Kopijuoti',
      copiedBtn: 'Nukopijuota!',
      toastOk: 'Nukopijuota',
      toastFail: 'Nepavyko nukopijuoti. Bandykite pažymėti tekstą rankiniu būdu.',
      searchPlaceholder: 'Ieškokite užduočių pagal raktažodį (pvz., el. laiškas, SEO, PVM)...',
      searchAria: 'Ieškoti praktinių užduočių',
      searchResultsNone: 'Nerasta užduočių pagal šį raktažodį',
      searchResultsOne: 'Rasta 1 užduotis',
      searchEmptyHint:
        'Pabandykite trumpesnį žodį, kitą frazę arba naršykite skyrius meniu. Keli žodžiai — visi turi sutapti (IR logika).',
      searchClearSearch: 'Išvalyti paiešką',
      loadRetry: 'Bandyti dar kartą',
      libraryKeyboardHint:
        'Greita paieška: klavišas / perjungia fokusą į paiešką viršuje (nevedant teksto į lauką).',
      tasksBadge: n => `${n} ${ltTaskForm(n)}`,
      skipLink: 'Pereiti prie turinio',
      navToggle: 'Meniu',
      navAria: 'Pagrindinis meniu',
      backTop: 'Grįžti į viršų',
      mobileSearch: 'Ieškoti',
      mobileSections: 'Skyriai',
      mobileSearchClose: 'Uždaryti paiešką',
      mobileSearchTitle: 'Paieška',
      formSuccess:
        'Ačiū! Jūsų žinutė sėkmingai patikrinta. (Duomenys nebuvo išsiųsti—tai demonstracija.)',
      fieldRequired: label => `Laukas „${label}" yra privalomas.`,
      fieldEmail: 'Įveskite galiojantį el. pašto adresą.',
      fieldShort: label => `Laukas „${label}" per trumpas.`,
      footerTitle: 'Susisiekite',
      footerLead:
        'Turite pasiūlymų naujiems praktiniams uždaviniams? Parašykite! (Forma tikrina duomenis, bet jų neišsiunčia.)',
      loadError: 'Nepavyko įkelti bibliotekos duomenų. Patikrinkite tinklą ir bandykite dar kartą.',
      loadingLabel: 'Įkeliama užduočių biblioteka…',
      keyboardHint: 'Spauskite <kbd>/</kbd> paieškai',
      themeCyclePrefix: 'Spalvinė schema',
      themeCycleAction: 'Spauskite perjungti ciklu.',
      themeSystem: 'pagal sistemą',
      themeLight: 'šviesi',
      themeDark: 'tamsi',
    },
    en: {
      copyBtn: 'Copy',
      copiedBtn: 'Copied!',
      toastOk: 'Copied',
      toastFail: 'Could not copy. Try selecting the text manually.',
      searchPlaceholder: 'Search tasks by keyword (e.g. email, SEO, VAT)...',
      searchAria: 'Search prompts and tasks',
      searchResultsNone: 'No tasks found for this keyword',
      searchResultsOne: '1 task found',
      searchEmptyHint:
        'Try a shorter word, different keywords, or browse sections in the menu. Multiple words must all match (AND).',
      searchClearSearch: 'Clear search',
      loadRetry: 'Try again',
      libraryKeyboardHint:
        'Quick search: press / to focus the search field in the header (when not typing in an input).',
      tasksBadge: n => (n === 1 ? '1 task' : `${n} tasks`),
      skipLink: 'Skip to content',
      navToggle: 'Menu',
      navAria: 'Main menu',
      backTop: 'Back to top',
      mobileSearch: 'Search',
      mobileSections: 'Sections',
      mobileSearchClose: 'Close search',
      mobileSearchTitle: 'Search',
      formSuccess: 'Thanks! Your message was validated. (Nothing was sent—this is a demo.)',
      fieldRequired: label => `The field “${label}” is required.`,
      fieldEmail: 'Enter a valid email address.',
      fieldShort: label => `The field “${label}” is too short.`,
      footerTitle: 'Contact',
      footerLead:
        'Have ideas for new practical tasks? Write to us! (The form validates input but does not send data.)',
      loadError: 'Could not load library data. Check your connection and try again.',
      loadingLabel: 'Loading the task library…',
      keyboardHint: 'Press <kbd>/</kbd> to search',
      themeCyclePrefix: 'Color scheme',
      themeCycleAction: 'Press to cycle options.',
      themeSystem: 'match system',
      themeLight: 'light',
      themeDark: 'dark',
    },
    et: {
      copyBtn: 'Kopeeri',
      copiedBtn: 'Kopeeritud!',
      toastOk: 'Kopeeritud',
      toastFail: 'Kopeerimine ebaõnnestus. Proovige teksti käsitsi valida.',
      searchPlaceholder: 'Otsi ülesandeid märksõna järgi (nt e-kiri, SEO, käibemaks)...',
      searchAria: 'Otsi ülesandeid',
      searchResultsNone: 'Selle märksõna järgi ülesandeid ei leitud',
      searchResultsOne: 'Leitud 1 ülesanne',
      tasksBadge: n => (n === 1 ? '1 ülesanne' : `${n} ülesannet`),
      skipLink: 'Liigu sisu juurde',
      navToggle: 'Menüü',
      navAria: 'Põhimenüü',
      backTop: 'Tagasi üles',
      mobileSearch: 'Otsi',
      mobileSections: 'Jaotised',
      mobileSearchClose: 'Sulge otsing',
      mobileSearchTitle: 'Otsing',
      formSuccess:
        'Aitäh! Teie sõnum on kontrollitud. (Andmeid ei saadetud—see on demonstratsioon.)',
      fieldRequired: label => `Väli „${label}” on kohustuslik.`,
      fieldEmail: 'Sisestage kehtiv e-posti aadress.',
      fieldShort: label => `Väli „${label}” on liiga lühike.`,
      footerTitle: 'Kontakt',
      footerLead:
        'Kas teil on ideid uute praktiliste ülesannete kohta? Kirjutage! (Vorm kontrollib andmeid, kuid ei saada neid.)',
      loadError:
        'Biblioteki andmeid ei õnnestunud laadida. Kontrollige ühendust ja proovige uuesti.',
      loadingLabel: 'Ülesannete raamatukogu laadimine…',
      keyboardHint: 'Otsimiseks vajutage <kbd>/</kbd>',
      themeCyclePrefix: 'Värviskeem',
      themeCycleAction: 'Vajutage valiku vahetamiseks.',
      themeSystem: 'süsteemi järgi',
      themeLight: 'hele',
      themeDark: 'tume',
    },
    lv: {
      copyBtn: 'Kopēt',
      copiedBtn: 'Nokopēts!',
      toastOk: 'Nokopēts',
      toastFail: 'Neizdevās kopēt. Mēģiniet atlasīt tekstu manuāli.',
      searchPlaceholder: 'Meklējiet uzdevumus pēc atslēgvārda (piem., e-pasts, SEO, PVN)...',
      searchAria: 'Meklēt uzdevumus',
      searchResultsNone: 'Nav atrasts neviens uzdevums ar šo atslēgvārdu',
      searchResultsOne: 'Atrasts 1 uzdevums',
      searchEmptyHint:
        'Izmēģiniet īsāku vārdu, citus atslēgvārdus vai pārlūkojiet sadaļas izvēlnē. Vairāki vārdi — jāsakrīt visiem (UN).',
      searchClearSearch: 'Notīrīt meklēšanu',
      loadRetry: 'Mēģināt vēlreiz',
      libraryKeyboardHint:
        'Ātra meklēšana: nospiediet /, lai fokuss pāriet uz meklēšanu augšā (kad nerakstāt ievades laukā).',
      tasksBadge: n => (n === 1 ? '1 uzdevums' : `${n} uzdevumi`),
      skipLink: 'Pāriet uz saturu',
      navToggle: 'Izvēlne',
      navAria: 'Galvenā izvēlne',
      backTop: 'Atpakaļ uz augšu',
      mobileSearch: 'Meklēt',
      mobileSections: 'Sadaļas',
      mobileSearchClose: 'Aizvērt meklēšanu',
      mobileSearchTitle: 'Meklēšana',
      formSuccess:
        'Paldies! Jūsu ziņojums ir pārbaudīts. (Dati netika nosūtīti—šī ir demonstrācija.)',
      fieldRequired: label => `Lauks „${label}” ir obligāts.`,
      fieldEmail: 'Ievadiet derīgu e-pasta adresi.',
      fieldShort: label => `Lauks „${label}” ir pārāk īss.`,
      footerTitle: 'Kontakti',
      footerLead:
        'Ir idejas jauniem praktiskiem uzdevumiem? Rakstiet! (Veidlapa pārbauda datus, bet tos nesūta.)',
      loadError: 'Neizdevās ielādēt bibliotēkas datus. Pārbaudiet savienojumu un mēģiniet vēlreiz.',
      loadingLabel: 'Ielādē uzdevumu bibliotēku…',
      keyboardHint: 'Meklēšanai nospiediet <kbd>/</kbd>',
      themeCyclePrefix: 'Krāsu shēma',
      themeCycleAction: 'Nospiediet, lai pārslēgtu.',
      themeSystem: 'kā sistēmai',
      themeLight: 'gaiša',
      themeDark: 'tumša',
    },
  };

  function getLocale() {
    return (document.documentElement.getAttribute('data-locale') || 'lt').toLowerCase();
  }

  function t() {
    const loc = getLocale();
    return STRINGS[loc] || STRINGS.en || STRINGS.lt;
  }

  function assetsBase() {
    const fromData = document.documentElement.getAttribute('data-assets-base');
    if (fromData) return fromData.replace(/\/$/, '');
    const script = document.querySelector('script[src*="app.js"]');
    if (script && script.src) {
      const u = script.src.replace(/\/js\/app\.js.*$/i, '');
      if (u && u !== script.src) return u.replace(/\/$/, '');
    }
    return '../assets';
  }

  // ============================================
  // STORAGE
  // ============================================
  const Storage = {
    isAvailable() {
      try {
        const test = '__storage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
      } catch (e) {
        return false;
      }
    },
    get(key, defaultValue = null) {
      if (!this.isAvailable()) return defaultValue;
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (e) {
        return defaultValue;
      }
    },
    set(key, value) {
      if (!this.isAvailable()) return false;
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (e) {
        return false;
      }
    },
    remove(key) {
      if (!this.isAvailable()) return false;
      try {
        localStorage.removeItem(key);
        return true;
      } catch (e) {
        return false;
      }
    },
  };

  const THEME_STORAGE_KEY = 'prompt-library-theme';

  const Theme = {
    toggleBtn: null,
    init() {
      this.toggleBtn = document.getElementById('theme-toggle');
      this.applyFromPreference();
      if (this.toggleBtn) {
        this.toggleBtn.addEventListener('click', () => this.cycle());
        this.refreshButton();
      }
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener('change', () => {
        if (this.getMode() === 'system') this.updateMetaThemeColor();
      });
    },
    getMode() {
      const v = Storage.get(THEME_STORAGE_KEY, null);
      if (v === 'light' || v === 'dark') return v;
      return 'system';
    },
    applyFromPreference() {
      const mode = this.getMode();
      this.applyDom(mode);
      this.updateMetaThemeColor();
    },
    applyDom(mode) {
      const root = document.documentElement;
      if (mode === 'light') root.setAttribute('data-theme', 'light');
      else if (mode === 'dark') root.setAttribute('data-theme', 'dark');
      else root.removeAttribute('data-theme');
    },
    cycle() {
      const modes = ['system', 'light', 'dark'];
      const cur = this.getMode();
      const i = modes.indexOf(cur);
      const next = modes[(i + 1) % modes.length];
      if (next === 'system') Storage.remove(THEME_STORAGE_KEY);
      else Storage.set(THEME_STORAGE_KEY, next);
      this.applyDom(next);
      this.updateMetaThemeColor();
      this.refreshButton();
    },
    refreshButton() {
      if (!this.toggleBtn) return;
      const strings = t();
      const mode = this.getMode();
      const lab = {
        system: strings.themeSystem,
        light: strings.themeLight,
        dark: strings.themeDark,
      }[mode];
      const aria = `${strings.themeCyclePrefix}: ${lab}. ${strings.themeCycleAction}`;
      this.toggleBtn.setAttribute('aria-label', aria);
      this.toggleBtn.setAttribute('title', aria);
      let iconEl = this.toggleBtn.querySelector('.theme-toggle__icon');
      if (!iconEl) {
        iconEl = document.createElement('span');
        iconEl.className = 'theme-toggle__icon';
        iconEl.setAttribute('aria-hidden', 'true');
        this.toggleBtn.appendChild(iconEl);
      }
      const icons = { system: '◐', light: '☀', dark: '🌙' };
      iconEl.textContent = icons[mode];
    },
    updateMetaThemeColor() {
      const meta = document.querySelector('meta[name="theme-color"]');
      if (!meta) return;
      const dark = '#0b1221';
      const light = '#4338ca';
      const mode = this.getMode();
      if (mode === 'dark') meta.setAttribute('content', dark);
      else if (mode === 'light') meta.setAttribute('content', light);
      else {
        const d = window.matchMedia('(prefers-color-scheme: dark)').matches;
        meta.setAttribute('content', d ? dark : light);
      }
    },
  };

  // ============================================
  // TOAST
  // ============================================
  const Toast = {
    container: null,
    element: null,
    timeout: null,
    init() {
      this.container = document.querySelector('.toast-container');
      this.element = document.getElementById('toast');
    },
    show(message, type = 'success', duration = 2000) {
      if (!this.element) return;
      if (this.timeout) clearTimeout(this.timeout);
      this.element.textContent = message;
      this.element.className = `toast toast--${type} show`;
      this.timeout = setTimeout(() => {
        this.element.classList.remove('show');
      }, duration);
    },
    success(message, duration = 2000) {
      this.show(message, 'success', duration);
    },
    error(message, duration = 3000) {
      this.show(message, 'error', duration);
    },
  };

  // ============================================
  // CLIPBOARD
  // ============================================
  const Clipboard = {
    async copy(text) {
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(text);
          return { success: true };
        } catch (err) {
          /* fall through */
        }
      }
      return this.fallbackCopy(text);
    },
    fallbackCopy(text) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.cssText = 'position:fixed;opacity:0;left:-9999px;top:0';
      textarea.setAttribute('readonly', '');
      document.body.appendChild(textarea);
      try {
        textarea.select();
        textarea.setSelectionRange(0, 99999);
        const success = document.execCommand('copy');
        return { success };
      } catch (e) {
        return { success: false, error: e };
      } finally {
        document.body.removeChild(textarea);
      }
    },
    init() {
      const strings = t();
      document.querySelectorAll('.btn-copy').forEach(button => {
        button.replaceWith(button.cloneNode(true));
      });
      document.querySelectorAll('.btn-copy').forEach(button => {
        button.addEventListener('click', async e => {
          e.preventDefault();
          let textToCopy = button.getAttribute('data-copy') || button.getAttribute('data-prompt');
          if (!textToCopy) {
            const card = button.closest('.prompt-card');
            if (card) {
              const textEl = card.querySelector('.prompt-card__text');
              if (textEl) textToCopy = textEl.textContent;
            }
          }
          if (!textToCopy) return;
          const result = await this.copy(textToCopy);
          if (result.success) {
            const originalHTML = button.innerHTML;
            button.innerHTML = `<span aria-hidden="true">✓</span> ${strings.copiedBtn}`;
            button.classList.add('copied');
            const card = button.closest('.prompt-card');
            if (card) {
              card.classList.add('prompt-card--copied');
              setTimeout(() => {
                card.classList.remove('prompt-card--copied');
              }, 400);
            }
            Toast.success(strings.toastOk);
            setTimeout(() => {
              button.innerHTML = originalHTML;
              button.classList.remove('copied');
            }, 2000);
          } else {
            Toast.error(strings.toastFail);
          }
        });
      });
    },
  };

  // ============================================
  // NAVIGATION
  // ============================================
  const Navigation = {
    toggle: null,
    navList: null,
    overlay: null,
    init() {
      this.toggle = document.getElementById('nav-toggle');
      this.navList = document.getElementById('primary-nav');
      this.overlay = document.getElementById('nav-overlay');
      if (!this.toggle || !this.navList) return;
      this.toggle.addEventListener('click', () => {
        const expanded = this.toggle.getAttribute('aria-expanded') === 'true';
        this.setExpanded(!expanded);
      });
      this.navList.addEventListener('click', e => {
        if (e.target && e.target.closest('a')) {
          this.setExpanded(false);
        }
      });
      if (this.overlay) {
        this.overlay.addEventListener('click', () => {
          this.setExpanded(false);
          this.toggle.focus();
        });
      }
      this.navList.addEventListener('keydown', e => {
        if (e.key !== 'Tab') return;
        if (window.innerWidth >= 640) return;
        const links = Array.from(this.navList.querySelectorAll('a'));
        const firstLink = links[0];
        const lastLink = links[links.length - 1];
        if (e.shiftKey && document.activeElement === firstLink) {
          e.preventDefault();
          lastLink.focus();
        } else if (!e.shiftKey && document.activeElement === lastLink) {
          e.preventDefault();
          firstLink.focus();
        }
      });
    },
    setExpanded(expanded) {
      if (!this.toggle) return;
      this.toggle.setAttribute('aria-expanded', String(expanded));
      if (this.overlay) {
        this.overlay.classList.toggle('active', expanded);
        this.overlay.setAttribute('aria-hidden', expanded ? 'false' : 'true');
      }
    },
  };

  function tokenizeSearchQuery(value) {
    return value.toLowerCase().trim().split(/\s+/).filter(Boolean);
  }

  // ============================================
  // SEARCH
  // ============================================
  const Search = {
    input: null,
    mobileInput: null,
    cards: null,
    depts: null,
    resultsEl: null,
    mobileResultsEl: null,
    hintsEl: null,
    mobileHintsEl: null,
    _suppressUrlSync: false,
    _handlersBound: false,
    init() {
      const strings = t();
      this.input = document.getElementById('search-prompts');
      this.mobileInput = document.getElementById('mobile-search-input');
      this.resultsEl = document.getElementById('search-results');
      this.mobileResultsEl = document.getElementById('mobile-search-results');
      this.hintsEl = document.getElementById('search-results-hint');
      this.mobileHintsEl = document.getElementById('mobile-search-results-hint');
      if (this.input) {
        this.input.placeholder = strings.searchPlaceholder;
        this.input.setAttribute('aria-label', strings.searchAria);
        if (!this._handlersBound) {
          this.input.addEventListener('input', () => this.handleSearch(this.input.value));
        }
      }
      if (this.mobileInput && this.input) {
        this.mobileInput.placeholder = strings.searchPlaceholder;
        this.mobileInput.setAttribute('aria-label', strings.searchAria);
        if (!this._handlersBound) {
          this.mobileInput.addEventListener('input', () => {
            this.input.value = this.mobileInput.value;
            this.handleSearch(this.mobileInput.value);
          });
        }
      }
      this._handlersBound = true;
      const params = new URLSearchParams(window.location.search);
      const qParam = params.get('q');
      if (qParam !== null && this.input) {
        this._suppressUrlSync = true;
        this.input.value = qParam;
        if (this.mobileInput) this.mobileInput.value = qParam;
        this._suppressUrlSync = false;
      }
      this.refreshDom();
      syncLangLinksQuery();
    },
    refreshDom() {
      this.cards = document.querySelectorAll('.prompt-card');
      this.depts = document.querySelectorAll('.dept');
      const strings = t();
      const q = this.input ? this.input.value.trim() : '';
      if (q) {
        this.handleSearch(this.input.value);
      } else {
        this.showAll();
        this.updateResults(null, strings);
      }
    },
    syncQueryToUrl() {
      if (this._suppressUrlSync) return;
      const raw = this.input ? this.input.value : '';
      const url = new URL(window.location.href);
      if (raw.trim()) {
        url.searchParams.set('q', raw);
      } else {
        url.searchParams.delete('q');
      }
      const next = `${url.pathname}${url.search}${url.hash}`;
      const cur = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      if (next !== cur) {
        history.replaceState(null, '', next);
      }
      syncLangLinksQuery();
    },
    handleSearch(value) {
      const tokens = tokenizeSearchQuery(value);
      const strings = t();
      if (tokens.length === 0) {
        this.showAll();
        this.updateResults(null, strings);
        this.setEmptyHints(false, strings);
        this.syncQueryToUrl();
        return;
      }
      let visibleCount = 0;
      const visibleByDept = {};
      this.cards.forEach(card => {
        const title = card.querySelector('.prompt-card__title');
        const text = card.querySelector('.prompt-card__text');
        const keywords = card.getAttribute('data-keywords') || '';
        const titleText = title ? title.textContent.toLowerCase() : '';
        const cardText = text ? text.textContent.toLowerCase() : '';
        const haystack = `${titleText} ${cardText} ${keywords.toLowerCase()}`;
        const matches = tokens.every(tok => haystack.includes(tok));
        card.style.display = matches ? '' : 'none';
        if (matches) {
          visibleCount++;
          this.applyHighlights(title, text, tokens);
        } else {
          this.removeHighlight(title);
          this.removeHighlight(text);
        }
        const dept = card.closest('.dept');
        if (dept) {
          const deptId = dept.getAttribute('data-dept') || dept.id;
          if (!visibleByDept[deptId]) visibleByDept[deptId] = 0;
          if (matches) visibleByDept[deptId]++;
        }
      });
      this.depts.forEach(dept => {
        const deptId = dept.getAttribute('data-dept') || dept.id;
        dept.style.display = visibleByDept[deptId] > 0 ? '' : 'none';
      });
      this.updateResults(visibleCount, strings);
      this.setEmptyHints(visibleCount === 0, strings);
      this.syncQueryToUrl();
    },
    applyHighlights(title, text, tokens) {
      if (tokens.length === 1) {
        this.highlightText(title, tokens[0]);
        this.highlightText(text, tokens[0]);
      } else {
        this.highlightMultiple(title, tokens);
        this.highlightMultiple(text, tokens);
      }
    },
    showAll() {
      this.cards.forEach(card => {
        card.style.display = '';
        const title = card.querySelector('.prompt-card__title');
        const text = card.querySelector('.prompt-card__text');
        this.removeHighlight(title);
        this.removeHighlight(text);
      });
      this.depts.forEach(dept => {
        dept.style.display = '';
      });
    },
    highlightText(element, query) {
      if (!element) return;
      const originalText = element.getAttribute('data-original') || element.textContent;
      element.setAttribute('data-original', originalText);
      const lowerText = originalText.toLowerCase();
      const lowerQuery = query.toLowerCase();
      let result = '';
      let lastIndex = 0;
      let index = lowerText.indexOf(lowerQuery);
      while (index !== -1) {
        result += this.escapeHtml(originalText.slice(lastIndex, index));
        result +=
          '<mark>' + this.escapeHtml(originalText.slice(index, index + query.length)) + '</mark>';
        lastIndex = index + query.length;
        index = lowerText.indexOf(lowerQuery, lastIndex);
      }
      result += this.escapeHtml(originalText.slice(lastIndex));
      element.innerHTML = result;
    },
    highlightMultiple(element, tokens) {
      if (!element || !tokens.length) return;
      const original = element.getAttribute('data-original') || element.textContent;
      element.setAttribute('data-original', original);
      const uniq = [...new Set(tokens.map(t => t.toLowerCase()))].sort(
        (a, b) => b.length - a.length
      );
      const parts = uniq.map(tok => tok.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).filter(Boolean);
      if (!parts.length) {
        element.textContent = original;
        return;
      }
      const re = new RegExp(`(${parts.join('|')})`, 'gi');
      element.innerHTML = original.replace(re, m => `<mark>${this.escapeHtml(m)}</mark>`);
    },
    removeHighlight(element) {
      if (!element) return;
      const original = element.getAttribute('data-original');
      if (original) {
        element.textContent = original;
        element.removeAttribute('data-original');
      }
    },
    escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    },
    setEmptyHints(show, strings) {
      const fill = el => {
        if (!el) return;
        if (!show) {
          el.hidden = true;
          el.innerHTML = '';
          return;
        }
        el.hidden = false;
        el.innerHTML = '';
        const p = document.createElement('p');
        p.className = 'search-results-hint__text';
        p.textContent = strings.searchEmptyHint;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'search-results-hint__clear';
        btn.textContent = strings.searchClearSearch;
        btn.addEventListener('click', () => this.clearSearch());
        el.append(p, btn);
      };
      fill(this.hintsEl);
      fill(this.mobileHintsEl);
    },
    clearSearch() {
      if (this.input) this.input.value = '';
      if (this.mobileInput) this.mobileInput.value = '';
      const strings = t();
      this.showAll();
      this.updateResults(null, strings);
      this.setEmptyHints(false, strings);
      this.syncQueryToUrl();
      if (this.input) this.input.focus();
    },
    updateResults(count, strings) {
      const set = (el, text, show) => {
        if (!el) return;
        if (show === false) {
          el.style.display = 'none';
          return;
        }
        el.style.display = 'block';
        el.textContent = text;
      };
      if (count === null) {
        set(this.resultsEl, '', false);
        set(this.mobileResultsEl, '', false);
        this.setEmptyHints(false, strings);
        return;
      }
      let msg = '';
      if (count === 0) msg = strings.searchResultsNone;
      else if (count === 1) msg = strings.searchResultsOne;
      else {
        const loc = getLocale();
        if (loc === 'en') msg = enSearchResultsCount(count);
        else if (loc === 'et') msg = etSearchResultsCount(count);
        else if (loc === 'lv') msg = lvSearchResultsCount(count);
        else msg = ltSearchResultsCount(count);
      }
      set(this.resultsEl, msg, true);
      set(this.mobileResultsEl, msg, true);
    },
    focus() {
      if (this.input) {
        this.input.focus();
        this.input.select();
      }
    },
  };

  const Progress = {
    bar: null,
    init() {
      this.bar = document.getElementById('progress-bar');
      if (!this.bar) return;
      window.addEventListener('scroll', () => this.update(), { passive: true });
      this.update();
    },
    update() {
      if (!this.bar) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      this.bar.style.width = progress + '%';
    },
  };

  const BackToTop = {
    button: null,
    threshold: 400,
    init() {
      this.button = document.getElementById('back-to-top');
      if (!this.button) return;
      window.addEventListener('scroll', () => this.toggle(), { passive: true });
      this.button.addEventListener('click', () => this.scrollToTop());
      this.toggle();
    },
    toggle() {
      if (!this.button) return;
      this.button.classList.toggle('visible', window.scrollY > this.threshold);
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    },
  };

  const MobileUI = {
    searchBtn: null,
    sectionsBtn: null,
    searchModal: null,
    lastFocusEl: null,
    trapKeydown: null,
    init() {
      const strings = t();
      const closeBtn = document.getElementById('mobile-search-close');
      if (closeBtn) {
        closeBtn.textContent = strings.mobileSearchClose;
        closeBtn.setAttribute('aria-label', strings.mobileSearchClose);
        closeBtn.addEventListener('click', () => this.closeSearchModal());
      }
      const titleEl = document.getElementById('mobile-search-title');
      if (titleEl) titleEl.textContent = strings.mobileSearchTitle;
      this.searchBtn = document.getElementById('mobile-search-btn');
      this.sectionsBtn = document.getElementById('mobile-sections-btn');
      this.searchModal = document.getElementById('mobile-search-modal');
      if (this.searchBtn) {
        this.searchBtn.setAttribute('aria-label', strings.mobileSearch);
        const label = this.searchBtn.querySelector('.mobile-nav-label');
        if (label) label.textContent = strings.mobileSearch;
      }
      if (this.sectionsBtn) {
        this.sectionsBtn.setAttribute('aria-label', strings.mobileSections);
        const label = this.sectionsBtn.querySelector('.mobile-nav-label');
        if (label) label.textContent = strings.mobileSections;
      }
      if (this.searchBtn) {
        this.searchBtn.addEventListener('click', () => this.openSearchModal());
      }
      if (this.sectionsBtn) {
        this.sectionsBtn.addEventListener('click', () => this.toggleSections());
      }
      if (this.searchModal) {
        this.searchModal.setAttribute('aria-hidden', 'true');
        this.searchModal.addEventListener('click', e => {
          if (e.target === this.searchModal) {
            this.closeSearchModal();
          }
        });
      }
    },
    getFocusableInModal() {
      if (!this.searchModal) return [];
      const panel = this.searchModal.querySelector('.mobile-search-modal__content');
      if (!panel) return [];
      const sel =
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
      return Array.from(panel.querySelectorAll(sel)).filter(el => !el.hasAttribute('disabled'));
    },
    openSearchModal() {
      if (!this.searchModal) return;
      if (this.trapKeydown) {
        this.searchModal.removeEventListener('keydown', this.trapKeydown);
        this.trapKeydown = null;
      }
      this.lastFocusEl = document.activeElement;
      this.searchModal.removeAttribute('hidden');
      this.searchModal.classList.add('active');
      this.searchModal.setAttribute('aria-hidden', 'false');
      this.trapKeydown = e => {
        if (e.key !== 'Tab' || !this.searchModal.classList.contains('active')) return;
        const list = this.getFocusableInModal();
        if (list.length === 0) return;
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      };
      this.searchModal.addEventListener('keydown', this.trapKeydown);
      const input = document.getElementById('mobile-search-input');
      if (input) setTimeout(() => input.focus(), 100);
    },
    closeSearchModal() {
      if (!this.searchModal) return;
      if (this.trapKeydown) {
        this.searchModal.removeEventListener('keydown', this.trapKeydown);
        this.trapKeydown = null;
      }
      this.searchModal.setAttribute('hidden', '');
      this.searchModal.classList.remove('active');
      this.searchModal.setAttribute('aria-hidden', 'true');
      const restore = this.lastFocusEl;
      this.lastFocusEl = null;
      if (restore && typeof restore.focus === 'function') {
        restore.focus();
      }
    },
    toggleSections() {
      const toggle = document.getElementById('nav-toggle');
      if (toggle) toggle.click();
    },
  };

  const Keyboard = {
    init() {
      document.addEventListener('keydown', e => {
        const target = e.target;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
          if (e.key === 'Escape') {
            e.preventDefault();
            MobileUI.closeSearchModal();
            target.blur();
          }
          return;
        }
        switch (e.key) {
          case '/':
            e.preventDefault();
            Search.focus();
            break;
          case 'Escape':
            Navigation.setExpanded(false);
            MobileUI.closeSearchModal();
            break;
        }
      });
    },
  };

  const Form = {
    form: null,
    successMsg: null,
    fields: [],
    submitted: false,
    init() {
      const strings = t();
      this.form = document.getElementById('contact-form');
      this.successMsg = document.getElementById('form-success');
      if (!this.form || !this.successMsg) return;
      this.successMsg.textContent = '✓ ' + strings.formSuccess;
      this.fields = [
        {
          el: this.form.querySelector('#name'),
          errorEl: this.form.querySelector('#name-error'),
          label: this.form.querySelector('label[for="name"]')?.textContent?.trim() || 'Name',
        },
        {
          el: this.form.querySelector('#email'),
          errorEl: this.form.querySelector('#email-error'),
          label: this.form.querySelector('label[for="email"]')?.textContent?.trim() || 'Email',
        },
        {
          el: this.form.querySelector('#message'),
          errorEl: this.form.querySelector('#message-error'),
          label: this.form.querySelector('label[for="message"]')?.textContent?.trim() || 'Message',
        },
      ].filter(f => f.el);
      this.form.addEventListener('submit', e => this.handleSubmit(e, strings));
      this.form.addEventListener('reset', () => {
        this.submitted = false;
        this.clearErrors();
      });
      this.fields.forEach(field => {
        field.el.addEventListener('input', () => {
          if (this.submitted) this.validateField(field, strings);
        });
        field.el.addEventListener('blur', () => {
          if (this.submitted) this.validateField(field, strings);
        });
      });
    },
    handleSubmit(e, strings) {
      e.preventDefault();
      this.submitted = true;
      this.clearErrors();
      let firstInvalid = null;
      for (const field of this.fields) {
        const invalid = this.validateField(field, strings);
        if (invalid && !firstInvalid) firstInvalid = field.el;
      }
      if (firstInvalid) {
        firstInvalid.focus();
        this.successMsg.classList.remove('active');
        return;
      }
      this.successMsg.classList.add('active');
      this.successMsg.focus();
      this.form.reset();
      this.clearErrors();
      this.submitted = false;
      setTimeout(() => {
        this.successMsg.classList.remove('active');
      }, 5000);
    },
    validateField(field, strings) {
      const { el, errorEl, label } = field;
      if (el.validity.valid) {
        el.setAttribute('aria-invalid', 'false');
        el.removeAttribute('aria-errormessage');
        if (errorEl) errorEl.textContent = '';
        return false;
      }
      let message = '';
      if (el.validity.valueMissing) {
        message = strings.fieldRequired(label);
      } else if (el.validity.typeMismatch) {
        message =
          label.toLowerCase().includes('email') || el.type === 'email'
            ? strings.fieldEmail
            : strings.fieldRequired(label);
      } else if (el.validity.tooShort) {
        message = strings.fieldShort(label);
      } else {
        message = el.validationMessage;
      }
      el.setAttribute('aria-invalid', 'true');
      if (errorEl) {
        errorEl.textContent = message;
        if (errorEl.id) el.setAttribute('aria-errormessage', errorEl.id);
      }
      return true;
    },
    clearErrors() {
      for (const { el, errorEl } of this.fields) {
        el.removeAttribute('aria-invalid');
        el.removeAttribute('aria-errormessage');
        if (errorEl) errorEl.textContent = '';
      }
    },
  };

  /** Skeleton placeholders in #prompts-container until prompts JSON loads. */
  function showPromptsLoading(container) {
    if (!container) return;
    const strings = t();
    container.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.className = 'prompts-loading';
    wrap.setAttribute('role', 'status');
    wrap.setAttribute('aria-live', 'polite');
    wrap.setAttribute('aria-busy', 'true');
    const sr = document.createElement('span');
    sr.className = 'visually-hidden';
    sr.textContent = strings.loadingLabel;
    const grid = document.createElement('div');
    grid.className = 'prompts-skeleton';
    for (let i = 0; i < 6; i += 1) {
      const card = document.createElement('div');
      card.className = 'prompt-skeleton';
      const tEl = document.createElement('div');
      tEl.className = 'prompt-skeleton__title';
      const bEl = document.createElement('div');
      bEl.className = 'prompt-skeleton__body';
      const btn = document.createElement('div');
      btn.className = 'prompt-skeleton__btn';
      card.append(tEl, bEl, btn);
      grid.appendChild(card);
    }
    wrap.append(sr, grid);
    container.appendChild(wrap);
  }

  function buildNav(categories) {
    const ul = document.getElementById('primary-nav');
    if (!ul) return;
    ul.innerHTML = '';
    categories.forEach(cat => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.className = 'nav__link';
      a.href = `#${cat.id}`;
      if (cat.icon) {
        const iconSpan = document.createElement('span');
        iconSpan.setAttribute('aria-hidden', 'true');
        iconSpan.textContent = `${cat.icon} `;
        a.appendChild(iconSpan);
      }
      a.appendChild(document.createTextNode(cat.name));
      li.appendChild(a);
      ul.appendChild(li);
    });
  }

  function buildPromptsDom(data) {
    const container = document.getElementById('prompts-container');
    if (!container) return;
    const strings = t();
    container.innerHTML = '';
    data.categories.forEach(cat => {
      const dept = document.createElement('div');
      dept.className = `dept dept--${cat.id}`;
      dept.id = cat.id;
      dept.dataset.dept = cat.id;

      const header = document.createElement('div');
      header.className = 'dept__header';
      const icon = document.createElement('div');
      icon.className = 'dept__icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = cat.icon || '📁';
      const h2 = document.createElement('h2');
      h2.className = 'dept__title';
      h2.textContent = cat.name;
      const badge = document.createElement('span');
      badge.className = 'dept__badge';
      badge.textContent = strings.tasksBadge(cat.prompts.length);
      header.append(icon, h2, badge);

      const grid = document.createElement('div');
      grid.className = 'prompts';

      cat.prompts.forEach(p => {
        const kw = (p.keywords || []).join(' ').toLowerCase();
        const article = document.createElement('article');
        article.className = 'prompt-card';
        article.id = `prompt-${p.id}`;
        article.setAttribute('data-prompt-id', String(p.id));
        article.setAttribute('data-keywords', kw);
        const h3 = document.createElement('h3');
        h3.className = 'prompt-card__title';
        h3.textContent = p.title;
        const para = document.createElement('p');
        para.className = 'prompt-card__text';
        para.textContent = p.text;
        const actions = document.createElement('div');
        actions.className = 'prompt-card__actions';
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn-copy';
        btn.setAttribute('aria-label', `${strings.copyBtn}: ${p.title}`);
        btn.setAttribute('data-copy', p.copyText || p.text);
        const ic = document.createElement('span');
        ic.className = 'btn-copy__icon';
        ic.setAttribute('aria-hidden', 'true');
        ic.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>';
        btn.appendChild(ic);
        btn.appendChild(document.createTextNode(` ${strings.copyBtn}`));
        actions.appendChild(btn);
        article.append(h3, para, actions);
        grid.appendChild(article);
      });

      dept.append(header, grid);
      container.appendChild(dept);
    });
  }

  function applyChromeStrings() {
    const strings = t();
    const skip = document.querySelector('.skip-link');
    if (skip) {
      skip.textContent = strings.skipLink;
    }
    const navToggle = document.getElementById('nav-toggle');
    if (navToggle) {
      const span = navToggle.querySelector('span:last-child');
      if (span) span.textContent = strings.navToggle;
      navToggle.setAttribute('aria-label', strings.navToggle);
    }
    const nav = document.getElementById('primary-nav');
    if (nav) nav.setAttribute('aria-label', strings.navAria);
    const back = document.getElementById('back-to-top');
    if (back) back.setAttribute('aria-label', strings.backTop);
    const ft = document.getElementById('footer-contact-title');
    if (ft) ft.textContent = strings.footerTitle;
    const fl = document.getElementById('footer-contact-lead');
    if (fl) fl.textContent = strings.footerLead;
    const kh = document.getElementById('keyboard-hint');
    if (kh) kh.innerHTML = strings.keyboardHint;
    const libKh = document.getElementById('library-keyboard-hint');
    if (libKh) libKh.textContent = strings.libraryKeyboardHint;
  }

  function applyPromptDeepLink() {
    const url = new URL(window.location.href);
    let raw = url.searchParams.get('prompt');
    const hashMatch = window.location.hash.match(/^#prompt-(\d+)$/);
    if (!raw && hashMatch) raw = hashMatch[1];
    if (!raw) return;
    const pid = parseInt(raw, 10);
    if (!Number.isFinite(pid)) return;
    const card = document.querySelector(`[data-prompt-id="${pid}"]`);
    if (!card) return;

    Search.showAll();
    if (Search.input) {
      Search.input.value = '';
      if (Search.mobileInput) Search.mobileInput.value = '';
    }
    const strings = t();
    Search.updateResults(null, strings);
    Search.setEmptyHints(false, strings);
    const u = new URL(window.location.href);
    u.searchParams.delete('q');
    u.hash = `prompt-${pid}`;
    Search._suppressUrlSync = true;
    history.replaceState(null, '', `${u.pathname}${u.search}${u.hash}`);
    Search._suppressUrlSync = false;
    syncLangLinksQuery();

    const dept = card.closest('.dept');
    if (dept) dept.style.display = '';
    card.classList.add('prompt-card--target');
    requestAnimationFrame(() => {
      card.scrollIntoView({
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        block: 'nearest',
      });
    });
    window.setTimeout(() => card.classList.remove('prompt-card--target'), 2200);
  }

  function renderLoadError(container) {
    if (!container) return;
    const strings = t();
    container.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.className = 'load-error-wrap';
    const p = document.createElement('p');
    p.className = 'load-error';
    p.setAttribute('role', 'alert');
    p.textContent = strings.loadError;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'button load-error-retry';
    btn.textContent = strings.loadRetry;
    btn.addEventListener('click', () => {
      loadPromptsLibrary();
    });
    wrap.append(p, btn);
    container.appendChild(wrap);
  }

  let chromeModulesInitialized = false;
  let promptsSearchInitialized = false;

  function initChromeModules() {
    if (chromeModulesInitialized) return;
    chromeModulesInitialized = true;
    Theme.init();
    Toast.init();
    Progress.init();
    BackToTop.init();
    MobileUI.init();
    Keyboard.init();
    Navigation.init();
    Form.init();
  }

  async function loadPromptsLibrary() {
    const loc = getLocale();
    const dataLocale = SUPPORTED_DATA_LOCALES.includes(loc) ? loc : 'en';
    const base = assetsBase();
    const url = `${base}/data/prompts.${dataLocale}.json`;
    const promptsContainer = document.getElementById('prompts-container');

    applyChromeStrings();
    initLangLinkPreference();
    syncLangLinksQuery();
    initChromeModules();

    showPromptsLoading(promptsContainer);

    let data;
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) throw new Error(res.statusText);
      data = await res.json();
    } catch (err) {
      console.error('Failed to load prompts', err);
      renderLoadError(promptsContainer);
      return;
    }

    buildNav(data.categories);
    buildPromptsDom(data);

    const total = document.getElementById('hero-stat-tasks');
    const sections = document.getElementById('hero-stat-sections');
    if (total) total.textContent = String(data.totalPrompts || 0);
    if (sections) sections.textContent = String(data.categories.length);

    Clipboard.init();
    if (!promptsSearchInitialized) {
      Search.init();
      promptsSearchInitialized = true;
    } else {
      Search.refreshDom();
    }
    applyPromptDeepLink();
  }

  async function bootstrap() {
    await loadPromptsLibrary();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      bootstrap();
    });
  } else {
    bootstrap();
  }

  window.PromptLibrary = {
    Storage,
    Theme,
    Toast,
    Clipboard,
    Search,
    Progress,
    BackToTop,
    MobileUI,
    loadPromptsLibrary,
  };
})();
