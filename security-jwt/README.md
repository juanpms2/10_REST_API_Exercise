# JWT Vanilla JavaScript Security

El ejercico consiste en securizar las peticiones al server de datos mediante un servidor de autenticación, el cual una vez logueados nos devuelve un token que nos permitirá hacer las peticiones.

Para ello se ha utilizado la librería `JWT` en el `auth_server` y `express-jwt` para el `server` de datos.

También se utiliza la librería `cors` configurada a moso de ejemplo para que el `auth-server` y el `server` de datos sólo acepte peticiones del cliente.

Las peticiones se implementan de distinta forma utilizando `XMLHttpRequest`, `Fetch`, `Async await` y la librería `Axios`.

Esto es sólo una demostración de cómo utilizar `JWT` y el acceso mediante `tokens`. Implementar una seguridad "completa" requeriría muchas más medidas y toma de decisiones que no aplican en este ejemplo.

## Puesta en marcha

- ### `npm install` en el cliente y en cada uno de los servidores.
- ### Una vez instalado, desde el raíz principal hacer un `npm start` que arrancará tanto el cliente como los servidores.
