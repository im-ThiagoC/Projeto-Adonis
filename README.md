# Projeto Adonis

Projeto realizado para disciplina Programação Web, uma rede social (twitter like) feita junto ao framework AdonisJS

## Instalação do Desenvolvimento

1 - Crie uma pasta temporária para o banco SQLite

```console
mkdir tmp
```

2 - Crie o `.env`

```console
cp .env.example .env
```

3 - Instalar as dependências

```console
npm install
```
4 - Instale o Lucid para testes e inicialize as migrations

```console
npm install -i @adonisjs/lucid
node ace migration:run
```

## Execução

```console
node ace serve --watch
```
