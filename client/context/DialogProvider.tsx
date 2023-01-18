import { useDisclosure } from '@chakra-ui/react';
import React, { ReactNode, useState } from 'react';
import ReactDOM from 'react-dom';
import SimpleDialog, {
  ISimpleDialogProps,
} from '../components/common-components/SimpleDialog';

enum DialogType {
  Simple,
  Share,
  Image,
}

interface IDialogProviderProps {
  children: ReactNode;
}

interface IDialogContextValues {
  openSimpleDialog: (props: ISimpleDialogProps) => any;
  openErrorDialog: (e: any) => any;
}

export const DialogContext = React.createContext<IDialogContextValues>({
  openSimpleDialog: () => null,
  openErrorDialog: () => null,
});

function DialogProvider({ children }: IDialogProviderProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const [type, setType] = useState(DialogType.Simple);

  const [simpleDialogOptions, setSimpleDialogOptions] =
    useState<ISimpleDialogProps | null>(null);

  const openSimpleDialog = (simpleDialogProps: ISimpleDialogProps) => {
    onOpen();
    setType(DialogType.Simple);
    setSimpleDialogOptions(simpleDialogProps);
  };

  const openErrorDialog = (error: any) => {
    const errorMessage =
      error?.response?.data?.message ?? '시스템에 문제가 발생했습니다.';

    onOpen();
    setType(DialogType.Simple);
    setSimpleDialogOptions({
      content: <span dangerouslySetInnerHTML={{ __html: errorMessage }} />,
    });
  };

  const contextValues: IDialogContextValues = {
    openSimpleDialog,
    openErrorDialog,
  };

  const renderSimpleDialog = () => {
    const { handleConfirm, handleClose, handleCancel } =
      simpleDialogOptions || {};
    return ReactDOM.createPortal(
      <SimpleDialog
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        cancelRef={cancelRef}
        {...simpleDialogOptions}
        handleConfirm={() => {
          if (handleConfirm) {
            handleConfirm();
          }
          onClose();
          setSimpleDialogOptions(null);
        }}
        handleCancel={() => {
          if (handleCancel) {
            handleCancel();
          }
          onClose();
          setSimpleDialogOptions(null);
        }}
        handleClose={() => {
          if (handleClose) {
            handleClose();
          }
          onClose();
          setSimpleDialogOptions(null);
        }}
      />,
      document.body
    );
  };

  return (
    <DialogContext.Provider value={contextValues}>
      {children}
      {isOpen && type === DialogType.Simple && renderSimpleDialog()}
    </DialogContext.Provider>
  );
}

export default DialogProvider;
