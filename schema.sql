-- Пользователи
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    phone_number VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Товары
CREATE TABLE Products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255) NOT NULL
);

-- Корзина
CREATE TABLE Cart (
    product_id INT REFERENCES Products(id) ON DELETE CASCADE,
    user_id INT REFERENCES Users(id) ON DELETE CASCADE,
    quantity INT NOT NULL CHECK (quantity > 0),
    PRIMARY KEY (product_id, user_id)
);

-- Заказы
CREATE TABLE Orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    delivery_date TIMESTAMPTZ NOT NULL,
    address VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    total DECIMAL(10, 2) NOT NULL
);

-- Состав заказов
CREATE TABLE Order_items (
    order_id INT REFERENCES Orders(id) ON DELETE CASCADE,
    product_id INT REFERENCES Products(id) ON DELETE CASCADE,
    quantity INT NOT NULL CHECK (quantity > 0),
    PRIMARY KEY (order_id, product_id)
);

-- Избранное
CREATE TABLE Favorite (
    product_id INT REFERENCES Products(id) ON DELETE CASCADE,
    user_id INT REFERENCES Users(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, user_id)
);




INSERT INTO Products (id, title, price, image_url) VALUES
(1, 'Да Хонг Пас', 568.00, '/img/chay1.png'),
(2, 'Хонг Цзинь Ло', 700.00, '/img/chay2.png'),
(3, 'Хакка лей ча', 900.00, '/img/chay3.png'),
(4, 'Тескный чай', 200.00, '/img/chay4.png'),
(5, 'Лучизни', 4239.00, '/img/chay5.png'),
(6, 'Би по чуть', 3249.00, '/img/chay6.png'),
(7, 'Те гуаны инь', 5739.00, '/img/chay7.png'),
(8, 'Байхао Иньчжэнь', 7359.00, '/img/chay8.png');





