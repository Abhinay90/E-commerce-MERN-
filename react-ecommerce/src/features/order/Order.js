import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from './orderSlice';

export default function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  return (
    <div>
      <div>
      </div>
    </div>
  );
}
