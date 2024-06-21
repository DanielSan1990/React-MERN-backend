
# Proyecto Node.js con Express

Este proyecto es una plantilla básica para una aplicación Node.js con Express, que incluye autenticación, manejo de eventos y JWT.

## Tecnologías Utilizadas

- Node.js
- Express
- Mongoose
- Bcryptjs
- Jsonwebtoken
- Express-validator

## Instalación

1. Clonar el repositorio:

    ```bash
    git clone https://github.com/tu_usuario/tu_repositorio.git
    ```

2. Navegar al directorio del proyecto:

    ```bash
    cd tu_repositorio
    ```

3. Instalar las dependencias:

    ```bash
    npm install
    ```

4. Crear un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

    ```plaintext
    PORT=5000
    DB_CNN=mongodb+srv://<usuario>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
    SECRET_JWT_SEED=tu_seed_secreta
    ```

5. Iniciar el servidor:

    ```bash
    npm start
    ```

## Rutas Disponibles

- `/api/auth` - Rutas de autenticación (registro, login, revalidación de token).
- `/api/events` - Rutas para manejo de eventos (crear, actualizar, eliminar, obtener).

## Estructura del Proyecto

- `controllers/` - Controladores para manejar la lógica de las rutas.
- `helpers/` - Helpers como la generación de JWT y validaciones de fechas.
- `middlewares/` - Middlewares como la validación de JWT y campos.
- `models/` - Modelos de Mongoose para Usuarios y Eventos.
- `routes/` - Definición de las rutas de la API.

---

# Node.js Project with Express

This project is a basic template for a Node.js application with Express, including authentication, event management, and JWT.

## Technologies Used

- Node.js
- Express
- Mongoose
- Bcryptjs
- Jsonwebtoken
- Express-validator

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your_user/your_repository.git
    ```

2. Navigate to the project directory:

    ```bash
    cd your_repository
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the root of the project with the following environment variables:

    ```plaintext
    PORT=5000
    DB_CNN=mongodb+srv://<user>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
    SECRET_JWT_SEED=your_secret_seed
    ```

5. Start the server:

    ```bash
    npm start
    ```

## Available Routes

- `/api/auth` - Authentication routes (register, login, token revalidation).
- `/api/events` - Event management routes (create, update, delete, get).

## Project Structure

- `controllers/` - Controllers to handle route logic.
- `helpers/` - Helpers such as JWT generation and date validations.
- `middlewares/` - Middlewares like JWT and field validation.
- `models/` - Mongoose models for Users and Events.
- `routes/` - API route definitions.