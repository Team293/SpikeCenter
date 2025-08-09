CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invitation" (
	"id" text PRIMARY KEY NOT NULL,
	"organization_id" text NOT NULL,
	"email" text NOT NULL,
	"role" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"expires_at" timestamp NOT NULL,
	"inviter_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "member" (
	"id" text PRIMARY KEY NOT NULL,
	"organization_id" text NOT NULL,
	"user_id" text NOT NULL,
	"role" text DEFAULT 'member' NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organization" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text,
	"logo" text,
	"created_at" timestamp NOT NULL,
	"metadata" text,
	CONSTRAINT "organization_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	"impersonated_by" text,
	"active_organization_id" text,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"role" text,
	"banned" boolean,
	"ban_reason" text,
	"ban_expires" timestamp,
	"normalized_email" text,
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "user_normalized_email_unique" UNIQUE("normalized_email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "notification" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"timestamp" timestamp NOT NULL,
	"is_read" boolean NOT NULL,
	"notification_type" text NOT NULL,
	"widget_id" text,
	"user_id" text NOT NULL,
	"platform_id" text,
	"widget_data" jsonb
);
--> statement-breakpoint
CREATE TABLE "lms_certificate" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"recieved_on" timestamp with time zone DEFAULT now(),
	"course_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lms_course" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"thumbnail_url" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_featured" boolean DEFAULT false NOT NULL,
	"tags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"organization_id" text NOT NULL,
	"short_description" text NOT NULL,
	"long_description" text NOT NULL,
	"created_on" timestamp with time zone DEFAULT now(),
	"updated_on" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "lms_enrollment" (
	"user_id" text NOT NULL,
	"course_id" text NOT NULL,
	"role" text DEFAULT 'student' NOT NULL,
	"enrolled_on" timestamp with time zone DEFAULT now(),
	"deadline" timestamp with time zone,
	CONSTRAINT "lms_enrollment_pk" PRIMARY KEY("user_id","course_id")
);
--> statement-breakpoint
CREATE TABLE "lms_lesson" (
	"id" text PRIMARY KEY NOT NULL,
	"course_id" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"order_index" integer NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_on" timestamp with time zone DEFAULT now(),
	"updated_on" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "lms_lesson_completion" (
	"user_id" text NOT NULL,
	"lesson_id" text NOT NULL,
	"completed_on" timestamp with time zone DEFAULT now(),
	CONSTRAINT "lms_lesson_completion_pk" PRIMARY KEY("user_id","lesson_id")
);
--> statement-breakpoint
CREATE TABLE "lms_platform_announcement" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"variant" text NOT NULL,
	"href" text,
	"badge_text" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_on" timestamp with time zone DEFAULT now(),
	"expire_date" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lms_user" (
	"id" text PRIMARY KEY NOT NULL,
	"delegate_user_id" text NOT NULL,
	"points" integer DEFAULT 0 NOT NULL,
	"certificateIds" jsonb DEFAULT '[]'::jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "file_system" (
	"id" text PRIMARY KEY NOT NULL,
	"r_file_content" text,
	"csv_file_content" text
);
--> statement-breakpoint
CREATE TABLE "blog_post" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"published_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "changelog_entry" (
	"version" text NOT NULL,
	"date" timestamp NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"items" text[] DEFAULT '{}',
	"image" text,
	"button_url" text,
	"button_text" text
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_inviter_id_user_id_fk" FOREIGN KEY ("inviter_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member" ADD CONSTRAINT "member_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member" ADD CONSTRAINT "member_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notification" ADD CONSTRAINT "notification_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lms_certificate" ADD CONSTRAINT "lms_certificate_user_id_lms_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."lms_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lms_certificate" ADD CONSTRAINT "lms_certificate_course_id_lms_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."lms_course"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lms_enrollment" ADD CONSTRAINT "lms_enrollment_user_id_lms_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."lms_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lms_enrollment" ADD CONSTRAINT "lms_enrollment_course_id_lms_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."lms_course"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lms_lesson" ADD CONSTRAINT "lms_lesson_course_id_lms_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."lms_course"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lms_lesson_completion" ADD CONSTRAINT "lms_lesson_completion_user_id_lms_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."lms_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lms_lesson_completion" ADD CONSTRAINT "lms_lesson_completion_lesson_id_lms_lesson_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lms_lesson"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lms_user" ADD CONSTRAINT "lms_user_delegate_user_id_user_id_fk" FOREIGN KEY ("delegate_user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "lms_enrollment_user_idx" ON "lms_enrollment" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "lms_enrollment_course_idx" ON "lms_enrollment" USING btree ("course_id");--> statement-breakpoint
CREATE INDEX "lms_lesson_completion_user_idx" ON "lms_lesson_completion" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "lms_lesson_completion_lesson_idx" ON "lms_lesson_completion" USING btree ("lesson_id");--> statement-breakpoint
CREATE INDEX "lms_user_delegate_user_id_idx" ON "lms_user" USING btree ("delegate_user_id");