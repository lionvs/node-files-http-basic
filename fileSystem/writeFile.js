const fsAsync = require('fs').promises;
const fs = require('fs');
const path = require('path');

const filePath = path.join('.', 'files', 'users.csv');


function transformUsersToCsv(users) {
    const lineSeparator = "\n";
    const headers = "id,email,age,gender";
    const data = users.map(item => `${item.id},${item.email},${item.age},${item.gender}`);
    return `${headers}${lineSeparator}${data.join(lineSeparator)}`;
}

const users = [
    { id: 1, email: 'test@test.com', age: 18, gender: 'm' },
    { id: 2, email: 'test2@test.com', age: 28, gender: 'f' },
    { id: 3, email: 'test3@test.com', age: 25, gender: 't' },
];

(async () => {
    const response = await fsAsync.writeFile(filePath, transformUsersToCsv(users));
    console.log(`File written with response: ${response}`);    
})();

//fs.watchFile(filePath, (curr, prev) => {
//    console.log(`the current mtime is: ${curr.mtime}`);
//    console.log(`the previous mtime was: ${prev.mtime}`);
//});
