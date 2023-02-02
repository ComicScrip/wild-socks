import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wild socks</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: "gray",
    paddingBottom: 5,
  },
  title: {
    fontSize: 30,
    color: "white",
    textAlign: "center",
  },
});
