package com.ronit.inventory.service;

import com.ronit.inventory.entity.Item;

import java.util.List;

public interface ItemService {

	List<Item> getAllItems();

	List<Item> getLowStockItems();

	Item createItem(Item item);

	Item updateItem(Long id, Item item);

	void deleteItem(Long id);
}
