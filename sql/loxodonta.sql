create table objects (
	object_id bigint primary key auto_increment,
	object_url varchar(1024) not null,
	object_created timestamp default current_timestamp()
);


create table object_sets (
	object_set_id bigint not null,
	object_id bigint not null,
	object_set_order bigint not null,
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


DELIMITER $$
create trigger status_history_initial_audit
before insert
on users for each row
BEGIN
insert into status_history (user_id,user_status_id) values (new.user_id, new.user_status_id);
END; $$

DELIMITER $$
create trigger status_history_audit
before update
on users for each row
BEGIN
if old.user_status_id <> new.user_status_id then
insert into status_history (user_id,user_status_id) values (old.user_id, old.user_status_id);
end if;
END; $$

create table friends (
	user_id bigint not null,
	user_friend_id bigint not null,
	foreign key (user_id) references users(user_id),
	foreign key (user_friend_id) references users(user_id)
);

# Posts/Comments
drop table posts;
create table posts (
	post_id bigint primary key auto_increment,
	post_created timestamp not null default current_timestamp(),
	post_user_id bigint not null,
	post_text text not null,
	post_object_set_id bigint,
	post_edited timestamp,
	post_views bigint not null default 0,
	post_upvotes bigint not null default 0,
	post_downvotes bigint not null default 0,
	post_parent bigint,
	foreign key (post_parent) references posts(post_id),
	foreign key (post_user_id) references users(user_id)
	### doesn't work - foreign key (post_object_set_id) references object_sets(object_set_id)
);


