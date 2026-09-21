import mapOfGeorgia from '@/assets/projects/map-of-georgia.webp';
import leoNews from '@/assets/projects/leo-news.webp';
import shoppingCart from '@/assets/projects/shopping-cart.webp';
import candyShop from '@/assets/projects/candy-shop.webp';
import mapLayers from '@/assets/projects/map-layers.webp';

/**
 * Language-independent project data. Titles, descriptions and field notes
 * live in src/i18n/en.js and src/i18n/ka.js under projects[id].
 * codeUrl: null falls back to the GitHub repositories page.
 */
export const projects = [
  {
    id: 'map-of-georgia',
    stack: ['leaflet', 'javascript', 'html-css'],
    image: { src: mapOfGeorgia, width: 1240, height: 378, position: '32% 50%' },
    demoUrl: 'https://levan-s-map-by-using-leaflet.vercel.app/',
    codeUrl: null, // TODO: repository URL
  },
  {
    id: 'leo-news',
    stack: ['jquery', 'javascript', 'html-css'],
    image: { src: leoNews, width: 990, height: 583, position: '0% 0%' },
    demoUrl: 'https://levansarajishvili.github.io/Leo-News/',
    codeUrl: null,
  },
  {
    id: 'shopping-cart',
    stack: ['react', 'javascript', 'html-css'],
    image: { src: shoppingCart, width: 1263, height: 492, position: '0% 50%' },
    demoUrl: 'https://shoppingapp-nine.vercel.app/cart',
    codeUrl: null, // TODO: repository URL
  },
  {
    id: 'candy-shop',
    stack: ['javascript', 'html-css'],
    image: { src: candyShop, width: 1263, height: 503, position: '50% 0%' },
    demoUrl: 'https://levansarajishvili.github.io/The-best-Candy-shop/',
    codeUrl: null, // TODO: repository URL
  },
  {
    id: 'map-layers',
    stack: ['openlayers', 'javascript', 'html-css'],
    image: { src: mapLayers, width: 1118, height: 508, position: '50% 50%' },
    demoUrl: 'https://new-openlayers-project.vercel.app/',
    codeUrl: null, // TODO: repository URL
  },
];

