/**
 * test scenario for CommentBox component
 *
 * - CommentBox component function
 *  - should correctly render input
 *  - should handle user input correctly
 *  - should call onCommentSubmit when send comment button is clicked
 *
 */

import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import CommentBox from '@/components/content/CommentBox';

expect.extend(matchers);

describe('CommentBox Component', () => {
  afterEach(() => cleanup());

  it('should correctly render input', () => {
    // arrange
    render(<CommentBox onCommentSubmit={async () => {}} placeholder="test" />);
    const input = screen.getByPlaceholderText('test');

    // assert
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'test');
    expect(input).toHaveAttribute('name', 'comment');
  });

  it('should handle user input correctly', async () => {
    // arrange
    render(<CommentBox onCommentSubmit={async () => {}} placeholder="test" />);
    const input = screen.getByPlaceholderText('test');

    // action
    await userEvent.type(input, 'test comment');

    // assert
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('test comment');
  });

  it('should call onCommentSubmit when send comment button is clicked', async () => {
    // arrange
    const mockOnCommentSubmit = vi.fn();
    render(
      <CommentBox onCommentSubmit={mockOnCommentSubmit} placeholder="test" />,
    );
    const input = await screen.getByPlaceholderText('test');

    // action
    await userEvent.type(input, 'test comment');

    // assert
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('test comment');

    // arrange
    const button = await screen.getByRole('button', { name: 'Send Comment' });

    // action
    await userEvent.click(button);

    // assert
    expect(mockOnCommentSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnCommentSubmit).toHaveBeenCalledWith('test comment');
  });
});
