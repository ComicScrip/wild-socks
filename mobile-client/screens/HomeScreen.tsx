import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useProductsQuery } from "../gql/generated/schema";

export default function HomeScreen() {
  const { data } = useProductsQuery();

  const products = data?.products ?? [];

  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={styles.productCardContainer}>
            <View style={styles.productCard}>
              <Image
                source={{ uri: item.pictureUrl }}
                style={styles.productImage}
              />
              <View style={styles.productNameAndPrice}>
                <Text style={styles.productCardText}>{item.name}</Text>
                <Text style={styles.productCardText}>${item.price}</Text>
              </View>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  productImage: {
    height: 360,
    width: 300,
  },
  productNameAndPrice: {
    padding: 15,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "gray",
  },
  productCard: {
    width: 300,
  },
  productCardContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  productCardText: {
    fontSize: 20,
    color: "white",
  },
  separator: {
    height: 20,
  },
});
