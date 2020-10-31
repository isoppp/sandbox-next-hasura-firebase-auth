

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."users"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "display_id" text NOT NULL, "display_name" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , UNIQUE ("display_id"));
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_users_updated_at"
BEFORE UPDATE ON "public"."users"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_users_updated_at" ON "public"."users"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."articles"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "subject" text NOT NULL, "content" text NOT NULL, "author_id" uuid NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "published_at" timestamptz, PRIMARY KEY ("id") , FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict);
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_articles_updated_at"
BEFORE UPDATE ON "public"."articles"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_articles_updated_at" ON "public"."articles"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';


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
