package main.java.org.personal.app.product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.personal.app.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
}
