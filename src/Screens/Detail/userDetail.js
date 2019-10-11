import React from 'react'
import {StyleSheet, SafeAreaView, ScrollView, Image, Alert, TouchableOpacity, View, YellowBox } from 'react-native'
import Firebase from '../../Config/Firebase/firebase'
import { Container, Header, Content, Card, CardItem, Body, Text, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};

export default class UserDetail extends React.Component{
    constructor(){
        super();
        this.state={
            UserDetail:''
        }
    }
    static navigationOptions = {
        headerTitle: 'Profile'
    }
    Logout = (path) => {
        Firebase.auth().signOut().then(function () {
          console.log('Signed Out');
          path.navigate("Login")
        }, function (error) {
          console.error('Sign Out Error', error);
        });
      } 
    render(){
        let value = this.props.navigation.state.params.user;
        console.log(value);
        return(
    <Container>
        <Content>
          <Card>
            <CardItem >
              <Body >
                  <View style={{alignSelf:'center'}}>
                    <Image source={{uri:value.url}} style={{width:80,height:80,borderRadius:50}} />
                  </View>
                  <View style={{alignSelf:'center',marginTop:10}}>
                      <Text style={{fontWeight:'bold'}}>{value.name}</Text>
                  </View>
                  <Button style={{ backgroundColor: 'white ',marginLeft:'80%' }} transparent onPress={() => this.Logout(this.props.navigation)} >        
                          <Icon name='md-log-out' size={50} color='black' />
                    </Button>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
        )
    }
}