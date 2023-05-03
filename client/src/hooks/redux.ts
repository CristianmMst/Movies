import { AppDispatch, RootState } from "@/redux/store";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
