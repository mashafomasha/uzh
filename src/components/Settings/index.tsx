import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { settingsSelector } from 'store/selectors';
import { setRows, setColumns, setVelocity } from 'store/actions/settings';
import { Slider } from 'components/Slider';
import { sliders, optionsBySliderId, SliderId } from './options';
import './styles.css';

type SettingsProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = createSelector(settingsSelector, (valueById) => ({
    valueById,
}));

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onChange: (sliderId: SliderId, value: number) => {
        switch (sliderId) {
            case 'rows':
                return dispatch(setRows(value));
            case 'columns':
                return dispatch(setColumns(value));
            case 'velocity':
                return dispatch(setVelocity(value));
        }
    },
});

export const Settings = connect(
    mapStateToProps,
    mapDispatchToProps,
)(({ onChange, valueById }: SettingsProps) => (
    <div className="Settings">
        {sliders.map((sliderId) => {
            const options = optionsBySliderId[sliderId];
            const value = valueById[sliderId];

            return (
                <Slider
                    id={sliderId}
                    key={sliderId}
                    value={value}
                    onChange={(value) => onChange(sliderId, value)}
                    {...options}
                />
            );
        })}
    </div>
));
