package com.pawcare.backend.controller;

import com.pawcare.backend.model.Shopping;
import com.pawcare.backend.service.IShoppingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping("/api/shopping")
public class ShoppingController {

    @Autowired IShoppingService shoppingService;

    @GetMapping
    public ResponseEntity<List<Shopping>> getAllShopping() {
        try {
            List<Shopping> shopping = shoppingService.getAllShopping();
            return new ResponseEntity<>(shopping, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Shopping> getShoppingById(@PathVariable String id) {
        try {
            Optional<Shopping> shopping = shoppingService.getShoppingById(id);
            if (shopping.isPresent()) {
                return new ResponseEntity<>(shopping.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping()
    public ResponseEntity<Shopping> addShopping(@RequestBody Shopping shopping) {
        try {
            Shopping createdShopping = shoppingService.addShopping(shopping);
            return new ResponseEntity<>(createdShopping, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Shopping> updateShopping(@PathVariable String id, @RequestBody Shopping shopping) {
        try {
            Shopping updatedShopping = shoppingService.updateShopping(id, shopping);
            return new ResponseEntity<>(updatedShopping, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteShopping(@PathVariable String id) {
        try {
            shoppingService.deleteShopping(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
