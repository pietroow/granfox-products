package br.com.granfox.products.domain.product;

import br.com.granfox.products.utils.FilterPageable;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/produtos")
@RequiredArgsConstructor
public class ProdutoController {

    private final ProdutoService produtoService;

    @PostMapping
    public ResponseEntity<ProdutoRecord> criar(@Valid @RequestBody ProdutoRequestDTO servicoRequestDTO) {
        Produto produto = produtoService.criar(servicoRequestDTO);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(produto.getId())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @GetMapping
    public Page<ProdutoRecord> findPageable(FilterPageable filterPageable) {
        return produtoService.findPageable(filterPageable.listByPage());
    }

}
