package org.personal.app.customer;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Entity
@Table(name = "Customer")
@Getter
@Setter
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("_id")
    private Long id;

    private String clientType;

    @Column(name = "nome", length = 30, nullable = false)
    private String name;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    private String phone;

    private String date;

    private String cpf;

    private String cnpj;

    private String stateRegistration;

    private String corporateReason;

    private String fantasyName;

    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address address; 
}
