[Link to API](https://github.com/spaulsteinberg/a2z_server)  
[Link to Mobile App](https://github.com/spaulsteinberg/a2z-mobile)  

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



https://user-images.githubusercontent.com/42621176/186234929-f5a29c07-7655-49e2-8e3a-2fd118bac18d.mp4



The Explore screen is where tickets are created. On the sidebar, users can type in the origin and destination of the trip and is poopulated by the Google Place API. The main part of the screen is occupied by a large map provided by the Google Maps API, and directions are shown on the screen via the Directions API service and renderer. After completing the ticket creation in the modal, the user can create another for the same origin and destination or just exit.

<a name="tickets"></a>
## Ticket Table


https://user-images.githubusercontent.com/42621176/186235750-248eaa3e-811a-4ba6-b7d2-fc558e18183a.mp4


View a sortable, filterable ticket table. Visible in the table is the ticket id, origin place, destination place, create date, status, and a button to open a modal to edit tickets. Features include ascending/descending sort and filters for ticket id, status, and place. Tickets are displayed in a user-friendly Element UI table with row and pagination options. 

<a name="requests"></a>
## Requests



https://user-images.githubusercontent.com/42621176/186235799-2c5c4ff3-cd6d-4d55-a799-0c377a8e248f.mp4



View driver applications by ticket. Check request status's such as whether the ticket has been accepted, closed for new apps, and the individual driver application status. This is also where users can accept or reject applications.

<a name="account"></a>
## Account


https://user-images.githubusercontent.com/42621176/186235852-72f49ec7-7683-4072-99c0-6fa73969b110.mp4


The account page is for account management. Here, users can edit their public and private information and profile picture, view recent tickets, view recent requests, and change account credentials.

<a name="security"></a>
## Security, Users, and Permissions


https://user-images.githubusercontent.com/42621176/186239183-bbab0878-5693-47af-856a-7cf83655e1d8.mp4


All features are managed through Google Firebase Authentication, and includes logins, signing up new users, password resetting, and updating existing credentials. Anybody can sign up, while updating existing credentials can be done by any authenticated user. Since the idea of the application is to have one account per company, every user is an admin.

<a name="tools-and-technology"></a>
## Tools and Technology

This project is written in Vue.js 3 (Composition API) with Vuex, Firebase Authentication, Firebase Firestore DB, and Google Maps API.
