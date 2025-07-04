CREATE Database Guest_House_DB;
use Guest_House_DB;

CREATE TABLE users (
    id INT IDENTITY PRIMARY KEY,
    name NVARCHAR(100),
    phone NVARCHAR(15),
    email NVARCHAR(100) UNIQUE,
    password_hash NVARCHAR(255),
    user_type NVARCHAR(20),
    created_at DATETIME DEFAULT GETDATE()
);

INSERT INTO users(name,phone,email,password_hash,user_type)Values
('james','1112223334','james123@gmail.com','password','customer');
select * from users;


create table rooms (
id INT IDENTITY PRIMARY KEY ,
room_type NVARCHAR(50) NOT NULL,
room_number NVARCHAR(15) UNIQUE NOT NULL,
status NVARCHAR(20) CHECK (status in ('available','booked')) Default 'available',
facilities NVARCHAR(MAX),
created_at DATETIME default getdate()
)

INSERT INTO rooms (room_type, room_number, status, facilities)
VALUES 
('Deluxe', '101', 'available', 'WiFi, TV, AC'),
('Suite', '102', 'booked', 'WiFi, TV, AC, Kitchenette'),
('Deluxe', '103', 'available', 'WiFi, TV');


CREATE TABLE room_prices (
    id INT IDENTITY PRIMARY KEY,
    room_type NVARCHAR(50) NOT NULL,
    date_from DATE NOT NULL,
    date_to DATE NOT NULL,
    price_member FLOAT NOT NULL,
    price_non_member FLOAT NOT NULL
);




CREATE TABLE bookings (
    id INT IDENTITY PRIMARY KEY,         
    user_id INT FOREIGN KEY REFERENCES users(id),
    room_id INT FOREIGN KEY REFERENCES rooms(id),
    from_date DATE NOT NULL,            
    to_date DATE NOT NULL,               
    is_member BIT NOT NULL,              
    membership_number NVARCHAR(20),     
    id_proof_url NVARCHAR(MAX),        
    payment_status NVARCHAR(20) CHECK (payment_status IN ('pending', 'completed', 'failed')) DEFAULT 'pending', 
    created_at DATETIME DEFAULT GETDATE() 
);

INSERT INTO bookings (user_id, room_id, from_date, to_date, is_member, membership_number, id_proof_url, payment_status)
VALUES
(1, 1, '2025-07-01', '2025-07-05', 1, 'MEM123', 'https://example.com/id1', 'completed');




SELECT * FROM rooms;
SELECT * FROM room_prices;
SELECT * FROM bookings;



