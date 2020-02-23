import * as React from 'react';
import { CanvasRenderer } from './components/CanvasRenderer';
import { FrameCalculator } from './components/FrameCalculator';
import { KeyboardHandler } from './components/KeyboardHandler';

type Props = {
    active: boolean;

    fieldWidth: number;
    fieldHeigth: number;
    fieldGridSize: number;

    framesToSkipCount: number;

    onAppleEncounter: () => void;
    onObstacleEncounter: () => void;
};

export const View = (props: Props) => {
    return (
        <KeyboardHandler {...props}>
            {(handlerProps) => (
                <FrameCalculator {...handlerProps} {...props}>
                    {(frameProps) => (
                        <CanvasRenderer {...frameProps} {...props} />
                    )}
                </FrameCalculator>
            )}
        </KeyboardHandler>
    );
};
