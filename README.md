# Notes-App [https://notesapp-2wtd.onrender.com]
>Este es un proyecto realizado para Interfaces de Usuario y Tecnologías Web, de Lic.Informática

Una aplicación web para administrar notas utilizando tecnologías como NodeJS, MongoDB y otras relacionadas. Técnicamente, es una aplicación de varias páginas que utiliza Handlebars como motor de plantilla.

Esta aplicación puede hacer:

- CRUD: create/read/update/delete Notes
- Permite a un usuario iniciar sesión y guardar sus notas personales

### Instalación

```sh
git clone https://github.com/GonzaFarias/notes-app
cd notes-app
npm i
npm run dev # iniciar en modo desarrollador
npm start # iniciar en modo producción
```

> Debe tener Mongodb instalado localmente o establecer una variable de entorno MONGODB_URI para conectarse a cualquier instancia de mongodb (usando Mongodb Atlas, por ejemplo)

### Variables Environment

Esta aplicación necesita:

- `MONGODB_URI` es el Mongodb URI string
- `PORT` el puerto http del server en la app
- `NODE_ENV` node environment

### Default User

Cuando la app sea iniciada, se creara un usuario Admin con los siguientes datos:

- email: `admin@localhost`
- password: `adminpassword`

