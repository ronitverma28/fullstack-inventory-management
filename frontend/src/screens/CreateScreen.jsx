import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../constants/color";
import { FONTS } from "../constants/font";

const CreateScreen = ({
  data,
  loading,
  error,
  onCreateItem,
  onUpdateItem,
  onDeleteItem,
}) => {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("pcs");
  const [isEdit, setIsEdit] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState("");

  const clearForm = () => {
    setItemName("");
    setQuantity("");
    setUnit("pcs");
    setIsEdit(false);
    setEditItemId(null);
  };

  const buildPayload = () => {
    const parsedQuantity = Number(quantity);
    return {
      name: itemName.trim(),
      quantity: parsedQuantity,
      unit: unit.trim() || "pcs",
    };
  };

  const validateForm = () => {
    if (!itemName.trim() || !quantity.trim()) {
      setActionError("Please enter both item name and quantity.");
      return false;
    }

    const parsedQuantity = Number(quantity);
    if (Number.isNaN(parsedQuantity) || parsedQuantity < 0) {
      setActionError("Quantity must be a valid number.");
      return false;
    }

    return true;
  };

  const addItemHandler = async () => {
    if (!validateForm()) {
      return;
    }

    setActionError("");
    setActionLoading(true);

    try {
      await onCreateItem(buildPayload());
      clearForm();
    } catch (requestError) {
      setActionError(requestError.message || "Failed to create item.");
    } finally {
      setActionLoading(false);
    }
  };

  const deleteItemHandler = async (id) => {
    setActionError("");
    setActionLoading(true);

    try {
      await onDeleteItem(id);
      if (isEdit && editItemId === id) {
        clearForm();
      }
    } catch (requestError) {
      setActionError(requestError.message || "Failed to delete item.");
    } finally {
      setActionLoading(false);
    }
  };

  const editItemHandler = (item) => {
    setActionError("");
    setIsEdit(true);
    setItemName(item.name);
    setQuantity(item.quantity.toString());
    setUnit(item.unit || "pcs");
    setEditItemId(item.id);
  };

  const updateItemHandler = async () => {
    if (!validateForm() || !editItemId) {
      return;
    }

    setActionError("");
    setActionLoading(true);

    try {
      await onUpdateItem(editItemId, buildPayload());
      clearForm();
    } catch (requestError) {
      setActionError(requestError.message || "Failed to update item.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          placeholder="Enter the item name..."
          placeholderTextColor={COLORS.gray400}
          style={styles.input}
          value={itemName}
          onChangeText={(item) => setItemName(item)}
        />

        <TextInput
          placeholder="Enter the stock amount..."
          placeholderTextColor={COLORS.gray400}
          keyboardType="number-pad"
          style={styles.input}
          value={quantity}
          onChangeText={(item) => setQuantity(item)}
        />

        {actionError ? <Text style={styles.errorText}>{actionError}</Text> : null}

        <TouchableOpacity
          style={[
            styles.createBtn,
            isEdit ? { backgroundColor: COLORS.warning } : null,
          ]}
          activeOpacity={0.7}
          disabled={actionLoading}
          onPress={() => (isEdit ? updateItemHandler() : addItemHandler())}
        >
          <Text style={styles.btnText}>
            {actionLoading
              ? "PLEASE WAIT..."
              : isEdit
                ? "UPDATE ITEM"
                : "ADD ITEM IN STOCK"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.stockItemsTitle}>All items in the stock</Text>
        {loading ? <Text style={styles.statusText}>Loading items...</Text> : null}
        {!loading && error ? <Text style={styles.errorText}>{error}</Text> : null}

        <FlatList
          data={data}
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: 10,
            paddingBottom: 20,
          }}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.items,
                item.quantity <= 20 ? styles.lowStock : styles.highStock,
              ]}
            >
              <Text style={styles.itemName}>{item.name}</Text>

              <View style={styles.actions}>
                <Text style={styles.quantity}>{item.quantity}</Text>

                <Pressable
                  style={styles.editBtn}
                  disabled={actionLoading}
                  onPress={() => editItemHandler(item)}
                >
                  <Text style={styles.actionText}>Edit</Text>
                </Pressable>

                <Pressable
                  style={styles.deleteBtn}
                  disabled={actionLoading}
                  onPress={() => deleteItemHandler(item.id)}
                >
                  <Text style={[styles.actionText, { color: COLORS.white }]}>
                    Delete
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};
export default CreateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
    backgroundColor: COLORS.white,
  },

  form: {
    width: "100%",
    gap: 12,
  },

  input: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.warningLight,
    fontFamily: FONTS.medium,
    fontSize: 15,
    backgroundColor: COLORS.white,
  },

  createBtn: {
    width: "100%",
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  btnText: {
    color: COLORS.white,
    textAlign: "center",
    fontFamily: FONTS.bold,
    fontSize: 15,
  },

  listContainer: {
    flex: 1,
    gap: 10,
  },

  stockItemsTitle: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.black,
  },

  items: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 12,
  },

  lowStock: {
    backgroundColor: COLORS.dangerLight,
  },

  highStock: {
    backgroundColor: COLORS.successLight,
  },

  itemName: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    flex: 1,
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  quantity: {
    fontFamily: FONTS.medium,
    fontSize: 14,
  },

  statusText: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.gray500,
  },

  errorText: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.danger,
  },

  editBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: COLORS.warningLight,
  },

  deleteBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: COLORS.danger,
  },

  actionText: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.black,
  },
});
