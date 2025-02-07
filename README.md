# Loan Application
Loan application is a ReactJS, ExpressJS, and PostgreSQL Application


## Database Setup
### Option 1: via pgAdmin
1. Name the database as "**loanapp**" and owner should be "**postgres**"
2. Run the **CREATE_LOAN_TABLE.sql** under **database/transactional/schema**
3. Verify if all the tables are created

### Option 2: via PSQL
1. Open PSQL and login to your postgres database
2. Run the following psql
```
CREATE DATABASE loanapp
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LOCALE_PROVIDER = 'libc'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
```
3. Run the **CREATE_LOAN_TABLE.sql** target **loanapp** database
```
\i ${project directory}\database\schema\CREATE_LOAN_TABLE.sql
```

## Server-side Setup

1. go to server folder - `cd server`
2. run `npm install`
3. run `npm run dev`
4. Open API in browser - `localhost:8080/api/loans`

## Front-end Setup

1. go to web folder - `cd web`
2. run `npm install`
3. run `npm start`
4. Open app in browser - `localhost:3000`

## Unit Test Setup

### PSQL
1. Open PSQL and login to your postgres database
2. Run the following psql
```
CREATE DATABASE loanapptest
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LOCALE_PROVIDER = 'libc'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
```
3. Run the **CREATE_LOAN_TABLE.sql** target **loanapptest** database
```
\i ${project directory}\database\schema\CREATE_LOAN_TABLE.sql
```
4. Run the **INSERT_TEST_DATA.sql**
```
\i ${project directory}\database\schema\INSERT_TEST_DATA.sql
```

### Running the Unit Test
1. go to server folder - `cd server`
2. Run test - `npm run test`
