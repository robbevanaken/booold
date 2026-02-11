import { defineEventHandler, getRequestHeader, sendRedirect } from 'h3'

export default defineEventHandler((event) => {
  const host = getRequestHeader(event, 'host')
  const proto = getRequestHeader(event, 'x-forwarded-proto') || 'https'

  // Force HTTPS of www → non-www
  if (host === 'www.boooldstudio.com' || proto === 'http') {
    const newUrl = 'https://boooldstudio.com' + event.node.req.url
    return sendRedirect(event, newUrl, 301)
  }
})
