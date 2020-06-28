import React from 'react';
import { render } from '@testing-library/react';
import { App } from './';

test('renders', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/Управляй при помощи стрелок/i);
    expect(linkElement).toBeInTheDocument();
});
