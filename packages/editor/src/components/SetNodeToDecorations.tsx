import { Editor, Element } from 'slate'
import { useSlate } from 'slate-react'
import { ElementType } from '@penx/editor-shared'
import '@penx/editor-types'
import { getChildNodeToDecorations } from '../utils/getChildNodeToDecorations'

const mergeMaps = <K, V>(...maps: Map<K, V>[]) => {
  const map = new Map<K, V>()

  for (const m of maps) {
    for (const item of m) {
      map.set(...item)
    }
  }

  return map
}

// precalculate editor.nodeToDecorations map to use it inside decorate function then
export const SetNodeToDecorations = () => {
  // should use useSlate to rerender
  const editor = useSlate()

  const blockEntries = Array.from(
    Editor.nodes(editor, {
      at: [],
      mode: 'highest',
      match: (n) =>
        Element.isElement(n) &&
        [ElementType.code_block, ElementType.front_matter_block].includes(
          n.type,
        ),
    }),
  )

  const nodeToDecorations = mergeMaps(
    ...blockEntries.map((item) => getChildNodeToDecorations(item as any)),
  )

  editor.nodeToDecorations = nodeToDecorations as any

  return null
}