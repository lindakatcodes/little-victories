CREATE TABLE IF NOT EXISTS `journeys` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`taskList` text NOT NULL,
	`rewardPic` text NOT NULL,
	`tasksCompleted` integer DEFAULT 0 NOT NULL,
	`isActiveJourney` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `profiles_email_unique` ON `profiles` (`email`);