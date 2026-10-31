-- نفّذه مرة واحدة في Supabase > SQL Editor
create table if not exists app_version(
  id serial primary key,
  version_name text not null,
  version_code int not null,
  apk_url text not null,
  notes text,
  force boolean default false,
  created_at timestamptz default now()
);
alter table app_version enable row level security;
create policy "read all" on app_version for select using (true);
