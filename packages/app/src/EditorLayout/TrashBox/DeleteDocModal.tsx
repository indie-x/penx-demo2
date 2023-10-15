import { Box } from '@fower/react'
import { Trans } from '@lingui/macro'
import {
  Button,
  Modal,
  ModalClose,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useModalContext,
} from 'uikit'
import { ModalNames } from '@penx/constants'
import { Doc } from '@penx/model'

const Footer = () => {
  const { data } = useModalContext<Doc>()
  console.log('data-----:', data)
  return (
    <Box toCenterY gap3>
      <ModalClose asChild>
        <Button colorScheme="white">
          <Trans>Cancel</Trans>
        </Button>
      </ModalClose>
      <Button colorScheme="red500">
        <Trans>Delete</Trans>
      </Button>
    </Box>
  )
}

export const DeleteDocModal = () => {
  return (
    <Modal name={ModalNames.DeleteDoc}>
      <ModalOverlay />
      <ModalContent w={[500]} column gap4 toCenterX>
        <ModalCloseButton />

        <ModalHeader mb2>
          <Trans>Are you sure delete it permanently?</Trans>
        </ModalHeader>

        <Box>
          <Trans>Once deleted, You can't undo this action.</Trans>
        </Box>
        <Footer />
      </ModalContent>
    </Modal>
  )
}
