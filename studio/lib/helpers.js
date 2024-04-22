export function resolvePath(slug, type) {
  return {
    page: `/${slug}`,
  }[type]
}

export function blocksToString(blocks = [], separator = '\n\n') {
  return blocks
    .map(block =>
      block._type !== 'block' || !block.children
        ? ''
        : block.children.map(child => child.text).join(''),
    )
    .join(separator)
}
