import React from 'react'
import { StyleSheet, SafeAreaView, ScrollView, Image, Alert, TouchableOpacity, View, AsyncStorage, YellowBox } from 'react-native'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Title } from 'native-base';
import Constants from 'expo-constants';
import Firebase from '../../Config/Firebase/firebase'
import {Avatar, Badge} from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};


class People extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super();
        this.state = {
            AllUsers: [],
            data:false,
            userData:''
        }
    }
    
    async  componentDidMount() {
        var that = this
        await Firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                Firebase.firestore().collection("users").doc(user.uid).get().then(res => {
                    let data = res.data()
                    that.setState({
                        userData: data
                    })
                })
            }
        });
        let { AllUsers } = this.state
        await Firebase.firestore().collection('users').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    if (this.state.userData.uid !== doc.data().uid) {
                        AllUsers.push(doc.data());
                    }
                    this.setState({
                        AllUsers,
                            data:true

                    })
                });
            });

        }
        Logout = (path) => {
            Firebase.auth().signOut().then(function () {
              console.log('Signed Out');
              path.navigate("Login")
            }, function (error) {
              console.error('Sign Out Error', error);
            });
          } 

    render() {
        let value = this.props.navigation.state.params.userData[0];
        let photo = this.props.navigation.state.params.photo
        
        // console.log(value, photo);
        console.log(this.state.User);
        return (
            <SafeAreaView style={styles.container}>
                <Header style={{ backgroundColor: 'white', height: 80 }}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('UserDetail',{user:this.state.userData})}>
                    <Left style={{marginTop: 15,marginRight:5}}>
                        {this.state.data ? 
                        <View>
                        <Avatar 
                        rounded
                        source={{ uri: photo }}
                        size='medium'
                        />
                        <Badge
                        status='success'
                        containerStyle={{position:'absolute',bottom:1,left:36,}} />  
                         </View>:
                         <Text>{''}</Text>
                    }
                        {/* <Image style={{ width: 50, height: 50, borderRadius: 50,marginTop: 15,marginLeft:5 }}  /> */}
                    </Left>
                </TouchableOpacity>
                    <Body>
                        <Title style={{ color: 'black', fontSize: 15 }}>{value.displayName}</Title>
                    </Body>
                    <Button style={{ backgroundColor: 'white ' }} transparent onPress={() => this.Logout(this.props.navigation)} >
                          {/* <Text style={{ color: 'Black' }}>LogOut</Text> */}
        
                          <Icon name='md-log-out' size={20} color='black' />
                    </Button>
                </Header>
                <View >
                    <Text>All User's Page</Text>
                    {this.state.AllUsers.map((val, i) => {
                        return  <List>
                                <ListItem avatar>
                            <TouchableOpacity style={{flex:1,flexDirection:'row'}} key={i} onPress={() => this.props.navigation.navigate('MessagePage',{userData:this.state.userData,mesReciever:val})}>
                                    <Left>
                                        <Thumbnail source={{ uri: val.url }} />
                                    </Left>
                                    <Body>
                                        <Text style={{ marginTop: 8,marginBottom:10}}>{val.name}</Text>
                                        {/* <Text></Text> */}
                                    </Body>
                        </TouchableOpacity>
                                </ListItem>
                            </List>
                        // <View >
                        //     <Image style={{ width: 50, height: 50, borderRadius: 50 }} />
                        //     <Text style={{ marginTop: 18, fontSize: 12, }}></Text>
                        // </View>
                    })}
                </View>
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
export default People