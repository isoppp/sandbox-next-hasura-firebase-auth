
alter table "public"."articles" drop constraint "articles_author_id_fkey";

alter table "public"."articles" drop constraint "articles_author_id_fkey";

alter table "public"."articles" drop constraint "articles_author_id_fkey";

alter table "public"."articles" drop constraint "articles_author_id_fkey";

ALTER TABLE "public"."users" ALTER COLUMN "id" TYPE text;
ALTER TABLE "public"."users" ALTER COLUMN "id" DROP DEFAULT;

ALTER TABLE "public"."articles" ALTER COLUMN "author_id" TYPE text;

alter table "public"."articles"
           add constraint "articles_author_id_fkey"
           foreign key ("author_id")
           references "public"."users"
           ("id") on update restrict on delete restrict;

alter table "public"."users" add constraint "users_id_key" unique ("id");

alter table "public"."users" rename column "display_id" to "email";

ALTER TABLE "public"."users" ADD COLUMN "display_id" text NULL UNIQUE DEFAULT gen_random_uuid();

ALTER TABLE "public"."users" ALTER COLUMN "display_id" SET NOT NULL;

ALTER TABLE "public"."users" ALTER COLUMN "email" DROP NOT NULL;
