# royal-crm

Mini CRM project aimed at managing customers, products and orders.

### Tech Stack
* Node.js
* Express.js
* MySQL

## Prepare The Environment
1. Create a new MySQL database, follow instructions in the `docs` folder.
2. Clone project: `git clone https://github.com/levworkshop/royal-crm.git`
3. Install dependencies: `npm install`
4. Install nodemon globally: `npm i -g nodemon` and update `package.json` accordingly.
5. In project, add configuration file: `config/dev.js`
with database connection details.
6. Run the app:
    * Windows: `set DEBUG=royal-crm:*; & npm start`
    * MacOS/Linux:  `$ DEBUG=royal-crm:* npm start`
