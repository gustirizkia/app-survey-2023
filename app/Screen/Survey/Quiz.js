import { Alert, StyleSheet, Text, View } from "react-native";
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
import * as Location from "expo-location";

import * as ImagePicker from "expo-image-picker";
import UploadImage from "./UploadImage";
import Loading from "../../components/Loading";
import FlashMessage, { showMessage } from "react-native-flash-message";
import Essay from "./Essay";

export default function Quiz({ route, navigation }) {
  const [HideLoading, SetHideLoading] = useState(false);
  const [SoalGeneral, SetSoalGeneral] = useState([]);
  const [SoalKecamatan, SetSoalKecamatan] = useState([]);
  const [PilihanUser, SetPilihanUser] = useState([]);
  const [FotoBersama, SetFotoBersama] = useState(null);
  const [PreviewImage, SetPreviewImage] = useState(null);
  const [hideLoading, setHideLoading] = useState(false);
  const [LocationData, SetLocationData] = useState(null);
  const [JawabanEssayUser, SetJawabanEssayUser] = useState([]);

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
            SoalGeneral[index + 1]?.skip_soal_id !== soal.id &&
            soal.skip_soal?.skip_if_yes_no !== pilihan
          ) {
            el.skip_soal_many.forEach((element_skip_many) => {
              newData.push(element_skip_many);
            });
            // newData.push(el.skip_soal);
          } else {
            if (SoalGeneral[index + 1]?.skip_soal_id === soal.id) {
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

      SetPilihanUser(newData);
    } else {
      SetPilihanUser((PilihanUser) => [...PilihanUser, formPiliihan]);
    }
  };

  const handleSetPilihan = (pilihan, item, type) => {
    let newData = [];
    let filterArray = null;
    let soal = item;

    if (item.skip_soal) {
      SoalGeneral.map((el, index) => {
        newData.push(el);
        if (el.id === soal.id) {
          if (
            SoalGeneral[index + 1]?.skip_soal_id !== soal.id &&
            soal.skip_soal?.skip_if_pilihan_id !== pilihan
          ) {
            el.skip_soal_many.forEach((element_skip_many) => {
              newData.push(element_skip_many);
            });
          } else {
            if (SoalGeneral[index + 1]?.skip_soal_id === soal.id) {
              if (soal.skip_soal?.skip_if_pilihan_id === pilihan) {
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
        if (el.soal_id === soal.skip_soal?.skip_soal_id) {
          if (pilihan === soal.skip_soal?.skip_if_pilihan_id) {
            newData = newData.filter((itemData) => {
              return itemData.soal_id !== soal.skip_soal?.id;
            });
          }
        }
      });

      SetPilihanUser(newData);
    } else {
      SetPilihanUser((PilihanUser) => [...PilihanUser, formPiliihan]);
    }

    // end function
  };

  const setJawabanEssay = (jawaban, item) => {
    let formJawaban = {
      soal_id: item.id,
      pilihan_id: null,
      jawaban_user: jawaban,
    };

    let soal_id = null;
    JawabanEssayUser.map((itemMap) => {
      if (itemMap.soal_id === item.id) {
        soal_id = item.id;
      }
    });

    if (soal_id) {
      let newData = JawabanEssayUser.map((el) => {
        if (el.soal_id === soal_id) {
          return { ...el, jawaban_user: jawaban };
        }

        return el;
      });

      SetJawabanEssayUser(newData);
    } else {
      let Data = [];
      JawabanEssayUser.map((itemEssay) => {
        Data.push(itemEssay);
      });

      Data.push(formJawaban);

      SetJawabanEssayUser(Data);
      console.log("formJawaban", formJawaban);
      console.log("Data", Data);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("kami mebutuhkan akses location");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      if (!location.mocked) {
        SetLocationData(location);
      } else {
        alert("Sitem mendeteksi fake gps");
      }
    })();
  }, []);

  const handelSubmitData = () => {
    console.log("JawabanEssayUser", JawabanEssayUser);
    let messageError = null;
    if (!FotoBersama) {
      messageError = "Upload foto bersama terlebih dahulu";
    }

    if (!LocationData) {
      messageError = "Kami membutuhkan lokasi anda, silahkan refres halaman";
    }

    if (messageError) {
      Alert.alert("Data Belum Lengkap", messageError);

      return;
    }

    setHideLoading(false);
    let result = FotoBersama;
    let localUri = result.assets[0].uri;
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();
    formData.append("pilihan", JSON.stringify(PilihanUser));
    formData.append("jawaban_essay_user", JSON.stringify(JawabanEssayUser));
    formData.append("target_id", target_id);
    formData.append("image", { uri: localUri, name: filename, type });
    formData.append("latitude", LocationData.coords.latitude);
    formData.append("longitude", LocationData.coords.longitude);

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
            navigation.replace("MainApp");
            console.log("ress", ress);
            setHideLoading(true);
          })
          .catch((err) => {
            setHideLoading(true);
            console.log("err", err.response);
            console.log("formData", formData);
            console.log("`${BASE_URL}selesaiQuiz`", `${BASE_URL}selesaiQuiz`);
          });
      }
    });
  };

  return (
    <>
      {!hideLoading && <Loading />}
      <FlashMessage position="bottom" />
      <ScrollView>
        <SafeAreaView className="bg-white px-3 mb-2 pb-3">
          <View>
            <Text className="text-lg font-medium">Survey</Text>
          </View>
        </SafeAreaView>
        {SoalGeneral.map((item) => {
          return (
            <View key={item.id} className="bg-white rounded-lg p-3 mb-4">
              <Text className="mb-1 font-semibold text-lg">{item.title}</Text>
              <Text className="mb-4 text-gray-700">{item.subtitle}</Text>
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
                  {item.tipe === "pg" ? (
                    <MultiplePilihan
                      TempSoal={item}
                      callBack={(pilihan, itemData) => {
                        handleSetPilihan(pilihan, itemData);
                      }}
                    />
                  ) : (
                    <Essay
                      TempSoal={item}
                      callBack={(jawaban, itemData) => {
                        setJawabanEssay(jawaban, itemData);
                      }}
                    />
                  )}
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
            className=" bg-green-600 py-3 rounded-lg mt-4 mb-8"
          >
            <Text className="text-white text-center font-medium">
              Simpan dan selesai
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
