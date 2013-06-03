drop table if exists requests;
create table requests (
  id integer primary key autoincrement,
  request text not null
);

drop table if exists contracts;
create table contracts (
  id integer primary key autoincrement,
  contract text not null
);

