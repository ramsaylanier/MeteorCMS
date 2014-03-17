#MeteorCMS - development v0.1

Last ReadMe Update: 3/4/2014
IMPORTANT: This CMS is in development and there *will* be bugs and somethings won't look pretty.

I love the Wordpress admin interface but *hate* the markup that Wordpress produces. So I started working on a CMS where I could control the markup, and take advantage of the speed of Meteor. As noted, this is a *VERY* basic CMS that allows a user to create pages, posts, and post categories. This CMS was and will always be built for developers with knowledge of javascript, HTML5 and CSS. Knowledge of the Meteor.js templating system will also allow for further customization.

##Example

Here is a [live example](http://meteorCMS.meteor.com/) of the CMS in action. As of the moment of this writing, there are no pages or posts added. Visit the [admin login](http://meteorCMS.meteor.com/admin) page and login using the Username: admin and Password: admin1 to access the backend. 

##Setup

First, install Meteor if you haven't done so. Check out the [Meteor docs](http://docs.meteor.com/) for more info.

```bash
$ curl https://install.meteor.com/ | sh
```

Second, install Node.js (which is required to install Meteorite, described below). You can download the installer [here](http://nodejs.org/download/). 

This, install [Meteorite](https://atmosphere.meteor.com/wtf/app). Meteorite is a Meteor package manager that allows you to install many unofficial packages for further expansion.

```
$ npm install -g meteorite
```

Some installations may require administrator rights, if so use sudo eg: 
```
sudo -H npm install -g meteorite 
```

Then, make a new directory for the app
```bash
$ mkdir MeteorCMS
```

Next, clone MeteorCMS to the new directory

```bash
$ git clone https://github.com/ramsaylanier/MeteorCMS.git MeteorCMS
```

You might need to update all the Meteorite packages that MeteorCMS depends upon:
```bash
$ cd meteorcms
$ mrt update
```

Lastly, while in the meteorcms directory, start the Meteor server.
```
$ meteor
```

That's it! You're app should be up and running at [localhost:3000](http://localhost:3000)!

##Using the Admin Back-End

Currently, the admin back-end is very simple, though functionality will be added over time. In order to access the admin login, go to the [admin login page](http://localhost:3000/admin) which is located at /admin. 

The way the CMS is currently written, only one admin or user is allowed to register. When you first install the app, going to the login page will allow a user to create an account. Once an account is created, no other accounts can be created. This will change in the future, but I wrote this CMS in order to create a personal blog, so only one admin was needed.

After creating an account, you can login with the username and password. 

Adding pages, posts, and categories are all very straightforward. 







