# plan-browser
AngularJS data browser for Lexington Planning applications.

#Getting Started
Plan-browser is a simple, single page AngularJS data browser for browsing information stored in a google spreadsheet

The entire app is in a single javascript file (js/app.js). 

To get started:

- Make sure you have all the dependencies  - ngRoute, smart-table, tabletop.js
- Set Up your Google Spreadsheet - It needs a unique identifier as one of the fields and it must be published
- Edit the Routing to your needs - The original version has three views:  a table of the data, a detail page for each row, and an about page
- Edit the Controllers to point to your Google Spreadsheet- You should baiscally just need to change the 'key' to the URL of your spreadsheet and change the 'wanted' to your sheet. You can use any of the tabletop options so check the tabletop.js docs.
- Edit the Templates to display your data how you want  - everything is in the templates folder.

#General Information

I have included a custom "titlecase" filter for my purposes. You can edit the 'bigwords' and 'smallwords' variable to adjust to your particular needs.

All of the options for smart-table and tabletop.js can be used. Refer to their docs, as they are both robust tools.



