🧩 Ejemplo servicio REST (productos-service)

Este proyecto implementa un servicio REST básico desarrollado en Node.js y Express, con validación de seguridad mediante una API Key en el encabezado HTTP y registro automático en Consul.
Forma parte de la aplicación de los principios de arquitectura orientada a servicios (SOA) en el módulo de Arquitectura de Software.

📘 Descripción general

El servicio simula un microservicio de productos, permitiendo la consulta de información básica a través de una API protegida.
Además, implementa un registro opcional en Consul para habilitar la descubribilidad dinámica de servicios y monitoreo de salud.

El proyecto demuestra:

Uso de Express.js para exponer endpoints REST.

Validación de seguridad con API Key.

Integración con un Service Registry (Consul).

Aplicación de buenas prácticas en SOA y seguridad de servicios.

⚙️ Archivos incluidos
Archivo	Descripción
server.js	Código fuente del servicio REST con validación de API Key.
package.json	Dependencias y scripts del proyecto Node.js.
README.md	Este documento, con instrucciones y detalles del proyecto.
Tercera entrega Semana 7 - Final.docx	Documento técnico con análisis y diseño SOA (opcional).
🚀 Instrucciones de instalación y ejecución
1️⃣ Requisitos previos

Tener instalado Node.js (versión 18 o superior).

Tener acceso opcional a Consul si se desea registrar el servicio.

2️⃣ Instalar dependencias

Abre una terminal en la carpeta del proyecto y ejecuta:

npm install

3️⃣ Iniciar el servicio

Ejecuta:

npm start


Si todo está correcto, verás en consola:

Server running on port 3000
Registered in Consul: productos-service-3000

4️⃣ Probar los endpoints

Health check (público):

curl http://localhost:3000/health


Ruta protegida (requiere API Key):

curl -H "x-api-key: abc123" http://localhost:3000/api/products/123


Si la clave es válida, obtendrás:

{
  "id": "123",
  "name": "Camiseta deportiva",
  "price": 49.9,
  "currency": "COP",
  "stock": 23
}

🔐 Seguridad

Se valida el encabezado HTTP x-api-key antes de permitir el acceso a endpoints protegidos.

Si la clave es incorrecta o falta, se retorna un error:

401 Unauthorized → clave ausente.

403 Forbidden → clave inválida.

En producción se recomienda:

Usar HTTPS obligatorio.

Implementar rotación y expiración de claves.

Integrar autenticación avanzada (OAuth2 / JWT).

🧱 Registro de servicios (Consul)

El servicio se registra automáticamente en Consul al iniciar, si el registro está disponible en:

http://localhost:8500


Puedes ver el registro ingresando en el navegador a:
👉 http://localhost:8500/ui

Ejemplo de metadatos registrados:

{
  "serviceId": "productos-service",
  "version": "1.0.0",
  "protocol": "REST",
  "healthCheck": "/health"
}

🧠 Notas importantes

Este proyecto tiene fines educativos y demuestra la aplicación de patrones SOA.

Las claves de API se definen en variables de entorno o directamente en el código (abc123, def456).

Puede extenderse fácilmente para incluir:

Control de usuarios.

Versionamiento de servicios.

Balanceo de carga y despliegue en contenedores.

👨‍💻 Autor

Pedro Alejandro Olarte Rodríguez
Proyecto académico – Módulo: Arquitectura de Software
Institución Universitaria Politécnico Grancolombiano