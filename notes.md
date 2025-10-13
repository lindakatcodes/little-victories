# Notes while learning

Want to keep a running record of some of the things I'm figuring out in converting this app from Astro/React to Nuxt. Especially since some of this means figuring out how to work more with databases, which I struggle to find good docs around. Welcome to read these if they make sense to anyone but me. lol

## Oct 13, 2025

Managed to get my database working locally!

So I'm on Windows, which means things are always more complicated than they feel like they need to be. lol But from Turso's docs, it said the best way to do local dev was to use their CLI tool, which only works on Windows in the WSL terminal (which is in itself a version of Linux that can run on Windows). So I got that tool installed, then ran a command `turso db shell your-database .dump > dump.sql` to create the SQL instructions that would basically be all the steps needed to re-create my hosted database. That worked ok, though it took me awhile to figure out where that file was and that my WSL command line is working from it's own place on the computer. (Can run `explorer.exe .` to have it open that path in the file explorer.)

But the next step wanted to use sqlite3, which I just could not get to work locally. I think setting that up is it's own beast, and I just didn't want to deal with it. Tried a few days before, but just everything was going wrong. So when I came back to it today, I knew what needed to happen was to take the .sql file that the previous command gave me, and turn it into a .db file. Did some fresh searching and found a program that lets you do that called DB Browser. So I downloaded that, then was able to follow these steps:

- File > New Database, which I saved to my desktop
- Close out of the editor it auto-opens for you, since we have a file we want to use to populate the db
- File > Import > Database from SQL file, and gave it the WSL path where my file was stored
- It creates the .db for you from that, and shows you in it's GUI what it looks like

Now I have the file I need! And I could run `turso dev --db-file <file-name>` and it runs a local instance of turso for me, based on that db file. Now I have test data to use locally, that doesn't affect my remote database!

Still to see if the tests I'm doing on this file are actually persisting to the file - when I try to use DB Browser to see it, it says the file is locked. Could be that the terminal is still running, or that since it's in the WSL instance it's not allowed to access it. And I don't have the page built yet that shows me profiles created. lol But I'm not getting errors anymore, and I'm seeing the completed database call coming back from my api call! So at least the calls are working to get started!
