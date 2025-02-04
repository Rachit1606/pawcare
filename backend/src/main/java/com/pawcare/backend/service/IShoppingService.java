package com.pawcare.backend.service;

import com.pawcare.backend.model.Shopping;

import java.util.List;
import java.util.Optional;

public interface IShoppingService {
    List<Shopping> getAllShopping();

    Optional<Shopping> getShoppingById(String id);

    Shopping addShopping(Shopping shopping);

    Shopping updateShopping(String id, Shopping shopping);

    void deleteShopping(String id);
}
