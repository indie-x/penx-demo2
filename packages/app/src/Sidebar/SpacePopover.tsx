import { Box } from '@fower/react'
import { t, Trans } from '@lingui/macro'
import {
  Avatar,
  AvatarFallback,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'uikit'
import { useSpaces } from '@penx/hooks'
import { CreateSpaceModal } from '../EditorLayout/CreateSpaceModal/CreateSpaceModal'
import { ImportSpaceModal } from '../EditorLayout/ImportSpaceModal/ImportSpaceModal'
import { SettingsModal } from '../EditorLayout/SettingsModal/SettingsModal'
import { SpaceList } from './SpaceList'

export const SpacePopover = () => {
  const { activeSpace } = useSpaces()

  return (
    <>
      <CreateSpaceModal />
      <ImportSpaceModal />
      <Popover offset={{ crossAxis: 10 }}>
        <PopoverTrigger asChild>
          {({ close }) => (
            <Box
              className="currentSpace"
              textXL
              fontBold
              toCenterY
              toBetween
              gap2
              bgZinc200--hover
              px2
              py4
              cursorPointer
              rounded2XL
              my2
            >
              <Box toCenterY gap2>
                <Avatar>
                  <AvatarFallback>{activeSpace?.name}</AvatarFallback>
                </Avatar>
                <Box>{activeSpace?.name}</Box>
              </Box>
              <Box
                inlineFlex
                opacity-0
                opacity-100--$currentSpace--hover
                onClick={(e) => {
                  close()
                  e.stopPropagation()
                }}
              >
                <SettingsModal></SettingsModal>
              </Box>
            </Box>
          )}
        </PopoverTrigger>
        <PopoverContent w-300>
          <SpaceList />
        </PopoverContent>
      </Popover>
    </>
  )
}