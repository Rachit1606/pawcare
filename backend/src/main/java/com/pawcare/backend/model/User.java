package com.pawcare.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document(collection = "users")
public class User {

    @Id
    private String id;
    private String email;
    private String username;
    private String password;
    private String address;
    private String phoneNumber;
    private String dogName;
    private String dogBreed;
    private String dogAge;
    private String dogGender;
    private String dogHealthIssues;
    private String dogDietRestrictions;

}
