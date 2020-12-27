import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Text from './Text';
import { theme } from '../../constants';

const TermsOfServices = () => {
  return (
    <ScrollView style={styles.container}>
      <Text bold gray height={theme.sizes.twiceTen * 1.2} style={styles.text}>
        Date d'entrée en vigueur: 01 janvier 2021
      </Text>

      <Text
        caption={true}
        gray
        height={theme.sizes.twiceTen * 1.2}
        style={styles.text}>
        Cette page vous informe de nos politiques concernant la collecte,
        l'utilisation et la divulgation de données personnelles lorsque vous
        utilisez notre Service et les choix que vous avez associés à ces
        données. Nous utilisons vos données pour fournir et améliorer le
        service. En utilisant le Service, vous acceptez la collecte et
        l'utilisation des informations conformément à cette politique. Sauf
        indication contraire dans cette politique de confidentialité, les termes
        utilisés dans cette politique de confidentialité ont la même
        signification que dans nos conditions générales, accessibles à partir de
        https://www.helkrapp.com
      </Text>

      <Text
        gray
        style={{ fontFamily: 'josefinBold', fontSize: theme.sizes.htwiceTen }}>
        Collecte et utilisation des informations
      </Text>

      <Text
        caption
        gray
        height={theme.sizes.twiceTen * 1.2}
        style={styles.text}>
        Nous collectons plusieurs types d'informations à des fins diverses afin
        de vous fournir et d'améliorer notre service.{' '}
      </Text>

      <Text
        gray
        style={{
          fontFamily: 'josefinBold',
          fontSize: theme.sizes.htwiceTen * 0.8
        }}>
        Données personnelles
      </Text>

      <Text
        caption
        gray
        height={theme.sizes.twiceTen * 1.2}
        style={styles.text}>
        Lors de l'utilisation de notre Service, nous pouvons vous demander de
        nous fournir certaines informations personnellement identifiables qui
        peuvent être utilisées pour vous contacter ou vous identifier («Données
        personnelles»). Les informations personnellement identifiables peuvent
        inclure, mais sans s'y limiter: Numéro de téléphone, Prénom et Nom et
        Pièces d'identité.
      </Text>

      <Text
        gray
        style={{
          fontFamily: 'josefinBold',
          fontSize: theme.sizes.htwiceTen * 0.8
        }}>
        Données d'utilisation
      </Text>

      <Text
        caption
        gray
        height={theme.sizes.twiceTen * 1.2}
        style={styles.text}>
        Nous pouvons également collecter des informations sur l'accès et
        l'utilisation du Service («Données d'utilisation»). Ces données
        d'utilisation peuvent inclure des informations telles que l'adresse de
        protocole Internet de votre smartphone (par exemple l'adresse IP), la
        version du smartphone, les détails des offres que vous proposez.
      </Text>

      <Text
        gray
        style={{
          fontFamily: 'josefinBold',
          fontSize: theme.sizes.htwiceTen * 0.8
        }}>
        Transfert de données
      </Text>

      <Text
        caption
        gray
        height={theme.sizes.twiceTen * 1.2}
        style={styles.text}>
        Vos informations, y compris les données personnelles, peuvent être
        transférées et conservées sur des ordinateurs situés en dehors de votre
        état, province, pays ou autre juridiction gouvernementale où les lois
        sur la protection des données peuvent différer de celles de votre
        juridiction.
      </Text>
      <Text
        caption
        gray
        height={theme.sizes.twiceTen * 1.2}
        style={styles.text}>
        Etant donné que vous résidez en dehors des États-Unis et que nous
        choisissons d'héberger nos données aux États-Unis, veuillez noter que
        nous transférons les données, y compris les données personnelles, aux
        États-Unis et les traitons là-bas.
      </Text>
      <Text
        caption
        gray
        height={theme.sizes.twiceTen * 1.2}
        style={styles.text}>
        Votre consentement à cette politique de confidentialité suivi de votre
        soumission de ces informations représente votre accord à ce transfert.
      </Text>
      <Text
        caption
        gray
        height={theme.sizes.twiceTen * 1.2}
        style={styles.text}>
        Helkr développement, SARL prendra toutes les mesures raisonnablement
        nécessaires pour garantir que vos données sont traitées en toute
        sécurité et conformément à la présente politique de confidentialité et
        aucun transfert de vos données personnelles n'aura lieu à une
        organisation ou à un pays à moins qu'il n'y ait des contrôles adéquats
        en place, y compris le sécurité de vos données et autres informations
        personnelles.
      </Text>

      <Text
        gray
        style={{ fontFamily: 'josefinBold', fontSize: theme.sizes.htwiceTen }}>
        Divulgation des données {'\n'}
      </Text>

      <Text
        gray
        style={{
          fontFamily: 'josefinBold',
          fontSize: theme.sizes.htwiceTen * 0.8
        }}
        gray>
        Exigences légales
      </Text>

      <Text
        caption
        gray
        height={theme.sizes.twiceTen * 1.2}
        style={styles.text}>
        Helkr développement, SARL peut divulguer vos données personnelles en
        croyant de bonne foi qu'une telle action est nécessaire pour: {'\n'} *
        Se conformer à une obligation légale {'\n'} * Pour protéger et défendre
        les droits ou la propriété de Helkr développement, SARL.
        {'\n'} * Pour prévenir ou enquêter sur d'éventuels actes répréhensibles
        en relation avec le Service {'\n'} * Pour protéger la sécurité
        personnelle des utilisateurs du Service ou du public Pour se protéger
        contre la responsabilité légale
      </Text>

      <Text
        gray
        style={{
          fontFamily: 'josefinBold',
          fontSize: theme.sizes.htwiceTen * 0.8
        }}>
        Sécurité des données
      </Text>

      <Text
        caption
        gray
        height={theme.sizes.twiceTen * 1.2}
        style={styles.text}>
        La sécurité de vos données est importante pour nous, mais n'oubliez pas
        qu'aucune méthode de transmission sur Internet ou méthode de stockage
        électronique n'est sécurisée à 100%. Bien que nous nous efforcions
        d'utiliser des moyens commercialement acceptables pour protéger vos
        données personnelles, nous ne pouvons garantir leur sécurité absolue.
      </Text>

      <Text
        gray
        style={{
          fontFamily: 'josefinBold',
          fontSize: theme.sizes.htwiceTen * 0.8
        }}>
        Les fournisseurs de services
      </Text>

      <Text
        caption
        gray
        height={theme.sizes.twiceTen * 1.2}
        style={styles.text}>
        Nous pouvons employer des sociétés tierces et des individus pour
        faciliter notre service («fournisseurs de services»), pour fournir le
        service en notre nom, pour exécuter des services liés au service ou pour
        nous aider à analyser la façon dont notre service est utilisé. Ces tiers
        n'ont accès à vos données personnelles que pour effectuer ces tâches en
        notre nom et sont tenus de ne pas les divulguer ou les utiliser à
        d'autres fins.
      </Text>

      <Text
        gray
        style={{
          fontFamily: 'josefinBold',
          fontSize: theme.sizes.htwiceTen * 0.8
        }}>
        Confidentialité des enfants
      </Text>

      <Text
        caption
        gray
        height={theme.sizes.twiceTen * 1.2}
        style={styles.text}>
        <Text
          bold
          gray
          height={theme.sizes.twiceTen * 0.8}
          style={{
            fontFamily: 'josefinBold',
            fontSize: theme.sizes.htwiceTen * 0.6
          }}>
          {'\n'}
          Notre Service ne s'adresse à personne de moins de 18 ans («Enfants»).
        </Text>
        {'\n'}
        Nous ne collectons pas sciemment d'informations personnellement
        identifiables de toute personne de moins de 18 ans. Si vous êtes un
        parent ou un tuteur et que vous savez que vos enfants nous ont fourni
        des données personnelles, veuillez nous contacter. Si nous apprenons que
        nous avons collecté des données personnelles d'enfants sans vérification
        du consentement parental, nous prenons des mesures pour supprimer ces
        informations de nos serveurs.
      </Text>

      <Text
        gray
        style={{
          fontFamily: 'josefinBold',
          fontSize: theme.sizes.htwiceTen * 0.8
        }}>
        Modifications de cette politique de confidentialité
      </Text>

      <Text
        caption
        gray
        height={theme.sizes.twiceTen * 1.2}
        style={styles.text}>
        Nous pouvons mettre à jour notre politique de confidentialité de temps à
        autre. Nous vous informerons de tout changement en publiant la nouvelle
        politique de confidentialité sur cette page. {'\n'}
        Nous vous informerons par message et / ou par un avis bien visible sur
        notre service, avant que le changement ne devienne effectif, et nous
        mettrons à jour la «date d'entrée en vigueur» en haut de cette politique
        de confidentialité.
        {'\n'}
        Il vous est conseillé de consulter périodiquement cette politique de
        confidentialité pour tout changement. Les modifications apportées à
        cette politique de confidentialité sont effectives lorsqu'elles sont
        publiées sur cette page.
      </Text>

      <Text
        gray
        style={{
          fontFamily: 'josefinBold',
          fontSize: theme.sizes.htwiceTen * 0.8
        }}>
        Nous contacter
      </Text>

      <Text
        caption
        gray
        height={theme.sizes.twiceTen * 1.2}
        style={styles.text}>
        Si vous avez des questions sur cette politique de confidentialité,
        veuillez nous contacter.{'\n'}
        Par téléphone: +33780813564
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: { marginBottom: theme.sizes.header },
  container: { marginVertical: theme.sizes.hinouting }
});

export default TermsOfServices;
