import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, text, time, timestamp, uuid } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
});

export const usersTableRelations = relations(usersTable, ({many}) => ({
    usersToClinic: many(usersToClinicTable),
}))

export const clinicsTable = pgTable("clinics", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
});

export const usersToClinicTable = pgTable("user_to_clinic", {
  userId: uuid("user_id").notNull().references(() => usersTable.id),
  clinicId: uuid("clinic_id").notNull().references(() => clinicsTable.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
});

export const usersToClinicTableRelations = relations(usersToClinicTable, ({one}) => ({
    user: one(usersTable, {
        fields: [usersToClinicTable.userId],
        references: [usersTable.id],
    }),
    clinic: one(clinicsTable, {
        fields: [usersToClinicTable.clinicId],
        references: [clinicsTable.id],
    }),
}))

export const clinicsTableRelations = relations(clinicsTable, ({many}) => ({
    doctors: many(doctorsTable),
    patients: many(patientsTable),
    appointments: many(appointmentsTable),
    usersToClinic: many(usersToClinicTable),
}))

export const doctorsTable = pgTable("doctors", {
  id: uuid("id").defaultRandom().primaryKey(),
  clinicId: uuid("clinic_id").notNull().references(() => clinicsTable.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  avatarImageUrl: text("avatar_image_url"),
  avaibleFromWeekday: integer("avaible_from_week_day").notNull(),
  avaivleToWeekday: integer("avaible_to_week_day").notNull(),
  avaivleFromTime: time("avaible_from_time").notNull(),
  avaivleToTime: time("avaible_to_time").notNull(),
  speciality: text("speciality").notNull(),
  appointmentPriceInCents: integer("appointment_price_in_cents").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
});

export const doctorsTableRelations = relations(doctorsTable, ({one}) => ({
    clinic: one(clinicsTable, {
        fields: [doctorsTable.clinicId],
        references: [clinicsTable.id],
    }),
    
}))

export const patientSexEnum = pgEnum("patient_sex", ["male", "female"]);

export const patientsTable = pgTable("patients", {
  id: uuid("id").defaultRandom().primaryKey(),
  clinicId: uuid("clinic_id").notNull().references(() => clinicsTable.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phoneNumber: text("phone_number").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  sex: patientSexEnum("sex").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
});

export const patientsTableRelations = relations(patientsTable, ({one}) => ({
    clinic: one(clinicsTable, {
        fields: [patientsTable.clinicId],
        references: [clinicsTable.id],
    }),
    
}))

export const appointmentsTable = pgTable("appointments", {
  id: uuid("id").defaultRandom().primaryKey(),
  date: timestamp("date").notNull(),
  patientId: uuid("patient_id").notNull().references(() => patientsTable.id, { onDelete: "cascade" }),
  doctorId: uuid("doctor_id").notNull().references(() => doctorsTable.id, { onDelete: "cascade" }),
  clinicId: uuid("clinic_id").notNull().references(() => clinicsTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
});

export const appointmentsTableRelations = relations(appointmentsTable, ({one}) => ({
    patient: one(patientsTable, {
        fields: [appointmentsTable.patientId],
        references: [patientsTable.id],
    }),
    doctor: one(doctorsTable, {
        fields: [appointmentsTable.doctorId],
        references: [doctorsTable.id],
    }),
    clinic: one(clinicsTable, {
        fields: [appointmentsTable.clinicId],
        references: [clinicsTable.id],
    }),
}))

