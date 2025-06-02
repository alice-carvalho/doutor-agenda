ALTER TABLE "appointments" ADD COLUMN "appointment_price_in_cents" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "doctors" ADD COLUMN "specialty" text NOT NULL;--> statement-breakpoint
ALTER TABLE "doctors" DROP COLUMN "speciality";