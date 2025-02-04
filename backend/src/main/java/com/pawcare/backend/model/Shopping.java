package com.pawcare.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "shopping")
public class Shopping {
    @Id
    private String id;
    private String title;
    private String description;
    private String price;
    private String rating;
    private String category;
    private String availability;
    private String thumbnail;
}
