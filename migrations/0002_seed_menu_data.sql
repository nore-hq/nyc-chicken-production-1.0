-- 0002_seed_menu_data.sql

-- Insert default admin (nycadmin@nyc.com / Nyc@admin123)
INSERT INTO admin_users (id, username, password_hash, salt, name) VALUES ('admin_1', 'nycadmin@nyc.com', '20e7df12fabce1cdfa43d2069dde39c03cd564c0c0f0e4a3b07b2f425820b657', 'ab2587a7a9c924c56420f67f4e625797', 'Restaurant Manager');

-- Insert Categories

-- Insert Menu Items
