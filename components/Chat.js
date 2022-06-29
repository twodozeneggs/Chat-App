import React from 'react';
import { View, Text, Button, TextInput, Stylesheet, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const firebase = require('firebase');
require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyBRaR4W1gOhci9C9j1KT3m-pZ9KbB8p9ZU",
  authDomain: "chat-app-35fe6.firebaseapp.com",
  projectId: "chat-app-35fe6",
  storageBucket: "chat-app-35fe6.appspot.com",
  messagingSenderId: "307517430706",
  appId: "1:307517430706:web:e2055016a7fe5485c9e2ab",
  measurementId: "G-3P4FC673VL"
};


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
     {
      _id: 2, 
      text: 'This is a system message',
      createdAt: new Date(),
      system: true, 
     },
      ],
   })
 }

onSend(messages = []) {
  this.setState((previousState) => ({
    messages: GiftedChat.append(previousState.messages, messages),
  }));
}

renderBubble(props) {
  return (
    <Bubble
    {...props}
    wrapperStyle={{
      right: {
        backgroundColor: '#000'
      },
    }}
    />
    );
}

render() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
    
    return (
      <View style={{ flex: 1 }}>
      <GiftedChat
        renderBubble={this.renderBubble.bind(this)}
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
        _id: 1,
        }}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
        </View>
    );
  }
}
