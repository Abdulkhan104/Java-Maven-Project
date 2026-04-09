// package com.flipkart.clonebackend.repository;

// public class UserRepository {
    
// }
package com.flipkart.clonebackend.repository;

import com.flipkart.clonebackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // Find user by email (used for login)
    Optional<User> findByEmail(String email);
}