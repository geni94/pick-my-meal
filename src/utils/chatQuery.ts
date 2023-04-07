import type { MealQueryParams } from "../types";

export const getNextMealQuery = (params: MealQueryParams) => {
  // return a string that will be used as a query to the chatgpt model to generate the next meal
  const { lastMeals, todayMeals, goal, userParams, ethics } = params;
  let query = 'I am hungry.';
  if (lastMeals) {
    query += ` I had ${lastMeals
      .map((meal) => meal.name)
      .join(', ')} for my last meals.`;
  }
  if (todayMeals) {
    query += ` I had ${todayMeals
      .map((meal) => meal.name)
      .join(', ')} for my today meals.`;
  }
  if (goal) {
    query += ` My goal is to get ${goal}.`;
  }
  if (userParams)
    query += ` I am ${userParams.age || 0} years old, ${userParams.height} tall and ${userParams.weight} heavy.`;
  if (ethics) {
    query += ` I am ${ethics}.`;
  }
  query += ' What should I eat for my next meal?';
  return query;
};
