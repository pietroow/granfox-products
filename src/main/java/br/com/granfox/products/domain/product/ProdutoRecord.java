package br.com.granfox.products.domain.product;

import java.math.BigDecimal;
import java.util.UUID;

public record ProdutoRecord(UUID id, String nome, BigDecimal valor) {
    public ProdutoRecord(Produto produto) {
        this(produto.getId(), produto.getNome(), produto.getValor());
    }
}
