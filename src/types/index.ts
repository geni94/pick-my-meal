export type GoalType = 'thinner' | 'healthier' | 'bulky' | 'cut';

export type EthicType = 'vegan' | 'vegetarian' | 'pescetarian' | 'omnivore';

export type UserParams = {
  age?: string;
  height: string;
  weight: string;
  gender: string;
  weightUnit: string;
  heightUnit: string;
  lifeType: string;
  objective: string;
};

export type MealType = {
  name: string;
  description?: string;
};

export type MealQueryParams = {
  lastMeals?: Partial<MealType>[];
  todayMeals?: Partial<MealType>[];
  goal?: GoalType;
  userParams?: UserParams;
  ethics?: EthicType;
};
