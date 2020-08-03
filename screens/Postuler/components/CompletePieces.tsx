import React, { FC, useState } from 'react';
import { Block, Button, Text, StackedToBottom } from '../../sharedComponents';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { useStoreState, useStoreActions } from '../../../models';
//In addition, you'll also need to enable the iCloud Application Service in your App identifier.
// DocumentPicker
import {
  Dimensions,
  ScrollView,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import { getPermissionAsync, getFileName } from '../../../utils';
import MultiStepMenuCompletePieces from './MultiStepMenuCompletePieces';
import { ListOfPieces } from './ModalItemApplyToOffering';
import { ReactNativeFile } from 'apollo-upload-client';
import { useAddVerificationpiecesMutation } from '../../../graphql';
import { Maybe } from '../../../graphql/helpkr-types';

const { height } = Dimensions.get('screen');

interface Props {
  listOfPieces: ListOfPieces;
  referenceId: string;
  setOpenModal: React.Dispatch<React.SetStateAction<Boolean>>;
}
const CompletePieces: FC<Props> = ({
  listOfPieces,
  referenceId,
  setOpenModal
}) => {
  return (
    <MultiStepMenuCompletePieces
      listOfPieces={listOfPieces}
      referenceId={referenceId}
      setOpenModal={setOpenModal}>
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
  const referenceId = props.referenceId as string;

  const { sendVerifPiecesReferenceIds } = useStoreState(
    store => store.SendVerifPiecesReferenceIds
  );
  const getStatus = (referenceId: string = '') => {
    const didSentDocumentForRef = Object.entries(
      sendVerifPiecesReferenceIds
    ).find(([key, _], __) => key === referenceId);
    return didSentDocumentForRef ? didSentDocumentForRef[1] : '';
  };
  const statusOfApplication = getStatus(referenceId);

  return statusOfApplication === 'enattente' ? (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block flex={false} margin={[20, 20]}>
          <Text center bold>
            Nous avons pris en compte votre envoi de pièces
          </Text>
          <Text style={{ textAlign: 'justify' }}>
            Notre équipe est actuellement en cours d'analyse de votre profil.
            Vous serez informé sous peu de la validation de votre profil pour ce
            type d'offre.
          </Text>

          <Text vertical={[15, 15]}>
            Sachez qu'aucune de ces pièces n'est / ne sera transmise à une
            entité tièrce. Elles seront essentiellement utilisées par notre
            équipe pour la validation de votre profil.
          </Text>
        </Block>
      </ScrollView>
    </>
  ) : statusOfApplication === 'refuse' ? (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block flex={false} margin={[20, 20]}>
          <Text center bold>
            Nous avons pris en compte votre envoi de pièces
          </Text>
          <Text style={{ textAlign: 'justify' }}>
            Après analyse de votre profil et des pièces fournies, nous sommes au
            regret de vous informé que vous ne pourrez pas postuler à ce type
            d'offre. Veuillez essayer avec une autre offre et changer vos
            préferences.
          </Text>

          <Text vertical={[15, 15]}>
            Sachez qu'aucune de ces pièces n'est / ne sera transmise à une
            entité tièrce. Elles seront essentiellement utilisées par notre
            équipe pour la validation de votre profil.
          </Text>
        </Block>
      </ScrollView>
    </>
  ) : (
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
  const referenceId = props.referenceId as string;
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

  const { setsendVerifPiecesReferenceIds } = useStoreActions(
    action => action.SendVerifPiecesReferenceIds
  );

  const onSubmit = () => {
    const listofpieces = JSON.stringify(imagesPicked);
    addPiecesMutation({
      variables: { id: '', listofpieces, referenceId }
    })
      .then(async ({ data }) => {
        if (data?.addVerificationpieces) {
          const previousData: Maybe<string> | string =
            (await AsyncStorage.getItem('sendVerifPiecesReferenceIds')) || '';
          const parsedPreviousData = await JSON.parse(previousData);
          await AsyncStorage.setItem(
            'sendVerifPiecesReferenceIds',
            JSON.stringify({
              ...parsedPreviousData,
              ...{ [referenceId]: 'enattente' }
            })
          ).then(() => {
            setsendVerifPiecesReferenceIds({
              ...parsedPreviousData,
              ...{ [referenceId]: 'enattente' }
            });
          });

          props.setOpenModal(false);
        }
      })
      .catch(err => {
        throw new Error(`${error}, ${err}`);
      });
  };

  return (
    <>
      <ScrollView
        style={{
          height: height * 0.75
        }}
        showsVerticalScrollIndicator={false}>
        <Block flex={false} margin={[20, 25, 48 * 1 + 20]}>
          <Text center bold vertical={[0, 15]}>
            Veuillez completer votre profil afin de pouvoir postuler à cette
            offre
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
                <Text bold center numberOfLines={1} horizontal={15}>
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
            {loading ? (
              <ActivityIndicator size={'small'} />
            ) : (
              <Text bold center>
                Soumettre
              </Text>
            )}
          </Button>
        </StackedToBottom>
      </Block>
    </>
  );
};

export default CompletePieces;
