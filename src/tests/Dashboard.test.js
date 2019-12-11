import React from 'react'
import { render, fireEvent, waitForElement, findByRole } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import axiosMock from 'axios'
import Dashboard from '../views/Dashboard/Dashboard.js';
import { tsExternalModuleReference } from '@babel/types';
import { get } from 'http';

test('creat a new event', async () => {
    const jsdomAlert = window.alert;
    window.alert = () => {};


    const creatingEventTest = jest.fn();

    const { getByText } = render(
    <Dashboard 
    creatingEventTest={creatingEventTest}
    />)

    expect(getByText('Create New Event')).toBeInTheDocument()

    fireEvent.click(getByText('Create New Event'))
    expect(creatingEventTest).toHaveBeenCalledTimes(1)
})