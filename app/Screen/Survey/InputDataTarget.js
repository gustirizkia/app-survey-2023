import axios from "axios";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getData } from "../../Utils/Storage";
import { BASE_URL } from "../../components/API";
import DesaSelect from "./DesaSelect";
import KecamatanSelect from "./Kecamatan";

export default function InputDataTarget({ route, navigation }) {
  const [Kecamatan, SetKecamatan] = useState([]);
  const [Desa, SetDesa] = useState([]);
  const [Data, SetData] = useState(null);
  const [Kecamatan_id, SetKecamatan_id] = useState(null);
  const [Desa_id, SetDesa_id] = useState(0);
  const [Nama, SetNama] = useState(null);
  const [Alamat, SetAlamat] = useState(null);
  const [hideLoading, SetHideLoading] = useState(true);
  const [LocationData, SetLocationData] = useState(null);
  const [mydate, setDate] = useState(null);
  const [isDisplayDate, setShow] = useState(false);

  const { kota } = route.params;
  const token = getData("token");

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

  useEffect(() => {
    axios
      .get(`${BASE_URL}detailKecamatan/${kota}`)
      .then((ress) => {
        SetKecamatan(ress.data.data.kecamatan);
        SetData(ress.data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  useEffect(() => {
    if (Kecamatan_id) {
      axios
        .get(`${BASE_URL}listDesa?kecamatan=${Kecamatan_id}`)
        .then((ress) => {
          SetDesa(ress.data.data);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, [Kecamatan_id]);

  const handleSelectKecamatan = (data) => {
    SetKecamatan_id(data);
    SetDesa_id(null);
  };

  const handleSelectDesa = (data) => {
    SetDesa_id(data);
  };
  const handleSubmitData = () => {
    let messageError = null;
    if (!LocationData) {
      messageError = "Kami membutuhkan lokasi anda, silahkan refres halaman";
    } else if (!Kecamatan_id) {
      messageError = "Kecamatan belum di pilih";
    } else if (!Desa_id) {
      messageError = "Desa belum di pilih";
    } else if (!Nama) {
      messageError = "Nama belum di isi";
    } else if (!Alamat) {
      messageError = "Alamat belum di isi";
    } else if (!mydate) {
      messageError = "Tanggal lahir belum di isi";
    }

    if (messageError) {
      Alert.alert("Data Belum Lengkap", messageError);

      return;
    }

    SetHideLoading(false);

    token.then((ressToken) => {
      let formData = {
        nama: Nama,
        alamat: Alamat,
        desa: Desa_id,
        kecamatan: Kecamatan_id,
        provinsi: Data?.provinsi_id,
        kota: Data?.id_kota,
        latitude: LocationData.coords.latitude,
        longitude: LocationData.coords.longitude,
        tanggal_lahir: mydate,
      };
      console.log("formData", formData);
      axios
        .post(`${BASE_URL}inputTarget`, formData, {
          headers: {
            Authorization: "Bearer " + ressToken.value,
          },
        })
        .then((ress) => {
          console.log("ress", ress.data.id);
          navigation.replace("Quiz", {
            target_id: ress.data.id,
          });
          SetHideLoading(true);
        })
        .catch((err) => {
          SetHideLoading(true);
          Alert.alert("Gagal simpan data!", "Cek kembali koneksi anda");
          console.log("formData", formData);
          console.log("err", err.response.data.message);
        });
    });
  };

  const handleConfirm = (date) => {
    setDate(date.toLocaleDateString());
    setShow(false);
  };

  const showMode = () => {
    setShow(true);
  };

  return (
    <ScrollView>
      {!hideLoading && (
        <View className="absolute z-40 h-screen w-full justify-center items-center">
          <View className="bg-slate-400 w-full opacity-40 h-full absolute"></View>
          <ActivityIndicator size="large" />
          <Text className="mt-4">Loading data</Text>
        </View>
      )}
      <View className="min-h-screen bg-white p-3 ">
        <View className="mb-3">
          <Text className=" font-medium">Nama</Text>
          <View>
            <TextInput
              onChangeText={SetNama}
              className="border mt-2 rounded-lg py-1 border-gray-400 px-2"
            />
          </View>
        </View>
        {/*  */}
        <View className="mb-3">
          <Text className=" font-medium">Tanggal Lahir</Text>
          <TouchableOpacity onPress={showMode}>
            <Text className="border mt-2 rounded-lg py-2 border-gray-400 px-2">
              {mydate}
            </Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDisplayDate}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={() => {
              setShow(false);
            }}
          />
        </View>
        {/*  */}
        <View className="mb-3">
          <Text className=" font-medium">Alamat</Text>
          <View>
            <TextInput
              onChangeText={SetAlamat}
              className="border mt-2 rounded-lg py-1 border-gray-400 px-2"
            />
          </View>
        </View>
        <View className="mb-3">
          <Text className=" font-medium">Provinsi</Text>
          <View>
            <Text className="border mt-2 rounded-lg py-2 border-gray-400 px-2">
              {Data?.provinsi.nama}
            </Text>
          </View>
        </View>
        <View className="mb-3">
          <Text className=" font-medium">Kota/Kabupaten</Text>
          <View>
            <Text className="border mt-2 rounded-lg py-2 border-gray-400 px-2">
              {Data?.nama}
            </Text>
          </View>
        </View>
        <KecamatanSelect
          Kecamatan={Kecamatan}
          callBackKecamatan={handleSelectKecamatan}
        />
        <DesaSelect
          TempData={Desa}
          callBackDesa={handleSelectDesa}
          desa_id={Desa_id}
        />

        <TouchableOpacity
          onPress={handleSubmitData}
          className="rounded-lg bg-green-600 text-white py-2 mt-8 mb-4"
        >
          <Text className="text-center text-white font-medium">
            Simpan Data
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
