import * as React from 'react';
import { connect } from 'react-redux';
import { settingsSelector } from 'store/selectors';
import { SettingsState } from 'store/state/settings';
import { setRows, setColumns, setVelocity } from 'store/actions/settings';
import { Slider } from 'components/Slider';
import './styles.css';

type SettingsProps = SettingsState & typeof mapDispatchToProps;

const mapDispatchToProps = {
    changeRowCount: setRows,
    changeColumnsCount: setColumns,
    changeVelocity: setVelocity,
};

export const Settings = connect(
    settingsSelector,
    mapDispatchToProps,
)(
    ({
        rows,
        columns,
        velocity,
        changeRowCount,
        changeColumnsCount,
        changeVelocity,
    }: SettingsProps) => (
        <div className="Settings">
            <h3 className="Title">Настройки</h3>
            <Slider
                id="columns"
                min={50}
                max={100}
                value={columns}
                onChange={changeColumnsCount}
                tooltipVisible
                label="Число ячеек по горизонтали"
            />
            <Slider
                id="rows"
                min={50}
                max={100}
                value={rows}
                onChange={changeRowCount}
                tooltipVisible
                label="Число ячеек по вертикали"
            />
            <Slider
                id="velocity"
                min={15}
                max={60}
                value={velocity}
                onChange={changeVelocity}
                tooltipVisible
                label="Скорость движения"
            />
        </div>
    ),
);
