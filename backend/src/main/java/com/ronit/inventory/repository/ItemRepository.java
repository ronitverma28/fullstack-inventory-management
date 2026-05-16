package com.ronit.inventory.repository;

import com.ronit.inventory.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

	List<Item> findByQuantityLessThanEqual(Integer quantity);
}
