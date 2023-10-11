# *My Cooking Manager*
This project was built in 2 weeks as the culmination of my 2023 Concordia University diploma in Web development. *My Cooking Manager* is a full stack application that helps you organize your online recipes all in one spot while allowing the addition of notes, ratings and other neat features.

## Motivation
I created this project because I needed a tool to keep track of all the recipes I made in the past and allow me to save notes and other useful information about each recipe. The goal was to streamline my cooking planning all in the same application without having to juggle my browser bookmarks, opening a dozen of similar sounding recipes in different tabs and trying to remember if I had tried each specific recipe before and if I liked them.

## GIFs and Screenshots
#### Overview of the experience
![App tour (901 X 418)](https://github.com/M-Feale/project-my-cooking-manager/assets/99748861/8f0170b3-b497-47bd-94b5-c0031d7e01f0)

#### Home page
![Homepage](https://github.com/M-Feale/project-my-cooking-manager/assets/99748861/1752c7c7-2092-420e-9653-c30f7b682c78)

#### Collection page
![RecipeCollection (1000 x 464)](https://github.com/M-Feale/project-my-cooking-manager/assets/99748861/b4f0b426-5e2c-40f8-ad86-b40f039203b7)

#### Recipe Details page
![RecipeDetails (1000 x 464)](https://github.com/M-Feale/project-my-cooking-manager/assets/99748861/c7f1e23d-1ead-4cbf-b38e-86c1407cf95b)

#### Cataloguing page
![CataloguingPage (1000 x 464)](https://github.com/M-Feale/project-my-cooking-manager/assets/99748861/0893c15d-8558-4458-a4a4-7b4d7bdde4ce)

## Technologies and Framework
#### Back end
- Node.js
- Express.js
- MongoDB
- grabity package ( [Repository](https://github.com/e-oj/grabity) )
- SendGrid API ( [Repository](https://github.com/sendgrid/sendgrid-nodejs/blob/main/packages/mail/README.md) )
#### Front end
- Vite
- React.js
- Auth0 ( [Documentation](https://auth0.com/docs/libraries/auth0-react) | [Repository](https://auth0.github.io/auth0-react/ ) )
- react-rating package ( [Repository](https://github.com/smastrom/react-rating) )
- styled-components package ( [Documentation](https://styled-components.com/docs) | [Repository](https://github.com/styled-components/styled-components) )
- react-icons package ( [Documentation](https://react-icons.github.io/react-icons) | [Repository](https://github.com/react-icons/react-icons) ) 

## Features
The app is structured through 4 pages each including useful features
- Home page
  - Authentication through Auth0
- Collection page
  - Search bar that recovers recipes by name, website origin or category
  - Category filter
  - “Add Recipe” button
  - Clickable recipe cards displaying recipe information, and if applicable, last time the recipe was made, overall rating, and indicators for the presence of a shopping list or notes on the recipe
- Recipe Details page
  - Recipe information
  - Interactable star ratings for “Easy Cleanup”, “Taste”, Time Accuracy”
  - Shopping list and a button to send it to your email
  - Note taking in a bullet point format
  - Identifier to indicate that you would like to make this recipe again
  - Date tracker to log the days you made the recipe
  - Category select to allow you to change the initially imputed category
  - Button to open the recipe itself in another tab
- Recipe Cataloguing page
  - Input bar to paste the url of the web recipe you want to add to your collection
  - Preview of the found recipe
  - Category select to file the recipe into a already existing category or create a new one
    
## Challenges
- Creating a smooth and intuitive user experience in a feature-rich application
- Learning how to use the SendGrid API
- Integrating authentication with Auth0
- Reading and updating fields in a complex data structure in MongoDB
  
## Future feature implementations
- Allow the deletion of recipes
- Sort recipes by “making again” identifier
- Sort recipes by star rating
- Sort recipes by date created
- Add a carousel to the Home page
- Make the app fully responsive 

