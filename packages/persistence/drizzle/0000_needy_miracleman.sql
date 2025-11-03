CREATE TABLE IF NOT EXISTS "belief_history" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"belief_id" varchar(36),
	"tick" integer,
	"delta_strength" numeric,
	"delta_rigidity" numeric,
	"delta_charge" numeric,
	"reason" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "beliefs" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"session_id" varchar(36),
	"key" varchar(128),
	"strength" numeric,
	"rigidity" numeric,
	"charge" numeric,
	"origin" varchar(64)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "engine_snapshots" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"session_id" varchar(36),
	"tick" integer,
	"snapshot" jsonb,
	"created_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "events" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"session_id" varchar(36),
	"tick" integer,
	"type" varchar(64),
	"payload" jsonb,
	"created_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "layer_state_snapshots" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"layer_id" varchar(36),
	"tick" integer,
	"vibration_current" numeric,
	"vibration_min" numeric,
	"vibration_max" numeric,
	"alignment" numeric,
	"sublevels" jsonb,
	"created_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "layers" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"run_id" varchar(36),
	"level_id" varchar(32),
	"name" varchar(64)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "runs" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"session_id" varchar(36),
	"created_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"created_at" timestamp,
	"label" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "timeline_edges" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"from_node_id" varchar(36),
	"to_node_id" varchar(36),
	"weight" numeric,
	"cause" varchar(128),
	"meta" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "timeline_nodes" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"session_id" varchar(36),
	"tick" integer,
	"energy" numeric,
	"coherence" numeric,
	"divergence" numeric,
	"entropy" numeric,
	"meta" jsonb
);
