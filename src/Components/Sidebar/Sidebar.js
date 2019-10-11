import React, { Component } from 'react';
import { Image } from 'react-native'
import { View, Text, List, ListItem, Button, Icon } from 'native-base';

export default class SideBar extends Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Button onPress={this.props.onClose} transparent>
                    <Icon name='arrow-back' />
                </Button>
                {/* <Text onPress={this.props.onClose}><Image style={{width:40, height:40}} src={require('../../Images/back.png')} />Back</Text> */}
                <List style={{ backgroundColor: 'white' }}>
                    <ListItem>
                        <Text onPress={() => this.props.path.navigate("Home")}>Home</Text>
                    </ListItem>
                    <ListItem>
                        <Text onPress={() => this.props.path.navigate("Login")}>LogOut</Text>
                    </ListItem>
                </List>
            </View>
        )
    }
}