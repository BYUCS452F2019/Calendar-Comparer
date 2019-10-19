

create extension if not exists "uuid-ossp";

create table group_calendar (
  group_calendar_id uuid primary key default uuid_generate_v4(),
  group_calendar_name varchar not null
);

create table "user" (
  user_id uuid primary key default uuid_generate_v4(),
  user_email varchar not null,
  user_google_refresh_token varchar,
  user_google_access_token varchar,
  user_google_token_expiry_date varchar
);

create table calendar_membership (
  calendar_membership_id uuid primary key default uuid_generate_v4(),
  calendar_membership_group_calendar_id uuid references group_calendar(group_calendar_id),
  calendar_membership_user_id uuid references "user"(user_id)
);

create table personal_calendar (
  personal_calendar_id uuid primary key default uuid_generate_v4(),
  personal_calendar_membership_id uuid references calendar_membership(calendar_membership_id),
  personal_calendar_google_calendar_id varchar
);

create table "event" (
  event_id uuid primary key default uuid_generate_v4(),
  event_personal_calendar_id uuid references personal_calendar(personal_calendar_id),
  event_name varchar not null,
  event_start timestamptz not null,
  event_end timestamptz not null
);

create table "session" (
  session_id uuid primary key default uuid_generate_v4(),
  session_user_id uuid references "user"(user_id),
  session_start_time timestamptz not null default now(),
  session_last_active timestamptz not null default now(),
  session_expiry_length interval not null
);

insert into "user" (user_email, user_google_refresh_token, user_google_access_token, user_google_token_expiry_date)
values ('emilyhales2@gmail.com','1/-YJWR8JuUGq00AcoRoHK3ialSQ5g-CLZwIiR64r2bydP3NdVWZZHJEJLV-lg-1oQ', 'ya29.Il-bB1sI9YE-98-120wzrsHMCbi6kGm57o-BOyasGj6bidnPkYzFPUZmozPFrTWYmmwNre_2LZwcNdCXVH1YMaQ0iF6lcV_OENh0ohuncEzzVeizOb5IrX3qvzLNDZkx4Q', '1571265206530');

insert into "user" (user_email, user_google_refresh_token, user_google_access_token, user_google_token_expiry_date)
values ('jared@email.com', '1/BbkQkEWjID5a5a7sbxlGvExCutupN1jgVJemzmZO_mM', 'ya29.Il-bB_yUtK_tVsqEp7WvGdPeIuwH83PIJYpLFW-HGgqyHuL2sxh9RbPBAaO7ItFkbPfVa9bOEsil0qEGq-KmJQmLq5ZtIZUNiq0DPtztYrA2r3sPCoVyCYiNYmV5LRHTsQ', '1571255421348');

insert into "user" (user_email, user_google_refresh_token, user_google_access_token, user_google_token_expiry_date)
values ('steven@email.com', '1/53Iy6g-Z3DS6j3guEjHaJPtIAZ0ZzA_-bytjdsX0Wgo', 'ya29.Il-bB8iZTkga02KOIfKFcvumUz7Xtjb-ifA3DakF3ml_i7s2cN04WgR6KpftFP7cvAhy9OFZKtENfcP_wp-vAzSWT_VhIQqTBlpCjvhPePCRRWf0n_ZNHhVfDlSiKPGWmA', '1571255112696');

