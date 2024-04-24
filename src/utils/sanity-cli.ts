export function createSanityCli({
  projectId,
  token,
}: {
  projectId: string
  token: string
}) {
  return async (endpoint: string, body: Record<string, any>) => {
    const response = await fetch(
      `https://api.sanity.io/v2021-06-07/projects/${projectId}${endpoint}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      },
    )

    if (!response.ok) {
      throw new Error(`The Sanity CLI response was not ok.`)
    }

    return await response.json()
  }
}
