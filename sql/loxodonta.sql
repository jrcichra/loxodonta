-- drop table object_sets;
-- drop table friends;
-- drop table objects;
-- drop table users;
-- 
-- drop table statuses;
-- drop table status_history;
-- drop trigger status_history_initial_audit;
-- drop trigger status_history_audit;
-- 
-- drop table posts;

drop database loxodonta;
create database loxodonta;
use loxodonta;

create table objects (
	object_id bigint primary key auto_increment,
	object_url varchar(1024) not null,
	object_created timestamp default current_timestamp(),
	object_order bigint not null default 0
	);

create table object_sets (
	object_set_id bigint not null,
	object_id bigint not null,
	foreign key (object_id) references objects(object_id)
);

# Online/Offline/Away/etc
create table statuses (
	status_id bigint primary key auto_increment,
	status_name varchar(255) not null unique
);


create table users (
	user_id bigint primary key auto_increment,
	user_name varchar(255) not null unique,
	user_bio text,
	user_created timestamp default current_timestamp(),
	user_status_id bigint not null,
	user_avatar_object_id bigint,
	foreign key (user_status_id) references statuses(status_id),
	foreign key (user_avatar_object_id) references objects(object_id)
);
# roles?

create table status_history (
	status_history_id bigint primary key auto_increment,
	user_id bigint not null,
	user_status_id bigint,
	status_date timestamp not null default current_timestamp(),
	foreign key (user_id) references users(user_id),
	foreign key (user_status_id) references statuses(status_id)
);

-- 
-- DELIMITER $$
-- create trigger status_history_initial_audit
-- before insert
-- on users for each row
-- BEGIN
-- insert into status_history (user_id,user_status_id) values (new.user_id, new.user_status_id);
-- END; $$
-- 
-- DELIMITER $$
-- create trigger status_history_audit
-- before update
-- on users for each row
-- BEGIN
-- if old.user_status_id <> new.user_status_id then
-- insert into status_history (user_id,user_status_id) values (old.user_id, old.user_status_id);
-- end if;
-- END; $$

create table friends (
	user_id bigint not null,
	user_friend_id bigint not null,
	foreign key (user_id) references users(user_id),
	foreign key (user_friend_id) references users(user_id)
);

# Posts/Comments
create table posts (
	post_id bigint primary key auto_increment,
	post_created timestamp not null default current_timestamp(),
	post_user_id bigint not null,
	post_text text not null,
	post_object_set_id bigint,
	post_edited timestamp null,
	post_views bigint not null default 0,
	post_upvotes bigint not null default 0,
	post_downvotes bigint not null default 0,
	post_parent bigint,
	foreign key (post_parent) references posts(post_id),
	foreign key (post_user_id) references users(user_id)
	### doesn't work - foreign key (post_object_set_id) references object_sets(object_set_id)
);



## dummy data
insert into statuses (status_id ,status_name) values (1,'offline');
insert into statuses (status_id ,status_name) values (2,'online');
insert into objects (object_id ,object_url) values (4,'https://thispersondoesnotexist.com/image');
insert into users (user_id ,user_name,user_status_id,user_avatar_object_id) values (1,'justin',1,4);
insert into users (user_id, user_name,user_status_id,user_bio,user_avatar_object_id) values (2,'tim',2,'I like elephants',3);
insert into objects (object_id ,object_url) values (1,'https://thispersondoesnotexist.com/image');
insert into objects (object_id ,object_url) values (2,'https://thispersondoesnotexist.com/image');
insert into objects (object_id ,object_url) values (3,'https://thispersondoesnotexist.com/image');
insert into object_sets (object_set_id,object_id) values (1,1);
insert into posts (post_user_id,post_text,post_object_set_id, post_views,post_upvotes,post_downvotes) 
   values (1,'This is a post by justin', 1,40,23,45);
insert into posts (post_user_id,post_text,post_object_set_id, post_views,post_upvotes,post_downvotes) 
   values (2,'This is a post by tim', 2,445,213,415);
insert into posts (post_user_id,post_text,post_object_set_id, post_views,post_upvotes,post_downvotes,post_parent) 
   values (1,'This is a comment by justin on tims post', 1,40,23,45,2);
insert into friends (user_id,user_friend_id) values (1,2);


show full processlist;
