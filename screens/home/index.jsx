import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import Header from '../../components/header'

const Home = ({route}) => {
  return (
    <View style={styles.container}>
      <Header route={route} />
    </View>
  )
}

const styles = {
  container: {
    "flex": 1,
    "backgroundColor": "whitesmoke"
  }
}

export default Home