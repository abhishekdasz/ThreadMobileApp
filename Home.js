import { View, Text, Button } from 'react-native'
import React from 'react'
import Register from './Register'

const Home = (props) => {
  return (
    <View>
      <Text>Home</Text>
      <Button title='Regiter' onPress={()=>props.navigation.navigate("Register")}/>
    </View>
  )
}

export default Home