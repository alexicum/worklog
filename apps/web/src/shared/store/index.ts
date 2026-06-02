import { useDispatch, useSelector } from 'react-redux';

// Хуки используют глобальные типы без прямого импорта из слоя app
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();