# Desafio Técnico Hypesoft - Sistema de Gestão de Produtos

Olá, este é o meu projeto para o Desafio Técnico Hypesoft. A solução foi desenvolvida com foco em uma arquitetura robusta, seguindo as melhores práticas e utilizando as tecnologias especificadas no desafio para entregar um sistema completo de gestão de produtos.

---

## 1. Visão Geral do Projeto

O sistema é um dashboard de gestão de produtos com as seguintes funcionalidades principais:

* **Gestão completa de Produtos e Categorias**: Permite criar, listar, editar e excluir produtos, com campos como nome, preço, descrição, quantidade em estoque e associação a categorias.
* **Controle de Estoque**: Exibe o total de produtos e o valor total em estoque, além de listar produtos com estoque baixo.
* **Dashboard**: Apresenta um gráfico de barras com a quantidade de produtos por categoria para uma visão rápida.
* **Autenticação com Keycloak**: A segurança é garantida pela integração com o Keycloak, protegendo as rotas e gerenciando o acesso dos usuários.

O design da aplicação segue como referência o protótipo [ShopSense Dashboard](https://dribbble.com/shots/24508262-ShopSense-Dashboard-Product-Page).

---

## 2. Arquitetura e Padrões de Design

A arquitetura do projeto foi pensada para ser escalável, de fácil manutenção e com clara separação de responsabilidades.

### Backend - Clean Architecture + DDD

A API foi construída seguindo os princípios de Clean Architecture e Domain-Driven Design (DDD).
* **Hypesoft.Domain**: Contém a lógica de negócio central (entidades, objetos de valor) independente de frameworks.
* **Hypesoft.Application**: Gerencia a lógica da aplicação com o padrão **CQRS (Command Query Responsibility Segregation)**, usando **MediatR** para desacoplar as requisições dos seus manipuladores.
* **Hypesoft.Infrastructure**: Contém a implementação dos repositórios e a configuração do Entity Framework Core com MongoDB.
* **Hypesoft.API**: A camada de apresentação, responsável pelos controllers e configuração do sistema.

### Frontend - Arquitetura Modular

O frontend utiliza uma arquitetura modular com componentes reutilizáveis, seguindo a estrutura do App Router do Next.js.
* Componentes de UI, formulários e gráficos são segregados em pastas específicas.
* A gestão de estado global e as chamadas de API são feitas usando React Query, otimizando o carregamento e o cache de dados.

---

## 3. Stack Tecnológica

* **Frontend**: React 18, Next.js 14, TypeScript, TailwindCSS, Shadcn/ui, TanStack Query, React Hook Form, Zod e Recharts.
* **Backend**: .NET 9, Entity Framework Core (MongoDB), CQRS com MediatR, FluentValidation e AutoMapper.
* **Infraestrutura**: Docker Compose, MongoDB, Keycloak.

---

## 4. Guia de Execução

O projeto é totalmente containerizado para garantir um ambiente de desenvolvimento consistente.

### Pré-requisitos
-   Docker Desktop 4.0+

### Execução
Basta clonar o repositório e rodar o Docker Compose para iniciar todos os serviços.

```bash
# Clone o repositório
git clone [https://github.com/seu-usuario/hypesoft-challenge.git](https://github.com/seu-usuario/hypesoft-challenge.git)
cd hypesoft-challenge

# Inicia todos os containers em background
docker-compose up -d --build
```

## Problemas Conhecidos

* **Problema de Inicialização do Keycloak**: O Keycloak pode, ocasionalmente, levar alguns segundos para iniciar completamente, pois precisa atualizar suas dependências. Durante esse período, pode ocorrer um erro temporário no login do frontend. A solução é **aguardar alguns instantes** e tentar novamente.
