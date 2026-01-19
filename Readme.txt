Proyecto: Backend de Autenticación y Productos (Node.js + MongoDB)
---------------------------------------------------------------

Este proyecto está desplegado en Render.com (backend) y utiliza MongoDB Atlas como base de datos.

📌 URL de producción (Render):
https://proyecto-6-12uh.onrender.com

Descripción:
Aplicación backend construida con Node.js y Express que permite:

- Registro e inicio de sesión de usuarios con JWT.
- Autorización por roles (admin / user).
- CRUD completo de productos (solo admin).
- Relación entre usuarios y productos.
- Manejo de datos con MongoDB Atlas usando Mongoose.
- No se utiliza Swagger/OpenAPI en esta versión.

Tecnologías:
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT (JSON Web Tokens)
- bcryptjs (hash de contraseñas)
- dotenv
- cors
- Nodemon (dev)

Estructura del proyecto:

src/
  config/
    db.js               -> Conexión a MongoDB Atlas
  controllers/
    user.controller.js  -> Lógica de usuarios (register, login, verify, update, delete)
    product.controller.js -> CRUD de productos
  middleware/
    authorization.js    -> Valida token JWT
    authAdmin.js        -> Middleware para admin
    isAdmin.js          -> Middleware para admin en productos
  models/
    User.js             -> Modelo usuario
    Product.js          -> Modelo producto
    Cart.js             -> Modelo carrito
  routes/
    user.routes.js      -> Endpoints de usuario
    product.routes.js   -> Endpoints de productos

index.js                -> Archivo de entrada del servidor
.env                    -> Variables de entorno 
.gitignore              -> Archivos ignorados
package.json            -> Dependencias y scripts

Funcionalidades principales:

1. Ruta raíz 
- Endpoint: GET /
- Respuesta: { "message": "ok" }

2. Registro de usuario
- Endpoint: POST /users/register
- Permite registrar un usuario con:
  - username
  - email
  - password
  - role (opcional)
- Si no existe un admin, el primer usuario registrado puede ser admin.

3. Inicio de sesión
- Endpoint: POST /users/login
- Devuelve un token JWT válido por 1 hora.

4. Verificar token
- Endpoint: GET /users/verify
- Valida el token y retorna datos del usuario (sin password).

5. Actualizar usuario
- Endpoint: PUT /users/:id
- Permite actualizar datos del usuario.
- Solo el usuario o un admin pueden editar.

6. Eliminar usuario
- Endpoint: DELETE /users/:id
- Solo el usuario o un admin pueden eliminar.

7. CRUD de productos (solo admin)

Crear producto
- Endpoint: POST /products/create
- Requiere rol admin.

Listar todos los productos
- Endpoint: GET /products/readall

Obtener producto por ID
- Endpoint: GET /products/readone/:id

Actualizar producto
- Endpoint: PUT /products/update/:id
- Requiere rol admin.

Eliminar producto
- Endpoint: DELETE /products/delete/:id
- Requiere rol admin.

Pruebas y uso:

Ejecutar la aplicación localmente:

1. Clonar el repositorio:
   git clone https://github.com/Preydet/Proyecto_6.git

2. Instalar dependencias:
   npm install

3. Crear archivo .env con variables:

   MONGODB_URI=tu_mongodb_atlas
   PORT=3000
   JWT_SECRET=tu_secreto

4. Ejecutar la app:
   npm run dev

5. Abrir en Postman o Thunder Client:
   http://localhost:3000

Thunder Client (recomendado):
- Crear colección: "Backend Auth + Products"
- Guardar token en variable global: {{token}}
- Usar header:
  Authorization: Bearer {{token}}

Endpoints a probar:
- Registro: POST /users/register
- Login: POST /users/login
- Verify: GET /users/verify
- Actualizar: PUT /users/:id
- Eliminar: DELETE /users/:id

- Crear producto: POST /products/create (admin)
- Listar productos: GET /products/readall
- Obtener producto: GET /products/readone/:id
- Actualizar producto: PUT /products/update/:id (admin)
- Eliminar producto: DELETE /products/delete/:id (admin)

Despliegue:
- Backend: Render.com
  URL: https://proyecto-6-12uh.onrender.com
- Base de datos: MongoDB Atlas

Notas:
- El registro y login usan JWT para mantener sesiones seguras.
- Los productos están vinculados a usuarios mediante user: ObjectId.
- El middleware authAdmin e isAdmin garantizan acceso restringido.
- El carrito (Cart) está asociado al usuario para futuras funcionalidades de compras.
- No se usa Swagger/OpenAPI en esta versión.

