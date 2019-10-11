import React from 'react'
import { View, Button, SafeAreaView } from 'react-native'
import { Text } from 'react-native-elements'
import Tabnavigator from '../../Config/Navigation/TabNavigation'


class Home extends React.Component {

render() {
    return (
        <View style={{flex:1,justifyContent:'center'}}>
            <Text>Home</Text>
        </View>
            // <Tabnavigator />
    )
}
}

export default Home