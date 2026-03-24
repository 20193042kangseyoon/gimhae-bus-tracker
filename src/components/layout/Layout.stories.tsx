import type { Meta, StoryObj } from '@storybook/react-vite'
import { Layout } from './Layout'
// 우리가 만든 부품들을 불러옵니다!
import { BusCard } from '../domain/BusCard'
import { SkeletonBusCard } from '../domain/SkeletonBusCard'

const meta = {
  title: 'Layout/MainLayout',
  component: Layout,
  tags: ['autodocs'],
  parameters: {
    // 레이아웃 전체를 봐야 하므로 스토리북의 기본 여백(Padding)을 제거합니다.
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Layout>

export default meta
type Story = StoryObj<typeof meta>

// 테스트 케이스: 레이아웃 안에 버스 카드 목록을 넣었을 때
export const Default: Story = {
  args: {
    children: (
      // 카드들이 세로로 나열되도록 간격(gap-4)을 줍니다.
      <div className="flex flex-col gap-4">
        <BusCard busNumber="146" destination="강남역 방면" arrivalTime="5" status="여유" />
        <BusCard busNumber="마을 03" destination="시청 방면" arrivalTime="곧 도착" status="혼잡" />
        {/* 로딩 중인 뼈대 카드도 같이 넣어봅니다 */}
        <SkeletonBusCard />
        <SkeletonBusCard />
      </div>
    ),
  },
}
