export const {
  APP_PORT = process.env.PORT || 5000,
  NODE_ENV = process.env.NODE_ENV || '',

  // JWT Config
  JWT_SECRET = process.env.JWT_SECRET || '',

  // Google OAuth Config
  GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '',
  GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '',

  // Mongo Config
  DB_USER = process.env.DB_USER || '',
  DB_PASS = process.env.DB_PASS || '',
  DB_HOST = process.env.DB_HOST || '',
  DB_PORT = process.env.DB_PORT || '',
  DB_NAME = process.env.DB_NAME || '',
  MONGO_URI = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
} = process.env