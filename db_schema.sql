
-- Makes sure foreign_key constraints are observed and errors will be thrown for violations
PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS app_user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullname TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL,
      signup_datetime TEXT DEFAULT CURRENT_TIMESTAMP,
      last_login TEXT DEFAULT CURRENT_TIMESTAMP,
      profile_picture TEXT,
      dark_mode INTEGER
    );

    CREATE TABLE IF NOT EXISTS recipe_folder (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      app_user_id INTEGER NOT NULL,
      folder_name TEXT,
      FOREIGN KEY (app_user_id) REFERENCES app_user (id)
    );

    CREATE TABLE IF NOT EXISTS recipe (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      app_user_id INTEGER NOT NULL,
      recipe_folder_id INTEGER NOT NULL,
      recipe_title TEXT,
      share_to_public TEXT,
      date_created TEXT DEFAULT CURRENT_TIMESTAMP,
      servings_amount INTEGER,
      prep_time INTEGER,
      cook_time INTEGER,
      ingredient TEXT,
      instruction TEXT,
      recipe_note TEXT,
      photo TEXT,
      FOREIGN KEY (app_user_id) REFERENCES app_user (id),
      FOREIGN KEY (recipe_folder_id) REFERENCES recipe_folder (id) ON DELETE RESTRICT
    );

--insert random data into database

--need TEMP TABLE to store user id and folder id temporarily to fulfil foreign key constraint requirements
CREATE TEMP TABLE LastUserID (ID INTEGER);
CREATE TEMP TABLE LastFolderID (ID INTEGER);

INSERT INTO app_user ("fullname", "email", "password", "profile_picture", "dark_mode") VALUES ('Riley Taylor', 'a@a', '$2a$08$X1z9DDI0XW8Djzck3BM7YuqaPD0hSq/YUd0ZDwVBeDlxFn0qvjzfy', '', 0);
INSERT INTO LastUserID (ID) VALUES (last_insert_rowid());

INSERT INTO recipe_folder ("app_user_id", "folder_name") VALUES ((SELECT ID FROM LastUserID), '_root');
INSERT INTO LastFolderID (ID) VALUES (last_insert_rowid());

INSERT INTO recipe ("app_user_id", "recipe_folder_id", "recipe_title", "share_to_public", "servings_amount", "prep_time", "cook_time", "ingredient", "instruction", "recipe_note")
              VALUES ((SELECT ID FROM LastUserID), (SELECT ID FROM LastFolderID), 'Spaghetti with Tomato Sauce', '0', 2, 35, 60,
                      '["8 ounces (225 grams) of spaghetti","1 tablespoon olive oil","3 cloves garlic, minced", "1 can (14 ounces or 400 grams) of diced tomatoes", "1 teaspoon dried oregano", "Salt and pepper to taste"]',
                      '["Bring a large pot of salted water to a boil. Cook the spaghetti according to the package instructions until al dente, usually about 8-10 minutes. Drain the spaghetti and set aside.",
                        "In a large skillet, heat the olive oil over medium heat. Add the minced garlic and sauté for 1-2 minutes until fragrant, being careful not to burn it.",
                        "Pour the diced tomatoes into the skillet with the garlic. Stir in the dried oregano, and season with salt and pepper to taste. Bring the sauce to a simmer and let it cook for about 10 minutes, stirring occasionally, until it thickens slightly.",
                        "Add the cooked spaghetti to the skillet with the tomato sauce. Toss the spaghetti in the sauce until it is well coated.",
                        "Serve the spaghetti with tomato sauce hot, garnished with grated Parmesan cheese and fresh basil leaves if desired."]',
                        'For extra flavor, add some red pepper flakes to the sauce. Can also customize this recipe by incorporating favorite vegetables such as sliced mushrooms, bell peppers, or spinach. Try with different herbs and spices. A sprinkle of freshly grated Parmesan cheese on top adds a delightful finishing touch.'),
                      ((SELECT ID FROM LastUserID), (SELECT ID FROM LastFolderID), 'Garlic butter shrimp pasta', '0', 4, 95, 120,
                      '["8 oz (225g) linguine pasta","1 lb (450g) large shrimp, peeled and deveined","4 cloves garlic, minced", "3 tablespoons unsalted butter", "2 tablespoons olive oil", "1/4 cup (60ml) chicken broth", "Salt and pepper to taste", "Chopped fresh parsley for garnish"]',
                      '["Cook the linguine pasta according to the package instructions until al dente. Drain and set aside.",
                        "In a large skillet, melt 2 tablespoons of butter with 1 tablespoon of olive oil over medium heat.",
                        "Add the minced garlic to the skillet and sauté for about 1 minute until fragrant.",
                        "Add the shrimp to the skillet and cook for 2-3 minutes on each side until they turn pink and opaque. Remove the shrimp from the skillet and set aside.",
                        "In the same skillet, add the remaining tablespoon of butter and olive oil. Pour in the chicken broth and white wine (if using). Let the mixture simmer for 2-3 minutes to reduce slightly.",
                        "Return the cooked shrimp to the skillet and toss to coat them in the garlic butter sauce. Season with salt, pepper, and red pepper flakes to taste.",
                        "Add the cooked linguine pasta to the skillet and toss everything together until well combined and heated through."]',
                        'Proin viverra dui sit amet arcu accumsan fermentum. Integer porta condimentum hendrerit. Proin bibendum congue cursus. Vestibulum sed condimentum ex.'),
                      ((SELECT ID FROM LastUserID), (SELECT ID FROM LastFolderID), 'Caprese Salad', '1', 2, 25, 50,
                      '["Fresh tomatoes","Fresh mozzarella cheese","Fresh basil leaves", "Extra virgin olive oil", "Balsamic glaze (optional)", "Salt and pepper to taste"]',
                      '["Slice the tomatoes and fresh mozzarella cheese.",
                        "Arrange the tomato slices and mozzarella cheese slices on a plate, alternating them.",
                        "Place fresh basil leaves on top of each tomato and cheese slice.",
                        "Drizzle with extra virgin olive oil.",
                        "Season with salt and pepper to taste."]',
                        'Fusce eget facilisis metus, nec luctus nisi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'),
                      ((SELECT ID FROM LastUserID), (SELECT ID FROM LastFolderID), 'Avocado toast', '1', 4, 95, 120,
                      '["Ripe avocado","Bread slices (whole grain or your choice)","Lemon juice", "Salt and pepper"]',
                      '["Toast bread slices until golden brown.",
                        "Mash ripe avocado with a fork and spread it generously on the toasted bread.",
                        "Drizzle with a little lemon juice to add flavor and prevent browning.",
                        "Season with salt and pepper to taste.",
                        "Add optional toppings as desired."]',
                        'Enjoy your delicious avocado toast!');
DROP TABLE LastUserID;
DROP TABLE LastFolderID;


CREATE TEMP TABLE LastUserID (ID INTEGER);
CREATE TEMP TABLE LastFolderID (ID INTEGER);

INSERT INTO app_user ("fullname", "email", "password", "profile_picture", "dark_mode") VALUES ('Sophia Anderson', 'b@b', '$2a$08$X1z9DDI0XW8Djzck3BM7YuqaPD0hSq/YUd0ZDwVBeDlxFn0qvjzfy', '', 0);
INSERT INTO LastUserID (ID) VALUES (last_insert_rowid());

INSERT INTO recipe_folder ("app_user_id", "folder_name") VALUES ((SELECT ID FROM LastUserID), '_root');
INSERT INTO LastFolderID (ID) VALUES (last_insert_rowid());

INSERT INTO recipe ("app_user_id", "recipe_folder_id", "recipe_title", "share_to_public", "servings_amount", "prep_time", "cook_time", "ingredient", "instruction", "recipe_note")
              VALUES ((SELECT ID FROM LastUserID), (SELECT ID FROM LastFolderID), 'Scrambled eggs', '0', 1, 15, 15,
                      '["2 eggs","Salt and pepper to taste","Butter or oil for cooking", "Optional: chopped herbs, grated cheese, diced vegetables"]',
                      '["Crack the eggs into a bowl and whisk them together until well combined.",
                        "Season the eggs with salt and pepper to taste.",
                        "Heat a non-stick skillet over medium heat and add a small amount of butter or oil.",
                        "Pour the beaten eggs into the skillet and let them cook for a few seconds until they start to set around the edges.",
                        "Use a spatula to gently stir and scramble the eggs as they continue to cook, ensuring they cook evenly.",
                        "Once the eggs are cooked to your desired consistency (they should be moist but not runny), remove them from the heat."]',
                        'Fusce eget facilisis metus, nec luctus nisi. Orci varius natoque penatibus et magnisdi.'),
                      ((SELECT ID FROM LastUserID), (SELECT ID FROM LastFolderID), 'Lemon Pepper Chicken', '0', 4, 85, 100,
                      '["Flumbuzz","Snigglefritz Quazzle","Zibble", "Flibberdoodle", "Wibblywobbly"]',
                      '["Nunc molestie, magna commodo rutrum molestie, sem lacus rutrum arcu, ornare consequat sem quam rhoncus lorem. Integer semper, turpis vel finibus eleifend, tellus lacus malesuada risus, vel posuere libero nibh non velit.",
                        "Duis id ligula nec nisl rhoncus iaculis. Fusce ante felis.",
                        "Posuere ac lacus in, dapibus semper augue. Nullam malesuada lectus non mauris scelerisque ullamcorper et ac felis. Quisque eu curs.",
                        "Sed nibh mauris, varius in ipsum ut, cursus sollicitudin massa. Donec venenatis, erat id aliquet vestibulum.",
                        "Mentum eget arcu eget, lacinia lacinia libero. Morbi et pharetra tellus."]',
                        'Proin viverra dui sit amet arcu accumsan fermentum. Integer porta condimentum hendrerit. Proin bibendum congue cursus. Vestibulum sed condimentum ex.'),
                      ((SELECT ID FROM LastUserID), (SELECT ID FROM LastFolderID), 'Mango Tango Salad', '1', 2, 25, 50,
                      '["Flumbuzz","Snigglefritz Quazzle","Zibble", "Flibberdoodle", "Wibblywobbly", "Salt and pepper to taste"]',
                      '["Nunc molestie, magna commodo rutrum molestie, sem lacus rutrum arcu, ornare consequat sem quam rhoncus lorem. Integer semper.",
                        "Duis id ligula nec nisl rhoncus iaculis. Fusce ante felis.",
                        "Posuere ac lacus in, dapibus semper augue. Nullam malesuada lectus non mauris scelerisque ullamcorper et ac felis. Quisque eu curs.",
                        "Sed nibh mauris, varius in ipsum ut, cursus sollicitudin massa. Donec venenatis, erat id aliquet vestibulum.",
                        "Mentum eget arcu eget, lacinia lacinia libero. Morbi et pharetra tellus."]',
                        'Fusce eget facilisis metus, nec luctus nisi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'),
                      ((SELECT ID FROM LastUserID), (SELECT ID FROM LastFolderID), 'Savory Mushroom Risotto', '1', 3, 75, 90,
                      '["Flumbuzz","Snigglefritz Quazzle","Zibble", "Flibberdoodle", "Wibblywobbly", "Salt and pepper to taste"]',
                      '["Nunc molestie, magna commodo rutrum molestie, sem lacus rutrum arcu, ornare consequat sem quam rhoncus lorem. Integer semper.",
                        "Duis id ligula nec nisl rhoncus iaculis. Fusce ante felis.",
                        "Posuere ac lacus in, dapibus semper augue. Nullam malesuada lectus non mauris scelerisque ullamcorper et ac felis. Quisque eu curs.",
                        "Sed nibh mauris, varius in ipsum ut, cursus sollicitudin massa. Donec venenatis, erat id aliquet vestibulum.",
                        "Mentum eget arcu eget, lacinia lacinia libero. Morbi et pharetra tellus."]',
                        'Fusce eget facilisis metus, nec luctus nisi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.');
DROP TABLE LastUserID;
DROP TABLE LastFolderID;


CREATE TEMP TABLE LastUserID (ID INTEGER);
CREATE TEMP TABLE LastFolderID (ID INTEGER);

INSERT INTO app_user ("fullname", "email", "password", "profile_picture", "dark_mode") VALUES ('Liam Johnson', 'c@c', '$2a$08$X1z9DDI0XW8Djzck3BM7YuqaPD0hSq/YUd0ZDwVBeDlxFn0qvjzfy', '', 0);
INSERT INTO LastUserID (ID) VALUES (last_insert_rowid());

INSERT INTO recipe_folder ("app_user_id", "folder_name") VALUES ((SELECT ID FROM LastUserID), '_root');
INSERT INTO LastFolderID (ID) VALUES (last_insert_rowid());

INSERT INTO recipe ("app_user_id", "recipe_folder_id", "recipe_title", "share_to_public", "servings_amount", "prep_time", "cook_time", "ingredient", "instruction", "recipe_note")
              VALUES ((SELECT ID FROM LastUserID), (SELECT ID FROM LastFolderID), 'Coconut Curry Chicken', '0', 1, 15, 15,
                      '["2 eggs","Salt and pepper to taste","Butter or oil for cooking", "Optional: chopped herbs, grated cheese, diced vegetables"]',
                      '["Crack the eggs into a bowl and whisk them together until well combined.",
                        "Season the eggs with salt and pepper to taste.",
                        "Heat a non-stick skillet over medium heat and add a small amount of butter or oil.",
                        "Pour the beaten eggs into the skillet and let them cook for a few seconds until they start to set around the edges.",
                        "Use a spatula to gently stir and scramble the eggs as they continue to cook, ensuring they cook evenly.",
                        "Once the eggs are cooked to your desired consistency (they should be moist but not runny), remove them from the heat."]',
                        'Fusce eget facilisis metus, nec luctus nisi. Orci varius natoque penatibus et magnisdi.'),
                      ((SELECT ID FROM LastUserID), (SELECT ID FROM LastFolderID), 'Honey Garlic Salmon', '0', 4, 85, 100,
                      '["Flumbuzz","Snigglefritz Quazzle","Zibble", "Flibberdoodle", "Wibblywobbly"]',
                      '["Nunc molestie, magna commodo rutrum molestie, sem lacus rutrum arcu, ornare consequat sem quam rhoncus lorem. Integer semper, turpis vel finibus eleifend, tellus lacus malesuada risus, vel posuere libero nibh non velit.",
                        "Duis id ligula nec nisl rhoncus iaculis. Fusce ante felis.",
                        "Posuere ac lacus in, dapibus semper augue. Nullam malesuada lectus non mauris scelerisque ullamcorper et ac felis. Quisque eu curs.",
                        "Sed nibh mauris, varius in ipsum ut, cursus sollicitudin massa. Donec venenatis, erat id aliquet vestibulum.",
                        "Mentum eget arcu eget, lacinia lacinia libero. Morbi et pharetra tellus."]',
                        'Proin viverra dui sit amet arcu accumsan fermentum. Integer porta condimentum hendrerit. Proin bibendum congue cursus. Vestibulum sed condimentum ex.'),
                      ((SELECT ID FROM LastUserID), (SELECT ID FROM LastFolderID), 'Spicy Cajun Jambalaya', '1', 2, 25, 50,
                      '["Flumbuzz","Snigglefritz Quazzle","Zibble", "Flibberdoodle", "Wibblywobbly", "Salt and pepper to taste"]',
                      '["Nunc molestie, magna commodo rutrum molestie, sem lacus rutrum arcu, ornare consequat sem quam rhoncus lorem. Integer semper.",
                        "Duis id ligula nec nisl rhoncus iaculis. Fusce ante felis.",
                        "Posuere ac lacus in, dapibus semper augue. Nullam malesuada lectus non mauris scelerisque ullamcorper et ac felis. Quisque eu curs.",
                        "Sed nibh mauris, varius in ipsum ut, cursus sollicitudin massa. Donec venenatis, erat id aliquet vestibulum.",
                        "Mentum eget arcu eget, lacinia lacinia libero. Morbi et pharetra tellus."]',
                        'Fusce eget facilisis metus, nec luctus nisi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'),
                      ((SELECT ID FROM LastUserID), (SELECT ID FROM LastFolderID), 'Roasted Vegetable Quinoa Bowl', '1', 3, 75, 90,
                      '["Flumbuzz","Snigglefritz Quazzle","Zibble", "Flibberdoodle", "Wibblywobbly", "Salt and pepper to taste"]',
                      '["Nunc molestie, magna commodo rutrum molestie, sem lacus rutrum arcu, ornare consequat sem quam rhoncus lorem. Integer semper.",
                        "Duis id ligula nec nisl rhoncus iaculis. Fusce ante felis.",
                        "Posuere ac lacus in, dapibus semper augue. Nullam malesuada lectus non mauris scelerisque ullamcorper et ac felis. Quisque eu curs.",
                        "Sed nibh mauris, varius in ipsum ut, cursus sollicitudin massa. Donec venenatis, erat id aliquet vestibulum.",
                        "Mentum eget arcu eget, lacinia lacinia libero. Morbi et pharetra tellus."]',
                        'Fusce eget facilisis metus, nec luctus nisi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.');
DROP TABLE LastUserID;
DROP TABLE LastFolderID;


CREATE TEMP TABLE LastUserID (ID INTEGER);
CREATE TEMP TABLE LastFolderID (ID INTEGER);

INSERT INTO app_user ("fullname", "email", "password", "profile_picture", "dark_mode") VALUES ('Maxwell Parker', 'd@d', '$2a$08$X1z9DDI0XW8Djzck3BM7YuqaPD0hSq/YUd0ZDwVBeDlxFn0qvjzfy', '', 0);
INSERT INTO LastUserID (ID) VALUES (last_insert_rowid());

INSERT INTO recipe_folder ("app_user_id", "folder_name") VALUES ((SELECT ID FROM LastUserID), '_root');
INSERT INTO LastFolderID (ID) VALUES (last_insert_rowid());

INSERT INTO recipe ("app_user_id", "recipe_folder_id", "recipe_title", "share_to_public", "servings_amount", "prep_time", "cook_time", "ingredient", "instruction", "recipe_note")
              VALUES ((SELECT ID FROM LastUserID), (SELECT ID FROM LastFolderID), 'Teriyaki Chicken Stir Fry', '0', 1, 15, 15,
                      '["2 eggs","Salt and pepper to taste","Butter or oil for cooking", "Optional: chopped herbs, grated cheese, diced vegetables"]',
                      '["Crack the eggs into a bowl and whisk them together until well combined.",
                        "Season the eggs with salt and pepper to taste.",
                        "Heat a non-stick skillet over medium heat and add a small amount of butter or oil.",
                        "Pour the beaten eggs into the skillet and let them cook for a few seconds until they start to set around the edges.",
                        "Use a spatula to gently stir and scramble the eggs as they continue to cook, ensuring they cook evenly.",
                        "Once the eggs are cooked to your desired consistency (they should be moist but not runny), remove them from the heat."]',
                        'Fusce eget facilisis metus, nec luctus nisi. Orci varius natoque penatibus et magnisdi.'),
                      ((SELECT ID FROM LastUserID), (SELECT ID FROM LastFolderID), 'BBQ Pulled Pork Sandwiches', '0', 4, 85, 100,
                      '["Flumbuzz","Snigglefritz Quazzle","Zibble", "Flibberdoodle", "Wibblywobbly"]',
                      '["Nunc molestie, magna commodo rutrum molestie, sem lacus rutrum arcu, ornare consequat sem quam rhoncus lorem. Integer semper, turpis vel finibus eleifend, tellus lacus malesuada risus, vel posuere libero nibh non velit.",
                        "Duis id ligula nec nisl rhoncus iaculis. Fusce ante felis.",
                        "Posuere ac lacus in, dapibus semper augue. Nullam malesuada lectus non mauris scelerisque ullamcorper et ac felis. Quisque eu curs.",
                        "Sed nibh mauris, varius in ipsum ut, cursus sollicitudin massa. Donec venenatis, erat id aliquet vestibulum.",
                        "Mentum eget arcu eget, lacinia lacinia libero. Morbi et pharetra tellus."]',
                        'Proin viverra dui sit amet arcu accumsan fermentum. Integer porta condimentum hendrerit. Proin bibendum congue cursus. Vestibulum sed condimentum ex.'),
                      ((SELECT ID FROM LastUserID), (SELECT ID FROM LastFolderID), 'Beef and Broccoli Stir Fry', '1', 2, 25, 50,
                      '["Flumbuzz","Snigglefritz Quazzle","Zibble", "Flibberdoodle", "Wibblywobbly", "Salt and pepper to taste"]',
                      '["Nunc molestie, magna commodo rutrum molestie, sem lacus rutrum arcu, ornare consequat sem quam rhoncus lorem. Integer semper.",
                        "Duis id ligula nec nisl rhoncus iaculis. Fusce ante felis.",
                        "Posuere ac lacus in, dapibus semper augue. Nullam malesuada lectus non mauris scelerisque ullamcorper et ac felis. Quisque eu curs.",
                        "Sed nibh mauris, varius in ipsum ut, cursus sollicitudin massa. Donec venenatis, erat id aliquet vestibulum.",
                        "Mentum eget arcu eget, lacinia lacinia libero. Morbi et pharetra tellus."]',
                        'Fusce eget facilisis metus, nec luctus nisi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'),
                      ((SELECT ID FROM LastUserID), (SELECT ID FROM LastFolderID), 'Classic Beef Lasagna', '1', 3, 75, 90,
                      '["Flumbuzz","Snigglefritz Quazzle","Zibble", "Flibberdoodle", "Wibblywobbly", "Salt and pepper to taste"]',
                      '["Nunc molestie, magna commodo rutrum molestie, sem lacus rutrum arcu, ornare consequat sem quam rhoncus lorem. Integer semper.",
                        "Duis id ligula nec nisl rhoncus iaculis. Fusce ante felis.",
                        "Posuere ac lacus in, dapibus semper augue. Nullam malesuada lectus non mauris scelerisque ullamcorper et ac felis. Quisque eu curs.",
                        "Sed nibh mauris, varius in ipsum ut, cursus sollicitudin massa. Donec venenatis, erat id aliquet vestibulum.",
                        "Mentum eget arcu eget, lacinia lacinia libero. Morbi et pharetra tellus."]',
                        'Fusce eget facilisis metus, nec luctus nisi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.');
DROP TABLE LastUserID;
DROP TABLE LastFolderID;


CREATE TEMP TABLE LastUserID (ID INTEGER);
CREATE TEMP TABLE LastFolderID (ID INTEGER);

INSERT INTO app_user ("fullname", "email", "password", "profile_picture", "dark_mode") VALUES ('Emily Rodriguez', 'e@e', '$2a$08$X1z9DDI0XW8Djzck3BM7YuqaPD0hSq/YUd0ZDwVBeDlxFn0qvjzfy', '', 0);
INSERT INTO LastUserID (ID) VALUES (last_insert_rowid());

INSERT INTO recipe_folder ("app_user_id", "folder_name") VALUES ((SELECT ID FROM LastUserID), '_root');
INSERT INTO LastFolderID (ID) VALUES (last_insert_rowid());

INSERT INTO recipe ("app_user_id", "recipe_folder_id", "recipe_title", "share_to_public", "servings_amount", "prep_time", "cook_time", "ingredient", "instruction", "recipe_note")
              VALUES ((SELECT ID FROM LastUserID), (SELECT ID FROM LastFolderID), 'Cheesy Spinach Stuffed Mushrooms', '0', 1, 15, 15,
                      '["2 eggs","Salt and pepper to taste","Butter or oil for cooking", "Optional: chopped herbs, grated cheese, diced vegetables"]',
                      '["Crack the eggs into a bowl and whisk them together until well combined.",
                        "Season the eggs with salt and pepper to taste.",
                        "Heat a non-stick skillet over medium heat and add a small amount of butter or oil.",
                        "Pour the beaten eggs into the skillet and let them cook for a few seconds until they start to set around the edges.",
                        "Use a spatula to gently stir and scramble the eggs as they continue to cook, ensuring they cook evenly.",
                        "Once the eggs are cooked to your desired consistency (they should be moist but not runny), remove them from the heat."]',
                        'Fusce eget facilisis metus, nec luctus nisi. Orci varius natoque penatibus et magnisdi.'),
                      ((SELECT ID FROM LastUserID), (SELECT ID FROM LastFolderID), 'Greek Salad with Feta and Olives', '0', 4, 85, 100,
                      '["Flumbuzz","Snigglefritz Quazzle","Zibble", "Flibberdoodle", "Wibblywobbly"]',
                      '["Nunc molestie, magna commodo rutrum molestie, sem lacus rutrum arcu, ornare consequat sem quam rhoncus lorem. Integer semper, turpis vel finibus eleifend, tellus lacus malesuada risus, vel posuere libero nibh non velit.",
                        "Duis id ligula nec nisl rhoncus iaculis. Fusce ante felis.",
                        "Posuere ac lacus in, dapibus semper augue. Nullam malesuada lectus non mauris scelerisque ullamcorper et ac felis. Quisque eu curs.",
                        "Sed nibh mauris, varius in ipsum ut, cursus sollicitudin massa. Donec venenatis, erat id aliquet vestibulum.",
                        "Mentum eget arcu eget, lacinia lacinia libero. Morbi et pharetra tellus."]',
                        'Proin viverra dui sit amet arcu accumsan fermentum. Integer porta condimentum hendrerit. Proin bibendum congue cursus. Vestibulum sed condimentum ex.'),
                      ((SELECT ID FROM LastUserID), (SELECT ID FROM LastFolderID), 'Roasted Butternut Squash Soup', '1', 2, 25, 50,
                      '["Flumbuzz","Snigglefritz Quazzle","Zibble", "Flibberdoodle", "Wibblywobbly", "Salt and pepper to taste"]',
                      '["Nunc molestie, magna commodo rutrum molestie, sem lacus rutrum arcu, ornare consequat sem quam rhoncus lorem. Integer semper.",
                        "Duis id ligula nec nisl rhoncus iaculis. Fusce ante felis.",
                        "Posuere ac lacus in, dapibus semper augue. Nullam malesuada lectus non mauris scelerisque ullamcorper et ac felis. Quisque eu curs.",
                        "Sed nibh mauris, varius in ipsum ut, cursus sollicitudin massa. Donec venenatis, erat id aliquet vestibulum.",
                        "Mentum eget arcu eget, lacinia lacinia libero. Morbi et pharetra tellus."]',
                        'Fusce eget facilisis metus, nec luctus nisi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'),
                      ((SELECT ID FROM LastUserID), (SELECT ID FROM LastFolderID), 'Chocolate Lava Cake', '1', 3, 75, 90,
                      '["Flumbuzz","Snigglefritz Quazzle","Zibble", "Flibberdoodle", "Wibblywobbly", "Salt and pepper to taste"]',
                      '["Nunc molestie, magna commodo rutrum molestie, sem lacus rutrum arcu, ornare consequat sem quam rhoncus lorem. Integer semper.",
                        "Duis id ligula nec nisl rhoncus iaculis. Fusce ante felis.",
                        "Posuere ac lacus in, dapibus semper augue. Nullam malesuada lectus non mauris scelerisque ullamcorper et ac felis. Quisque eu curs.",
                        "Sed nibh mauris, varius in ipsum ut, cursus sollicitudin massa. Donec venenatis, erat id aliquet vestibulum.",
                        "Mentum eget arcu eget, lacinia lacinia libero. Morbi et pharetra tellus."]',
                        'Fusce eget facilisis metus, nec luctus nisi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.');
DROP TABLE LastUserID;
DROP TABLE LastFolderID;

COMMIT;
