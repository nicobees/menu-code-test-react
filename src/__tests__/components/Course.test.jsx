import React from 'react';
import { render, screen } from '@testing-library/react';

import { Course } from '../../components';
import mockedData from '../shared/contexts/menuMockedData.json';

beforeEach(() => {
  jest.restoreAllMocks();
});

describe('Course component', () => {
  it('throws an error if `courseName` is missing in props', () => {
    jest.spyOn(console, 'error').mockImplementation(() => jest.fn());

    expect(() => render(<Course></Course>)).toThrow;
  });

  it('renders a specific empty message if no dishes are in the course', () => {
    render(<Course courseName={'mains'}></Course>);

    expect(screen.getByText(/There aren't dishes for this course/i)).toBeInTheDocument();
  });

  it('renders a list of Dishes when these are passed as props', () => {
    const courseName = 'mains';
    const mockedDishes = mockedData[courseName].dishes;

    render(<Course courseName={courseName} dishes={mockedDishes}></Course>);

    expect(screen.queryByText(/There aren't dishes for this course/i)).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: new RegExp(courseName, 'i') })).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockedDishes[0].name, 'i'))).toBeInTheDocument();
  });
});
