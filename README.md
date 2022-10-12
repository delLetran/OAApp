## Getting Started

First, Install dependecies using 
`yarn` | `yarn add` 
or
`npm install`

command.

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Sources: 
- [pvwatts - fuel station API](https://developer.nrel.gov/docs/solar/pvwatts/v6)
- [weather API](https://www.weatherapi.com/)

## Description
- Pull data from fuel stations to create the initial graphs (Pie and Bar graphs) for CNGs
- Use Fuel stations coordinates for weatherApi request Stacked Bar graph

## App Details
### Graph represents different weather conditions on each Fuel Station which affects the fuel economy.
Fuel economy tests show that, in city driving, a conventional gasoline car's gas mileage is roughly 15% lower at 20°F than it would be at 77°F. It can drop as much as 24% for short (3- to 4-mile) trips.Visit Source here.
