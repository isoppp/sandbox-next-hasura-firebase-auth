
ALTER TABLE "public"."users" ALTER COLUMN "email" SET NOT NULL;

ALTER TABLE "public"."users" ALTER COLUMN "display_id" DROP NOT NULL;

ALTER TABLE "public"."users" DROP COLUMN "display_id";

alter table "public"."users" rename column "email" to "display_id";

alter table "public"."users" drop constraint "users_id_key";

alter table "public"."articles" drop constraint "articles_author_id_fkey";

ALTER TABLE "public"."articles" ALTER COLUMN "author_id" TYPE uuid;

ALTER TABLE "public"."users" ALTER COLUMN "id" TYPE uuid;
ALTER TABLE ONLY "public"."users" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

alter table "public"."articles" add foreign key ("author_id") references "public"."users"("id") on update restrict on delete restrict;

alter table "public"."articles" add foreign key ("author_id") references "public"."users"("id") on update restrict on delete restrict;

alter table "public"."articles" add foreign key ("author_id") references "public"."users"("id") on update restrict on delete restrict;

alter table "public"."articles" add foreign key ("author_id") references "public"."users"("id") on update restrict on delete restrict;
