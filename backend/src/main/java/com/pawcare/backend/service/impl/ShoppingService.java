package com.pawcare.backend.service.impl;

import com.pawcare.backend.model.Shopping;
import com.pawcare.backend.repository.ShoppingRepository;
import com.pawcare.backend.service.IShoppingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShoppingService implements IShoppingService {

    @Autowired
    private ShoppingRepository shoppingRepository;

    @Override
    public List<Shopping> getAllShopping() {
        return (List<Shopping>) shoppingRepository.findAll();
    }

    @Override
    public Optional<Shopping> getShoppingById(String id) {
        return shoppingRepository.findById(id);
    }

    @Override
    public Shopping addShopping(Shopping shopping) {
        return shoppingRepository.save(shopping);
    }

    @Override
    public Shopping updateShopping(String id, Shopping shopping) {
        Optional<Shopping> existingShoppingOpt = shoppingRepository.findById(id);
        if (existingShoppingOpt.isPresent()) {
            Shopping existingShopping = existingShoppingOpt.get();
            if (shopping.getTitle() != null) {
                existingShopping.setTitle(shopping.getTitle());
            }
            if (shopping.getPrice() != null) {
                existingShopping.setPrice(shopping.getPrice());
            }
            if (shopping.getDescription() != null) {
                existingShopping.setDescription(shopping.getDescription());
            }
            if (shopping.getCategory() != null) {
                existingShopping.setCategory(shopping.getCategory());
            }
            if (shopping.getAvailability() != null) {
                existingShopping.setAvailability(shopping.getAvailability());
            }
            if (shopping.getRating() != null) {
                existingShopping.setRating(shopping.getRating());
            }
            if (shopping.getThumbnail() != null) {
                existingShopping.setThumbnail(shopping.getThumbnail());
            }
            return shoppingRepository.save(existingShopping);
        }
        return null;
    }

    @Override
    public void deleteShopping(String id) {
        shoppingRepository.deleteById(id);
    }
}
