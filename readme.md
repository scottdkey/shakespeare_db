## Shakespeare DB project


I'm hoping to extract data from various sources including but not limited to:
- Perseus
- OpenShakespeareProject

With the express goal of creating a sufficient api for use with both mobile and web applications to provide a shakespeare lexicon, with direct text references. 

This is a free and open source project at this time and may become monetized later depending on server and distribution costs.

# To Run the database:


## Install Docker
Have `docker` and `docker-compose` installed on your computer.

This can be done on MacOS via homebrew with the command:

MacOS With homebrew:
```bash
`brew install docker`
`brew install docker-compose`
```

Ubuntu:
```zsh
$ sudo apt-get update
$ sudo apt-get install docker-compose-plugin
```

Verify installation with
```bash
docker-compose -v
```
Which should print out the current version number if it is available.

Or for ease of use you can download [docker desktop](https://www.docker.com/products/docker-desktop/), this will work on Windows or MacOS. This method will still require the use of command line to run this database. The SQL files can be loaded into a MySQL database using the section `Accessing The Database` below


## Setting Environment variables
In the root of this directory there is a file named .env.example, make a copy of this file and fill in the values needed to access the database.


## Running Database
Navigate to the folder via cli, and on most operating systems run the application with the command. 


Terminal attached to application:
```bash
docker-compose up
```

Terminal detached from application:
```bash
docker-compose up -d
```

To view logs if application is currently running in detached mode:
```bash
docker-compose logs
```

To stop the database run
```bash
docker-compose down
```

To stop the database and destroy the volume(this will only effect the running database and leave the files intact)
```bash
docker-compose down -v
```



## To Access Database

There are many ways, including programming language connectors. For direct access off of a local machine, or a cloud database you can use any of the following options and many more:

- [MySQL Workbench](https://www.mysql.com/products/workbench/)
- [Beekeeper Studio](https://www.beekeeperstudio.io/)
