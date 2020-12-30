import React, { FC } from 'react';
import { Block, Button, Text } from '../../sharedComponents';
import CompletedOrIssue from './MenuItemCheckout';
import { useStoreState } from '../../../models';
import { theme } from '../../../constants';

interface Props {
  currentIndex?: number;
  totalChildren?: number;
  isLast?: boolean;
  onSubmit?: () => void;
  nextStep?: () => void;
  onChangeValue?: (a: string, b: string) => void;
  onSelected?: () => void;
  openModal?: (a: boolean) => void;
  setCompletedOrIssue: React.Dispatch<
    React.SetStateAction<typeof CompletedOrIssue>
  >;
}
const CompletedOrIssueComponent: FC<Props> = ({
  setCompletedOrIssue,
  ...props
}) => {
  const { netWorkStatus } = useStoreState(state => state.NetWorkStatus);

  return (
    <Block
      flex={false}
      margin={[theme.sizes.hinouting * 0.8, theme.sizes.inouting * 0.8]}>
      <Button
        secondary
        disabled={!netWorkStatus}
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
        disabled={!netWorkStatus}
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
