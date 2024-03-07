package org.personal.app.customer;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/customers")
public class CustomerController {
    private final CustomerService customerService;
    private final CustomerDTOMapper customerDTOMapper;

    public CustomerController(CustomerService customerService, CustomerDTOMapper customerDTOMapper) {
        this.customerService = customerService;
        this.customerDTOMapper = customerDTOMapper;
    }

    @PostMapping
    public ResponseEntity<Long> registerCustomer(@Valid @RequestBody CustomerDTO customerRequest) {
        Customer customer = customerDTOMapper.apply(customerRequest);
        customerService.addCustomer(customer);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Customer>> listCustomer() {
        List<Customer> customersList = customerService.getAllCustomers();
        return new ResponseEntity<>(customersList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> findCustomerById(@PathVariable Long id) {
        Customer customer = customerService.getCustomerById(id);
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateExistingCustomer(@PathVariable Long id, @Valid @RequestBody Customer updateRequest) {
        Customer customer = customerService.updateCustomer(id, updateRequest);
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
