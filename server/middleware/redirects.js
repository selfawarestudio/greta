export default defineEventHandler(async event => {
  const client = useSanity()
  let { pathname } = getRequestURL(event)

  const redirectData = await client.fetch(
    groq`*[_type == "redirect" && from.current == $pathname][0]{
    "from": from.current,
    "to": to.current
  }`,
    { pathname },
  )

  if (redirectData) {
    if (!redirectData.to) {
      await sendRedirect(event, '/')
    }
    await sendRedirect(event, redirectData.to)
  }
})
