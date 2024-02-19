package org.personal.app.product;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public void addProduct(Product product) {
        Optional<Product> optional = productRepository.findByReference(product.getReference());
        if(!optional.isPresent()) {
            product.setPrice(product.getPrice()/100);
            productRepository.save(product);
        }
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow();
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public ResponseEntity<Product> updateProduct(Long id, Product updateRequest) {
        return productRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setName(updateRequest.getName());
                    recordFound.setBarCode(updateRequest.getBarCode());
                    recordFound.setReference(updateRequest.getReference());
                    recordFound.setType(updateRequest.getType());
                    recordFound.setSize(updateRequest.getSize());
                    recordFound.setDescription(updateRequest.getDescription());
                    recordFound.setPrice(hasPriceChanged(recordFound.getPrice(), updateRequest.getPrice()));
                    recordFound.setQuantity(updateRequest.getQuantity());
                    Product updated = productRepository.save(recordFound);
                    return ResponseEntity.ok().body(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    public void deleteProduct(Long id) {
        productRepository.findById(id).orElseThrow();
        productRepository.deleteById(id);
    }

    private Double hasPriceChanged(Double original, Double update) {
        if (original.toString().equals(update.toString())) {
            return original;
        }
        return update / 100;
    }

}
