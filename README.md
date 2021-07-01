# A digital habit tracking application sticKtOiT

**sticKtOiT** is a student project developed by <a href="https://irina-jekabsone-portfolio.netlify.app/">Irina Jekabsone</a> and Maria Sparre.

For most people, the hardest part of forming a habit is to stick to it long enough for it to become as automatic as brushing your teeth. And we believe that the key factor to keep doing something is to get a buddy - someone who will go along with you and keep you motivated if you feel like quitting.

And this is the uniqueness of **sticKtOiT** application, it helps not only to keep track of the progress of your habits, but also to invite other people and see their progress and make it fun.


## How We Built it
**Backend**

This is a full stack application.

The Backend for this application consists of **RESTful API** built with **Express** and **Node.js**. 
The data is being stored in **Mongo Database** structured with **mongoose**. And the server is deployed to **Heroku** and **MongoDB** is stored in **Atlas**. 

Here you can find the deployed API and documentation: https://ahabit-tracker.herokuapp.com/

**Frontend**

On the frontend we have created a **multi-page React app** using **React Router** and **Redux with Toolkit**. 
We decided not to use any **UI libraries** in order to practice **CSS** to the fullest. 
Almost everything you see is created using **Styled Components** and **CSS**. 
Some features we have added though, like a video in the header (video by <a href="https://www.pexels.com/@thirdman?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels">Thirdman</a> from <a href="https://www.pexels.com/video/make-today-great-over-a-colored-yellow-background-5981789/">Pexels</a>), we also have a **lottie animation** showing when empty state and notifications using **react-toastify**. 

- The application is **responsive** and we built it with **mobile first approach**. Home page has navigation bar and hamburger menu on the mobile view. Hamburger menu is created with **Styled Components** and controlled via a **local state** and **conditional rendering**. 
- We have built sign up and sign in **components**.
- The Main page is a restricted area: we have implemented **authentication** so only registered users can access it. This is achieved with a custom authentication **middleware** that checks if there is an **accessToken** present. And on the frontend side we use **useHistory hook** with **push() method** to redirect to a different route depending on whether the user has accessToken or not.
- **React Modal** with **form** is used to add a new habit - habit description, start date and end date, where we use **react date range picker**. It also includes a search bar where you can find other users if you know the username and you can add them as collaborators.
- Each habit is represented by a separate card. It has EDIT and DELETE buttons, so it gives the user the possibility to update an existing habit or delete it. There is also a progress bar and a timeline with custom checkboxes for each collaborator.
- When user no longer has any habits active, there will be a **lottie animation** showing as an empty state. 

## Biggest challenge

The timeline with checkboxes was the most challenging part and something we are super proud of.

On the **backend** side we work with 2 **collections** in our **database**: User and Habit. **Habit schema** includes collaborators **property** which is **an array of objects** that has a **relation** to the **User Model** and also a **property** called checkedCheckbox, where we store IDs of checked checkboxes, this is how **frontend** knows which checboxes should be checked and also the progress, how many checkboxes are checked.

And on the **frontend** side we are **mapping** through the collaborators **array** and for each collaborator we create a timeline with checkboxes and on **change event** we send a **PATCH request** to **API** with a **query parameter** that helps to determine on the **beckend** side whether to delete or add checkbox id to the **array**.


## Additional Packages used
- Moment.js
- React toastify
- React date picker and time picker

## View it live

Here you can have a look at what **sticKtOiT** is all about: https://sticktoit.netlify.app/

