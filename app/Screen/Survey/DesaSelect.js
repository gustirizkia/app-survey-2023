import React, { useEffect, useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { BottomSheet } from "react-native-sheet";

export default function DesaSelect({
  TempData = [],
  callBackDesa,
  desa_id = 0,
}) {
  const bottomSheet = useRef(null);
  const [selectData, setSelectData] = useState(null);

  useEffect(() => {
    if (!desa_id) {
      setSelectData(null);
    }
  }, [desa_id]);

  const handelSelectAlamat = (param) => {
    callBackDesa(param.id);
    bottomSheet.current.hide();
    setSelectData(param.nama);
  };
  return (
    <View>
      <Text className="text-lg font-medium">Desa</Text>
      <View className="">
        <TouchableOpacity onPress={() => bottomSheet.current.show()}>
          <Text className="border mt-2 rounded-lg py-2 border-gray-400 px-2">
            {selectData ? <>{selectData}</> : <>Pilih Desa</>}
          </Text>
        </TouchableOpacity>
      </View>

      <BottomSheet height={600} ref={bottomSheet}>
        <ScrollView className="p-4">
          {TempData.map((item) => {
            return (
              <TouchableOpacity
                onPress={() => handelSelectAlamat(item)}
                key={item.id}
                className="mb-4 pb-4 border-b border-gray-300"
              >
                <Text>{item.nama}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </BottomSheet>
    </View>
  );
}
