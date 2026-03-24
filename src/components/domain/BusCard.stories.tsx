import type { Meta, StoryObj } from '@storybook/react-vite'
import { BusCard } from './BusCard'

const meta = {
  // 카탈로그의 카테고리를 'Domain'으로 분류합니다.
  title: 'Domain/BusCard',
  component: BusCard,
  tags: ['autodocs'],
  // 💡 모바일 화면처럼 보이도록 카드의 최대 너비를 제한하는 래퍼(Wrapper)를 씌웁니다.
  decorators: [
    (Story) => (
      <div className="max-w-sm w-full bg-gray-50 p-4 rounded-xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BusCard>

export default meta
type Story = StoryObj<typeof meta>

// 케이스 1: 일반적인 대기 상황
export const Normal: Story = {
  args: {
    busNumber: '146',
    destination: '강남역 방면',
    arrivalTime: '5',
    status: '여유',
  },
}

// 케이스 2: 곧 도착 & 혼잡 상황
export const ArrivingSoon: Story = {
  args: {
    busNumber: '마을 03',
    destination: '시청 방면',
    arrivalTime: '곧 도착',
    status: '혼잡',
  },
}
