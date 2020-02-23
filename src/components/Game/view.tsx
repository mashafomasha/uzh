import * as React from 'react';
import { CanvasRenderer } from '../CanvasRenderer';
import { FrameCalculator } from '../FrameCalculator';
import { KeyboardHandler } from '../KeyboardHandler';

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
