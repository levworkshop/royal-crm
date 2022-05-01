function calcVat() {
    const price = process.argv.slice(2)[0];
    console.log(price * 1.17);
}

calcVat();
