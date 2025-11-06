CREATE TABLE IF NOT EXISTS "incarnations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"session_id" varchar(36),
	"persona_id" varchar(36),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "physical_bodies" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"incarnation_id" varchar(36),
	"birth_date" timestamp,
	"age_years_cached" integer,
	"health" numeric DEFAULT '100.0',
	"energy" numeric DEFAULT '100.0',
	"fatigue" numeric DEFAULT '0.0',
	"hunger" numeric DEFAULT '0.0',
	"mood" numeric DEFAULT '0.0',
	"injuries" jsonb DEFAULT '{}',
	"traits" jsonb DEFAULT '{}',
	"genetic_seed" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "incarnations" ADD CONSTRAINT "incarnations_session_id_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE OR REPLACE FUNCTION update_age_years_cached()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' OR NEW.birth_date IS DISTINCT FROM OLD.birth_date THEN
        NEW.age_years_cached = EXTRACT(YEAR FROM age(NEW.birth_date));
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
--> statement-breakpoint
CREATE TRIGGER trigger_update_age_years_cached
BEFORE INSERT OR UPDATE ON "physical_bodies"
FOR EACH ROW
EXECUTE FUNCTION update_age_years_cached();
--> statement-breakpoint
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
--> statement-breakpoint
CREATE TRIGGER trigger_update_physical_bodies_updated_at
BEFORE UPDATE ON "physical_bodies"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "physical_bodies" ADD CONSTRAINT "physical_bodies_incarnation_id_incarnations_id_fk" FOREIGN KEY ("incarnation_id") REFERENCES "incarnations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
