package org.personal.app.customer;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class CustomerService {
    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public void addCustomer(Customer customer) {
        Optional<Customer> optional = customerRepository.findByEmail(customer.getEmail());
        if(!optional.isPresent()) {
            customerRepository.save(customer);
        }
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id).orElseThrow();
    }

    public Customer updateCustomer(Long id, Customer updateRequest) {
        return customerRepository.findById(id)
            .map(recordFound -> {
                recordFound.setName(updateRequest.getName());
                recordFound.setEmail(updateRequest.getEmail());
                Customer updated = customerRepository.save(recordFound);
                return updated;
            })
            .orElseThrow();
    }

    public void deleteCustomer(Long id) {
        customerRepository.findById(id).orElseThrow();
        customerRepository.deleteById(id);
    }
}
