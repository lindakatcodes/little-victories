CREATE TABLE `journeys` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text,
	`taskList` text,
	`rewardPic` text,
	`tasksCompleted` integer DEFAULT 0,
	`isActiveJourney` integer,
	FOREIGN KEY (`userId`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`email` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `profiles_email_unique` ON `profiles` (`email`);