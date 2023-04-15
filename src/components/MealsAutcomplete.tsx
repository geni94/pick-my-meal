import { useState, useEffect } from "react";
import MealDropComponent from "./MealsAutocompleteDropdown";
import { searchMeals, type Meal } from "~/services/UsfdaMeals";

interface PropTypes {
  sendSelectedMeals: (meals: Meal[]) => void;
}

const DEFAULT_MEALS = [{ fdcId: 0, description: "" }];

const AutocompleteInput = ({
  sendSelectedMeals,
}: PropTypes) => {
  const [meals, setMeals] = useState(DEFAULT_MEALS);
  const [suggestions, setSuggestions] = useState<Meal[]>([]);

  const handleMealChange = (index: number, value: string) => {
    if (value.trim().length > 0) {
      searchMeals(value).then((data) => {
        setSuggestions(data);
      }).catch((err) => console.log(err));
    } else {
      setSuggestions([]);
    }
  };
  const onMealsChange = (meal: Meal, value: string, mi: number) => {
    setMeals((prevMeals) => {
      const newMeals = [...prevMeals];
      const prevMeal = newMeals[mi] || { fdcId: 0, description: '' };
      newMeals[mi] = { fdcId: meal.fdcId ?? prevMeal.fdcId, description: value };
      newMeals.push({ fdcId: 0, description: '' });
      sendSelectedMeals(newMeals);
      return newMeals;
    });
  };

  useEffect(() => {
    return () => {
      setMeals(DEFAULT_MEALS);
      setSuggestions([]);
    }
  }, []);

  return (
    <div className="flex flex-col gap-5 w-fit-content">
      {meals.map((meal, mealIndex) => (
        <MealDropComponent
          key={`autocomplete-meal-${meal.fdcId ?? mealIndex}-${meal.description}`}
          mealSuggestions={suggestions}
          onSelectMeal={(idx, value) => {
            onMealsChange(meal, value, mealIndex);
          }}
          handleSearch={(value) => {
            handleMealChange(0, value);
          }}
          mealData={meal}
        />
      ))}
    </div>
  );
};

export default AutocompleteInput;
