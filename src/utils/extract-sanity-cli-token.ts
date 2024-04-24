export function extractSanityCliToken(output: string): string | null {
  // This regular expression looks for the phrase "Auth token: " followed by any characters
  // that are not whitespace, capturing this sequence into a group.
  const regex = /Auth token:\s+(\S+)/
  const match = output.match(regex)

  // If a match is found, return the first captured group, which contains the token, split on single quotes and get the token itself.
  // Otherwise, return null if no match is found.
  return match?.[1]?.split(`'`)[1] ?? null
}
