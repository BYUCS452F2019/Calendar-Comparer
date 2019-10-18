create or replace view public.v_session as
  select
    session.*,
    "user".*
  from session
    left join "user" on user_id = session_user_id
;
