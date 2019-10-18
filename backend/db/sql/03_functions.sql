create or replace function public.session_validate(_session_id uuid)
  returns setof v_session
  language plpgsql
as $function$
begin
  return query select * from v_session
    where session_id = _session_id
      and now() < (select session_last_active + session_expiry_length);
end;
$function$;

create or replace function public.session_update_last_active(_session_id uuid)
  returns setof v_session
  language plpgsql
as $function$
begin
  update session
    set session_last_active = now()
  where session_id = _session_id
    and now() < (select session_last_active + session_expiry_length);

  return query select * from v_session where session_id = _session_id;
end;
$function$;

create or replace function public.session_create(_timeout_length interval, _user_id uuid)
  returns setof v_session
  language plpgsql
as $function$
declare
  var_new_uuid uuid;
begin
  insert into session (
    session_expiry_length,
    session_user_id
  ) values (
    _timeout_length,
    _user_id
  ) returning session_id into var_new_uuid;

  return query select * from v_session where session_id = var_new_uuid;
end;
$function$;
