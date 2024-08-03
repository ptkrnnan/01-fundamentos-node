/*
Readable/Writable Streams
- Usar streams para consumo parcial de dados com estruturas de dados que permite ler e escrever de forma parcial sem depender do restante dos dados.

    - Construindo 3 tipos de Streams do zero
    - Tipo Stream duplex - pode fazer tanto leitura quanto escrita
*/

import { Readable, Writable, Transform } from "node:stream";

// Stream de leitura do zero
class OneToHundredStream extends Readable {
  index = 1;
  _read() {
    const i = this.index++;
    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));
        this.push(buf);
      }
    }, 1000);
  }
}

// Stream transformação do zero
class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    callback(null, Buffer.from(String(transformed)));
  }
}

// Stream de escrita do zero
class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream());
