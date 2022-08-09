# Chat-App
Chat app is a chatting application for mobile devices, created in React Native. The app provides users with a chat interface and options to share images and their location.

## tools: 
- Expo, 
- Google Firestore Database, 
- React Native

## User Stories
- As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my
friends and family.
- As a user, I want to be able to send messages to my friends and family members to exchange
the latest news.
- As a user, I want to send images to my friends to show them what I’m currently doing.
- As a user, I want to share my location with my friends to show them where I am.
- As a user, I want to be able to read my messages offline so I can reread conversations at any
time.
- As a user with a visual impairment, I want to use a chat app that is compatible with a screen
reader so that I can engage with a chat interface.

## Prerequisities
- Node and latest version of npm
- Android studio, Xcode, or a mobile phone
- Expo 

## Setting up the development environment 
### Expo
1) Make sure expo-cli is installed globally
>npm install expo-cli --global
2) new project initialization
>expo init "APP_NAME"

### Launch via emulator (Android Studio (Windows) or XCode (iOS)), or a mobile phone
2) Launch
>npm start
or 
>expo start

## Database configuration
Chat-app makes use of Cloud Firestore, a real-time database which synchronizes data across multiple devices and stores it in Firebase's Cloud. 
>npm install --save firebase
(current version: "^9.8.1"

## Necessary libraries to install.
1) React navigation and dependencies
>npm install --save react-navigation
>npm install @react-navigation/native @react-navigation/stack
>expo install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view

2) Svg Support
>npm i react-native-svg

3) Keyboard aware scroll
>npm i react-native-keyboard-aware-scroll-view --save

4) Gifted Chat library
>npm install react-native-gifted-chat --save

5) React-Native async storage
>expo install @react-native-async-storage/async-storage

6) NetInfo package
>npm install --save @react-native-community/netinfo

7) Expo's ImagePicker API 
>expo install expo-image-picker

8) Expo's Location API and react-native-maps
>expo install expo-location
>expo install react-native-maps

## Personal reflections on the project
I think the time I spent doing this project was when a lot of things "clicked" for me, I started thinking and visualizing in ways that I had only wanted to before, but now I was doing it. After reading throught he course section on building the chat app, everything kept falling into place after place, with small errors along the way that were easily fixed with a line or two of code I hadn't thought of before. Creating two screens, adding buttons and click functionality was a really good way of imbedded these methods into me and ones I won't soon forget. Adding permissions, and database was also really interesting to implement because as a smartphone user and now novice developer, I want my end-users to knnow that they're the ones in control of their device and what my app can do. It's great for privacy and getting people to be anadvocate for your app, which of course is a nice thing to have. This project, behind the pokedex app, is my favorite - never would I have it would be me (with a little help from lovely people) could build somehting like this.
