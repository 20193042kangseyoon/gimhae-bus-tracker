import type { Meta, StoryObj } from '@storybook/react-vite'
import { SkeletonBusCard } from './SkeletonBusCard'

const meta = {
  title: 'Domain/SkeletonBusCard',
  component: SkeletonBusCard,
  tags: ['autodocs'],
  // 실제 스마트폰에서 보는 것처럼 너비를 제한해 줍니다.
  decorators: [
    (Story) => (
      <div className="max-w-sm w-full bg-gray-50 p-4 rounded-xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SkeletonBusCard>

export default meta
type Story = StoryObj<typeof meta>

// 스켈레톤 카드는 상태가 하나뿐이므로 기본 케이스 하나만 만듭니다.
export const Default: Story = {}
