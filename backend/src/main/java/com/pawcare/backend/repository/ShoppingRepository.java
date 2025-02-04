package com.pawcare.backend.repository;

import com.pawcare.backend.model.Shopping;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ShoppingRepository extends MongoRepository<Shopping, String> {

}
