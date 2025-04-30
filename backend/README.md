# Backend - Sistema de Recrutamento

Backend desenvolvido em Spring Boot para o sistema de recrutamento interno.

## Tecnologias

- Java 17
- Spring Boot 3.x
- Spring Security com JWT
- PostgreSQL
- Maven

## Estrutura do Projeto

```
src/
├── main/
│   ├── java/
│   │   └── com/pacto/backend/
│   │       ├── config/         # Configurações do Spring
│   │       ├── controller/     # Controladores REST
│   │       ├── model/          # Entidades JPA
│   │       ├── repository/     # Repositórios JPA
│   │       ├── security/       # Configurações de segurança
│   │       ├── service/        # Lógica de negócio
│   │       └── dto/            # Objetos de transferência de dados
│   └── resources/
│       ├── application.properties # Configurações da aplicação
│       └── data.sql            # Dados iniciais
```

## Requisitos

- Java 17
- Maven
- PostgreSQL

## Configuração do Banco de Dados

### Usando Docker (Recomendado)

1. Na raiz do projeto, execute:
```bash
docker-compose up -d db
```

Isso irá:
- Criar um container PostgreSQL
- Criar o banco de dados `internal_recruitment`
- Configurar usuário `admin` com senha `admin`
- Expor a porta 5432

### Configuração Manual

1. Instale o PostgreSQL localmente
2. Crie o banco de dados:
```sql
CREATE DATABASE internal_recruitment;
```

3. Crie o usuário:
```sql
CREATE USER admin WITH PASSWORD 'admin';
GRANT ALL PRIVILEGES ON DATABASE internal_recruitment TO admin;
```

4. Configure o arquivo `application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/internal_recruitment
spring.datasource.username=admin
spring.datasource.password=admin
spring.datasource.driver-class-name=org.postgresql.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.format_sql=true
```

## Executando o Projeto

### Usando Docker

1. Execute o Docker Compose da raiz do projeto:
```bash
docker-compose up -d
```

### Localmente

1. Instale as dependências:
```bash
./mvnw clean install
```

2. Execute a aplicação:
```bash
./mvnw spring-boot:run
```

## Endpoints da API

### Autenticação
- POST `/api/auth/register` - Registro de usuário
- POST `/api/auth/login` - Login
- POST `/api/auth/refresh` - Atualizar token

### Vagas
- GET `/api/jobs` - Listar vagas
- POST `/api/jobs` - Criar vaga
- GET `/api/jobs/{id}` - Detalhes da vaga
- PUT `/api/jobs/{id}` - Atualizar vaga
- DELETE `/api/jobs/{id}` - Deletar vaga

### Candidaturas
- POST `/api/applications` - Criar candidatura
- GET `/api/applications/candidate/{id}` - Listar candidaturas do candidato
- GET `/api/applications/job/{id}` - Listar candidaturas da vaga
- PUT `/api/applications/{id}/status` - Atualizar status da candidatura
