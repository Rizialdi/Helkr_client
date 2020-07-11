import React, { FC } from 'react';
import { Block, Button, Text } from '../../shareComponents';
import { CompletedOrIssue } from './ModalItemManageCandidates';

interface Props {
  currentIndex?: number;
  totalChildren?: number;
  isLast?: boolean;
  onSubmit?: () => void;
  nextStep?: () => void;
  onChangeValue?: (a: string, b: string) => void;
  onSelected?: () => void;
  openModal?: (a: boolean) => void;
  setCompletedOrIssue: React.Dispatch<React.SetStateAction<CompletedOrIssue>>;
}
const CompletedOrIssueComponent: FC<Props> = ({
  setCompletedOrIssue,
  ...props
}) => {
  return (
    <Block flex={false} margin={[20, 20]}>
      <Button
        secondary
        onPress={() => {
          setCompletedOrIssue('completed');
          props.nextStep && props.nextStep();
        }}>
        <Text bold center>
          Marquer comme terminé
        </Text>
      </Button>
      <Button
        accent
        onPress={() => {
          setCompletedOrIssue('issue');
          props.nextStep && props.nextStep();
        }}>
        <Text bold center>
          Signaler un problème
        </Text>
      </Button>
    </Block>
  );
};

export default CompletedOrIssueComponent;
