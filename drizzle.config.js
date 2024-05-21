import {defineConfig } from "drizzle-kit"
export default defineConfig({
  schema: "./utils/schema.js",
  dialect: "mysql",
  dbCredentials: {
    host: "localhost",
    user: "root",
    database: "stud_db",
    password: "1417@anku",
    port: "3306",
  },
})
