# WS_Mascotas 

Web Service construido con Node.js + Express que expone los 4 métodos
básicos (GET, POST, PUT, DELETE) para la gestión de mascotas.

> La aplicación Android que consume este Web Service se encuentra aquí:
> [AppMascotas](https://github.com/Isaac-9026/AppMascota)

## Instalación

1. Clonar el repositorio
2. Restaurar carpeta node_modules: **npm install**
3. Abrir terminal CTRL + Ñ (VSCode)
4. Ejecutar: **node index**
5. Verificar funcionalidad desde Postman, Thunder Client, etc.

## Endpoints

| Método | Endpoint      | Descripción                |
|--------|---------------|----------------------------|
| GET    | /mascotas     | Listar mascotas            |
| POST   | /mascotas     | Registrar nueva mascota    |
| PUT    | /mascotas/:id | Actualizar mascota por ID  |
| DELETE | /mascotas/:id | Eliminar mascota por ID    |

## Tecnologías

- Node.js
- Express
- MySQL2
- Body-parser

## Base de datos

Importar el archivo `database.sql` en MySQL antes de iniciar el servidor.
