const {Readable} = require('stream');

const bufferToStream = (buffer)=> {
    const readable = new Readable;
    readable.read = ()=> {};
    readable.push(buffer);
    readable.push(null);
    return readable;
}

module.exports = bufferToStream;