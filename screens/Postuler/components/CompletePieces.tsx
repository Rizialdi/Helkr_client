import React, { FC, useState } from 'react';
import { Block, Button, Text, StackedToBottom } from '../../shareComponents';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { useStoreState } from '../../../models';
//In addition, you'll also need to enable the iCloud Application Service in your App identifier.
// DocumentPicker
import { Dimensions, ScrollView } from 'react-native';
import { getPermissionAsync, getFileName } from '../../../utils';
import MultiStepMenuCompletePieces from './MultiStepMenuCompletePieces';
import { ListOfPieces } from './ModalItemApplyToOffering';
import { ReactNativeFile } from 'apollo-upload-client';
import { useAddVerificationpiecesMutation } from '../../../graphql';

const { height } = Dimensions.get('screen');

interface Props {
  listOfPieces: ListOfPieces;
}
const CompletePieces: FC<Props> = ({ listOfPieces }) => {
  const { jobAuthorizations } = useStoreState(store => store.JobAuthorization);
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

interface ImagesPicked {
  [label: string]: ReactNativeFile;
}

const SecondScreen = ({ ...props }) => {
  const documentList = props.listOfPieces as ListOfPieces;

  const [imagesPicked, setImagesPicked] = useState<ImagesPicked>();
  const [
    addPiecesMutation,
    { data, loading, called, error }
  ] = useAddVerificationpiecesMutation();

  const pickImage = async (label: string) => {
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
          const type = result
            ? `image/${String(result?.uri).split('.')[1]}`
            : '';

          const uri: ReactNativeFile = new ReactNativeFile({
            uri: `data:${type};base64,${result?.base64}`,
            type,
            name: getFileName(result?.uri)
          });

          imagesPicked
            ? setImagesPicked({ ...imagesPicked, [label]: uri })
            : setImagesPicked({ [label]: uri });
        }
      } catch (error) {
        throw new Error(`Invalid image ${error}`);
      }
    }
  };

  const onSubmit = () => {
    const toSendStringified = JSON.stringify(imagesPicked);
    addPiecesMutation({
      variables: { id: '', listofpieces: toSendStringified }
    });
    console.log(data, loading, called, error);
  };
  return (
    <>
      <ScrollView
        style={{
          height: height * 0.75
        }}
        showsVerticalScrollIndicator={false}>
        <Block flex={false} margin={[0, 25, 48 * 1 + 20]}>
          <Text center bold vertical={[0, 15]}>
            Veuillez completer votre profil afin de pouvoir postuler à une offre
          </Text>
          {documentList?.map((item, idx) => {
            const isTrue =
              imagesPicked && Object.keys(imagesPicked).includes(item.label);
            return (
              <Button
                key={idx}
                gray={!isTrue}
                secondary={isTrue}
                onPress={() => pickImage(item.label)}>
                <Text bold center>
                  {!isTrue ? item.titre : 'Modifier'}
                </Text>
              </Button>
            );
          })}
        </Block>
      </ScrollView>
      <Block flex={false} margin={[0, 20]}>
        <StackedToBottom>
          <Button
            secondary={
              imagesPicked &&
              documentList &&
              Object.keys(imagesPicked).length === documentList?.length
            }
            onPress={() =>
              imagesPicked &&
              documentList &&
              Object.keys(imagesPicked).length === documentList?.length &&
              onSubmit()
            }>
            <Text center bold>
              Soummettre
            </Text>
          </Button>
        </StackedToBottom>
      </Block>
    </>
  );
};

export default CompletePieces;
