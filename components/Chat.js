import React from 'react';
import { View, Text, Button, TextInput, Stylesheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'



export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    };
  }
  componentDidMount() {
   this.setState({
     messages: [
       {
         _id: 1,
         text: 'Hello developer',
         createdAt: new Date(),
         user: {
           _id: 2,
           name: 'React Native',
           avatar: 'https://placeimg.com/140/140/any',
         },
       },
     ],
   })
 }
  render() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
    
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
       <Button 
       title='Go to Start'
       onPress= {() => this.props.navigation.navigate("Start")}
       />
      </View>
    );
  }
}
