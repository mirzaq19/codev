import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import CategoryList from '@/components/layout/CategoryList';

expect.extend(matchers);

const categories = ['react', 'vue', 'angular'];

describe('CategoryList component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render category list corectly', async () => {
    // Arrange
    const handleClickCategory = async () => {};
    const activeCategory = 'react';
    render(
      <Router>
        <CategoryList
          activeCategory={activeCategory}
          categories={categories}
          onClickCategory={handleClickCategory}
        />
      </Router>,
    );
    const list = await screen.getByRole('list');
    const { getByText, getAllByRole } = within(list);
    const items = getAllByRole('link');
    const reactCategoryItem = getByText('#react');

    // Assert
    expect(items).toHaveLength(4);
    expect(items[0]).toBeInTheDocument();
    expect(items[0]).toHaveTextContent('All');
    expect(reactCategoryItem).toBeInTheDocument();
    expect(reactCategoryItem).toHaveTextContent('#react');
    expect(reactCategoryItem).toHaveAttribute('href', '/?category=react');
    expect(reactCategoryItem).toHaveClass('bg-primary text-primary-foreground');
  });

  it('should render category list corectly even categories are empty', async () => {
    // Arrange
    const handleClickCategory = async () => {};
    const activeCategory = 'react';
    render(
      <Router>
        <CategoryList
          activeCategory={activeCategory}
          categories={[]}
          onClickCategory={handleClickCategory}
        />
      </Router>,
    );
    const list = await screen.getByRole('list');
    const { getAllByRole } = within(list);
    const items = getAllByRole('link');

    // Assert
    expect(items).toHaveLength(1);
    expect(items[0]).toBeInTheDocument();
    expect(items[0]).toHaveTextContent('All');
  });

  it('should render correctly active category to all if activeCategory property is null', async () => {
    // Arrange
    const handleClickCategory = async () => {};
    render(
      <Router>
        <CategoryList
          activeCategory={null}
          categories={categories}
          onClickCategory={handleClickCategory}
        />
      </Router>,
    );
    const list = await screen.getByRole('list');
    const { getAllByRole } = within(list);
    const items = getAllByRole('link');

    // Assert
    expect(items).toHaveLength(4);
    expect(items[0]).toBeInTheDocument();
    expect(items[0]).toHaveTextContent('All');
    expect(items[0]).toHaveClass('bg-primary text-primary-foreground');
  });

  it('should render correctly and calling handle click category function', async () => {
    // Arrange
    const handleClickCategory = vi.fn();
    global.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
    render(
      <Router>
        <CategoryList
          activeCategory={null}
          categories={categories}
          onClickCategory={handleClickCategory}
        />
      </Router>,
    );
    const list = await screen.getByRole('list');
    const { getByRole } = within(list);
    const reactCategoryItem = getByRole('link', { name: '#react' });
    console.log(reactCategoryItem);

    // Action
    await userEvent.click(reactCategoryItem);

    // Assert;
    expect(reactCategoryItem).toHaveTextContent('#react');
    expect(handleClickCategory).toBeCalledWith('react');
  });
});
