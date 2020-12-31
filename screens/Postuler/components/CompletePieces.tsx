import React, { FC, useState, useEffect } from 'react';
import { Block, Button, Text, StackedToBottom } from '../../sharedComponents';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { useStoreState, useStoreActions } from '../../../models';
//In addition, you'll also need to enable the iCloud Application Service in your App identifier.
// DocumentPicker
import { ScrollView, AsyncStorage, ActivityIndicator } from 'react-native';
import { getPermissionAsync, getFileName } from '../../../utils';
import MultiStepMenuCompletePieces from './MultiStepMenuCompletePieces';
import { ListOfPieces } from './ListOfPieces';
import { ReactNativeFile } from 'apollo-upload-client';
import { useAddVerificationpiecesMutation, Maybe } from '../../../graphql';
import { ModalItemInfos } from '../../sharedComponents';
import { theme } from '../../../constants';

interface Props {
  listOfPieces: ListOfPieces;
  referenceId: string;
  setOpenModal: () => void;
  setModalOverlaySize: React.Dispatch<React.SetStateAction<number>>;
}
const CompletePieces: FC<Props> = ({
  listOfPieces,
  referenceId,
  setOpenModal,
  setModalOverlaySize
}) => {
  return (
    <MultiStepMenuCompletePieces
      listOfPieces={listOfPieces}
      referenceId={referenceId}
      setOpenModal={setOpenModal}
      setModalOverlaySize={setModalOverlaySize}>
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
  const getStatus = (referenceId = '') => {
    const didSentDocumentForRef = Object.entries(
      sendVerifPiecesReferenceIds
    ).find(([key, _], __) => key === referenceId);
    return didSentDocumentForRef ? didSentDocumentForRef[1] : '';
  };

  const getModalSizeOverlay = (status: string): number => {
    if (status === 'refuse') {
      return 0.32;
    }
    if (status === 'enattente') return 0.3;
    if (status === 'accepte') return 0.3;
    return 0.5;
  };

  const statusOfApplication = getStatus(referenceId);
  useEffect(() => {
    props.setModalOverlaySize(getModalSizeOverlay(statusOfApplication));
  }, []);

  return statusOfApplication === 'enattente' ? (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginBottom: theme.sizes.hinouting * 2
        }}>
        <Block
          flex={false}
          margin={[theme.sizes.hinouting * 0.8, theme.sizes.inouting * 0.8]}>
          <Text center bold>
            Nous avons pris en compte votre envoi de pièces
          </Text>
          <Text
            style={{ textAlign: 'justify' }}
            vertical={[theme.sizes.border * 1.5, 0]}>
            Notre équipe est actuellement en cours d'analyse de votre profil.
            Vous serez informé sous peu de la validation de votre profil pour ce
            type d'offre.
          </Text>

          <Text
            vertical={[
              theme.sizes.htwiceTen * 0.75,
              theme.sizes.htwiceTen * 0.75
            ]}>
            Sachez qu'aucune de ces pièces n'est / ne sera transmise à une
            entité tièrce. Elles seront essentiellement utilisées par notre
            équipe pour la validation de votre profil.
          </Text>
        </Block>
      </ScrollView>
    </>
  ) : statusOfApplication === 'refuse' ? (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginBottom: theme.sizes.hinouting * 2
        }}>
        <Block
          flex={false}
          margin={[theme.sizes.hinouting * 0.8, theme.sizes.inouting * 0.8]}>
          <Text center bold>
            Nous avons pris en compte votre envoi de pièces
          </Text>
          <Text
            style={{ textAlign: 'justify' }}
            vertical={[theme.sizes.border * 1.5, 0]}>
            Après analyse de votre profil et des pièces fournies, nous sommes au
            regret de vous informé que vous ne pourrez pas postuler à ce type
            d'offre. Veuillez essayer avec une autre offre et changer vos
            préferences.
          </Text>

          <Text
            vertical={[
              theme.sizes.hinouting * 0.75,
              theme.sizes.hinouting * 0.75
            ]}>
            Sachez qu'aucune de vos pièces n'est / ne sera transmise à une
            entité tièrce. Elles sont essentiellement utilisées par notre équipe
            pour la validation de votre profil.
          </Text>
        </Block>
      </ScrollView>
    </>
  ) : statusOfApplication === 'accepte' ? (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginBottom: theme.sizes.hinouting * 2
        }}>
        <Block
          flex={false}
          margin={[theme.sizes.hinouting * 0.8, theme.sizes.inouting * 0.8]}>
          <Text center bold>
            Nous avons pris en compte votre envoi de pièces
          </Text>
          <Text
            style={{ textAlign: 'justify' }}
            vertical={[theme.sizes.border * 1.5, 0]}>
            Votre profil a été validé pour ce type de mission. Veuillez fermer
            et recharger votre application.
          </Text>

          <Text
            vertical={[
              theme.sizes.hinouting * 0.75,
              theme.sizes.hinouting * 0.75
            ]}>
            Sachez qu'aucune de vos pièces n'est / ne sera transmise à une
            entité tièrce. Elles sont essentiellement utilisées par notre équipe
            pour la validation de votre profil.
          </Text>
        </Block>
      </ScrollView>
    </>
  ) : (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginBottom: theme.sizes.hinouting * 2
        }}>
        <Block
          flex={false}
          margin={[theme.sizes.hinouting * 0.8, theme.sizes.inouting * 0.8]}>
          <Text center bold>
            Veuillez completer votre profil afin de pouvoir postuler à cette
            offre
          </Text>
          <Text
            style={{ textAlign: 'justify' }}
            vertical={[theme.sizes.border * 1.5, 0]}>
            {'\n'}
            Chez <Text bold> Helkr</Text>, nous mettons un point d'honneur à
            satisfaire et à garantir le service proposé. Pour ce faire, nous
            devons savoir quelques points sur vous et determiner si vos
            compétences sont en accord avec la mission proposée.
            {'\n'}
            Vous trouverez ci-dessous une liste de pièces à fournir:
            {'\n'}
          </Text>
          {documentList.map((item, idx) => (
            <Text
              key={idx}
              vertical={[theme.sizes.hinouting / 5, theme.sizes.inouting / 5]}>
              <Text bold>- {item.titre} </Text>
              {item.description}
            </Text>
          ))}
          <Text
            vertical={[
              theme.sizes.hinouting * 0.75,
              theme.sizes.hinouting * 0.75
            ]}>
            Sachez qu'aucune de ces pièces n'est / ne sera transmise à une
            entité tièrce. Elles seront essentiellement utilisées par notre
            équipe pour la validation de votre profil.
          </Text>
        </Block>
      </ScrollView>
      <Block margin={[0, theme.sizes.inouting * 0.8]}>
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
  const { netWorkStatus } = useStoreState(state => state.NetWorkStatus);
  const [errorModal, setErrorModal] = useState<boolean>(false);

  const [
    addPiecesMutation,
    { loading, error }
  ] = useAddVerificationpiecesMutation();

  const pickImage = async (label: string) => {
    if (await getPermissionAsync(Permissions.CAMERA_ROLL)) {
      try {
        const result = await ImagePicker.launchImageLibraryAsync({
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
      .then(async ({ data, errors }) => {
        if (data?.addVerificationpieces) {
          const previousData: Maybe<string> | string =
            (await AsyncStorage.getItem('sendVerifPiecesReferenceIds')) || '{}';

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
          props.setOpenModal();
        }
        if (errors || error) {
          setErrorModal(true);
        }
      })
      .catch(err => {
        setErrorModal(true);
        throw new Error(`${error}, ${err}`);
      });
  };

  return (
    <>
      <ScrollView
        style={{
          height: theme.sizes.screenHeight / 2
        }}
        showsVerticalScrollIndicator={false}>
        <Block
          flex={false}
          margin={[
            theme.sizes.inouting * 0.8,
            theme.sizes.inouting,
            theme.sizes.hinouting * 4.64
          ]}>
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
                <Text
                  bold
                  center
                  numberOfLines={1}
                  horizontal={theme.sizes.twiceTen * 0.75}>
                  {!isTrue ? item.titre : 'Modifier'}
                </Text>
              </Button>
            );
          })}
        </Block>
        {errorModal && (
          <ModalItemInfos
            errorReporting
            information={'Erreur'}
            description={
              "Une erreur s'est produite pendant l'envoi de vos pièces. Veuillez réessayer plus tard."
            }
            timer={1}
            callBack={props.setOpenModal}
          />
        )}
      </ScrollView>
      <Block flex={false} margin={[0, theme.sizes.inouting * 0.8]}>
        <StackedToBottom>
          <Button
            disabled={!netWorkStatus}
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
