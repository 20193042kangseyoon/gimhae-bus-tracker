import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './Badge'

// Storybook 카탈로그 기본 설정
const meta = {
  title: 'Common/Badge',
  component: Badge,
  tags: ['autodocs'], // 자동 문서화 기능 활성화
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

// 각각의 상태별 렌더링 테스트 케이스 (Stories)
export const Relaxed: Story = {
  args: {
    status: '여유',
  },
}

export const Normal: Story = {
  args: {
    status: '보통',
  },
}

export const Crowded: Story = {
  args: {
    status: '혼잡',
  },
}
