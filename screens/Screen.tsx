import React, { Component, FC, useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import Swiper from '../components/Swiper'
import BienvenueFirst from './BienvenueFirst'
import BienvenueView from './BienvenueView'
import { mocks } from '../constants'

type illustration = {id: number, source?:  NodeRequire, textP?: string, textS?: string}
type illustrations = Array<illustration>
interface Props {}

const Screen: FC<Props> = () => {
  const [illustrations, setIllustration] = useState<illustrations | null>(null)

  useEffect(() => {
    setIllustration(mocks.illustrations)
  }, [])

    return (
      <Swiper>
        {illustrations?.map((illustration) =>
          illustration?.id === 1 ? (
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