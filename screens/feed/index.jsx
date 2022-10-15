import React from 'react'
import { Dimensions, View } from 'react-native'
import { Text } from 'react-native-paper'
import Header from '../../components/header'
import Tags from '../../components/tags'

const Feed = ({route}) => {
  return (
    <View style={styles.container}>
     <Header route={route} />
     <Tags />
    </View>
  )
}

const styles = {
  container: {
    width: Dimensions.get("window").width,
  }
}

export default Feed