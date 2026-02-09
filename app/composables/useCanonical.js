export function useCanonical() {
  const route = useRoute()
  const baseUrl = 'https://boooldstudio.com'

  // Remove trailing slash for consistency
  const path = route.path === '/' ? '' : route.path.replace(/\/$/, '')
  const canonicalUrl = `${baseUrl}${path}`

  useHead({
    link: [
      {
        rel: 'canonical',
        href: canonicalUrl
      }
    ]
  })
}
