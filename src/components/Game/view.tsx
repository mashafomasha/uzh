import * as React from 'react';
import { FrameCalculator } from './components/FrameCalculator';
import { KeyboardHandler } from './components/KeyboardHandler';
import './styles.css';

type Props = {
    active: boolean;

    gridSize: number;
    fieldWidth: number;
    fieldHeigth: number;

    framesToSkipCount: number;

    onAppleEncounter: () => void;
    onObstacleEncounter: () => void;
};

export const View = (props: Props) => {
    const canvasRefObject = React.useRef<HTMLCanvasElement | null>(null);

    return (
        <KeyboardHandler {...props}>
            {(handlerProps) => (
                <FrameCalculator
                    {...props}
                    {...handlerProps}
                    canvasRefObject={canvasRefObject}
                >
                    <canvas
                        className="Canvas"
                        width={props.fieldWidth}
                        height={props.fieldHeigth}
                        ref={canvasRefObject}
                    ></canvas>
                </FrameCalculator>
            )}
        </KeyboardHandler>
    );
};
