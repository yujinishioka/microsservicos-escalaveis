import { date, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const customers = pgTable('customers', {
  id: text().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  address: text().notNull(),
  state: text().notNull(),
  country: text().notNull(),
  zipCode: text().notNull(),
  phone: text().notNull(),
  dateOfBirth: date({ mode: 'date'}),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
})