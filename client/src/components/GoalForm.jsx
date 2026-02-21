import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createGoal } from '../features/goals/goalSlice';

export default function GoalForm() {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!text.trim()) return;
    dispatch(createGoal(text.trim()));
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="form-inline">
      <input
        placeholder="Write a new goal"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button type="submit">Add Goal</button>
    </form>
  );
}
