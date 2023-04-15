import { useState, useEffect } from 'react';
import AutocompleteInput from '~/components/MealsAutcomplete';
export interface SelectionsObject {
  age: string;
  gender: string;
  weight: string;
  weightUnit: string;
  height: string;
  heightUnit: string;
  lifeType: string;
  objective: string;
}

const UserSelectionGroup = ({
  sendSelections,
}: {
  sendSelections: (selections: SelectionsObject) => void;
}) => {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [height, setHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [lifeType, setLifeType] = useState('active');
  const [objective, setObjective] = useState('loseWeight');
  const [meals, setMeals] = useState([]);

  const [genderSelections] = useState([
    'female', 'male', 'nonbinary'
  ]);

  useEffect(() => {
    sendSelections({
      age,
      gender,
      weight,
      weightUnit,
      height,
      heightUnit,
      lifeType,
      objective,
    });
  }, [age, gender, weight, weightUnit, height, heightUnit, lifeType, objective]);

  return (
    <div className="flex flex-col space-y-4 text-black">
      {/* Group items together with a title */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center leading-5 gap-4">
        <div className="flex flex-col">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="border rounded-lg p-2"
          >
            {genderSelections.map((gender, idx) => (
              <option key={`${gender}-${idx}`} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="age">Age:</label>
          <input
            id="age"
            name="age"
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border rounded-lg p-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="weight">Weight:</label>
          <div className="flex items-center">
            <input
              id="weight"
              name="weight"
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="border rounded-l-lg p-2 w-2/3"
            />
            <select
              id="weightUnit"
              name="weightUnit"
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value)}
              className="border rounded-r-lg p-2 w-1/3"
            >
              <option value="kg">kg</option>
              <option value="lb">lb</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="height">Height:</label>
          <div className="flex items-center">
            <input
              id="height"
              name="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="border rounded-l-lg p-2 w-2/3"
            />
            <select
              id="heightUnit"
              name="heightUnit"
              value={heightUnit}
              onChange={(e) => setHeightUnit(e.target.value)}
              className="border rounded-r-lg p-2 w-1/3"
            >
              <option value="cm">cm</option>
              <option value="inch">inch</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center leading-5 gap-4">
        <div className="flex flex-col">
          <label htmlFor="lifeType">Type of Life:</label>
          <select
            id="lifeType"
            name="lifeType"
            value={lifeType}
            onChange={(e) => setLifeType(e.target.value)}
            className="border rounded-lg p-2"
          >
            <option value="active">Active</option>
            <option value="sedentary">Sedentary</option>
            <option value="gym">I sometimes go to the gym</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="objective">Objective:</label>
          <select
            id="objective"
            name="objective"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            className="border rounded-lg p-2"
          >
            <option value="loseWeight">Lose Weight</option>
            <option value="gainWeight">Gain Weight</option>
            <option value="eatHealthier">Eat Healthier</option>
            <option value="getCut">Get Cut</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col p-5 leading-5">
        <h3 className="text-xl font-bold tracking-tight text-gray-200">
          You can insert up to 3 meals that you&apos;ve had last
        </h3>
        <AutocompleteInput />
      </div>
    </div>
  );
};

export default UserSelectionGroup;
