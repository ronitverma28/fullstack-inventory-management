package com.ronit.inventory.service.impl;

import com.ronit.inventory.entity.Item;
import com.ronit.inventory.exception.ResourceNotFoundException;
import com.ronit.inventory.repository.ItemRepository;
import com.ronit.inventory.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

	private static final int LOW_STOCK_THRESHOLD = 20;

	private final ItemRepository itemRepository;

	@Override
	public List<Item> getAllItems() {
		return itemRepository.findAll();
	}

	@Override
	public List<Item> getLowStockItems() {
		return itemRepository.findByQuantityLessThanEqual(LOW_STOCK_THRESHOLD);
	}

	@Override
	public Item createItem(Item item) {
		return itemRepository.save(item);
	}

	@Override
	public Item updateItem(Long id, Item updatedItem) {
		Item existingItem = itemRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Item not found with id: " + id));

		existingItem.setName(updatedItem.getName());
		existingItem.setQuantity(updatedItem.getQuantity());
		existingItem.setUnit(updatedItem.getUnit());

		return itemRepository.save(existingItem);
	}

	@Override
	public void deleteItem(Long id) {
		if (!itemRepository.existsById(id)) {
			throw new ResourceNotFoundException("Item not found with id: " + id);
		}
		itemRepository.deleteById(id);
	}
}
