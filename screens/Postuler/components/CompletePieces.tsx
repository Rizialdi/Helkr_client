import React, { FC, useState } from 'react';
import { Block, Button, Text, StackedToBottom } from '../../shareComponents';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { useStoreState } from '../../../models';
//In addition, you'll also need to enable the iCloud Application Service in your App identifier.
// DocumentPicker
import {
  Dimensions,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import { getPermissionAsync } from '../../../utils';
import MultiStepMenuCompletePieces from './MultiStepMenuCompletePieces';
import { ListOfPieces } from './ModalItemApplyToOffering';
const { height } = Dimensions.get('screen');

interface Props {
  listOfPieces: ListOfPieces;
}
const CompletePieces: FC<Props> = ({ listOfPieces }) => {
  const [
    imagePicked,
    setImagePicked
  ] = useState<ImagePicker.ImagePickerResult | null>(null);

  const { jobAuthorizations } = useStoreState(store => store.JobAuthorization);

  const pickImage = async () => {
    if (await getPermissionAsync(Permissions.CAMERA_ROLL)) {
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.5,
          base64: true
        });
        if (!result.cancelled) {
          setImagePicked(result);
        }
      } catch (error) {
        throw new Error(`Invalid image ${error}`);
      }
    }
  };

  return (
    <MultiStepMenuCompletePieces listOfPieces={listOfPieces}>
      <MultiStepMenuCompletePieces.MenuItemCompletePieces>
        <FirstScreen />
      </MultiStepMenuCompletePieces.MenuItemCompletePieces>
      <MultiStepMenuCompletePieces.MenuItemCompletePieces>
        <SecondScreen />
      </MultiStepMenuCompletePieces.MenuItemCompletePieces>
    </MultiStepMenuCompletePieces>
  );
};

const FirstScreen = ({ ...props }) => {
  const documentList = props.listOfPieces as ListOfPieces;
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block flex={false} margin={[20, 20]}>
          <Text center bold>
            Veuillez completer votre profil afin de pouvoir postuler à une offre
          </Text>
          <Text style={{ textAlign: 'justify' }}>
            {'\n'}
            Chez <Text bold> Helkr</Text>, nous mettons un point d'honneur à
            satisfaire et à garantir le service proposé. Pour ce faire, nous
            devons savoir quelques points sur vous et determiner si vos
            compétences sont en accord avec la mission proposée
            {'\n'}
            Vous trouverez ci-dessous une liste de pièces à fournir:
            {'\n'}
          </Text>
          {documentList?.map((item, idx) => (
            <Text key={idx} vertical={[5, 5]}>
              <Text bold>- {item.titre} </Text>
              {item.description}
            </Text>
          ))}
          <Text vertical={[15, 15]}>
            Sachez qu'aucune de ces pièces n'est / ne sera transmise à une
            entité tièrce. Elles seront essentiellement utilisées par notre
            équipe pour la validation de votre profil.
          </Text>
        </Block>
      </ScrollView>
      <Block margin={[0, 20]}>
        <StackedToBottom>
          <Button secondary onPress={() => props.nextStep()}>
            <Text bold center>
              Commencer
            </Text>
          </Button>
        </StackedToBottom>
      </Block>
    </>
  );
};

const SecondScreen = ({ ...props }) => {
  const [casierFile, setCasierFile] = useState<string>('');

  const actions = {
    'Un casier judiciaire': setCasierFile,
    'Un certificat de professionalisation':
      'afin de garantir le service proposé au client',
    "Une carte d'identité / séjour en cours de validité":
      'afin de confirmer votre identité.'
  };
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block flex={false} margin={[20, 20]}>
          <Text center bold>
            Veuillez completer votre profil afin de pouvoir postuler à une offre
          </Text>
          <Button secondary>
            <Text bold center>
              Joindre useNewChannelSubscription
            </Text>
          </Button>
        </Block>
      </ScrollView>
    </>
  );
};

export default CompletePieces;
