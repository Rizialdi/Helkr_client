import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import Swiper from '../components/Swiper'
import BienvenueFirst from './BienvenueFirst'
import BienvenueView from './BienvenueView'

export class Screen extends Component {
  render() {
    const { illustrations } = this.props
    
    return (
      <Swiper navigation={this.props.navigation}>
        {illustrations.map((illustration) =>
          illustration.id === 1 ? (
            <BienvenueFirst key={illustration.id} />
          ) : (
              <BienvenueView style={styles.slide} key={illustration.id}
                source={illustration['source']}
                textP={illustration['textP']}
                textS={illustration['textS']} />
            )
        )
        }
      </Swiper>
    )
  }
}

Screen.defaultProps = {
  illustrations: [
    { id: 1 },
    {
      id: 2, source: require("../assets/icons/phone1.svg"),
      textP: 'Formulez votre demande de services',
      textS: 'Repondez à un simple formulaire pour preciser votre demande de services'
    },
    {
      id: 3, source: require("../assets/icons/phone1-1.svg"),
      textP: 'Obtenez des suggestions de profil',
      textS: 'Les avis d’autres utilisateurs permettent de vous faire une idée de l’agent'
    },
    {
      id: 4, source: require("../assets/icons/phone1-2.svg"),
      textP: "Convenez d’un lieu de rendez-vous",
      textS: 'Repondez à un simple formulaire pour preciser votre demande de services'
    },
    {
      id: 5, source: require("../assets/icons/phone1-2.svg"),
      textP: "Convenez d’un lieu de rendez-vous",
      textS: 'Repondez à un simple formulaire pour preciser votre demande de services'
    },
  ]
};

const styles = StyleSheet.create({
  // Slide styles
  slide: {
    flex: 1, // Take up all screen
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    backgroundColor: "white"
  },
  // Header styles
  header: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 15
  },
  // Text below header
  text: {
    color: "black",
    fontSize: 18,
    marginHorizontal: 40,
    textAlign: "center"
  }
});

export default Screen