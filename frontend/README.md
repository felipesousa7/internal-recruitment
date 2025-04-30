# Frontend - Sistema de Recrutamento

Frontend desenvolvido em Angular para o sistema de recrutamento interno.

## Tecnologias

- Angular 17
- TypeScript
- SCSS
- Material Icons
- RxJS
- NgRx (opcional)

## Estrutura do Projeto

```
src/
├── app/
│   ├── core/              # Serviços e interceptors
│   ├── features/          # Módulos de funcionalidades
│   │   ├── auth/          # Autenticação
│   │   ├── candidate/     # Área do candidato
│   │   ├── recruiter/     # Área do recrutador
│   │   └── jobs/          # Vagas
│   ├── layouts/           # Layouts da aplicação
│   ├── shared/            # Componentes compartilhados
│   └── environments/      # Configurações de ambiente
├── assets/                # Recursos estáticos
└── styles/                # Estilos globais
```

## Requisitos

- Node.js 18+
- npm ou yarn

## Configuração

1. Configure a URL da API no arquivo `environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
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
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm start
```

O aplicativo estará disponível em `http://localhost:4200`.

## Funcionalidades

### Área do Candidato
- Visualização de vagas disponíveis
- Candidatura a vagas
- Acompanhamento de candidaturas
- Dashboard com estatísticas

### Área do Recrutador
- Gerenciamento de vagas
- Visualização de candidaturas
- Atualização de status de candidaturas
- Dashboard com estatísticas
