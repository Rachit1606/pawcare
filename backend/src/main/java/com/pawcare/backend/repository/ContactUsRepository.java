package com.pawcare.backend.repository;

import com.pawcare.backend.model.ContactUs;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContactUsRepository extends MongoRepository<ContactUs, String> {
}
