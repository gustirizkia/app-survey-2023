import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getData } from "../../Utils/Storage";
import axios from "axios";
import { BASE_URL } from "../../components/API";
import { ScrollView } from "react-native-gesture-handler";
import MultiplePilihan from "./MultiplePilihan";
import { SafeAreaView } from "react-native-safe-area-context";
import YesNo from "./YesNo";
import Icon from "react-native-vector-icons/Entypo";
import { TouchableOpacity } from "react-native";

import * as ImagePicker from "expo-image-picker";
import UploadImage from "./UploadImage";
import Loading from "../../components/Loading";

export default function Quiz({ route, navigation }) {
  const [HideLoading, SetHideLoading] = useState(false);
  const [SoalGeneral, SetSoalGeneral] = useState([]);
  const [SoalKecamatan, SetSoalKecamatan] = useState([]);
  const [PilihanUser, SetPilihanUser] = useState([]);
  const [FotoBersama, SetFotoBersama] = useState(null);
  const [PreviewImage, SetPreviewImage] = useState(null);
  const [hideLoading, setHideLoading] = useState(false);

  const { target_id } = route.params;
  const token = getData("token");

  useEffect(() => {
    token.then((resToken) => {
      if (!resToken) {
        navigation.replace("/Login");
      }
    });
    setHideLoading(false);
    axios
      .get(`${BASE_URL}all-quiz/${target_id}`)
      .then((ress) => {
        let GeneralSoal = ress.data.soal_general;
        let KecamatanSoal = ress.data.soal_kecamatan;
        let tempSoalData = [];

        setHideLoading(true);

        GeneralSoal.forEach((element) => {
          tempSoalData.push(element);
        });
        KecamatanSoal.forEach((element) => {
          tempSoalData.push(element);
        });

        SetSoalGeneral(tempSoalData);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const handelUploadImage = (item) => {
    SetFotoBersama(item);
  };

  const handelPilihanYesNo = (pilihan, soal, type) => {
    let newData = [];
    let filterArray = null;
    if (soal.skip_soal) {
      SoalGeneral.map((el, index) => {
        newData.push(el);
        if (el.id === soal.id) {
          if (
            SoalGeneral[index + 1].skip_soal_id !== soal.id &&
            soal.skip_soal?.skip_if_yes_no !== pilihan
          ) {
            newData.push(el.skip_soal);
          } else {
            if (SoalGeneral[index + 1].skip_soal_id === soal.id) {
              if (soal.skip_soal?.skip_if_yes_no === pilihan) {
                filterArray = SoalGeneral.filter(
                  (item) => item.skip_soal_id !== soal.id
                );
              }
            }
          }
        }
      });

      if (filterArray) {
        SetSoalGeneral(filterArray);
      } else {
        SetSoalGeneral(newData);
      }
    }

    let formPiliihan = {
      soal_id: soal.id,
      pilihan_id: null,
      yes_no: pilihan,
    };

    let soal_id = null;
    PilihanUser.map((itemMap) => {
      if (itemMap.soal_id === soal.id) {
        soal_id = soal.id;
      }
    });

    if (soal_id) {
      let newData = PilihanUser.map((el) => {
        if (el.soal_id === soal_id) {
          return { ...el, yes_no: pilihan };
        }

        return el;
      });

      newData.map((el, index) => {
        if (el.soal_id === soal.skip_soal?.skip_soal_id) {
          if (pilihan === soal.skip_soal?.skip_if_yes_no) {
            newData = newData.filter((item) => {
              return item.soal_id !== soal.skip_soal?.id;
            });
          }
        }
      });

      console.log("newData", newData);

      SetPilihanUser(newData);
    } else {
      SetPilihanUser((PilihanUser) => [...PilihanUser, formPiliihan]);
    }
  };

  const handleSetPilihan = (pilihan, item) => {
    let formPiliihan = {
      soal_id: item.id,
      pilihan_id: pilihan,
      yes_no: null,
    };

    let soal_id = null;
    PilihanUser.map((itemMap) => {
      if (itemMap.soal_id === item.id) {
        soal_id = item.id;
      }
    });

    if (soal_id) {
      let newData = PilihanUser.map((el) => {
        if (el.soal_id === soal_id) {
          return { ...el, pilihan_id: pilihan };
        }

        return el;
      });

      let soal = item;

      newData.map((el, index) => {
        console.log("el", el);
        if (el.soal_id === soal.skip_soal?.skip_soal_id) {
          if (pilihan === soal.skip_soal?.skip_if_pilihan_id) {
            newData = newData.filter((item) => {
              console.log("item", item);
              return item.soal_id !== soal.skip_soal?.id;
            });

            console.log("newData", newData);
          }
        }
      });

      SetPilihanUser(newData);
    } else {
      SetPilihanUser((PilihanUser) => [...PilihanUser, formPiliihan]);
    }
  };

  const handelSubmitData = () => {
    if (!FotoBersama) {
      alert("Upload foto bersama terlebih dahulu");
      return;
    }

    setHideLoading(false);

    let result = FotoBersama;
    let localUri = result.assets[0].uri;
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    console.log("filename", filename);

    let formData = new FormData();
    formData.append("pilihan", JSON.stringify(PilihanUser));
    formData.append("target_id", target_id);
    formData.append("image", { uri: localUri, name: filename, type });

    token.then((token) => {
      if (token) {
        axios
          .post(`${BASE_URL}selesaiQuiz`, formData, {
            headers: {
              Authorization: "Bearer " + token.value,
              "content-type": "multipart/form-data",
            },
          })
          .then((ress) => {
            console.log("ress", ress);
            setHideLoading(true);
          })
          .catch((err) => {
            console.log("err", err.response);
            console.log("formData", formData);
            console.log("`${BASE_URL}selesaiQuiz`", `${BASE_URL}selesaiQuiz`);
          });
      }
    });
  };

  return (
    <ScrollView>
      {!hideLoading && <Loading />}
      <SafeAreaView className="bg-white px-3 mb-2 pb-3">
        <View>
          <Text className="text-lg font-medium">Survey</Text>
        </View>
      </SafeAreaView>
      {SoalGeneral.map((item) => {
        return (
          <View key={item.id} className="bg-white rounded-lg p-3 mb-4">
            <Text className="mb-4 font-semibold text-lg">{item.title}</Text>
            {item.yes_no > 0 ? (
              <>
                <YesNo
                  TempSoal={item}
                  callbackData={(pilihan, itemData) => {
                    handelPilihanYesNo(pilihan, itemData, "general");
                  }}
                />
              </>
            ) : (
              <>
                <MultiplePilihan
                  TempSoal={item}
                  callBack={(pilihan, itemData) => {
                    handleSetPilihan(pilihan, itemData);
                  }}
                />
              </>
            )}
          </View>
        );
      })}

      <UploadImage
        callbackImage={(data) => {
          handelUploadImage(data);
        }}
      />
      <View className="bg-white p-3">
        <TouchableOpacity
          onPress={handelSubmitData}
          className=" bg-yellow-600 py-3 rounded-lg mt-4 mb-8"
        >
          <Text className="text-white text-center font-medium">
            Simpan dan selesai
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
