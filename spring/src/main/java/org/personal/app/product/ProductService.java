package org.personal.app.product;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Transactional
    public Product createProduct(Product product) {
        Double price = product.getPrice();
        product.setPrice(normalizePrice(price));
        return productRepository.save(product);
    }

    private Double normalizePrice(Double price) {
        Double normalizedPrice = price / 100;
        return normalizedPrice;
    }
    
}
