import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";
import Header from "./src/components/Header";
import PNLBottomSheet from "./src/components/PNLBottomSheet";
import Stocks from "./src/components/Stocks";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [calculatedData, setCalculatedData] = useState(null);

  const callApi = () => {
    setLoading(true);
    return fetch("https://run.mocky.io/v3/bde7230e-bc91-43bc-901d-c79d008bddc8")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        let calcData;

        let currValTotal = json.userHolding.reduce((total, holding) => {
          return total + holding.ltp * holding.quantity;
        }, 0);
        calcData = {
          ...calcData,
          currentValueTotal: currValTotal,
        };
        let investVal = json.userHolding.reduce((total, holding) => {
          return total + holding.avgPrice * holding.quantity;
        }, 0);
        calcData = {
          ...calcData,
          investmentTotal: investVal,
        };
        const totalPLData = json.userHolding.reduce((total, holding) => {
          const profitOrLoss = (holding.close - holding.ltp) * holding.quantity;
          return total + profitOrLoss;
        }, 0);
        calcData = {
          ...calcData,
          todaysPNL: totalPLData,
        };
        setCalculatedData(calcData);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <>
          <Header />
          <FlatList
            data={data?.userHolding}
            renderItem={({ item }) => <Stocks data={item} />}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
          />
          <PNLBottomSheet
            data={data?.userHolding}
            calculatedData={calculatedData}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#c3c3c8",
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
});

export default App;
