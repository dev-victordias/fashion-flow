package org.personal.app.sale;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class SaleService {
    private final SaleRepository saleRepository;

    public SaleService(SaleRepository saleRepository) {
        this.saleRepository = saleRepository;
    }

    public void addSale(Sale sale) {
        Optional<Sale> optional = saleRepository.findById(sale.getId());
        if (!optional.isPresent()) {
            saleRepository.save(sale);
        }
    }

    public Sale getSaleById(Long id) {
        return saleRepository.findById(id).orElseThrow();
    }

    public List<Sale> getAllSales() {
        return saleRepository.findAll();
    }

    public void deleteSale(Long id) {
        saleRepository.findById(id).orElseThrow();
        saleRepository.deleteById(id);
    }

    public Sale updateSale(Long id, Sale updateRequest) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateSale'");
    }

}
