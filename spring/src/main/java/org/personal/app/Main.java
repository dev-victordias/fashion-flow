package org.personal.app;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.List;

import org.personal.app.customer.Address;
import org.personal.app.customer.AddressRepository;
import org.personal.app.customer.Customer;
import org.personal.app.customer.CustomerRepository;
import org.personal.app.product.Product;
import org.personal.app.product.ProductRepository;
import org.personal.app.sale.Sale;
import org.personal.app.sale.SaleRepository;

@SpringBootApplication
public class Main {

	public static void main(String[] args) {
		SpringApplication.run(Main.class, args);
	}

	@Bean
	CommandLineRunner initProducts(ProductRepository productRepository) {
		return args -> {
			productRepository.deleteAll();
			Product e = new Product();
			e.setName("Vestido Sara");
			e.setReference("25062");
			e.setBarCode(32053879);
			e.setType("Vestido");
			e.setSize("M");
			e.setQuantity(10);
			e.setPrice(119.90);
			productRepository.save(e);

			Product e2 = new Product();
			e2.setName("Calça Luiza");
			e2.setReference("35002");
			e2.setBarCode(31323315);
			e2.setType("Calça");
			e2.setSize("M");
			e2.setQuantity(15);
			e2.setPrice(99.90);
			productRepository.save(e2);

			Product e3 = new Product();
			e3.setName("Vestido Julia");
			e3.setReference("25082");
			e3.setBarCode(28024110);
			e3.setType("Vestido");
			e3.setSize("M");
			e3.setQuantity(20);
			e3.setPrice(119.90);
			productRepository.save(e3);

			Product e4 = new Product();
			e4.setName("Conjunto Sara");
			e4.setReference("50033");
			e4.setBarCode(31345457);
			e4.setType("Conjunto");
			e4.setSize("G");
			e4.setQuantity(5);
			e4.setPrice(134.90);
			productRepository.save(e4);

			Product e5 = new Product();
			e5.setName("Blazer Kelly");
			e5.setReference("10291");
			e5.setBarCode(39837668);
			e5.setType("Casacos");
			e5.setSize("P");
			e5.setQuantity(12);
			e5.setPrice(129.90);
			productRepository.save(e5);
		};

	}

	@Bean
	CommandLineRunner initAddress(AddressRepository addressRepository) {
		return args -> {
			addressRepository.deleteAll();
			Address a = new Address();
			a.setCity("Vitória");
			a.setState("ES");
			addressRepository.save(a);

			Address a2 = new Address();
			a2.setCity("Vitória");
			a2.setState("ES");
			addressRepository.save(a2);

			Address a3 = new Address();
			a3.setCity("Vila Velha");
			a3.setState("ES");
			addressRepository.save(a3);

			Address a4 = new Address();
			a4.setCity("Cariacica");
			a4.setState("ES");
			addressRepository.save(a4);

			Address a5 = new Address();
			a5.setCity("Guarapari");
			a5.setState("ES");
			addressRepository.save(a5);
		};
	}


	@Bean
	CommandLineRunner initCustomers(CustomerRepository customerRepository, AddressRepository addressRepository) {
		
		return args -> {
			customerRepository.deleteAll();
			Customer c = new Customer();
			c.setName("João Silva");
			c.setPhone("(27) 99999-9999");
			c.setEmail("joao.silva@email.com");
			c.setClientType("Pessoa Física");
			c.setAddress(addressRepository.getReferenceById(1L));
			customerRepository.save(c);
			
			Customer c2 = new Customer();
			c2.setName("Ana Oliveira");
			c2.setPhone("(27) 99999-8888");
			c2.setEmail("ana.oliveira@email.com");
			c2.setClientType("Pessoa Física");
			c2.setAddress(addressRepository.getReferenceById(2L));
			customerRepository.save(c2);
			
			Customer c3 = new Customer();
			c3.setName("Carlos Pereira");
			c3.setPhone("(27) 99999-7777");
			c3.setEmail("carlos.pereira@email.com");
			c3.setClientType("Pessoa Física");
			c3.setAddress(addressRepository.getReferenceById(3L));
			customerRepository.save(c3);
			
			Customer c4 = new Customer();
			c4.setName("Laura Santos");
			c4.setPhone("(27) 3333-6666");
			c4.setEmail("laura.santos@email.com");
			c4.setClientType("Pessoa Jurídica");
			c4.setAddress(addressRepository.getReferenceById(4L));
			customerRepository.save(c4);
			
			Customer c5 = new Customer();
			c5.setName("Marcelo Costa");
			c5.setPhone("(27) 3333-5555");
			c5.setEmail("marcelo.costa@email.com");
			c5.setClientType("Pessoa Jurídica");
			c5.setAddress(addressRepository.getReferenceById(5L));
			customerRepository.save(c5);
		};
	}

	@Bean
	CommandLineRunner initSales(SaleRepository saleRepository, CustomerRepository customerRepository, ProductRepository productRepository) {
		List<Product> productsList = new ArrayList<>();
		productsList.add(productRepository.getReferenceById(1L));
		productsList.add(productRepository.getReferenceById(2L));

		return args -> {
			saleRepository.deleteAll();
			Sale s = new Sale();
			s.setCustomer(customerRepository.getReferenceById(1L));
			s.setProductsList(<productRepository.getReferenceById(1L),1>);
			saleRepository.save(s);
		};
	}
}
