# Configuración de Variables de Entorno

## Archivo `.env`

Este proyecto utiliza variables de entorno para configurar las URLs de API. 

### Pasos para configurar:

1. **Copiar el archivo de ejemplo:**
   ```bash
   cp .env.example .env
   ```

2. **Editar el archivo `.env`:**
   ```env
   EXPO_PUBLIC_API_BASE_URL=http://localhost:8000
   EXPO_PUBLIC_API_REPORTS_URL=http://192.168.1.22:5000
   EXPO_PUBLIC_GOOGLE_STORAGE_URL=https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108
   ```

### Variables disponibles:

- **`EXPO_PUBLIC_API_BASE_URL`**: URL base para la API de autenticación (login, registro)
  - Defecto: `http://localhost:8000`
  - Usado en: `LoginScreen.tsx`

- **`EXPO_PUBLIC_API_REPORTS_URL`**: URL base para la API de reportes
  - Defecto: `http://192.168.1.22:5000`
  - Usado en: `ReportView.tsx`, `ReportDetail.tsx`, `ReportsPanel.tsx`

- **`EXPO_PUBLIC_GOOGLE_STORAGE_URL`**: URL base para Google Storage
  - Usado en: Componentes de navegación para cargar imágenes de iconos

### Notas importantes:

- El archivo `.env` está en `.gitignore` y NO se debe subir al repositorio
- Las variables deben comenzar con `EXPO_PUBLIC_` para que Expo las exponga en la aplicación
- Los cambios en `.env` requieren reiniciar la aplicación (`npm start`)

### Para diferentes entornos:

Puedes crear archivos adicionales para diferentes entornos:
- `.env.development` - Desarrollo local
- `.env.staging` - Entorno de pruebas
- `.env.production` - Producción

Luego actualiza `package.json` con scripts específicos si lo necesitas.
