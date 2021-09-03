# How can I contribute?

- You can fix the typos (if any) in any documentation of this repo.
- You can check for any **unassigned** [issues](https://github.com/Real-Dev-Squad/website-members/issues) and **comment** on that issue that you'd like to get that issue assigned to you. (Remember: Do not work on issues assigned to someone else and do not work on any issue without having it assigned to you.)
- Create issue if you see any bug and then once you get approved from the admins, you can assign yourself and start working on it.

# How can you make a **Pull Request** (PR)

**Note**: Steps 1, 2 and 3 are **one-time** steps required for setup. If you have already cloned the repo and added upstream, consider following this documentation from step 4.

1. **Forking repository**

Fork this repository using the **Fork** option at the top-right corner of this page. This will create your own copy of this repository. You'll be redirected to your forked repository. Copy the link of this repository (which will look like `https://github.com/<your-username>/website-members/`) as you'll need it in the step 2.

![how-to-fork](https://i.imgur.com/s9LLbOw.png)

2. **Cloning repository**

Clone your forked repository, this will download your fork in your computer. To do this, open your terminal (command prompt/bash/git bash) and enter the following command, paste your link after the word **clone** without the **<>**.

```
git clone <link which you copied in the step 1>
```

3. **Adding remote repository**

Add the Real Dev Squad repository as a remote repository, so that you can anytime pull the latest changes from the Real Dev Squad repository which is being deployed. This needs to be done only for the first time.

```
git remote add upstream https://github.com/Real-Dev-Squad/website-members/
```

4. **Getting the latest code from the develop branch** (Can be skipped if you've cloned the repo just now)

If it's been quite a while after you have cloned the repo/made the last pull request, it's recommended to take a pull from the develop branch. Reason being, there may be some changes which could have merged after you had cloned the repo/made the last pull request.

To do so, make sure you're in the develop branch by checking out to the **develop** branch:

```
git checkout develop
```

Once you're in the **develop** branch, it's time to take a pull:

```
git pull upstream develop
```

Now that you've made sure that you've got latest changes, we can proceed to creating our branch

5. **Creating a branch**

Create a new branch to work on. We require a different branch so that we always have a stable, working version in the default (develop) branch. We're not supposed to touch the **main** branch as it is the one getting deployed on production.

```
git checkout -b <branch-name>
```

We will try to name the branch according to the task we are going to perform in it. If it is going to be a `feature`, the branch name should begin with `feat` or `feature`. If it is going to be a `fix`, the branch name should begin with `fix` or `bugfix`. The branch name should be self-explanatory.
For example, if I want to work on a `feature` called `login-form`, the branch name will be **feature/login-form**. If it is going to be a `fix` in `form-data`, the branch name will be `fix/form-data`.
Command example:

```
git checkout -b feature/login-form
```

6. **Just do it!**

Perform the tasks you wanted to, can be anything, ranging from fixing simple typo to re-designing the whole page!

7. **Committing your changes**

Now you have made the changes, though they are saved in your system, Git doesn't know what changes you've done. So you have to **commit** your changes. First step is to add the files which you want to add to the staging area, the dot after **add** in the first command tells Git to check for changes in all the files. The second step is about committing your changes. The message part is short description of your commit, what changes that particular commit is doing. For example, if while creating a login form, the commit message can be something like `creating login form`.

```
git add .
git commit -m "Write message about your commit"
```

8. **Making sure you have the latest changes from the develop branch**

It may so happen that since the last time you cloned the repo/took a pull from develop, some changes may be merged in the develop branch. So to be on the safer side, we should have those changes as well.

In order to do that, we first checkout to **develop** branch by:

```
git checkout develop
```

Once we're in develop, it's time to take a pull:

```
git pull upstream develop
```

Now that our **local** develop branch is in sync with **remote** develop branch (of the Real Dev Squad Repository), we should let our branch know about the changes from the develop branch (if any). To do so we first checkout to our branch:

```
git checkout <branch-name>
```

Once we're in our branch, we **rebase** our branch on top of the current develop branch (we change the base of our branch, so that it appears as if we have worked from the time the latest changes were merged in the develop branch). To do so:

```
git rebase develop
```

You should solve the merge conflicts, if any.

9. **Pushing your code**

Now it is the time to push the changes of your local develop branch to your fork of the repository which is on Github (which we cloned in step 2).

```
git push origin
```

10. **Pull request**

Now go to your forked repository and you'll see that **This branch is xx commits ahead of Real-Dev-Squad:develop.** Right next to it will be an option to **Pull Request**. Click on it, submit your pull request (also known as _PR_) explaining what you've done.

![how-to-open-pull-request](https://i.imgur.com/NMAeWc2.png)

11. **Review stage**

Wait for it to get reviewed, make the changes required (if any) , commit your changes and hit **Pull Request** again, your commits will be added to the same pull request you had opened earlier (if it is NOT closed).

12. **Congratulations on making your first Pull Request! 🎉**
