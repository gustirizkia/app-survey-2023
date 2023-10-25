import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

import Icon from "react-native-vector-icons/Entypo";

import * as ImagePicker from "expo-image-picker";

export default function UploadGambar({
  callbackImage,
  TypeCamera = "gallery",
  Title = "Upload Foto",
}) {
  const [PreviewImage, SetPreviewImage] = useState(null);
  const [FileImage, SetFileImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });

    if (!result.canceled) {
      SetPreviewImage(result.assets[0].uri);
      callbackImage(result);
    }
  };

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.canceled) {
      SetPreviewImage(result.assets[0].uri);
      callbackImage(result);
    }
  };

  return (
    <>
      <View className=" p-3 ">
        {PreviewImage ? (
          <View className="flex-row justify-center ">
            <TouchableOpacity
              className="items-center justify-center"
              onPress={() => {
                if (TypeCamera === "gallery") {
                  pickImage();
                } else {
                  openCamera();
                }
              }}
            >
              <Image
                source={{ uri: PreviewImage }}
                resizeMode={"contain"}
                style={{ width: 200, height: 300 }}
                className="mx-auto"
              />
              <Text className="text-center text-gray-500">
                Klik untuk ganti {Title}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View className="flex-row items-center justify-center">
              <TouchableOpacity
                onPress={() => {
                  if (TypeCamera === "gallery") {
                    pickImage();
                  } else {
                    openCamera();
                  }
                }}
                className="justify-center items-center bg-white"
              >
                <View className="bg-green-600 h-20 w-20 justify-center items-center rounded-full">
                  <Icon name="camera" size={34} color={"#fff"} />
                </View>
                <Text className="font-medium mt-3 text-center">{Title}</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
