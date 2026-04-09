// package com.flipkart.clonebackend.model;

// public class Category {
    
// }
package com.flipkart.clonebackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private String imageUrl;
    private Integer order;

    // --- Constructors, Getters and Setters ---
    public Category() {}
    // ... Generate Getters and Setters for id, name, imageUrl, order
}