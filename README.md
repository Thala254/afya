<!-- PROJECT LOGO -->
  <h1 align="center">AFYA BORA REMEDIES</h1>
  <h3 align="center">Next.js E-commerce</h3>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
   <li>
    <a href="#about-the-project">About The Project</a>
     <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
     </li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

**Next.js E-commerce** is an example online shop built with React.js and Keystone.js.

### Built With

- [Next.js](https://nextjs.org/) (React.js framework)
- [Typescript](https://www.typescriptlang.org/) with `strict:true`
- [React Hook Form](https://react-hook-form.com/)
- [Keystone.js](https://www.keystonejs.com/)
- [Mongo DB](https://www.mongodb.com/cloud/atlas)
- [Chakra UI](https://chakra-ui.com/)
- [Stripe](https://stripe.com)
- [Mailgun](https://mailgun.com)

**Some features**:

- Role-based Permissions (only a user with permissions can see "Edit" and "Delete" button for a product and can perform these actions, etc.)
- Debounced Product Search with [DownshiftJS](https://github.com/downshift-js/downshift)
- [Incremental Static Site Generation](https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration) for product pages
- [Server-Side Rendering](https://nextjs.org/docs/basic-features/pages#server-side-rendering) for showing orders and updating products
- [Advanced Usage of Apollo Cache](https://www.apollographql.com/docs/react/caching/cache-configuration/) for a snappy user experience by manipulating the Apollo Cache with `cache.readQuery`, `cache.writeQuery`, `cache.modify` and `cache.evict`
- Form Validation with [React Hook Form](https://react-hook-form.com/)
- Automatic Deployment via Docker Swarm and GitLab CI
- Testing with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) and Jest

<!-- ARCHITECTURE -->

## Architecture


Backend: [https://nextjs-ecommerce-keystone.repository.host](https://nextjs-ecommerce-keystone.repository.host/)  
GraphQL API: [https://nextjs-ecommerce-keystone.repository.host/api/graphql](https://nextjs-ecommerce-keystone.repository.host/api/graphql)  

Frontend: [https://nextjs-ecommerce.repository.host](https://nextjs-ecommerce.repository.host/)



<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites

- yarn v1

  ```sh
  npm install yarn -g
  ```

- Docker and Docker Compose

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/sophiabrandt/nextjs-ecommerce.git
   ```

2. Install NPM packages

   ```sh
   yarn install
   ```

3. Run docker-compose:

   ```sh
   docker-compose up -d
   ```

4. Create configuration file for the backend (`backend/.env`), see [`backend/sample.env`](./backend/sample.env).

5. Create configuration file for the frontend (`frontend/.env.local`), see [`frontend/sample.env`](./frontend/sample.env).
<!-- USAGE EXAMPLES -->

## Usage

```sh
cd backend && yarn run dev
cd frontend && yarn run dev
```

Go to [http://localhost:7771](http://localhost:7771) for the Keystone CMS (backend) and [http://localhost:7777](http://localhost:7777) for the Next.js application (frontend).

If you want to use [Caddy](https://caddyserver.com/), you can use the included [Caddyfile](Caddyfile) for automatic HTTPS certificates in local development.

```sh
sudo caddy run
```

Node.js will complain about the missing certificate issuer. For _local development_, ignore the error with `NODE_TLS_REJECT_UNAUTHORIZED = '0'`:


```sh
cd frontend
NODE_TLS_REJECT_UNAUTHORIZED = '0' yarn build
NODE_TLS_REJECT_UNAUTHORIZED = '0' yarn start
```
