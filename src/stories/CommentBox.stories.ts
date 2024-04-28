import type { Meta, StoryObj } from '@storybook/react';
import CommentBox from '@/components/content/CommentBox';

const meta = {
  title: 'UI/Comment Box',
  component: CommentBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CommentBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your comment here...',
    onCommentSubmit: async (comment: string) => {
      console.log('Comment submitted:', comment);
    },
    className: 'w-96',
  },
};
