import React from 'react'
import { Dimensions, View } from 'react-native'
import { Text } from 'react-native-paper'

const Tags = () => {
  return (
    <View style={styles.container}>
     <View style={styles.tagContainer}>
      <Text>#beach</Text>
     </View>
     <View>
      <Text>Add Button</Text>
     </View>
    </View>
  )
}

const styles = {
 container: {
  flexDirection: "row",
  justifyContent: "space-between",
  width: Dimensions.get('window').width,
  marginTop: 20,
  marginBottom: 20,
  marginLeft: 10
 },
 tagContainer: {
  flexDirection: "row",
  flex: 1,
  flexWrap: "wrap"
 }
}

export default Tags