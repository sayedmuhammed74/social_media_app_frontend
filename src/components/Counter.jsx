import { useDispatch, useSelector } from 'react-redux';
import {
  increment,
  decrement,
  reset,
  incrementBy,
} from './../redux/features/counterSlice';
import { Link } from 'react-router-dom';

const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);

  return (
    <>
      <h1 className="text-yellow-500">count is {count}</h1>
      <button onClick={() => dispatch(increment())}>increment</button>
      <button onClick={() => dispatch(decrement())}>decrement</button>
      <button onClick={() => dispatch(incrementBy(5))}>increment By 5</button>
      <button onClick={() => dispatch(reset())}>reset</button>
      <div>
        <button>
          <Link to="/">Home</Link>
        </button>
        <button>
          <Link to="/counter">counter</Link>
        </button>
      </div>
    </>
  );
};

export default Counter;
