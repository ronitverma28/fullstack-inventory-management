const BASE_URL = "https://fullstack-inventory-management-qere.onrender.com";
// Replace YOUR_LOCAL_IP with your computer's IPv4 address (example: http://192.168.1.10:8080).

const handleResponse = async (response) => {
  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`;

    try {
      const errorBody = await response.json();
      if (errorBody?.message) {
        errorMessage = errorBody.message;
      }
    } catch {
      // Ignore JSON parsing errors for non-JSON error responses.
    }

    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export const getAllItems = async () => {
  const response = await fetch(`${BASE_URL}/items`);
  return handleResponse(response);
};

export const getLowStockItems = async () => {
  const response = await fetch(`${BASE_URL}/items/low-stock`);
  return handleResponse(response);
};

export const createItem = async (itemPayload) => {
  const response = await fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itemPayload),
  });
  return handleResponse(response);
};

export const updateItem = async (id, itemPayload) => {
  const response = await fetch(`${BASE_URL}/items/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itemPayload),
  });
  return handleResponse(response);
};

export const deleteItem = async (id) => {
  const response = await fetch(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
  });
  return handleResponse(response);
};
