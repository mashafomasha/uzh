import * as React from 'react';
import { SliderProps } from 'components/Slider';
import { SettingsState } from 'store/state/settings';

export type SliderId = keyof SettingsState;

export const sliders: SliderId[] = ['rows', 'columns', 'velocity'];

export const optionsBySliderId: {
    [key in SliderId]: SliderProps<number>;
} = {
    columns: {
        min: 10,
        max: 40,
        marks: getMarks(10, 40),
        label: (
            <>
                Число ячеек по горизонтали, <small>штук</small>
            </>
        ),
    },
    rows: {
        min: 10,
        max: 40,
        marks: getMarks(10, 40),
        label: (
            <>
                Число ячеек по вертикали, <small>штук</small>
            </>
        ),
    },
    velocity: {
        min: 15,
        max: 60,
        marks: getMarks(15, 60),
        label: (
            <>
                Скорость движения, <small>кадров в секунду</small>
            </>
        ),
    },
};

function getMarks(min: number, max: number) {
    return {
        [min]: min,
        [max]: max,
    };
}
