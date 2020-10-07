const fs = require('fs');
const path = require('path');
const stream = require('stream');

const filePath = path.join('.', 'files', 'copyCli.txt');

const writableStream = fs.createWriteStream(filePath);
writableStream.on("error", (err) => {
    console.log('error: ', err);
});
writableStream.on("close", () => {
    console.log('closed writable stream');
});


console.log('start');


//process.stdin.pipe(writableStream);


//setTimeout(() => {
//    writableStream.close();    
//}, 6000);


//process.stdin.pipe(process.stdout);

//const transformerToUpperStream = new stream.Transform({
//    transform(chunk, encoding, callback) {
//        console.log('transformChunk ', chunk);
//        const newChunk = chunk.toString().toUpperCase();
//        
//        //callback(new Error('some error'));
//        callback(null, newChunk);
//    }
//});
//
//transformerToUpperStream.on("error", (err) => {
//    console.log('err');
//});
//process.stdin.pipe(transformerToUpperStream).pipe(writableStream);

// RUN  node streamsCli.js > files/copyCli2.txt 

//const readableStream = new stream.Readable({
//    read() {
//        for(let i=0;i<10;i++){
//            this.push(i.toString());
//        }
//        // indicate to stop
//        //this.push(null);
//    }
//});
//
//readableStream.push((100).toString());
//
//readableStream.on('data', (chunk) => {
//    console.log(chunk.toString());
//});

