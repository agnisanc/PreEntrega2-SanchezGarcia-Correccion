En este proyecto se utilizaron los modulos:

1) Express
2) Nodemon
3) Handlebars
4) uuid
5) Socket.io

En la vista "home" (localhost:8080/) se presentan todos lo productos agregados hasta el momento.

En la vista realTimeProducts (localhost:8080/realtimeproducts) se presenta la misma lista de productos que en home, pero esta trabaja con websockets. Presenta un formulario en el cual debe agregarse todos los datos solicitados, en caso de no hacerlo se brinda un console.error. Al agregarse correctamente un producto, este se agrega a la tabla de manera automatica y se brinda un mensaje de devolucion de la operacion. Ademas, el producto agregado se actualiza en la vista "home".

Por otro lado, para la eliminacion de un producto, se presenta un input para indicar el numero de ID del producto que se desea eliminar. En caso de no indicarse, se brinda el correspondiente console.error. Al eliminarse correctamente un producto, este desaparece de la tabla y se brinda un mensaje de devolucion de la operacion. Ademas, el producto eliminado se actualiza en la vista "home".