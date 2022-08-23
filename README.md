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

This project offers a middle ground between large-scale freight carriers and friends helping each other move items. I was motivated by supply chain issues stemming from 2020, anybody from trucking contractors to normal people could help ease the load and move products, while also making some money. This tool is for those who are looking for drivers to contract, while the [mobile app](https://github.com/spaulsteinberg/a2z-mobile) is specifically for drivers. Trip tickets can be created, with an integrated and seamless map provided by the Google, with tickets and requests being easily managed in their respective tables. Account management is also easy to use, and is helpful for viewing the latest events that have occurred in the account.

<a name="explore"></a>
## Explore

The Explore screen is where tickets are created. On the sidebar, users can type in the origin and destination of the trip and is poopulated by the Google Place API. The main part of the screen is occupied by a large map provided by the Google Maps API, and directions are shown on the screen via the Directions API service and renderer. After completing the ticket creation in the modal, the user can create another for the same origin and destination or just exit.

<a name="tickets"></a>
## Ticket Table

View a sortable, filterable ticket table. Visible in the table is the ticket id, origin place, destination place, create date, status, and a button to open a modal to edit tickets. Features include ascending/descending sort and filters for ticket id, status, and place. Tickets are displayed in a user-friendly Element UI table with row and pagination options. 

<a name="requests"></a>
## Requests

View driver applications by ticket. Check request status's such as whether the ticket has been accepted, closed for new apps, and the individual driver application status. This is also where users can accept or reject applications.

<a name="account"></a>
## Account

The account page is for account management. Here, users can edit their public and private information and profile picture, view recent tickets, view recent requests, and change account credentials.

<a name="security"></a>
## Security, Users, and Permissions

All features are managed through Google Firebase Authentication, and includes logins, signing up new users, password resetting, and updating existing credentials. Anybody can sign up, while updating existing credentials can be done by any authenticated user. Since the idea of the application is to have one account per company, every user is an admin.

<a name="tools-and-technology"></a>
## Tools and Technology

This project is written in Vue.js 3 (Composition API) with Vuex, Firebase Authentication, Firebase Firestore DB, and Google Maps API.
