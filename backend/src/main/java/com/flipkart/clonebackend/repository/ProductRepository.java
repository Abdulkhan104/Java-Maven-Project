// package com.flipkart.clonebackend.repository;

// public class ProductRepository {
    
// }
package com.flipkart.clonebackend.repository;

import com.flipkart.clonebackend.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Category, Long> {
}