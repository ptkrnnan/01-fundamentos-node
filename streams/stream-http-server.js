import http from "node:http";
import { Transform } from "node:stream";

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    console.log(transformed);
    callback(null, Buffer.from(String(transformed)));
  }
}

/*
req => ReadableStream
res => WritableStream
*/

const server = http.createServer(async (req, res) => {
  // Consome todos os dados da stream de leitura por completo, antes de poder trabalhar com os dados
  const buffers = [];
  for await (const chunk of req) {
    buffers.push(chunk);
  }

  // So executa quando a stream for percorrida por completo
  const fullStreamContent = Buffer.concat(buffers).toString();
  console.log(fullStreamContent);
  return res.end(fullStreamContent);

  //return req.pipe(new InverseNumberStream()).pipe(res);
});

server.listen(3334);
