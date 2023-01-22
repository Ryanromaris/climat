import React, { ReactNode, useEffect } from 'react';
import classNames from 'classnames';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';

export interface ISimpleDialogProps {
  title?: string;
  content?: ReactNode;
  handleConfirm?: () => any;
  handleClose?: () => any;
  handleCancel?: () => any;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
  cancelButtonEnabled?: boolean;
  closeIconButtonEnabled?: boolean;
  layerClassname?: string;
  onOpen?: any;
  isOpen?: boolean;
  onClose?: any;
  cancelRef?: any;
}

function SimpleDialog({
  title,
  content = '내용',
  handleConfirm = () => null,
  handleClose = () => null,
  handleCancel,
  confirmButtonLabel = '확인',
  cancelButtonLabel = '닫기',
  cancelButtonEnabled = false,
  closeIconButtonEnabled = false,
  layerClassname,
  isOpen = false,
  onClose,
  cancelRef,
}: ISimpleDialogProps) {
  useEffect(() => {
    document.querySelector('body')?.classList.toggle('open_dialog');
    return () => {
      document.querySelector('body')?.classList.toggle('open_dialog');
    };
  });
  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>{content}</AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => {
                  handleCancel ? handleCancel() : onClose();
                }}
              >
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={() => {
                  handleConfirm();
                  onClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default SimpleDialog;
