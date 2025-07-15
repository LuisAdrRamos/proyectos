# 🗺️ Proyecto de Aplicaciones Distribuidas - Sistema Clientes con Docker

Este proyecto es una aplicación distribuida con **Docker**, compuesta por un backend en **Express**, una base de datos **MySQL 8**, y un frontend moderno en **React**. El sistema gestiona un CRUD de clientes y garantiza el correcto soporte de caracteres especiales (UTF-8).

---

## ⚙️ Tecnologías utilizadas

- 🐳 Docker & Docker Compose
- 🐬 MySQL 8
- ⚙️ Node.js + Express
- ⚛️ React
- 🌐 API REST
- 📦 UTF-8 Configurado correctamente

---

## 📦 Estructura del proyecto

```
proyectos/
│
├── backend/                 # Código del servidor Express
├── frontend/                # Interfaz de usuario en React
├── mysql-conf/             # Configuración personalizada de MySQL
│   └── my.cnf
├── mysql-init/             # Script de inicialización SQL
│   └── init.sql
├── docker-compose.yml      # Orquestador de servicios
└── README.md
```

---

## 🚀 Instrucciones de uso

### ✅ 1. Clonar el repositorio
```bash
git clone https://github.com/tuusuario/proyecto-clientes.git
cd proyecto-clientes
```

### ✅ 2. Construir e iniciar los contenedores
```bash
docker-compose up --build
```

Esto hará lo siguiente:
- Configura MySQL con soporte **utf8mb4**.
- Ejecuta el script `init.sql` para crear la base de datos `base_clientes` y prellenarla.
- Inicia el backend en `http://localhost:3000`.
- Expone la base de datos por el puerto `3307`.

> 📝 Si deseas reiniciar todo desde cero (incluido el contenido de la base de datos):
```bash
docker-compose down -v
docker-compose up --build
```

---

## 📄 Configuración MySQL (`my.cnf`)

```ini
[mysqld]
character-set-server=utf8mb4
collation-server=utf8mb4_unicode_ci
skip-character-set-client-handshake

[client]
default-character-set=utf8mb4

[mysql]
default-character-set=utf8mb4
```

---

## 🔌 Rutas del Backend (API REST)

> Base URL: `http://localhost:3000/api/clientes`

| Método | Ruta                     | Descripción                    |
|--------|--------------------------|--------------------------------|
| GET    | `/api/clientes`         | Listar todos los clientes      |
| POST   | `/api/clientes`         | Agregar un nuevo cliente       |
| PUT    | `/api/clientes/:id`     | Actualizar un cliente por ID   |
| DELETE | `/api/clientes/:id`     | Eliminar un cliente por ID     |

---

## 📷 Capturas del Frontend
Gestor de clientes:
<img width="1845" height="585" alt="image" src="https://github.com/user-attachments/assets/e63d8e90-d28b-49e1-9156-7c89f31d6f39" />


---

## ✅ Resultado esperado

- Los nombres y apellidos con tildes o caracteres especiales (ej. `Pérez`, `María`, `López`) deben verse correctamente en Postman, consola, navegador y frontend.
- Compatible con cualquier navegador y sistema operativo.

---

## 🙋‍♂️ Autor

Desarrollado por **Luis Adrian Ramos Guzman** – Proyecto académico.
