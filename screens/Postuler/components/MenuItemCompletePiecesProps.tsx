import { ListOfPieces } from './ModalItemApplyToOffering';
export interface MenuItemCompletePiecesProps {
  children: JSX.Element;
  values: object;
  listOfPieces: ListOfPieces;
  referenceId: string;
  categoryItem: string;
  currentIndex: number;
  totalChildren: number;
  isLast: boolean;
  onSubmit: () => void;
  nextStep: () => void;
  onChangeValue: (a: string, b: string) => void;
  setOpenModal: React.Dispatch<React.SetStateAction<Boolean>>;
  setModalOverlaySize: React.Dispatch<React.SetStateAction<number>>;
}
