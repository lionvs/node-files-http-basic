
//const fs = require('fs');

//const result = fs.readFileSync('test.txt');

//
//console.log(result);
//console.log(result.toString());

//fs.readFile('test.txt', (err, result) => {
//    if (err) {
//        throw err;
//    }
//    console.log(result.toString());
//});

//console.log('first');

const fs = require('fs').promises;



async function asyncReadFile() {
    const result = await fs.readFile('test.txt');
    console.log(result.toString());
}

asyncReadFile();

