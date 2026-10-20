CREATE TABLE `demo_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`token_hash` text NOT NULL,
	`name` text NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `demo_sessions_token_hash_unique` ON `demo_sessions` (`token_hash`);