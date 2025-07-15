CREATE DATABASE IF NOT EXISTS base_clientes
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE base_clientes;

CREATE TABLE IF NOT EXISTS cliente (
  id INT AUTO_INCREMENT PRIMARY KEY,
  identificacion VARCHAR(20) NOT NULL UNIQUE,
  nombres VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  apellidos VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  fecha_nacimiento DATE,
  genero VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
);

INSERT INTO cliente (identificacion, nombres, apellidos, fecha_nacimiento, genero) VALUES
('0102030405', 'Juan', 'Pérez', '1990-01-01', 'Masculino'),
('0607080910', 'María', 'García', '1985-05-12', 'Femenino'),
('1112131415', 'Luis', 'López', '1992-09-23', 'Masculino'),
('1617181920', 'Ana', 'Torres', '1998-03-15', 'Femenino');
