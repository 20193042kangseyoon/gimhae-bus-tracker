import type { Meta, StoryObj } from '@storybook/react-vite'
import { Timer } from './Timer'

const meta = {
  title: 'Common/Timer',
  component: Timer,
  tags: ['autodocs'],
} satisfies Meta<typeof Timer>

export default meta
type Story = StoryObj<typeof meta>

// 테스트 케이스 1: 방금 전
export const JustNow: Story = {
  args: {
    timeText: '방금 전 업데이트',
  },
}

// 테스트 케이스 2: 1분 전
export const OneMinuteAgo: Story = {
  args: {
    timeText: '1분 전 업데이트',
  },
}

// 테스트 케이스 3: 5분 이상 경과 (경고 느낌을 주고 싶을 때를 대비한 텍스트)
export const FiveMinutesAgo: Story = {
  args: {
    timeText: '5분 전 업데이트',
  },
}
