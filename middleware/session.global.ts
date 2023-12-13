// middleware/session.global.ts
export default defineNuxtRouteMiddleware(async (to, _from) => {
  const auth = useAuthStore()

  // Allow 404 page to show
  if (!to.matched.length) return

  // if user is not logged in, redirect to '/' when not navigating to a public page.
  const publicRoutes = ['/', '/login', '/registration']
  console.log(auth.player)
  if (!auth.player) {
    if (!publicRoutes.includes(to.path)) return navigateTo('/login')
  }
})
