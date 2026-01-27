# 🔐 Configuración de Autenticación - SecureReport

## Backend URL
```
http://192.168.100.6:8000```

## Usuario de Prueba Actual
```
Email: carlos@email.com
Password: 123456
Nombre: Carlos Nunez
ID: 69706008cd9ae48a5512ebe0
Role: admin
```

## Pantallas Implementadas

### 1. LoginScreen (`screens/LoginScreen.tsx`)
- Pantalla inicial de autenticación
- Campos: Email y Contraseña
- Toggle para mostrar/ocultar contraseña
- Botón para crear nueva cuenta
- Pre-cargado con credenciales de prueba para facilitar testing

**Funcionalidades:**
- Valida campos obligatorios
- Realiza POST a `/api/auth/login`
- Guarda token en AsyncStorage
- Guarda datos del usuario en AsyncStorage
- Navega a HomeScreen si el login es exitoso
- Muestra errores con Alert

### 2. SignUpScreen (`screens/SignUpScreen.tsx`)
- Formulario de registro de nuevo admin
- Campos:
  - Nombre (obligatorio, min 1 char)
  - Apellido (obligatorio, min 1 char)
  - Fecha de Nacimiento (YYYY-MM-DD)
  - Dirección (obligatorio, min 1 char)
  - Email (obligatorio, ÚNICO)
  - Contraseña (obligatorio, mín 6 caracteres)

**Funcionalidades:**
- Validación de todos los campos
- POST a `/api/auth/register`
- Manejo de errores (email duplicado, datos inválidos)
- Redirige a Login después de registro exitoso

### 3. HomeScreen (Actualizado)
- Panel principal de la aplicación
- Requiere token válido (verificación en cada acceso)
- Si no hay token, redirige a LoginScreen
- Botón "Salir" en el header para logout
- Mantiene la navegación a ReportView intacta

## Flujo de Autenticación

```
LoginScreen 
  ↓ (login exitoso)
  ↓ (guardar token + usuario)
HomeScreen (verifica token en cada acceso)
  ↓ (click en "Salir")
  ↓ (elimina token + usuario)
LoginScreen
```

## Almacenamiento Local (AsyncStorage)

### Keys utilizadas:
```typescript
adminToken: string (JWT token)
adminUser: JSON.stringify({
  id: string,
  email: string,
  nombre: string
})
```

## Endpoints API Integrados

### 1. POST `/api/auth/login`
```javascript
Request:
{
  "email": "carlos@email.com",
  "password": "123456"
}

Response (200):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "69706008cd9ae48a5512ebe0",
    "email": "carlos@email.com",
    "nombre": "Carlos"
  }
}
```

### 2. POST `/api/auth/register`
```javascript
Request:
{
  "nombre": "Carlos",
  "apellido": "Nunez",
  "fecha_nacimiento": "2000-05-12",
  "direccion": "Av. Carlos Teodoro",
  "email": "carlos@email.com",
  "password": "123456"
}

Response (200):
{
  "message": "Usuario registrado correctamente"
}
```

## Dependencias Instaladas

```bash
npm install @react-native-async-storage/async-storage
```

## Variables de Entorno

Actualizar en `screens/LoginScreen.tsx` y `screens/SignUpScreen.tsx`:
```typescript
const BASE_URL = "http://192.168.100.6:8000";
```

Cambiar a:
```typescript
const BASE_URL = process.env.REACT_APP_API_URL || "http://192.168.100.6:8000";
```

## Cómo Usar el Token en Requests

El token está guardado en AsyncStorage. Para usarlo en requests posteriores:

```typescript
import AsyncStorage from "@react-native-async-storage/async-storage";

const token = await AsyncStorage.getItem("adminToken");
const response = await fetch('/api/reports', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

## Testing en Swagger

Accede a: http://192.168.100.6:8000/docs
- Haz clic en "Try it out" en cada endpoint
- Prueba con las credenciales del usuario de prueba

## Notas Importantes

⚠️ **Protección de Datos:**
- El token es JWT válido por 24 horas
- Las contraseñas se hashean con bcrypt en el backend
- Emails son únicos en la BD

⚠️ **ReportView:**
- No fue modificada para evitar conflictos en Git
- Está en la rama `main`, se integra sin cambios

⚠️ **Para Producción:**
- No pre-cargar credenciales de prueba en LoginScreen
- Usar variables de entorno para BASE_URL
- Implementar refresh tokens
- Usar SecureStore en lugar de AsyncStorage para iOS
