CREATE TABLE `enquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`request_id` text NOT NULL,
	`reference` text NOT NULL,
	`created_at` integer NOT NULL,
	`client_hash` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`company` text NOT NULL,
	`phone` text NOT NULL,
	`service` text NOT NULL,
	`budget` text NOT NULL,
	`message` text NOT NULL,
	`source` text NOT NULL,
	`consent` integer NOT NULL,
	`email_status` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `enquiries_request_id` ON `enquiries` (`request_id`);--> statement-breakpoint
CREATE INDEX `enquiries_client_time` ON `enquiries` (`client_hash`,`created_at`);