# Sistema de Recrutamento Interno

Sistema de recrutamento interno desenvolvido para gerenciar processos seletivos, vagas e candidaturas.

## Tecnologias Utilizadas

### Backend
- Java 17
- Spring Boot 3.x
- Spring Security
- JWT Authentication
- PostgreSQL
- Maven

### Frontend
- Angular 17
- TypeScript
- SCSS
- Material Icons

## Requisitos

- Java 17
- Node.js 18+
- Docker e Docker Compose (opcional)
- PostgreSQL (se rodando localmente)

## Executando o Projeto

### Usando Docker (Recomendado)

1. Execute o Docker Compose:
```bash
docker-compose up -d
```

O sistema estará disponível em:
- Frontend: http://localhost:4200
- Backend: http://localhost:8080

### Executando Localmente

#### Backend

1. Navegue até a pasta do backend:
```bash
cd backend
```

2. Execute o Maven:
```bash
./mvnw spring-boot:run
```

#### Frontend

1. Navegue até a pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm start
```

## Acesso ao Sistema

- URL: http://localhost:4200

## Documentação

Para mais detalhes sobre cada parte do sistema, consulte:
- [Documentação do Backend](backend/README.md)
- [Documentação do Frontend](frontend/README.md)
