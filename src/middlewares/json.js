/* middlewares (Interceptador)
É uma função que intercepta a requisição,     
Um middlewares tem um padrao que sempre recebe como parametro req e res, sendo facil de identificar

Intercepta a req e guarda todos os dados antes que possa trabalhar com eles
*/

export async function json(req, res) {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    req.body = null;
  }

  res.setHeader("Content-type", "application/json");
}
