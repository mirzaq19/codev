import type { Meta, StoryObj } from '@storybook/react';
import LeaderboardSkeleton from '@/components/skeleton/LeaderboardSkeleton';

const meta = {
  title: 'UI/LeaderboardSkeleton',
  component: LeaderboardSkeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LeaderboardSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThreeRow: Story = {
  args: {
    row: 3,
    className: 'w-[42rem]',
  },
};
