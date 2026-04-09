// package com.flipkart.clonebackend.repository;

// public class CategoryRepository {
    
// }
package com.flipkart.clonebackend.repository;

import com.flipkart.clonebackend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CategoryRepository extends JpaRepository<Product, Long> {

    // Find products by category id
    List<Product> findByCategoryId(Long categoryId);
}