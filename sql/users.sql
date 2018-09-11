create schema if not exists done_app;
create schema if not exists done_app_private;



create domain email as text check (value ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$');

create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;

drop table if exists done_app_private.user;
create table done_app_private.user (
  id uuid primary key default uuid_generate_v1mc(),
  email email unique not null,
  password_digest text not null,
  account_creation timestamp default now(),
  last_logged_in timestamp default now()
);

drop table if exists done_app.user;
create table done_app.user (
  id uuid primary key default uuid_generate_v1mc(),
  given_names varchar(40), -- Profile column
  family_name varchar(40), -- Profile column
  featureFlag_duration boolean default false,
  featureFlag_priority boolean default false,
  featureFlag_dependency boolean default false
);

drop function if exists done_app.register_user;
create function done_app.register_user(
  email text,
  pass text
) returns void as $$
  begin
    insert into done_app_private.user (email, password_digest) values ($1, crypt($2, gen_salt('bf', 8)));
  end;
$$ language plpgsql strict security definer;
comment on function done_app.register_user(text, text) is 'Registers a single user and creates an account.';

drop type if exists done_app.jwt_token;
create type done_app.jwt_token as (
  role text,
  user_id uuid
);

drop function if exists done_app.authenticate;
create function done_app.authenticate(
  email text,
  password text
) returns done_app.jwt_token as $$
declare
  usr done_app_private.user;
begin
  select u.* into usr
    from done_app_private.user as u
    where u.email = $1;

  if usr.password_digest = crypt(password, usr.password_digest) then
    return ('user', usr.id)::done_app.jwt_token;
  else
    return null;
  end if;
end;
$$ language plpgsql strict security definer;

comment on function done_app.authenticate(text, text) is 'Creates a JWT token that will securely identify a user and give them certain permissions.';

select done_app.register_user('adam@adamtowers.io', 'adam00');
select * from done_app.user;