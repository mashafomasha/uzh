import * as React from 'react';
import { Slider as ASlider } from 'antd';
import { SliderProps, SliderValue } from 'antd/lib/slider';
import './styles.css';

type Props<T extends SliderValue> = Omit<SliderProps, 'onChange'> & {
    id: string;
    label?: React.ReactNode;
    onChange?: (value: T) => void;
};

const debounceTimeout = 300;

export function Slider<T extends SliderValue>({
    id,
    label,
    onChange,
    ...sliderProps
}: Props<T>) {
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
            {label && <label htmlFor={id}>{label}</label>}
            <div className="Input">
                <ASlider
                    {...sliderProps}
                    id={id}
                    value={value}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}
