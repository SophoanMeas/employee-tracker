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
    ('Department Manager', 100000, 8),
    ('Chief Executive Officer', 350000, 9);

INSERT INTO
    employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Sophoan', 'Meas', 11, NULL),
    ('Lidia', 'Lyall', 10, 40),
    ('Amrita', 'Berti', 9, 42),
    ('Valentina', 'Wouters', 8, 42),
    ('Feige', 'Bai', 7, 40),
    ('Nova', 'Perić', 6, 43),
    ('Tiên', 'Knopp', 6, 43),
    ('Einar', 'Gori', 5, 40),
    ('Gregor', 'O''Donnell', 4, 42),
    ('Roshan', 'Southgate', 3, 42),
    ('Cinderella', 'Padilla', 2, 43),
    ('Ileana', 'Bourreau', 2, 43),
    ('Kassandros', 'David', 1, 43);