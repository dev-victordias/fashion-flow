package org.personal.app.product;

import javax.validation.constraints.Digits;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

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

    @NotBlank(message = "O nome do produto é obrigatório!")
    @Size(max = 20, message = "O nome do produto deve ter no máximo 20 caracteres!")
    @Column(name = "nome", length = 20, nullable = false)
    private String name;

    @NotNull(message = "O código de barras é obrigatório!")
    @Size(min = 8, max = 8, message = "O código de barras deve ter exatamente 8 caracteres!")
    @Digits(integer = 8, fraction = 0, message = "O código de barras deve ser um número inteiro!")
    @Column(name = "barcode", length = 8, nullable = false)
    private Integer barCode;

    @NotBlank(message = "A referência do produto é obrigatória!")
    @Size(min = 5, max = 5, message = "A referência do produto deve ter exatamente 5 caracteres!")
    @Column(name = "referencia", length = 20, nullable = false)
    private String reference;

    @NotBlank(message = "O tipo do produto é obrigatório!")
    @Size(max = 20, message = "O tipo do produto deve ter no máximo 20 caracteres!")
    @Column(name = "tipo", length = 20, nullable = false)
    private String type;

    @NotBlank(message = "O tamanho do produto é obrigatório!")
    @Column(name = "tamanho", nullable = false)
    private String size;

    @Size(max = 50, message = "O descrição do produto deve ter no máximo 50 caracteres!")
    @Column(name = "descricao", length = 50)
    private String description;

    @NotNull(message = "O preço do produto é obrigatório!")
    @Digits(integer = 10, fraction = 2, message = "O preço do produto deve ter até 8 dígitos inteiros e 2 casas decimais")
    @Column(name = "preco", nullable = false)
    private Double price;

    @NotNull(message = "A quantidade do produto é obrigatória!")
    @Column(name = "quantidade", nullable = false)
    private Integer quantity;

    public void setPrice(Double price) {
        this.price = normalizePrice(price);
    }
    
    private Double normalizePrice(Double price) {
        if (price == null) {
            return null;
        }
        return price / 100;
    }
}