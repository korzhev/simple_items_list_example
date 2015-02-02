Please first of all run `npm i` to install dependencies(some of them are auto generated and not needed for now).

I've already set some data at DB. You can change it as You wish. But i didn't attache scripts for DB generation. There several products with same name - it isn't error. I run script for db several times.

Use `node bin/www` to run project. To change configuration look into "config.js".

I found that some problems can be with http://lorempixel.com, so if You don't see images, please change links in DB to any other 250*250 image.

Pagination is custom(as chalange says), how it works You can find in comments in `controls/products.js`. I tried to write comments for all important code.

Folders:
* **bin** - folder where run file is placed, also **cluster** node.js module can be placed here to run application in multi-process mode(proxy should be done).
* **controls** - folder with url handlers
* **error** - folder with custom error
* **libs** - folder with some staff
* **logs** - folder with log file, wasn't attached
* **middleware** - folder with custom middlewares
* **models** - folder with mongoose schemas
* **public** - folder with static files
* **routes** - folder with url route and express.route
* **views** - folder with templates