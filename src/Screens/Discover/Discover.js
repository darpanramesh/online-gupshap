import React from 'react'
import {StyleSheet, SafeAreaView, ScrollView, Image, Alert, TouchableOpacity, View } from 'react-native'
import Constants from 'expo-constants';
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Drawer, Card, CardItem, Container, Header, Left,Button, Body, Title, Text, Icon, Right } from 'native-base';


class Discover extends React.Component {
    static navigationOptions = {
        header: null
    };
    closeDrawer() { this.drawer._root.close() };

    openDrawer() {
        this.drawer._root.open()
    };
    render() {
        let value = this.props.navigation.state.params;
        console.log(value)
        return (
            <SafeAreaView style={styles.container}>
                {/* <Drawer ref={(ref) => { this.drawer = ref; }}
                    content={<Sidebar path={this.props.navigation} navigator={this.navigator} onClose={() => this.closeDrawer()} />}
                > */}
                    <Header >
                        <Left>
                            <Button onPress={() => this.openDrawer()} transparent>
                                <Icon name='menu' />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{ textAlign: 'center' }}>Online Chat</Title>
                        </Body>
                    </Header>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>Discover Page</Text>
            </View>
            {/* </Drawer> */}
            </SafeAreaView>
    )
}
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    container1: {
        flex: 1,
        marginTop: '2%'
    },
    scrollView: {
        marginHorizontal: 1,
    },
    text: {
        fontSize: 42,
    },
    parent: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
});
export default Discover