import React, { Component } from "react";
import { View, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import CustomActions from "./CustomActions";
import MapView from "react-native-maps";
import 'firebase/firestore';

//Firestore Database
const firebase = require("firebase");
require("firebase/firestore");

// Set up firebase
const firebaseConfig = {
  apiKey: "AIzaSyBRaR4W1gOhci9C9j1KT3m-pZ9KbB8p9ZU",
  authDomain: "chat-app-35fe6.firebaseapp.com",
  projectId: "chat-app-35fe6",
  storageBucket: "chat-app-35fe6.appspot.com",
  messagingSenderId: "307517430706",
  appId: "1:307517430706:web:e2055016a7fe5485c9e2ab",
  measurementId: "G-3P4FC673VL",
};

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: "",
        name: "",
        avatar: "",
        image: null, 
        location: null,
      },
      loggedInText: 'One sec',
      isConnected: false,
      image: null, 
      location: null,
    }


    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    // Reference to Firestore collection
    this.referenceChatMessages = firebase.firestore().collection("messages");
    this.referenceMessagesUser = null;
  }

  //function to get messages from asyncStorage
  async getMessages() {
    let messages = '';
    try {
      /*Read messages in storage. 
        If there is no storage item with that key, messages are set to be empty*/
      messages = (await AsyncStorage.getItem('messages')) || [];
      //give messages the saved data
      this.setState({
        /* asyncStorage can only store strings. 
          This converts the saved string back into a JSON object*/
        messages: JSON.parse(messages),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  componentDidMount() {
    // Set name as title chat
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hi Simon!",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any",
          },
        },
      ],
    });

    // Reference to load messages from Firebase
    this.referenceChatMessages = firebase.firestore().collection("messages");
    

    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        this.setState({ isConnected: true });
        console.log("online");
      } else {
        console.log("offline");
      }
      // Authenticates user via Firebase
      this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          firebase.auth().signInAnonymously();
          console.log("no user");
        } else {
          console.log("got user" + user.uid);
        }
        this.setState({
          uid: user.uid,
          //messages: [],
          user: {
            _id: user.uid,
            name: name,
            avatar: "https://placeimg.com/140/140/any",
          },
        });
        this.referenceMessagesUser = firebase
          .firestore()
          .collection("messages")
          .where("uid", "==", this.state.uid);

        // save messages when user online
        this.saveMessages();
        this.unsubscribe = this.referenceChatMessages.orderBy(
          "createdAt",
          "desc"
        );
        // .onSnapshot(this.onCollectionUpdate);
      });
    });

  }

   addMessage() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: message.user,
      image: message.image || null,
      location: message.location || null
    });
  }

  //save messages to local storage
  async getMessages() {
    let messages = "";
    try {
      messages = (await AsyncStorage.getItem("messages")) || [];
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async saveMessages() {
    try {
      await AsyncStorage.setItem(
        "messages",
        JSON.stringify(this.state.messages)
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteMessages() {
    try {
      await AsyncStorage.removeItem("messages");
      this.setState({
        messages: [],
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  componentWillUnmount() {
    this.authUnsubscribe();
    // this.unsubscribe();
  }

  // Add message to Firestore
  addMessages = (message) => {
    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      text: message.text,
      createdAt: message.createdAt,
      user: message.user,
      image: message.image || null, 
      location: message.location || null
    });
  };

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

  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return <InputToolbar {...props} />;
    }
  }

  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  //render user's location
  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }

  // Customize message bubbles
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "#fafafa",
          },
          right: {
            backgroundColor: "#2d7ecf",
          },
        }}
      />
    );
  }

  render() {
    let { bgColor, name } = this.props.route.params;
    return (
      <View style={[{ backgroundColor: bgColor }, styles.container]}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          renderCustomView={this.renderCustomView}
          renderActions={this.renderCustomActions}
          onSend={(messages) => this.onSend(messages)}
          bottomOffset={34}
          user={{
            _id: this.state.user._id,
            name: name,
            avatar: this.state.user.avatar,
          }}
        />
        {/* Avoid keyboard to overlap text messages on older Android versions  */}
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;

// onCollectionUpdate = (querySnapshot) => {
//   const messages = [];
//   // Go through each document
//   querySnapshot.forEach((doc) => {
//     // Get the QueryDocumentsSnapshot's data
//     let data = doc.data();
//     messages.push({
//       _id: data._id,
//       text: data.text,
//       createdAt: data.createdAt.toDate(),
//       user: {
//         _id: data.user._id,
//         name: data.user.name,
//       },
//     });
//   });
//   this.setState({
//     messages,
//   });
// };
