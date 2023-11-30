import { useState } from 'react'
import { Box } from '@fower/react'
import { useAtomValue } from 'jotai'
import { useDebouncedCallback } from 'use-debounce'
import { NodeEditor } from '@penx/editor'
import { isAstChange } from '@penx/editor-queries'
import { NodeProvider, useNodes } from '@penx/hooks'
import { db } from '@penx/local-db'
import { Node } from '@penx/model'
import { nodeToSlate } from '@penx/serializer'
import { NodeService } from '@penx/service'
import { routerAtom } from '@penx/store'
import { withBulletPlugin } from '../plugins/withBulletPlugin'
import { MobileNav } from './DocNav/MobileNav'
import { PCNav } from './DocNav/PCNav'
import { LinkedReferences } from './LinkedReferences'

interface Props {
  index: number
  node: Node
}

export function PanelItem({ node, index }: Props) {
  const { nodes, nodeList } = useNodes()
  const { name } = useAtomValue(routerAtom)
  const nodeService = new NodeService(node, nodes)

  const [saving, setSaving] = useState(false)

  const content = nodeToSlate(node.raw, nodeList.rawNodes)

  // console.log('==========:', content, nodeList.rawNodes)

  const debouncedSaveNodes = useDebouncedCallback(async (value: any[]) => {
    await nodeService.savePage(node.raw, value[0], value[1])
  }, 400)

  return (
    <NodeProvider value={{ index, node, nodeService }}>
      <Box relative h-100vh flex-1 borderRight>
        <Box
          overflowYAuto
          h={['calc(100vh - 48px)', '100vh']}
          pl={[0, 16]}
          pr={[0, 4]}
          py0
        >
          <MobileNav />
          {name === 'NODE' && <PCNav />}
          <Box w-100p>
            <Box
              mx-auto
              maxW-800
              mt={[0, 0, 32]}
              style={{
                wordBreak: 'break-all',
              }}
            >
              <NodeEditor
                index={index}
                plugins={[withBulletPlugin]}
                // content={[content[1]]}
                content={content}
                node={node}
                onChange={async (value, editor) => {
                  if (isAstChange(editor)) {
                    if (saving) return
                    setSaving(true)
                    await debouncedSaveNodes(value)
                    setSaving(false)
                  }
                }}
              />
              <LinkedReferences node={node} />
            </Box>
          </Box>
        </Box>
      </Box>
    </NodeProvider>
  )
}