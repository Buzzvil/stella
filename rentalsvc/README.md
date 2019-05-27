# Rentalsvc

## Development

### Run migration

```sh
make docker-up
export DATABASE_URL=postgres://postgres@localhost:30432/postgres?sslmode=disable
migrate -source file://db/migrations -database $DATABASE_URL up
```

### Run test

```sh
export DATABASE_URL=postgres://postgres@localhost:30432/postgres?sslmode=disable
make integration-test
```
