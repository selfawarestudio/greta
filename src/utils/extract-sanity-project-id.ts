export function extractSanityProjectId(output: string): string | null {
  // This regular expression looks for the phrase "Project ID: " followed by any characters
  // that are not whitespace, capturing this sequence into a group.
  const regex = /Project ID:\s+(\S+)/
  const match = output.match(regex)

  // If a match is found, return the first captured group, which contains the Project ID.
  // Otherwise, return null if no match is found.
  return match?.[1] ?? null
}
