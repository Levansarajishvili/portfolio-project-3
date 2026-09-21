// "Four stops so far": number words for the project count (digits above ten).
const NUMBER_WORDS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
const countWord = (count) => NUMBER_WORDS[count] ?? String(count);

const en = {
  meta: {
    title: 'Levan Sarajishvili, front-end developer in Tbilisi',
    description:
      'Portfolio of Levan Sarajishvili, a front-end developer in Tbilisi who builds responsive interfaces with React, JavaScript and Tailwind.',
  },
  nav: {
    skip: 'Skip to content',
    primary: 'Main',
    work: 'Work',
    skills: 'Skills',
    about: 'About',
    contact: 'Contact',
    menu: 'Menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
  },
  map: {
    label: 'Map of Georgia with Tbilisi marked as the start of the route',
    style: 'Map style',
    day: 'Day',
    night: 'Night',
    sea: [
      { text: 'Black Sea', lang: 'en' },
      { text: 'შავი ზღვა', lang: 'ka' },
    ],
    range: 'Greater Caucasus',
    cities: {
      tbilisi: 'Tbilisi',
      kutaisi: 'Kutaisi',
      batumi: 'Batumi',
      zugdidi: 'Zugdidi',
      telavi: 'Telavi',
      gori: 'Gori',
      poti: 'Poti',
    },
  },
  hero: {
    fullName: 'Levan Sarajishvili',
    firstName: 'Levan',
    lastName: 'Sarajishvili',
    role: 'Front-end developer in Tbilisi. I build responsive interfaces with React, JavaScript and Tailwind, from Georgian-language news sites to interactive maps.',
    seeWork: 'See my work',
    downloadCv: 'Download CV',
    status: 'Open to new opportunities',
  },
  work: {
    title: 'Selected work',
    intro: (count) =>
      count === 1
        ? 'One stop so far. It taught me something I did not know when I started it.'
        : `${countWord(count)} stops so far. Each one taught me something I did not know when I started it.`,
    profile: {
      label: (count) => `Route profile: ${count} ${count === 1 ? 'project' : 'projects'} on a climb that keeps going`,
      start: 'Tbilisi, start',
      next: 'Next: full-stack',
      climbing: 'Still climbing',
    },
    stack: 'Built with',
    demo: 'Open live demo',
    code: 'Read the code',
    newTab: '(opens in a new tab)',
    fieldNote: 'Field note',
    demoSoon: 'Live demo coming soon',
    screenshotAlt: (title) => `Screenshot of ${title}`,
  },
  projects: {
    'map-of-georgia': {
      title: 'Map of Georgia',
      description:
        'An interactive map of Georgia’s regions built with Leaflet. Region boundaries, city markers and a switch between base layers.',
      note: 'Learned to load GeoJSON, style regions and work inside a library’s API.',
    },
    'leo-news': {
      title: 'Leo News',
      description:
        'A Georgian-language news site with section navigation and a full-width lead story. Layout and interactions in jQuery.',
      note: 'Learned how Georgian text changes line length, spacing and the whole layout.',
    },
    'shopping-cart': {
      title: 'Shopping cart',
      description:
        'A product grid and cart in React. Add items from the catalogue and review them on a separate cart page.',
      note: 'Learned to think in components and keep the cart state in one place.',
    },
    'candy-shop': {
      title: 'Candy Shop',
      description: 'A restaurant menu with category filters for breakfast, lunch, shakes and dinner.',
      note: 'Learned to filter data on the page without a reload.',
    },
    'map-layers': {
      title: 'Map Layers',
      description:
        'An interactive map of Georgia built with OpenLayers. Six base maps, from OpenStreetMap and satellite to NASA’s Earth at Night, plus a marker layer you can switch on and off.',
      note: 'Learned to add new layers, place markers at exact coordinates and stack thematic layers on one map.',
    },
  },
  skills: {
    title: 'Skills',
    intro: 'Filter by layer. Solid frames are shipped in a project, dashed ones are still under construction.',
    filterLabel: 'Filter skills',
    filters: { all: 'All', frontend: 'Front-end', backend: 'Back-end', tools: 'Tools' },
    usedIn: 'Used in',
    status: 'Status',
    shipped: 'Shipped',
    learning: 'Under construction',
    showing: (count) => `Showing ${count} ${count === 1 ? 'skill' : 'skills'}`,
    items: {
      'html-css': 'All projects',
      javascript: 'All projects',
      react: 'Shopping cart, this portfolio',
      tailwind: 'This portfolio',
      jquery: 'Leo News',
      leaflet: 'Map of Georgia',
      openlayers: 'Map Layers',
      nodejs: 'Learning now',
      mongodb: 'Learning now',
      git: 'Every project',
      figma: 'Layouts before code',
      vscode: 'Daily editor',
      vite: 'Build tool for this site',
    },
  },
  about: {
    title: 'About',
    bio: [
      'I’m Levan, a front-end developer from Tbilisi. I learn by building: pick something I can’t do yet, get stuck, read, try again, ship it. That loop is the route on this page.',
      'I care about the details that make an interface feel simple: spacing, states, keyboard focus, loading.',
    ],
    next: {
      title: 'Next waypoint: my first full-stack project',
      body: 'Learning Node.js and MongoDB to give my interfaces their own API. Not there yet, getting closer every week.',
    },
    facts: [
      { label: 'Based in', value: 'Tbilisi, Georgia (GMT+4)' },
      { label: 'Languages', value: 'Georgian, English' },
      { label: 'Focus', value: 'Front-end, React' },
      { label: 'Status', value: 'Open to new opportunities' },
    ],
  },
  contact: {
    title: 'Write to me',
    intro: 'The route ends here, and the next one could start with your message.',
    details: 'Contact details',
    phone: 'Phone',
    location: 'Location',
    locationValue: 'Tbilisi, Georgia',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    form: {
      label: 'Contact form',
      name: 'Your name',
      email: 'Your email',
      message: 'Message',
      honeypot: 'Company (leave this empty)',
      placeholders: {
        name: 'Nino Beridze',
        email: 'you@company.com',
        message: 'Hi Levan, we have a junior front-end role and…',
      },
      send: 'Send message',
      sending: 'Sending…',
      note: {
        endpoint: 'Goes straight to my inbox.',
        mailto: 'Opens your email app with the message ready.',
      },
      errors: {
        nameRequired: 'Please enter your name.',
        nameShort: 'Your name should be at least 2 characters.',
        emailRequired: 'Please enter your email.',
        emailInvalid: 'Enter the full address, for example nino@company.ge',
        messageRequired: 'Please write a message.',
        messageShort: 'A few more words, please (at least 10 characters).',
        messageLong: 'Please keep it under 2000 characters.',
      },
      toast: {
        successTitle: 'Message sent',
        successBody: (email) => `Thanks! I’ll reply to ${email}.`,
        mailtoTitle: 'Opening your email app',
        mailtoBody: (email) => `If nothing happens, write to ${email}.`,
        errorTitle: 'Couldn’t send the message',
        errorBody: (email) => `Please try again or write to ${email}.`,
      },
    },
  },
  toast: { region: 'Notifications', close: 'Close' },
  footer: { credit: 'Base map: Natural Earth. Terrain is illustrative.' },
  notFound: {
    title: 'Off the map',
    body: 'This page is not on any route. Let’s get you back to the start.',
    back: 'Back to Tbilisi',
  },
};

export default en;
