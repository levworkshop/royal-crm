const customers = [];

function addCustomer() {
    const username = process.argv.slice(2);

    if (!username || username.length === 0) {
        throw('ERROR: username is empty');
    }

    const tempPwd = Math.floor(Math.random() * 10000000);

    customers.push({
        username: username,
        password: tempPwd,
    });

    customers.forEach(customer => {
        console.log(`ok. username: ${ customer.username } with temporary password: ${ customer.password}.`);
    })
}

addCustomer();


