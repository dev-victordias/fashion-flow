package org.personal.app;

import org.personal.app.model.Product;
import org.personal.app.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class FashionFlowApplication {

	public static void main(String[] args) {
		SpringApplication.run(FashionFlowApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(ProductRepository productRepository) {
		return args -> {
			productRepository.deleteAll();
			Product e = new Product();
			e.setName("Sara");
			e.setType("Vestido");
			productRepository.save(e);
		};
	}

}
