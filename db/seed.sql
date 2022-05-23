INSERT INTO
    department (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('IT'),
    ('HR'),
    ('QA'),
    ('Manager'),
    ('CEO');

INSERT INTO
    role (title, salary, department_id)
VALUES
    ('Product Sales & Marketing Rep', 50000, 1),
    ('Software Engineer', 85000, 2),
    ('Business Finance Analyst', 75000, 3),
    ('Finance Advisor', 65000, 3),
    ('Business Lawyer', 100000, 4),
    ('Senior IT Support', 55000, 5),
    ('Human Resources', 67000, 6),
    ('Quality Assurance Specialist', 63000, 7),
    ('Manager', 90000, 8),
    ('Department Manager', 150000, 8),
    ('Chief Executive Officer', 350000, 9);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('Sophoan', 'Meas', 11, NULL), 
('James', 'Brown', 10, 1 ),
('Lidia', 'Lyall', 9, 2), 
('Amrita', 'Berti', 9, 2), 
('Valentina', 'Wouters', 8, 2),
('Feige', 'Bai', 7, 1),
('Nova', 'Perić', 6, 2),
('Tiên', 'Knopp', 6, 2),
('Einar', 'Gori', 5, 3),
('Gregor', 'O''Donnell', 4, 3),
('Roshan', 'Southgate', 3, 3),
('Cinderella', 'Padilla', 2, 2),
('Ileana', 'Bourreau', 2, 2),
('Kassandros', 'David', 1, 3);