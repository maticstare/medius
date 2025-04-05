-- This file allow to write SQL commands that will be emitted in test and dev.
-- The commands are commented as their support depends of the database
-- insert into myentity (id, field) values(1, 'field-1');
-- insert into myentity (id, field) values(2, 'field-2');
-- insert into myentity (id, field) values(3, 'field-3');
-- alter sequence myentity_seq restart with 4;


-- Insert test players
INSERT INTO player (username, age, password) VALUES ('Alice', 25, '123');
INSERT INTO player (username, age, password) VALUES ('Bob', 30, '123');
INSERT INTO player (username, age, password) VALUES ('1', 1, '1');

-- Insert test problems
INSERT INTO problem (description, created_by) VALUES ('101010110', 1);
INSERT INTO problem (description, created_by) VALUES ('110001110', 2);

-- Insert test solutions
INSERT INTO solution (problem_id, player_id, solution) VALUES (2, 1, '101100101');

-- Insert test solution steps
INSERT INTO solution_step (solution_id, move_x, move_y, step_order) VALUES (1, 1, 2, 1);
INSERT INTO solution_step (solution_id, move_x, move_y, step_order) VALUES (1, 2, 3, 2);