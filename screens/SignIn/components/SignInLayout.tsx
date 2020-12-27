import React, { FC, useState } from 'react';
import {
  Layout,
  LayoutProps,
  Text,
  Button,
  Block,
  TermsOfServices
} from '../../sharedComponents';
import { TouchableOpacity, Modal } from 'react-native';
import { theme } from '../../../constants';
import { useStoreState } from '../../../models';

interface Props extends LayoutProps {
  children: JSX.Element;
}
const SignInLayout: FC<Props> = ({ children, ...props }) => {
  const [showTerms, setShowTerms] = useState<boolean>(false);
  const { themeColors } = useStoreState(state => state.Preferences);

  return (
    <Layout {...{ props }}>
      <>
        {children}
        <TouchableOpacity onPress={() => setShowTerms(true)}>
          <Text
            small
            center
            style={{
              paddingTop: 15,
              textAlign: 'center'
            }}>
            Vous devez être agé(e) d’au moins 18 ans pour vous enregistrez.
            {'\n'}
            Apprenez plus sur nos{' '}
            <Text
              small
              style={{
                textDecorationLine: 'underline',
                color: themeColors.primary
              }}>
              politiques
            </Text>
          </Text>
        </TouchableOpacity>
        {showTerms && (
          <Modal animated={true} animationType={'slide'} visible={showTerms}>
            <Block padding={[35, 10, 20, 10]} space="between">
              <Text style={{ fontFamily: 'josefinBold', fontSize: 25 }}>
                Politiques de services
              </Text>
              <TermsOfServices />
              <Block middle padding={[theme.sizes.base / 2, 0]}>
                <Button secondary onPress={() => setShowTerms(false)}>
                  <Text center bold>
                    Je comprends
                  </Text>
                </Button>
              </Block>
            </Block>
          </Modal>
        )}
      </>
    </Layout>
  );
};

export default SignInLayout;
