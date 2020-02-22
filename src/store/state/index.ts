import { SettingsState } from './settings';
import { GameState } from './game';

export type State = {
    game: GameState;
    settings: SettingsState;
};
