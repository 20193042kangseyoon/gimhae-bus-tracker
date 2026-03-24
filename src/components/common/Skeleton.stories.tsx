import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton } from './Skeleton'

const meta = {
  title: 'Common/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

// 케이스 1: 글자 모양 뼈대 (가로로 길고 높이가 낮음)
export const TextLine: Story = {
  args: {
    className: 'w-48 h-4 rounded',
  },
}

// 케이스 2: 동그란 프로필 모양 뼈대
export const CircleAvatar: Story = {
  args: {
    className: 'w-12 h-12 rounded-full',
  },
}

// 케이스 3: 큼직한 카드 모양 뼈대
export const CardBody: Story = {
  args: {
    className: 'w-full h-32 rounded-xl',
  },
}
