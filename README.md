# Alkemy - proceso de aceleracion

# objetivo
Crear una app que permita a un usuario registrado el agregado de operaciones tanto ingresos como egresos para controlar sus ganancias y perdidas ya que al momento de cargar dicha operacion se va o sumando o restando dependiendo el tipo de operacion!

# tecnologias utilizadas
- Javascript
- React
- NodeJS
- Express
- pg
- Sequelize
- Passport-jwt
- Passport-local
- dotenv

# librerias utilizadas 
- Animate.css
- Formik
- Jsonwebtoken
- Sweetalert2
- bcrypt
- cors

# pasos a seguir para correr el proyecto

# API
`Crear la base de datos en postgres` tenemos que tener instalado postgreSQL, entrar a postgres desde la consola con el comando: psql postgres postgres, nos pedira una contraseña que seria la que le indicamos en el proceso de instalacion y luego iniciariamos con el usuario postgres a la base de datos postgres que seria la principal por asi decirlo, una vez dentro ejecutamos el siguiente comando para crear la base de datos: CREATE DATABASE nombrebasededatos; sin olvidarnos del punto y coma se nos creara una base de datos con ese nombre.

Nos ubicamos en la carpeta api, una vez allí deberiamos de crear un archivo .env para las variables de entorno utilizadas en el archivo db.js con las siguientes variables:
DB_USER=usuariodepostgres
DB_PASSWORD=contraseñadepostgres
DB_HOST=localhost
DB_NAME=nombrebasededatoscreada

una vez hecho esto, abrimos la consola nos ubicamos en la carpeta api y hacemos un npm install para instalar las dependencias cuando finaliza, realizamos un npm start deberia de aparecernos en consola listening in 3001.

# CLIENT
Desde la consola, solo nos ubicamos en la carpeta client del proyecto hacemos un npm install para las dependencias y luego un npm start

Teniendo tanto backend como frontend corriendo en las consolas nos vamos al navegador a la pagina [http://localhost:3000] que es por defecto la que esta puesta para que corra el front, y vamos a poder ver la pagina

`Para utilizarla` primero deberiamos registrarnos en la seccion de register, y luego iniciar sesion con la cuenta creada anteriormente, recien ahi vamos a poder realizar operaciones y ver nuestro balance, cuando hagamos nuevas operaciones estas quedaran registradas ya que cuenta con la base de datos creada en el backend y cada usuario va a tener sus operaciones guardadas 

#GRACIAS
