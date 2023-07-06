CREATE
EXTENSION IF NOT EXISTS "uuid-ossp";

create table tb_produto
(
    id         UUID primary key,
    nome       varchar(255),
    valor      numeric(38, 2),
    created_at timestamp,
    updated_at timestamp,
    deleted_at timestamp
);
