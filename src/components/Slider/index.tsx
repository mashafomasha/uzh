import * as React from 'react';
import { Slider as AntdSlider } from 'antd';
import { SliderProps as AntdSliderProps, SliderValue } from 'antd/lib/slider';
import './styles.css';

export type SliderProps<T extends SliderValue> = Omit<
    AntdSliderProps,
    'onChange'
> & {
    label?: React.ReactNode;
    onChange?: (value: T) => void;
};

const debounceTimeout = 300;

export function Slider<T extends SliderValue>({
    id,
    label,
    onChange,
    ...sliderProps
}: SliderProps<T>) {
    const timeout = React.useRef<number | undefined>();
    const [value, setValue] = React.useState(sliderProps.value);
    const handleChange = React.useCallback(
        (newValue) => {
            setValue(newValue);

            if (onChange) {
                timeout.current && window.clearTimeout(timeout.current);
                timeout.current = window.setTimeout(() => {
                    onChange(newValue);
                }, debounceTimeout);
            }
        },
        [onChange],
    );

    return (
        <div className="Slider">
            {label && <label>{label}</label>}
            <div className="Input">
                <AntdSlider
                    {...sliderProps}
                    value={value}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}
