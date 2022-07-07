import React from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        name: '',
      },
    };

    // Set up firebase
    const firebaseConfig = {
      apiKey: "AIzaSyBRaR4W1gOhci9C9j1KT3m-pZ9KbB8p9ZU",
      authDomain: "chat-app-35fe6.firebaseapp.com",
      projectId: "chat-app-35fe6",
      storageBucket: "chat-app-35fe6.appspot.com",
      messagingSenderId: "307517430706",
      appId: "1:307517430706:web:e2055016a7fe5485c9e2ab",
      measurementId: "G-3P4FC673VL"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // Reference to Firestore collection
    this.referenceChatMessages = firebase.firestore().collection('messages');
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // Go through each document
    querySnapshot.forEach((doc) => {
      // Get the QueryDocumentsSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
        },
      });
    });
    this.setState({
      messages,
    });
  };

  componentDidMount() {
    // Set name as title chat
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });

    // Reference to load messages from Firebase
    this.referenceChatMessages = firebase.firestore().collection('messages');

    // Authenticate user anonymously
    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
      this.setState({
        uid: user.uid,
        messages: [],
        user: {
          _id: user.uid,
          name: name,
        },
      });
      this.unsubscribe = this.referenceChatMessages
        .orderBy('createdAt', 'desc')
        .onSnapshot(this.onCollectionUpdate);
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  // Add message to the state
  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        // Call addMessage with last message in message state
        this.addMessages(this.state.messages[0]);
      }
    );
  }

  // Add message to Firestore
  addMessages = (message) => {
    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      text: message.text,
      createdAt: message.createdAt,
      user: message.user,
    });
  };

  // Customize message bubbles
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#fafafa',
          },
          right: {
            backgroundColor: '#2d7ecf',
          },
        }}
      />
    );
  }

  render() {
    let { color, name } = this.props.route.params;
    // Set default background color if no color was selected
    if (color === '') {
      color = '#8A95A5';
    }

    return (
      <View style={[{ backgroundColor: color }, { flex: 1 }]}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{ _id: this.state.user._id, name: name }}
        />
        {Platform.OS === 'android' ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}