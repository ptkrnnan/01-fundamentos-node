import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./route.js";
import { extractQueryParams } from "./utils/extract-query-params.js";

/* Requisição HTTP
    - Métodos http
    - url (rotas)

    GET => Buscar um recurso do back end
    POST => Criar um recurso no back end
    PUT => Atualizar um recurso no back end
    PATCH => Atualizar uma informação especifica de um recurso no back end
    DELETE => Deletar um recurso do back end

    - Método + Rota
    GET /user => Buscando usuarios do back end
    POST /user => Criar um usuario no back end

    Aplicações => Stateful e Stateless

    Cabeçalhos (requisição/resposta) => meta dados

    HTTP Status Code
*/

/* 3 formas de enviar informações para API

  Query Parameters: URL Stateful => Filtros, paginação, não-obrigatorios
  http://localhost:3333/users?usersId=1&name=Diego

  Route Parameters: Identificação de recurso
  http://localhost:3333/users/1/

  Query e Route, ambos ficam na url. Nenhum podem ser utilizados para envio de informações sensiveis

  Request Body: Envio de informações de um formulario (HTTPs)
  POST http://localhost:3333/users/
*/

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  // Middlewares - função interceptadora
  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.path);

    const { query, ...params } = routeParams.groups;
    req.params = params;
    req.query = query ? extractQueryParams(query) : {};

    return route.handler(req, res);
  }

  return res.writeHead(404).end();
});

server.listen(3333);
