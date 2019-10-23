----Users

insert into "user" (user_id, user_email, user_google_refresh_token, user_google_access_token, user_google_token_expiry_date)
values ('f7f6cea9-85f3-4e2e-bc40-0e9617ca2b41', 'emilyhales2@gmail.com','1/-YJWR8JuUGq00AcoRoHK3ialSQ5g-CLZwIiR64r2bydP3NdVWZZHJEJLV-lg-1oQ', 'ya29.Il-bB1sI9YE-98-120wzrsHMCbi6kGm57o-BOyasGj6bidnPkYzFPUZmozPFrTWYmmwNre_2LZwcNdCXVH1YMaQ0iF6lcV_OENh0ohuncEzzVeizOb5IrX3qvzLNDZkx4Q', '1571265206530');

insert into "user" (user_id, user_email, user_google_refresh_token, user_google_access_token, user_google_token_expiry_date)
values ('f7f6cea9-85f3-4e2e-bc40-0e9617ca2b42', 'jared@email.com', '1/BbkQkEWjID5a5a7sbxlGvExCutupN1jgVJemzmZO_mM', 'ya29.Il-bB_yUtK_tVsqEp7WvGdPeIuwH83PIJYpLFW-HGgqyHuL2sxh9RbPBAaO7ItFkbPfVa9bOEsil0qEGq-KmJQmLq5ZtIZUNiq0DPtztYrA2r3sPCoVyCYiNYmV5LRHTsQ', '1571255421348');

insert into "user" (user_id, user_email, user_google_refresh_token, user_google_access_token, user_google_token_expiry_date)
values ('f7f6cea9-85f3-4e2e-bc40-0e9617ca2b43', 'steven@email.com', '1/53Iy6g-Z3DS6j3guEjHaJPtIAZ0ZzA_-bytjdsX0Wgo', 'ya29.Il-bB8iZTkga02KOIfKFcvumUz7Xtjb-ifA3DakF3ml_i7s2cN04WgR6KpftFP7cvAhy9OFZKtENfcP_wp-vAzSWT_VhIQqTBlpCjvhPePCRRWf0n_ZNHhVfDlSiKPGWmA', '1571255112696');

----personal Calendars

--emily calendar
insert into personal_calendar (personal_calendar_id, owner_id)
values ('f7f6cea9-85f3-4e2e-bc40-0e9617ca2b44','f7f6cea9-85f3-4e2e-bc40-0e9617ca2b41')

--jared calendar
insert into personal_calendar (personal_calendar_id, owner_id)
values ('f7f6cea9-85f3-4e2e-bc40-0e9617ca2b45','f7f6cea9-85f3-4e2e-bc40-0e9617ca2b42')

----group Calendar

insert into group_calendar (group_calendar_id, group_calendar_name)
values ('f7f6cea9-85f3-4e2e-bc40-0e9617ca2b46', 'Computer Science Group')

----group Connection

insert into group_connection (personal_calendar_id, group_calendar_id)
values('f7f6cea9-85f3-4e2e-bc40-0e9617ca2b44', 'f7f6cea9-85f3-4e2e-bc40-0e9617ca2b46')

insert into group_connection (personal_calendar_id, group_calendar_id)
values('f7f6cea9-85f3-4e2e-bc40-0e9617ca2b45', 'f7f6cea9-85f3-4e2e-bc40-0e9617ca2b46')

----group membership

insert into calendar_membership (calendar_membership_group_calendar_id, calendar_membership_user_id)
values('f7f6cea9-85f3-4e2e-bc40-0e9617ca2b46', 'f7f6cea9-85f3-4e2e-bc40-0e9617ca2b41')

insert into calendar_membership (calendar_membership_group_calendar_id, calendar_membership_user_id)
values('f7f6cea9-85f3-4e2e-bc40-0e9617ca2b46', 'f7f6cea9-85f3-4e2e-bc40-0e9617ca2b42')

----events

--emily events
insert into event (event_personal_calendar_id, event_start, event_end) 
values ('f7f6cea9-85f3-4e2e-bc40-0e9617ca2b44','10-20-2019 7:00:00','10-20-2019 10:00:00');

insert into event (event_personal_calendar_id, event_start, event_end) 
values ('f7f6cea9-85f3-4e2e-bc40-0e9617ca2b44','10-20-2019 15:00:00','10-20-2019 18:00:00');

--jared events
insert into event (event_personal_calendar_id, event_start, event_end) 
values ('f7f6cea9-85f3-4e2e-bc40-0e9617ca2b45','10-20-2019 7:00:00','10-20-2019 10:00:00');

insert into event (event_personal_calendar_id, event_start, event_end) 
values ('f7f6cea9-85f3-4e2e-bc40-0e9617ca2b45','10-20-2019 11:00:00','10-20-2019 13:00:00');