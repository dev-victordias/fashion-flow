package org.personal.app;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import org.personal.app.product.Product;
import org.personal.app.product.ProductRepository;

@SpringBootApplication
public class Main {

	public static void main(String[] args) {
		SpringApplication.run(Main.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(ProductRepository productRepository) {
		return args -> {
			productRepository.deleteAll();
			Product e = new Product();
			e.setName("Vestido Sara");
			e.setReference("25062");
			e.setType("Vestido");
			e.setSize("M");
			e.setQuantity(10);
			e.setPrice(119.90);
			productRepository.save(e);
			
			Product e2 = new Product();
			e2.setName("Calça Luiza");
			e2.setReference("35002");
			e2.setType("Calça");
			e2.setSize("M");
			e2.setQuantity(15);
			e2.setPrice(99.90);
			productRepository.save(e2);

			Product e3 = new Product();
			e3.setName("Vestido Julia");
			e3.setReference("20022");
			e3.setType("Vestido");
			e3.setSize("M");
			e3.setQuantity(20);
			e3.setPrice(119.90);
			productRepository.save(e3);

			Product e4 = new Product();
			e4.setName("Conjunto Sara");
			e4.setReference("50033");
			e4.setType("Conjunto");
			e4.setSize("G");
			e4.setQuantity(5);
			e4.setPrice(134.90);
			productRepository.save(e4);

			Product e5 = new Product();
			e5.setName("Blazer Kelly");
			e5.setReference("10291");
			e5.setType("Casacos");
			e5.setSize("P");
			e5.setQuantity(12);
			e5.setPrice(129.90);
			productRepository.save(e5);
		};
	}

}
