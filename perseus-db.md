# Perseus Database Copy

The current database is made up of information retrieved from [Perseus](https://www.perseus.tufts.edu/hopper/) - this information may be able to be parsed for the purposes of this project, this is currently being explored for viability of this project.

## To Run the database:

### Unzip database files

Unzip the compressed SQL files for db setup into a folder at the root level called `sql` with the contents of `sql.zip` 

If this is not done, the database will not initialize properly, and you will receive an error upon startup.

These files are kept zipped for size more than anything else, as uncompressed they are too large for github.

## To-Do

Create queries that will filter for needed information. Based on table names, the entities table probably has the information needed. There were errors downloading the following SQL files from the `Perseus` site. Hopefully I'll have constructed some queries to pull desired information out. With the major goal of getting limited information to add to a much smaller SQLite db to package with an application.

- hib_chunks.tar.gz
- hib_entities.tar.gz
- hib_entity_occurrences.tar.gz
- hib_frequencies.tar.gz
- morph_votes.tar.gz
- sgml.xml.texts.tar.gz
- sgml.xml.cache.tar.gz