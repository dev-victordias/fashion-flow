package org.personal.app.customer;

import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerDTOMapper implements Function<CustomerDTO, Customer> {

    @Autowired
    AddressRepository addressRepository;

    @Override
    public Customer apply(CustomerDTO customerDTO) {
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

        Address address = new Address();
        address.setAddress(customerDTO.address());
        address.setAddressComplement(customerDTO.addressComplement());
        address.setCep(customerDTO.cep());
        address.setCity(customerDTO.city());
        address.setReferencePoint(customerDTO.referencePoint());
        address.setNeighborhood(customerDTO.neighborhood());
        address.setState(customerDTO.state()); 
        addressRepository.save(address);
        
        customer.setAddress(address);
        return customer;
    }
}
