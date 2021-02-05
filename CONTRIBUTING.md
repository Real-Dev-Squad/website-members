# How can you make your first **Pull Request**

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


4. **Creating a branch**



Create a new branch to work on. We require a different branch so that we always have a stable, working version in the default (develop) branch. We're not supposed to touch the **main** branch as it is the one getting deployed on production.
``` 
git checkout -b <branch-name> 
```
We will try to name the branch according to the task we are going to perform in it. If it going to be a `feature`, the branch name should begin with `feat` or `feature`. If it going to be a `fix`, the branch name should begin with `fix` or `bugfix`. The branch name should be self explanatory.
For example, if I want to work on a `feature` called `login-form`, the branch name will be **feature/login-form**. If it is going to a `fix` in `form-data`, the branch will be `fix/form-data`. 
Command example:
``` 
git checkout -b feature/login-form
```

5. **Just do it!**



Perform the tasks you wanted to, can be anything, ranging from fixing simple typo to re-designing the whole page!

6. **Committing your changes**



Now you have made the changes, though they are saved in your system, Git doesn't know what changes you've done. So you have to **commit** your changes. First step is to add the files which you want to add to the staging area, the dot after **add** in the first command tells Git to check for changes in all the files. The second step is about committing your changes. The message part is short description of your commit, what changes that particular commit is doing. For example, if while creating a login form, the commit message can be something like `creating login form`.
``` 
git add .
git commit -m "Write message about your commit" 
```

7. **Merging your branch into develop branch**



Now your branch (`feature/login-form`, in my case) has the changes you made, once you're sure that your code is stable, it's time to merge the changes into the develop branch of your *local version of your fork*. The following command takes you to the develop branch:
``` 
git checkout develop
```

It's recommended that you have the latest copy of the original repo into your develop branch before you merge your changes into it. So pull the latest changes again:
```
git pull upstream develop
```
Now you can merge your branch into the develop branch.
```
git merge <branch-name>
```

For example, if the branch name is feature/login-form:
```
git merge feature/login-form
```

8. **Pushing your code**



Now it is the time to push the changes of your local develop branch to your fork of the repository which is on Github (which we cloned in step 2).
```
git push origin
```

9. **Pull request**



Now go to your forked repository and you'll see that **This branch is xx commits ahead of Real-Dev-Squad:develop.**  Right next to it will be an option to **Pull Request**. Click on it, submit your pull request (also known as *PR*) explaining what you've done.

![how-to-open-pull-request](https://i.imgur.com/NMAeWc2.png)

10. **Review stage**



Wait for it to get reviewed, make the changes required (if any) , commit your changes and hit **Pull Request** again, your commits will be added to the same pull request you had opened earlier (if it is NOT closed).

11. **Congratulations on making your first Pull Request! 🎉**
