import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import React, { useState } from "react";

import Header from './components/Header.js'
import uploadToAnonymousFilesAsync from 'anonymous-files';

const App = () => {

const [loaded] = useFonts({
  roboto: require('./assets/fonts/Roboto-Light.ttf')
});

if(!loaded) return <AppLoading />

const [ selectedImage, setSelectedImage ] = useState(null)

let openImagePickerAsync = async () => {
  let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

  if(permissionResult.granted === false) {
    alert(`The image is available to share at: ${setSelectedImage.localUri}`);
    return
  }

  const pickerResult = await ImagePicker.launchImageLibraryAsync()
  
  if(pickerResult.cancelled === true) {
    return;
  }

  if( Platform.OS === 'web' ) {
    const remoteUri = await uploadToAnonymousFilesAsync(pickerResult.localUri)
    setSelectedImage({ localUri: pickerResult.uri, remoteUri })
  } else {
    setSelectedImage({ localUri: pickerResult.uri })
  }
}

const openShareDialog = async () => {
  if(!(await Sharing.isAvailableAsync())) {
     alert('Sharing is no available')
     return
  }

  await Sharing.shareAsync(selectedImage.localUri)
}

if(!loaded) return <AppLoading />

  return (
    <View style={styles.container}>
      <Header title={'txt'} />
      <Text style={styles.title}>Hello World!</Text>
      <TouchableOpacity
        onPress={  openImagePickerAsync }
      >
        <Image
          source={{ uri: selectedImage !== null ? selectedImage.localUri : "https://picsum.photos/200/200" }}
          style={styles.image}
        />
      </TouchableOpacity>
    {
      selectedImage 
        ?
          <TouchableOpacity
          onPress={ openShareDialog }
          style={styles.button}
          >
            <Text style={styles.textButton}>Share</Text>
          </TouchableOpacity>
        : 
      <Text style={styles.textUpload}>upload an image from your device</Text> 
    }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#303030"
  },
  title: { fontSize: 30, color: "#fff", fontFamily: 'roboto' },
  image: { height: 200, width: 200, borderRadius: 100 },
  button: { padding: 15, backgroundColor: "gray", borderRadius: 10, resizeMode: 'contain' },
  textButton: { color: "#fff" },
  textUpload: { color: "#fff", padding: 20, fontFamily: 'roboto' }
});

export default App;
