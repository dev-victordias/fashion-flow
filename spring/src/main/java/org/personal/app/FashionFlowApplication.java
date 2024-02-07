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
			e.setReference("abc123");
			e.setType("Vestido");
			e.setSize("M");
			e.setQuantity(10);
			e.setPrice(50.99);
			productRepository.save(e);
			
			Product e2 = new Product();
			e2.setName("Karol");
			e2.setReference("def456");
			e2.setType("Calça");
			e2.setSize("M");
			e2.setQuantity(15);
			e2.setPrice(99.99);
			productRepository.save(e2);

			Product e3 = new Product();
			e3.setName("Julia");
			e3.setReference("ghi678");
			e3.setType("Vestido");
			e3.setSize("M");
			e3.setQuantity(20);
			e3.setPrice(129.0);
			productRepository.save(e3);

			Product e4 = new Product();
			e4.setName("Maria");
			e4.setReference("jkl910");
			e4.setType("Conjunto");
			e4.setSize("G");
			e4.setQuantity(5);
			e4.setPrice(99.99);
			productRepository.save(e4);

			Product e5 = new Product();
			e5.setName("Gabriela");
			e5.setReference("mno111");
			e5.setType("Blazer");
			e5.setSize("P");
			e5.setQuantity(12);
			e5.setPrice(199.99);
			productRepository.save(e5);
		};
	}

}
