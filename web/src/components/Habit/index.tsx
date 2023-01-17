import React from "react";

interface HabitProps {
  completed: number;
}

const Habit: React.FC<HabitProps> = (props) => {
  return (
    <div>
      <p className="bg-zinc-900 w-10 h-10 text-white rounded m-2 text-center flex items-center justify-center">
        {props.completed}
      </p>
    </div>
  );
};

export default Habit;
