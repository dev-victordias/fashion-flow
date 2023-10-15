package org.personal.app.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "Produto")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("_id")
    private Long id;

    @Column(name="nome",length = 20, nullable = false)
    private String name;

    @Column(name="referencia",length = 20, nullable = false)
    private String reference;

    @Column(name="tipo", length = 20, nullable = false)
    private String type;

    @Column(name="tamanho", length = 20)
    private String size;
    
    @Column(name = "descricao")
    private String description;
    
    @Column(name = "preco")
    private Double price;
    
    @Column(name="quantidade")
    private Integer quantity;

}
