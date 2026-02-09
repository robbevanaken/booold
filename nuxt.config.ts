// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['@@/assets/css/main.css'],

  devServer: {
    port: 3010,
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/sitemap'
  ],

  site: {
    url: 'https://boooldstudio.com',
  },

  sitemap: {
    strictNuxtContentPaths: true,
  },

  ssr: true,
  
  vite: {
    optimizeDeps: {
      include: ['gsap', 'gsap/ScrambleTextPlugin', 'gsap/SplitText']
    }
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { property: 'og:image', content: '/images/other/OGIMAGE.png' },
        { property: 'og:image:type', content: 'image/png' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: '/images/other/OGIMAGE.png' },
      ],
      link: [
        {
          rel: 'preload',
          href: '/fonts/DarkParadise-Italic.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: ''
        },
        {
          rel: 'preload',
          href: '/fonts/Inter-VariableFont.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: ''
        },
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebSite',
                '@id': 'https://boooldstudio.com/#website',
                'url': 'https://boooldstudio.com',
                'name': 'Booold Studio',
                'description': 'Design-driven websites that combine clarity, performance, and character.',
                'publisher': {
                  '@id': 'https://boooldstudio.com/#organization'
                }
              },
              {
                '@type': 'Organization',
                '@id': 'https://boooldstudio.com/#organization',
                'name': 'Booold Studio',
                'url': 'https://boooldstudio.com',
                'logo': {
                  '@type': 'ImageObject',
                  'url': 'https://boooldstudio.com/images/other/OGIMAGE.png'
                }
              },
              {
                '@type': 'SiteNavigationElement',
                '@id': 'https://boooldstudio.com/#navigation',
                'name': 'Main Navigation',
                'hasPart': [
                  {
                    '@type': 'WebPage',
                    'name': 'About',
                    'url': 'https://boooldstudio.com/about'
                  },
                  {
                    '@type': 'WebPage',
                    'name': 'Contact',
                    'url': 'https://boooldstudio.com/contact'
                  }
                ]
              }
            ]
          })
        }
      ]
    }
//     head: {
//       script: [
//         {
//           innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
// new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
// j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
// 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
// })(window,document,'script','dataLayer','GTM-TXRPTPKT');`,
//         }
//       ],
//       noscript: [
//         {
//           innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TXRPTPKT" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
//           tagPosition: 'bodyOpen'
//         }
//       ]
//     }
  },
})
