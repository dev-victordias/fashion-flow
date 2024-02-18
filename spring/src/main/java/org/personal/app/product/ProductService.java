package org.personal.app.product;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductDTOMapper productDTOMapper;

    public ProductService(ProductRepository productRepository, ProductDTOMapper productDTOMapper) {
        this.productRepository = productRepository;
        this.productDTOMapper = productDTOMapper;
    }

    public void addProduct(Product product) {
        productRepository.save(product);
    }

    public ProductDTO getProductById(Long id) {
        return productRepository.findById(id)
                .map(productDTOMapper)
                .orElseThrow();
    }

    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(productDTOMapper)
                .collect(Collectors.toList());
    }

    public void updateProduct(Long id, @Valid Product updateRequest) {
        Product product = productRepository.findById(id).orElseThrow();

        product.setName(updateRequest.getName());
        product.setBarCode(updateRequest.getBarCode());
        product.setReference(updateRequest.getReference());
        product.setType(updateRequest.getType());
        product.setSize(updateRequest.getSize());
        product.setDescription(updateRequest.getDescription());
        product.setPrice(updateRequest.getPrice());
        product.setQuantity(updateRequest.getQuantity());

        productRepository.save(product);

    }

    public void deleteProduct(@PathVariable Long id) {
        productRepository.findById(id).orElseThrow();
        productRepository.deleteById(id);
    }

}
