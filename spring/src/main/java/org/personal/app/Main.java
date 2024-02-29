package org.personal.app;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.personal.app.customer.Customer;
import org.personal.app.customer.CustomerRepository;
import org.personal.app.product.Product;
import org.personal.app.product.ProductRepository;

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
	CommandLineRunner initCustomers(CustomerRepository customerRepository) {
		return args -> {
			customerRepository.deleteAll();
			Customer c = new Customer();
			c.setName("João Silva");
			c.setEmail("joao.silva@email.com");
			customerRepository.save(c);

			Customer c2 = new Customer();
			c2.setName("Ana Oliveira");
			c2.setEmail("ana.oliveira@email.com");
			customerRepository.save(c2);

			Customer c3 = new Customer();
			c3.setName("Carlos Pereira");
			c3.setEmail("carlos.pereira@email.com");
			customerRepository.save(c3);

			Customer c4 = new Customer();
			c4.setName("Laura Santos");
			c4.setEmail("laura.santos@email.com");
			customerRepository.save(c4);

			Customer c5 = new Customer();
			c5.setName("Marcelo Costa");
			c5.setEmail("marcelo.costa@email.com");
			customerRepository.save(c5);
		};
	}
}
