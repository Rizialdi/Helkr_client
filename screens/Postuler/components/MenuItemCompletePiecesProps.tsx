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
}
