# openidl-extraction-pattern-utilities

-   see the runbook testing section for instructions on creating and publishing test extraction patterns
-   create sample data

# setup

-   run `npm install`

# creating data in a mongodb

-   run the `data-loader.js` script to load data from a test file

# using the openidl-upload, openidl-mapper to create sample data

-   see the openidl-mapper readme.md to see how to generate hds formatted data
-   use the openidl-upload app to load a mongo db with hds formatted data

# running the extraction pattern on the data

-   use the run-extracton-pattern script to run the extraction pattern
    -   update the settings to make sure you are running against the database you want and creating the correct output

`node run-extracton-pattern.js`

-   use generate-csv.js to generate the csv output.
    -   update the configuration to run against the correct db and reduction collection and generate the correct output file

`node generate-csv.js`
