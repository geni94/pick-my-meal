import { useState, useEffect } from "react";
import { useDebounce } from "~/hooks/useDebounce";
import { searchMeals, type Meal } from "~/services/UsfdaMeals";

const DEFAULT_MEALS = [{ fdcId: 0, description: "" }];

const MealDropComponent = ({
  mealSuggestions,
  onSelectMeal,
  handleSearch,
  mealData,
}: {
  mealSuggestions: Meal[],
  onSelectMeal: (idx: number, value: Meal['description']) => void,
  handleSearch: (value: string) => void,
  mealData?: Meal,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    handleSearch(debouncedSearch);
  }, [debouncedSearch]);

  useEffect(() => {
    return () => setSearch('');
  }, []);

  return (
    <div className="relative">
      <button
        id="dropdownSearchButton"
        onClick={() => setOpen(!open)}
        data-dropdown-toggle="dropdownSearch" data-dropdown-placement="bottom"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        {mealData && mealData.description ? mealData.description : 'Meal search'} <svg className="w-4 h-4 ml-2" aria-hidden={open} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>
      {open && (
        <div id="dropdownSearch" className="dropdown-wrapper z-10 bg-white rounded-lg shadow w-60 dark:bg-gray-700">
          <div className="p-3 text-white">
            <label htmlFor="input-group-search" className="sr-only">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden={open} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
              </div>
              <input
                type="text"
                id="input-group-search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search meal"
              />
            </div>
          </div>
          <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
            {mealSuggestions.map((meal) => (
              <li
                key={`${meal.fdcId}-${meal.description}-span`}
                onClick={() => {
                  onSelectMeal(meal.fdcId, meal.description);
                  setOpen(false);
                }}
              >
                <div className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <div className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{meal.description}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const AutocompleteInput = () => {
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
