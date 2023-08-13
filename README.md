# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js (v 16.x) - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://www.docker.com/)

## Cloning the repository

```
git clone https://github.com/deviatovae/nodejs2023Q2-service.git
```

## Switching to the development branch

```
git checkout develop
```

## Create `.env` file

Copy `.env.example` to `.env` file


## Load `env` variables for docker compose: 
- option 1: run in the terminal: 

  - `set -a`
  - `source .env`
  
- option 2.
  - use docker compose with passing path to .env manually: e.g 
  `docker compose -f docker/docker-compose.yaml --env-file=.env up -d`

## Starting docker containers

```
docker compose -f docker/docker-compose.yaml up -d
```

## Testing

Enter into the `node` container

```
docker compose -f docker/docker-compose.yaml exec node sh
```
- if you pass env manually, run:
```
docker compose -f docker/docker-compose.yaml --env-file=.env exec node sh
```

Run tests

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Check for vulnerabilities

```
npm run audit
```
