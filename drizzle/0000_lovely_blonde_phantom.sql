CREATE TABLE `videos` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`author` text NOT NULL,
	`prompt` text NOT NULL,
	`title` text DEFAULT '' NOT NULL,
	`status` text NOT NULL,
	`task_id` text,
	`video_url` text,
	`demo` integer DEFAULT 0 NOT NULL,
	`published` integer DEFAULT 0 NOT NULL,
	`ratio` text NOT NULL,
	`duration` integer NOT NULL,
	`error` text,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_videos_owner_created` ON `videos` (`owner`,`created_at`);--> statement-breakpoint
CREATE INDEX `idx_videos_published_created` ON `videos` (`published`,`created_at`);