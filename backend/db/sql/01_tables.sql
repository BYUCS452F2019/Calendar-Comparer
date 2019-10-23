create extension if not exists "uuid-ossp";

create table group_calendar (
  group_calendar_id uuid primary key default uuid_generate_v4(),
  group_calendar_name varchar not null
);

create table "user" (
  user_id uuid primary key default uuid_generate_v4(),
  calendar_user_name varchar,
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
  personal_calendar_google_calendar_id varchar,
  owner_id uuid references "user"(user_id)
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

create table "group_connection"(
	group_connection_id uuid primary key default uuid_generate_v4(),
	personal_calendar_id uuid references personal_calendar(personal_calendar_id),
	group_calendar_id uuid references group_calendar(group_calendar_id)
	
);


