import axios from "axios";

export type Meal = {
  fdcId: number;
  description: string;
};

export type MealSearchResponse = {
  foods: Meal[];
};

// const API_KEY = process.env.FDC_API_KEY;
const API_KEY = "f0xQfdjetKbbCuJhInYNuRvMepIrF2opOkOF7Ja1";
const API_URL = "https://api.nal.usda.gov/fdc/v1/foods/search";

export const searchMeals = async (query: string): Promise<Meal[]> => {
  try {
    const response = await axios.get<MealSearchResponse>(API_URL, {
      params: {
        api_key: API_KEY,
        query: query,
        // dataType: ["Branded", "Survey (FNDDS)"],
        pageSize: 10,
      },
    });

    return response.data.foods;
  } catch (error) {
    console.error(error);
    return [];
  }
};
