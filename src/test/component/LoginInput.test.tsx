/**
 * test scenario for LoginInput component
 *
 * - LoginInput component function
 *  - should render category list corectly
 *  - should handle password typing correctly
 *  - should call login function when login button is clicked
 *
 */

import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginInput from '@/components/content/LoginInput';

expect.extend(matchers);

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    const handleLogin = async () => {};
    render(
      <Router>
        <LoginInput handleLogin={handleLogin} />
      </Router>,
    );
    const emailInput = await screen.getByPlaceholderText('email');

    // Action
    await userEvent.type(emailInput, 'john@gmail.com');

    // Assert
    expect(emailInput).toHaveValue('john@gmail.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    const handleLogin = async () => {};
    render(
      <Router>
        <LoginInput handleLogin={handleLogin} />
      </Router>,
    );
    const passwordInput = await screen.getByPlaceholderText('password');

    // Action
    await userEvent.type(passwordInput, 'password123');

    // Assert
    expect(passwordInput).toHaveValue('password123');
  });

  it('should call login function when login button is clicked', async () => {
    // Arrange
    const mockLogin = vi.fn();
    render(
      <Router>
        <LoginInput handleLogin={mockLogin} />
      </Router>,
    );
    const emailInput = await screen.getByPlaceholderText('email');
    await userEvent.type(emailInput, 'john@gmail.com');
    const passwordInput = await screen.getByPlaceholderText('password');
    await userEvent.type(passwordInput, 'password123');
    const loginButton = await screen.getByRole('button', { name: 'Login' });

    // Action
    await userEvent.click(loginButton);

    // Assert
    expect(mockLogin).toBeCalledWith('john@gmail.com', 'password123');
  });
});
