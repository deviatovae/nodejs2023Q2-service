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

## Starting docker containers

```
docker compose -f docker/docker-compose.yaml up
```

## Testing

Enter into the `node` container

```
docker compose -f docker/docker-compose.yaml exec node sh
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
