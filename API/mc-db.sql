create database if not exists moreclean_db;
use moreclean_db;

create table if not exists Categories (
	id_cat int not null auto_increment,
    category varchar(255) not null,
    primary key (id_cat)
);

create table if not exists Subcategories (
	id_subcat int not null auto_increment,
    id_cat int not null,
	subcategory varchar(255) not null,
    foreign key (id_cat) references Categories (id_cat),
    primary key (id_subcat)
);


create table if not exists Products (
	id_prod int not null auto_increment,
    id_subcat int not null,
    product varchar(255) not null,
    n_code varchar(255) not null,
    image varchar(255) not null,
    min_price float not null,
    max_price float not null,
    foreign key (id_subcat) references Subcategories (id_subcat),
    primary key (id_prod)
);



