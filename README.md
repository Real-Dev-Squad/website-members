[![Better Uptime Badge](https://betteruptime.com/status-badges/v1/monitor/5hv0.svg)](https://betteruptime.com/?utm_source=status_badge)

# website-members

The part of the website that shows the members of RDS
This page is hosted on: https://members.realdevsquad.com/

# How can I contribute?

Wish to contribute? You can find a detailed guide [here](./CONTRIBUTING.md)!

## How to start ?

### Setup

We use `npm` for managing packages.
It is installed by default along with node.js. 

Please install `volta`

[Why Volta?](https://docs.volta.sh/guide/#why-volta)

To install Volta, please follow the [process](https://docs.volta.sh/guide/getting-started)

### How to run the project locally

Step 1:
```
npm install
```
The above command installs all the essential packages  for this project via `package.json` file.

Step 2:

These scripts refer to the different stages of developing an application:

```bash
> npm run dev
# starts development server locally on port 3000
# open http://localhost:3000 from your browser.

> npm run build
# builds application for production grade usage.

> npm run build-static
# runs next build && next export which builds the application and have a static version of app in the 'out' directory.

> npm run start
# starts a Next.js production server.
# to be used after a production build.

```
Step 3: Check for lint and prettier issues before raising a PR
```bash
> npm run check-lint
# checks for common syntax and style errors in the code base.

> npm run check-format
# examines files for errors in style,spacing,single quotes vs double quotes etc.

```
## Project Structure

We are using Next.js for this project. Next.js has a well defined directory structure that must be used to make sure the apps runs properly. Read more about Next.js [here](https://nextjs.org/learn/basics/create-nextjs-app?utm_source=next-site&utm_medium=homepage-cta&utm_campaign=next-website)

### Pages

In `Next.js`, a page is a React Component exported from a `.js`, `.jsx`, `.ts`, or `.tsx` file in the `pages` directory. Each page is associated with a route based on its file/directory name. Read more about `pages` [here](https://nextjs.org/docs/basic-features/pages). An example is given below -

#### Directory Structure

```
pages
|__ members
|   |__ [id]
|   |   |__ index.js
|   |
|   |__ index.js
|
|__ blogs
|   |__ index.js
|
|__ index.js
```

#### Routes Created by Next.js

```
/
/members
/members/[id]
/blogs
```

> Note: In `/members/[id]` the `[id]` part is dynamic it can be `1`, `2`, `a`, etc.

### Components

All the reusable components are created inside `/components` directory.

### `/components/pages`

In Next.js it is adviced that the files inside `/pages` directory should contain as minimal code as possible, that's why all the code for a given page is written inside `/components/pages` directory and imported in `/pages`. For Example -

```JavaScript
// Inside /components/pages/blogs/index.js
import React from "react";
const Blogs = () => {
  return <div>This is my first documentation, I am super scared.</div>
};

export default Blogs;


// Inside /pages/blogs/index.js
import React from "react";
import Blogs from "../../components/pages/blogs";

const BlogsPage = () => {
  return (
    <div>
      <Blogs/>
    </div>
  );
};

export default BlogsPage;

```

> Note: Do not create individual files in `/components` or `/pages`. Put every file in folders with appropriate names.

### Public

All the public assets like `icons`, `images` are stored inside public directory.

## SCSS Guide

There are two ways to add styles in the project

### Global Sylesheets

Create a stylesheet, for example `nav-styles.scss`

```SCSS
nav {
  padding: 20px 20px 60px;
  max-width: 680px;
  margin: 0 auto;
}
```

Import the `nav-style.scss` in a js file.

```JavaScript
import './nav-styles.css';

const Nav = () => {
  return <nav>This is nav</nav>;
}
```

> Note this way is suitable for writing global stylesheets only, for internal component stylesheets use CSS modules syntax explained below.

### CSS Modules

Next support CSS Modules out of the box. To enable CSS Module for any SCSS stylesheet use `.module.scss` in the end of the filename. Let's see and example -

Creating a filename with the name `button.module.scss`

```SCSS
.btn{
  color: red;
  font-size: 100px;
  border: 0px;
}
```

In the JS file import this stylesheet.

```JavaScript
import classNames from "./button.module.scss";

const Button = () => {
  return <button className={classNames.btn}>Click Me!</button>;
}

export default Button;
```

Importing styles in this way will scope all the styles to their respective files. So classname `.btn` is converted to `[filename]_btn__[hash]`. Read [this](https://nextjs.org/docs/basic-features/built-in-css-support) guide for more info on CSS support in Next.js.


