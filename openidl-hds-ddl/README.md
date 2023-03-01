# openIDL DDL

This is the DDL repository for openidl

# Quickstart

To get started quickly, follow these steps. This assumes you don't need to update any code etc.

## Initial setup
> **Docker Note**
> If you followed the project Readme there is more information in installing Docker and Docker Compose for each operating system

* Install Docker Compose: https://docs.docker.com/compose/install/
-   Easiest way to install Docker Compose is with **Docker Desktop**.

## Running the database and build on local system:
* Make sure Docker Desktop is running (or docker is running if you use the CLI tool)
* From terminal (if Linux or Mac) or from Shell (if on Windows):
* Start up Database and load all scripts.
* cd to the openidl-hds-ddl folder
```
$ cd PATH_OF_OPENIDL/openidl-hds-ddl
# Example Syntax: >SCHEMA=YOUR_SCHEMA_NAME docker compose up
# The following will create the database in a schema called test1
# The -d runs the script in detach mode
$ SCHEMA=test1 docker compose up -d
```

### Changing database name and user information
* Open the .env file and change the respective Database and user information.

### Using an already installed database:
> Point your FLYWAY scripts to the URL of the database you want to use with respective login information

### Future enhancements:
* Make all connection information to be passed as parameters or .env file.
* Add profiles for running the containers local or remote (for the database)