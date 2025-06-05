# Microsserviços:

Serviços independente de outras funções.

## Tecnologias

Tecnologia | versão
--- | :---:
Node | 22.16.0
Docker | -

## Estrutura

```bash

```

## Como utilizar

#### usuario e senha padrão do RabbitMQ:
- usuário: guest
- senha: guest

## Notas:
- cada micro serviço tem um banco de dados próprio

- orders
- invoices
- message broker (RabbitMQ/Kafka)
- API gateway
  - identifica os serviços com base na rota

- BFF (GraphQL/Federation)