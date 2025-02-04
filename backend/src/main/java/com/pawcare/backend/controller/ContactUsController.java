package com.pawcare.backend.controller;

import com.pawcare.backend.model.ContactUs;
import com.pawcare.backend.repository.ContactUsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contactus")
@CrossOrigin(origins = "*")
public class ContactUsController {

    @Autowired
    private ContactUsRepository contactUsRepository;

    @PostMapping("/submit")
    public ResponseEntity<ContactUs> submitContactUs(@RequestBody ContactUs contactUs) {
        ContactUs savedContactUs = contactUsRepository.save(contactUs);
        return ResponseEntity.ok(savedContactUs);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ContactUs>> getAllContactUs() {
        List<ContactUs> contactUsList = contactUsRepository.findAll();
        return ResponseEntity.ok(contactUsList);
    }
}
