## thequiz-api
### Author: Igor Vujovic

This is api for the quiz Coding Challenge.

Demo of the app that consumes this api is publicly available on: [thequiz.cf](https://thequiz.cf)

Demo app source is available on the private github: https://github.com/vujovicigor/thequiz-api

#### Spin up the backend locally with docker-compose 
This command will download required dependencies, bootstrap node api and initialize db. 
API will be exposed on port 3001 and db on port 5432.

Configuration can be found in docker-compose.yaml located in the root of this repo.
Start docker containers
```sh
docker-compose up -d
```

Stop all containers
```sh
docker-compose stop
```

Stop and destroy all containers
```sh
docker-compose down -v
```

TODO: 
try catch provjeri