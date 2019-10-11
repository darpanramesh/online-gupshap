import React from 'react'
import { StyleSheet, SafeAreaView, ScrollView, Image, Alert, TouchableOpacity, View, YellowBox } from 'react-native'
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

class Chat extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super();
        this.state = {
            Allmessages: [],
            data:true,
            userData:''        
        }
    }
    async  componentDidMount() {
        var that = this
        let {Allmessages} = this.state
        await Firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                Firebase.firestore().collection("users").doc(user.uid).get().then(res => {
                    let data = res.data()
                    that.setState({
                        userData: data
                    })
                  Firebase.firestore().collection(`chat-${user.uid}`).get().then(res => {
                                res.forEach(doc=>{
                                    let data = doc.data()
                                    console.log(data,'123')
                                    Allmessages.push(data.Reciever)
                                    console.log(data.chats, 'jdksjkdfkj')
                                    that.setState({
                                        Allmessages,
                                    })
                        
                                })
                            })
                })
            }
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
        console.log('Messages',this.state.Allmessages);
        var hour = new Date().getHours()
        var Minute = new Date().getMinutes()
        console.log(hour,':',Minute)
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
                    {this.state.Allmessages.map((val,i)=>{
                        return <List>
                            <ListItem thumbnail>
                            <TouchableOpacity style={{flex:1,flexDirection:'row'}} key={i} onPress={() => this.props.navigation.navigate('MessagePage',{userData:this.state.userData,mesReciever:{
                                url: val.url,
                                name:val.name,
                                uid:val.uid
                            }})}>
                                <Left>
                                    <Thumbnail square source={{ uri: val.url }} />
                                </Left>
                                <Body>
                                    <Text>{val.name}</Text>

                                </Body>
                                <Right>
                                    <Text note>{`${hour}:${Minute}`}</Text>
                                </Right>
                                </TouchableOpacity>
                            </ListItem>
                        </List>
                    })}
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
export default Chat

