import { defineEventHandler, getRequestHeader, sendRedirect } from 'h3'

export default defineEventHandler((event) => {
  const host = getRequestHeader(event, 'host') || ''

  // Force www → non-www
  if (host.startsWith('www.')) {
    return sendRedirect(event, 'https://boooldstudio.com' + event.node.req.url, 301)
  }
})
