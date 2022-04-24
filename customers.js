module.exports = {
    list: [],

    addCustomer: function () {
        const name = process.argv.slice(2);

        if (!name || name.length === 0) {
            throw ('ERROR: name is empty');
        }

        this.list.push({
            name: name,
            id: this.list.length,
        });
    },

    customersList: function () {
        this.list.forEach(customer => {
            console.log(`ok. name: ${customer.name} was created.`);
        })
    }
}
