# Little Victories

An app to make finding your next tech role a little more rewarding, by letting the tasks you complete reward you with pictures to form a gallery of your progress.

<https://little-victories.netlify.app>

[![Netlify Status](https://api.netlify.com/api/v1/badges/46769c0c-0e03-4ab6-813a-6fdc389ff0dd/deploy-status)](https://app.netlify.com/projects/little-victories/deploys)

## Built With

This project is built with:

- [Vue](https://vuejs.org/guide/quick-start.html) (JavaScript flavor)
- [Nuxt](https://nuxt.com/docs/4.x/getting-started/installation) (full stack framework)
- [Pinia](https://pinia.vuejs.org/getting-started.html) (state management)
- [Turso](https://docs.turso.tech/introduction) (SQLite database)
- [Drizzle](https://orm.drizzle.team/docs/get-started/turso-database-new) (ORM for database)
- [Unsplash](https://unsplash.com/documentation) (reward pictures)

## How it Works

When you make an account you get your first active "journey", a set of 15 tasks to complete that will help you to find your next role. Tasks are shown in a suggested order, though almost all of them can be done in whatever order you'd like (a few are directly related to knowing what role you're going to apply for next and need that task completed before they can be done).

Clicking a task tile will show you a suggested goal and a deeper description of what that task is. The goal is for guidance - some tasks will be easy to tell when they're done, and some can go on forever if you let it. The goal is a gentle suggestion so that on the times when it feels like you're never satisfied, you can use that suggestion to allow yourself to move forward.

Clicking the "completed" button will open a second dialog for you to share a note on what you did to complete it, then let you mark it as done! You do need to write something, but it doesn't have to be complex! It's just nice to jot a short note for future you to see your progress.

Complete all 15 tasks to unlock the picture at the top, your reward for moving yourself along the journey to your next role! A button will appear below the picture to start your next journey and keep going.

## Inspiration

Burnout can happen when you can't see any progress, and job searching rarely gives you any measurable progress. You get ghosted or told no way more often than you actually move forward or land a role. So I knew I needed some small way to remind myself that it IS progress to be consistently doing the things that are recommended for finding a job in tech.

This app is my solution to that. A short-ish list of things to do that are recommended by people I trust to actually get my next role, broken down into manageable steps. At the end, a picture to add to my gallery, so I can then visually see that I'm doing all the right things consistently. It's not much in the grand scheme of things, but hopefully it's enough to remind myself that I'm doing the thing which is what really matters!

The name of the app (and the inspiration for the color and picture themes) comes from a song by [Matt Nathanson called "Little Victories"](https://www.youtube.com/watch?v=xNxpWx0TotY). This song has been a constant balm for my soul since I first heard it, reminding me that life won't always be perfect, but I can still learn to get by on those little victories and be ok.

> This time I'll be sailing
> No more bailing boats for me
> I'll be out here on the sea
> Just my confidence and me
> And I'll be awful sometimes
> Weakened to my knees
> But I'll learn to get by
> On the little victories

## Running it locally

If you do want to clone this project and run your own version locally, here's a few tips and commands to help you out.

There's an `.env.example` file with all the environment variables you'll need. The two main accounts you'll need are an Unsplash developer account, and a turso cloud database. The documentation sites are good at telling you what needs to be shared to meet their requirements and will explain what goes in what environment key.

### Unsplash

- Steps to create your developer account and register your app: <https://unsplash.com/documentation#creating-a-developer-account>
- Photos have to be attributed, I used this guide to get the source and referral values: <https://help.unsplash.com/en/articles/2511315-guideline-attribution>

### Turso

- This will help you get the environment variables you need: <https://docs.turso.tech/sdk/ts/quickstart>
- This guide walks you through setting up your local development (in case my note below doesn't help): <https://docs.turso.tech/local-development>

You can run the app locally with Nuxt.

```bash
npm run dev
```

I used Turso locally as well, so I could have a test database and leave my cloud version of my database for the live site. I have a `notes.md` file in the repo explaining how I figured this bit out for myself on a Windows machine. It should walk you through step by step to get it working locally for yourself as well.

```bash
# Turso needs a WSL terminal for this to work
turso dev --db-file <filename>
```
