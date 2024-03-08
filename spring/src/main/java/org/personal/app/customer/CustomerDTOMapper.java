package org.personal.app.customer;

import java.util.function.Function;

import org.springframework.stereotype.Service;

@Service
public class CustomerDTOMapper implements Function<CustomerDTO, Customer> {

    @Override
    public Customer apply(CustomerDTO customerDTO) {

        Address address = new Address();
        address.setAddress(customerDTO.address());
        address.setAddressComplement(customerDTO.addressComplement());
        address.setCep(customerDTO.cep());
        address.setCity(customerDTO.city());
        address.setReferencePoint(customerDTO.referencePoint());
        address.setNeighborhood(customerDTO.neighborhood());
        address.setState(customerDTO.state());

        Customer customer = new Customer();
        customer.setName(customerDTO.name());
        customer.setEmail(customerDTO.email());
        customer.setPhone(customerDTO.phone());
        customer.setDate(customerDTO.date());
        customer.setCpf(customerDTO.cpf());
        customer.setCnpj(customerDTO.cnpj());
        customer.setStateRegistration(customerDTO.stateRegistration());
        customer.setCorporateReason(customerDTO.corporateReason());
        customer.setFantasyName(customerDTO.fantasyName());
        customer.setAddress(address);

        return customer;
    }

}