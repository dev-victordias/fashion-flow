package org.personal.app.customer;

public record CustomerDTO(
    String clientType,
    String name,
    String email,
    String phone,
    String date,
    String cpf,
    String cnpj,
    String stateRegistration,
    String corporateReason,
    String fantasyName,
    String address,
    String addressComplement,
    String cep,
    String city,
    String referencePoint,
    String neighborhood,
    String state
)  {
    
}
