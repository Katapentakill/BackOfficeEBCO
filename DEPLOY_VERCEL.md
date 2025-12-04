# 🚀 Cómo Publicar tu Página en Vercel (Gratis)

## Pasos para Publicar:

### 1. Crear cuenta en Vercel
- Ve a: https://vercel.com
- Regístrate con GitHub (recomendado) o email

### 2. Conectar con GitHub
1. Ve a tu repositorio en GitHub
2. Asegúrate de que tu código esté subido (git push)

### 3. Publicar en Vercel
1. Ve a https://vercel.com/new
2. Haz clic en "Import Project"
3. Selecciona tu repositorio de GitHub
4. Vercel detectará automáticamente que es Next.js
5. Configura las variables de entorno (ver sección abajo)
6. Haz clic en "Deploy"
7. ¡Listo! En 2-3 minutos tendrás tu URL pública

### 4. Compartir el link
- Vercel te dará una URL como: `https://tu-proyecto.vercel.app`
- Esta URL es pública y puede ser compartida con cualquiera
- Funciona desde cualquier lugar del mundo

## Configuración de Vercel

### Archivo vercel.json
El proyecto incluye un archivo `vercel.json` con las siguientes configuraciones:

- **Framework**: Next.js (detección automática)
- **Región**: `iad1` (US East - Virginia)
- **Comandos**: 
  - Build: `npm run build`
  - Dev: `npm run dev`
  - Install: `npm install`
- **Headers de Seguridad**: 
  - X-Content-Type-Options: nosniff
  - X-Frame-Options: DENY
  - X-XSS-Protection: 1; mode=block

### Variables de Entorno en Vercel

Configura estas variables en el dashboard de Vercel (Settings → Environment Variables):

**Producción:**
```
NEXT_PUBLIC_API_URL=https://tu-backend-api.com
```

**Preview/Development:**
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Pasos para agregar variables:**
1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega cada variable con su valor
4. Selecciona los ambientes (Production, Preview, Development)
5. Guarda y redeploy

### Configuración de Dominio Personalizado

1. Ve a Settings → Domains
2. Agrega tu dominio personalizado
3. Sigue las instrucciones de DNS
4. Vercel configurará SSL automáticamente

## Ventajas de Vercel:
✅ **Gratis** para proyectos personales
✅ **URL pública** (no requiere estar en la misma red)
✅ **Actualización automática** cuando haces git push
✅ **HTTPS** incluido
✅ **Rápido** (CDN global)
✅ **Optimizado** para Next.js
✅ **Preview Deployments** para cada PR
✅ **Analytics** integrado

## Alternativas Gratuitas:
- **Netlify**: https://netlify.com (similar a Vercel)
- **Railway**: https://railway.app (para apps con backend)

## Troubleshooting

### Error de Build
- Verifica que todas las dependencias estén en `package.json`
- Revisa los logs de build en Vercel
- Asegúrate de que `npm run build` funcione localmente

### Variables de Entorno no funcionan
- Verifica que las variables empiecen con `NEXT_PUBLIC_` si se usan en el cliente
- Asegúrate de redeploy después de agregar variables
- Revisa que estén configuradas para el ambiente correcto

### Imágenes no cargan
- Verifica la configuración en `next.config.ts` para `remotePatterns`
- Asegúrate de que las URLs de imágenes sean HTTPS en producción

