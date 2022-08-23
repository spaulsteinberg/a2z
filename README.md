# Table of Contents

- [Overview](#overview)
- [Explore](#explore)
- [Tickets](#tickets)
- [Requests](#requests)
- [Account](#account)
- [Security and Users](#security)
- [Tools and Technology](#tools-and-technology)

<a name="overview"></a>
## Overview

This project offers a middle ground between large-scale freight carriers and friends helping each other move items. I was motivated by supply chain issues stemming from 2020, anybody from trucking contractors to normal people could help ease the load and move products, while also making some money. This tool is for those who are looking for drivers to contract, while the (mobile app)[https://github.com/spaulsteinberg/a2z-mobile] is specifically for drivers. Trip tickets can be created, with an integrated and seamless map provided by the Google, with tickets and requests being easily managed in their respective tables. Account management is also easy to use, and is helpful for viewing the latest events that have occurred in the account.

<a name="explore"></a>
## Explore

The Explore screen is where tickets are created. On the sidebar, users can type in the origin and destination of the trip and is poopulated by the Google Place API. The main part of the screen is occupied by a large map provided by the Google Maps API, and directions are shown on the screen via the Directions API service and renderer. After completing the ticket creation in the modal, the user can create another for the same origin and destination or just exit.

<a name="tickets"></a>
## Ticket Table

View orders by a weekly, monthly, tri-monthly, or yearly basis. Visible in the table is the receipt number, name on the order, email, date, amount, and link to view the full receipt. Features include ascending/descending sort and search bar based off receipt number to quickly locate unique orders. Orders are displayed in a user-friendly Material UI table with row and pagination options. Clicking on the 'View Order' link will show a more detailed order view than the table, along with the exact time and credit card (last 4 digits) used to complete the order. 

<a name="requests"></a>
## Requests

Search whats in stock, add to inventory, and/or edit what's already available. The Inventory tab allows you to do it all. Search by item name or filter by category for a more thorough search. Users with write or admin privileges are able to add new inventory items, edit the quantity or price of each item, or delete items. Items are displayed in a Material UI table with row and pagination options.

<a name="account"></a>
## Account

Profile pages are user-specific. Any authenticated user can add a first and last names, restaurant name, and title. Emails are not editable, since they are used to determine a unique user. Admin users will also be able to edit user permissions on this page via the permissions modal. Goals are created by choosing a subject, timeable, and deliverable. Progress on these goals can be viewed in the dashboard. Goals re viewable, editable, and removable. This feature is completely on an individual basis and is optional.

<a name="security"></a>
## Security, Users, and Permissions

All features are managed through Google Firebase Authentication, and includes logins, signing up new users, password resetting, and updating existing credentials. Signing up new users requires authenticated admin permissions, while updating existing credentials can be done by any authenticated user. Adding and removing authenticated users is easy: Simply sign up the new user with an optional set of permissions, and they will be given all allowed access. Permissions can be edited by any user with admin status via the profile page. Only admins can view and edit users, which does not include the super user (whoever created the main tool account).

<a name="tools-and-technology"></a>
## Tools and Technology

This project is written in Vue.js (Composition API) with Vuex, Firebase Authentication, Firebase Firestore DB, and Google Maps API.
