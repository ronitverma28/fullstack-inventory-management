import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { COLORS } from "../constants/color";
import AllItems from "./AllItems";
import CreateScreen from "./CreateScreen";
import { FONTS } from "../constants/font";
import LowStockScreen from "./LowStockScreen";
import {
  createItem,
  deleteItem,
  getAllItems,
  updateItem,
} from "../services/itemService";

const HomeScreen = () => {
  const [view, setView] = useState(0);
  const [allItems, setAllItems] = useState([]);
  const [allItemsLoading, setAllItemsLoading] = useState(false);
  const [allItemsError, setAllItemsError] = useState("");
  const [lowStockRefreshKey, setLowStockRefreshKey] = useState(0);

  const loadAllItems = useCallback(async () => {
    setAllItemsLoading(true);
    setAllItemsError("");
    try {
      const response = await getAllItems();
      setAllItems(response);
    } catch (error) {
      setAllItemsError(error.message || "Failed to fetch inventory items.");
    } finally {
      setAllItemsLoading(false);
    }
  }, []);

  const refreshInventory = useCallback(async () => {
    await loadAllItems();
    setLowStockRefreshKey((currentValue) => currentValue + 1);
  }, [loadAllItems]);

  useEffect(() => {
    refreshInventory();
  }, [refreshInventory]);

  const createItemHandler = useCallback(
    async (itemPayload) => {
      await createItem(itemPayload);
      await refreshInventory();
    },
    [refreshInventory],
  );

  const updateItemHandler = useCallback(
    async (id, itemPayload) => {
      await updateItem(id, itemPayload);
      await refreshInventory();
    },
    [refreshInventory],
  );

  const deleteItemHandler = useCallback(
    async (id) => {
      await deleteItem(id);
      await refreshInventory();
    },
    [refreshInventory],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.btnContainer}>
        <Pressable
          style={[
            styles.btn,
            view === 0 ? { backgroundColor: COLORS.success } : null,
          ]}
          onPress={() => setView(0)}
        >
          <Text
            style={[
              styles.btnText,
              view === 0 ? { color: COLORS.white } : null,
            ]}
          >
            All Items
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.btn,
            view === 1 ? { backgroundColor: COLORS.success } : null,
          ]}
          onPress={() => setView(1)}
        >
          <Text
            style={[
              styles.btnText,
              view === 1 ? { color: COLORS.white } : null,
            ]}
          >
            Low Stock
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.btn,
            view === 2 ? { backgroundColor: COLORS.success } : null,
          ]}
          onPress={() => setView(2)}
        >
          <Text
            style={[
              styles.btnText,
              view === 2 ? { color: COLORS.white } : null,
            ]}
          >
            Create
          </Text>
        </Pressable>
      </View>
      {view === 0 && (
        <AllItems data={allItems} loading={allItemsLoading} error={allItemsError} />
      )}
      {view === 1 && (
        <LowStockScreen refreshKey={lowStockRefreshKey} />
      )}
      {view === 2 && (
        <CreateScreen
          data={allItems}
          loading={allItemsLoading}
          error={allItemsError}
          onCreateItem={createItemHandler}
          onUpdateItem={updateItemHandler}
          onDeleteItem={deleteItemHandler}
        />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    gap: 15,
  },
  title: {
    fontSize: 25,
    fontFamily: FONTS.bold,
  },
  btnContainer: {
    flexDirection: "row",
    gap: 20,
  },
  btn: {
    borderColor: COLORS.success,
    borderWidth: 1.5,
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 3.5,
  },
  btnText: {
    color: COLORS.success,
    fontFamily: FONTS.medium,
  },
});
