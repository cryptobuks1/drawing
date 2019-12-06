import { createReducer } from 'typesafe-actions';
import { Color } from '../../../shared/Color';
import {
    SET_SELECTED_TOOL,
    SetSelectedToolAction,
} from '../actions/selectedTool';
import { SET_STROKE_COLOR, SetStrokeColorAction } from '../actions/strokeColor';
import { selectedTool } from './selectedTool';
import { strokeColor } from './strokeColor';

export const initialState = {
    strokeColor: '#000000ff',
    selectedTool: 2,
};

export type RootAction = SetStrokeColorAction | SetSelectedToolAction;

export interface RootState {
    strokeColor: Color;
    selectedTool: number;
}

export const reducer = createReducer<RootState, RootAction>(initialState)
    .handleType(SET_STROKE_COLOR, strokeColor)
    .handleType(SET_SELECTED_TOOL, selectedTool);