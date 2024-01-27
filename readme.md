## Shakespeare DB project

This is a free and open source project at this time.


## individual setups - please start here before continuing below
-[setup perseus](./perseus-db.md)
-[setup open source shakespeare](./oss.md)


## Install Docker
Have `docker` and `docker-compose` installed on your computer.

This can be done on MacOS via homebrew with the command:

### MacOS With homebrew:
```bash
brew install docker
install docker-compose
```

### Ubuntu:
```bash
sudo apt-get update
sudo apt-get install docker-compose-plugin
```

### Alternative options
For ease of use you can download [docker desktop](https://www.docker.com/products/docker-desktop/), this will work on Windows or MacOS. This method will still require the use of command line to run this database. The SQL files can be loaded into a MySQL database using the section `Accessing The Database` below.

### Verify installation with
```bash
docker -v
```

```bash
docker-compose -v
```
Which should print out the current version number if `docker` and `docker-compose` respectively if installed correctly. This should work within either `powershell` or `bash` like cli interfaces

### Note for Windows
Windows may require turning on various virtualization options in the BIOS to allow docker to run properly.

#### The docker setup is for ease of use
- The Database files are compatible with the MySQL dialect and can be used in any compatible database, such as [PlanetScale](https://planetscale.com/)


## Setting Environment variables
In the root of this directory there is a file named `.env.example`, make a copy of this file and fill in the values needed to access the database. If you copy the contents of `.env.example` this will still run the database locally using those as default values


## Running Databases
Navigate to the folder via cli, and on most operating systems run the application with the command. This will spin up both the `OpenSourceShakespeare` and `Perseus` databases.


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

The default options(if you just copy the contents of .env.example), you can connect to one or both of the databases created here. They are both compatible with MySQL dialect, and that should be used as the option when connecting


```env
PERSEUS_DB_NAME=perseus
PERSEUS_DB_USERNAME=perseus
PERSEUS_DB_PASSWORD=superSecretPassword
PERSEUS_ROOT_PASS=moreSecretPassword
PERSEUS_DB_HOST=localhost
PERSEUS_DB_PORT=3306

OSS_DB_NAME=oss
OSS_DB_USERNAME=oss
OSS_DB_PASSWORD=superSecretPassword
OSS_DB_ROOT_PASS=moreSecretPassword
OSS_DB_HOST=localhost
OSS_DB_PORT=3307
```


