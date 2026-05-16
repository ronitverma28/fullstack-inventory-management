import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../constants/color";
import { FONTS } from "../constants/font";

const AllItems = ({ data, loading, error }) => {
  return (
    <View style={styles.mainItemsContainer}>
      <View style={styles.itemHeading}>
        <Text style={styles.itemNameHead}>Item</Text>
        <Text style={styles.itemQuantityHead}>Quantity</Text>
      </View>

      {loading ? <Text style={styles.statusText}>Loading items...</Text> : null}
      {!loading && error ? <Text style={styles.errorText}>{error}</Text> : null}
      {!loading && !error && data.length === 0 ? (
        <Text style={styles.statusText}>No items found.</Text>
      ) : null}

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View
            style={[
              styles.itemContainer,
              item.quantity > 20
                ? { backgroundColor: COLORS.successLight }
                : { backgroundColor: COLORS.dangerLight },
            ]}
          >
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemQuantity}>
              {item.quantity} {item.unit}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
};

export default AllItems;

const styles = StyleSheet.create({
  mainItemsContainer: {
    gap: 6,
  },
  itemHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  itemNameHead: {
    fontSize: 17,
    fontFamily: FONTS.bold,
  },
  itemQuantityHead: {
    fontSize: 17,
    fontFamily: FONTS.bold,
  },
  statusText: {
    fontFamily: FONTS.medium,
    color: COLORS.gray500,
    fontSize: 14,
    paddingHorizontal: 4,
  },
  errorText: {
    fontFamily: FONTS.medium,
    color: COLORS.danger,
    fontSize: 14,
    paddingHorizontal: 4,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  itemName: {
    fontFamily: FONTS.medium,
  },
  itemQuantity: {
    fontFamily: FONTS.medium,
  },
});
