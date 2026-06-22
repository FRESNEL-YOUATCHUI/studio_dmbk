export default function manifest() {
  return {
    name: 'ID Craft',
    short_name: 'ID Craft',
    description: 'Studio créatif africain spécialisé en design graphique, branding et création de sites web.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAFAF8',
    theme_color: '#B68C45',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
