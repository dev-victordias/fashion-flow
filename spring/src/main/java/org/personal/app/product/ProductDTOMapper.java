package org.personal.app.product;

import java.util.function.Function;

import org.springframework.stereotype.Service;

@Service
public class ProductDTOMapper implements Function<Product, ProductDTO> {

    @Override
    public ProductDTO apply(Product product) {
        return new ProductDTO(
            product.getId(),
            product.getName(),
            product.getBarCode(),
            product.getReference(),
            product.getType(),
            product.getSize(),
            product.getDescription(),
            product.getPrice(),
            product.getQuantity()
        );
    }
    
}
