import type { MealQueryParams } from "../types";

export const getNextMealQuery = (params: MealQueryParams) => {
  // return a string that will be used as a query to the chatgpt model to generate the next meal
  const { lastMeals, todayMeals, goal, userParams, ethics } = params;
  let query = 'I am hungry.';
  if (lastMeals) {
    query += ` I had ${lastMeals
      .map((meal) => 'description' in meal ? meal.description : meal.name)
      .join(', ')} as my meals for today.`;
  }
  if (todayMeals) {
    query += ` I had ${todayMeals
      .map((meal) => meal.name)
      .join(', ')} for my today meals.`;
  }
  if (goal || (userParams && userParams.objective)) {
    const g = userParams?.objective || '';
    query += ` My goal is to get ${goal || g}.`;
  }
  if (userParams && userParams.lifeType) {
    query += ` I live a ${userParams.lifeType} lifestyle.`;
  }
  if (userParams)
    query += ` I am ${userParams.age || 0} years old, ${userParams.height} ${userParams.heightUnit} tall and ${userParams.weight} ${userParams.weightUnit} heavy.`;
  if (ethics) {
    query += ` I am ${ethics}.`;
  }
  query += ' What should I eat for my next meal?';
  return query;
};
