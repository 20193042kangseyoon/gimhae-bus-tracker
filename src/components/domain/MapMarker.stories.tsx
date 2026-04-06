import type { Meta, StoryObj } from '@storybook/react-vite'
import { MapMarker } from './MapMarker'

const meta = {
  title: 'Domain/MapMarker',
  component: MapMarker,
  tags: ['autodocs'],
  // 지도 위에 떠 있는 것처럼 보이도록, 바탕을 연한 파란색으로 깔아줍니다.
  decorators: [
    (Story) => (
      <div className="p-10 bg-blue-50 flex justify-center items-center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MapMarker>

export default meta
type Story = StoryObj<typeof meta>

export const Relaxed: Story = {
  args: {
    busNumber: '146',
    status: '여유',
  },
}

export const Normal: Story = {
  args: {
    busNumber: '1',
    status: '보통',
  },
}

export const Crowded: Story = {
  args: {
    busNumber: '마을 03',
    status: '혼잡',
  },
}
