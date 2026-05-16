# Weather App 🌤

Built as part of my journey to become a Frontend Developer.

A simple React app for searching weather by city.

# Coding Session 36

Started Weather App with React and Vite.

## Features

- Created new React project with Vite
- Built centered weather card layout
- Added input field and Search button
- Added first React state with useState
- Displayed live input text on screen

## Tech

- React
- JavaScript
- CSS
- Vite

## What I learned

- How to create a React project with Vite
- How useState works
- How controlled inputs work
- How React updates the UI in real time
- Basic component structure and styling

## Next

- Fetch real weather data from API
- Display temperature and weather info
- Add loading and error states

# Coding Session 37

## Features

- Connected real weather API
- Added weather search by city
- Displayed temperature and weather description
- Added error handling
- Added Enter key support for search

## Practice

- fetch()
- async / await
- API requests
- JSON data
- conditional rendering
- keyboard events

# Coding Session 38

Continued building the Weather App.

## Features

- Added loading state
- Added artificial loading delay for learning
- Added dynamic weather icons
- Added humidity information
- Added wind speed information
- Improved weather result card UI

## Practice

- useState
- conditional rendering
- loading state
- API data structure
- nested objects
- JSX layout structure

## What I learned

- How to show Loading... while waiting for API data
- Why loading must be turned off after success or error
- How to read nested API data like weather.main.humidity
- How to read weather.wind.speed from API response
- Why JSX tags must be closed correctly

# Coding Session 39

Continued improving the Weather App.

## Features

- Added country code next to city name
- Added feels like temperature
- Added third weather detail card
- Added sunrise time
- Added sunset time
- Improved weather result layout
- Improved mobile responsive layout
- Fixed JSX structure issues with nested divs

## Practice

- React conditional rendering
- JSX nesting
- API data structure
- nested objects
- Unix timestamp conversion
- JavaScript Date object
- toLocaleTimeString()
- CSS grid
- responsive design

## What I learned

- How to display country from weather.sys.country
- How to display feels like temperature from weather.main.feels_like
- How to read sunrise and sunset from weather.sys.sunrise and weather.sys.sunset
- Why API time sometimes comes as Unix timestamp
- How to convert Unix timestamp into readable time using new Date()
- Why every JSX tag must be closed correctly
- How to avoid putting one card accidentally inside another card
- How to use CSS grid for multiple detail boxes
- How to make layout better on mobile screens

## Next

- Add search history
- Add localStorage for last searched city
- Add better weather icons for more conditions
- Add background changes based on weather

# Coding Session 40

Continued improving the Weather App with search history functionality.

## Features

- Added search history state
- Added dynamic history buttons
- Added search from history buttons
- Added automatic weather fetch from history
- Improved app interactivity
- Improved user experience

## Practice

- arrays
- map()
- React state updates
- spread operator
- async functions
- function parameters
- dynamic rendering
- event handling
- API requests

## What I learned

- How to store cities inside an array state
- How map() creates dynamic UI elements
- What item and index mean inside map()
- How spread operator works with arrays
- How to create reusable async functions
- Why React state updates are not instant
- Why passing cityName directly is safer than relying on state
- How buttons can trigger API requests
- How React re-renders UI from updated state

## Next

- Prevent duplicate cities in history
- Add localStorage for history
- Add clear history button
- Add weather background changes

# Coding Session 41

Improved Weather App history system.

## Features

- Added Clear History button
- Added conditional rendering for Clear button
- Added history reset with setHistory([])
- Improved history UI
- Fixed CSS visibility issue

## Practice

- conditional rendering
- history.length
- array reset
- React state updates
- CSS debugging

## What I learned

- How to show elements only when conditions are true
- How setHistory([]) clears array state
- How React re-renders after state updates
- How to debug React vs CSS issues

## Next

- Prevent duplicate history cities
- Add localStorage
- Save last searched city
