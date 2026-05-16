import React, { useCallback, useEffect, useState } from "react";
import AllItems from "./AllItems";
import { getLowStockItems } from "../services/itemService";

const LowStockScreen = ({ refreshKey }) => {
  const [lowStockItems, setLowStockItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadLowStockItems = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getLowStockItems();
      setLowStockItems(response);
    } catch (requestError) {
      setError(requestError.message || "Failed to fetch low stock items.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLowStockItems();
  }, [loadLowStockItems, refreshKey]);

  return <AllItems data={lowStockItems} loading={loading} error={error} />;
};

export default LowStockScreen;
