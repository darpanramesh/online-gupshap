import React from 'react'
import { StyleSheet, View, Text, Button, TouchableOpacity, AsyncStorage,Image, YellowBox } from 'react-native'
import Firebase from '../../Config/Firebase/firebase'
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Facebook from 'expo-facebook';
import logo from '../../Images/logo.png'
import _ from 'lodash';


YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};

export default class Login extends React.Component {
    static navigationOptions = {
        header: null
    }
    componentDidMount() {
        var that = this
        Firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // console.log(user.uid)
                that.props.navigation.navigate("Home", { userData: user.providerData, photo: user.photoURL })
            }
            // handle it
        });
    }
    async loginWithFacebook() {
        try {
            const {
                type,
                token,
            } = await Facebook.logInWithReadPermissionsAsync('404746663570807', {
                permissions: ['public_profile', 'email'],
            });
            if (type === 'success' && token) {
                var credential = await Firebase.auth.FacebookAuthProvider.credential(token);
                await Firebase.auth().signInAndRetrieveDataWithCredential(credential)
                    .then((result) => {
                        // console.log('Id', result.user.uid)
                        let data = result.additionalUserInfo.profile

                        let obj = {
                            name: data.name,
                            uid: result.user.uid,
                            url: data.picture.data.url
                        }
                        // console.log("obj==>", obj)
                        Firebase.firestore().collection("users").doc(obj.uid).set(obj);
                        console.log("Result==>", result)
                    })
                    .catch((err) => {
                        console.log('Error==>', err)
                    })

            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            console.log(`Facebook Login Error: ${message}`);
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Image source={require('../../Images/logo.png')} />
                </View>
                <Icon.Button
                    name="facebook"
                    onPress={() => this.loginWithFacebook()}
                    backgroundColor="#3b5998"
                >Login with Facebook</Icon.Button>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});