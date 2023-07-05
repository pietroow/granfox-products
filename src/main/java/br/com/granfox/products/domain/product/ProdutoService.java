package br.com.granfox.products.domain.product;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    public Produto criar(ProdutoRequestDTO produtoRequestDTO) {
        Produto produto = new Produto(produtoRequestDTO);
        return produtoRepository.save(produto);
    }

    public Page<ProdutoRecord> findPageable(Pageable pageable) {
        return produtoRepository.findAll(pageable)
                .map(ProdutoRecord::new);
    }

}
