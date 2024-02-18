package org.personal.app.product;

public record ProductDTO(
        Long id,
        String name,
        Integer barCode,
        String reference,
        String type,
        String size,
        String description,
        Double price,
        Integer quantity) {

}
