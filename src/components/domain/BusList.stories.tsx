import type { Meta, StoryObj } from '@storybook/react-vite'
import { BusList } from './BusList'

const meta = {
  title: 'Domain/BusList',
  component: BusList,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="w-96 h-[600px] bg-white p-4 border border-gray-200 rounded-xl overflow-y-auto shadow-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BusList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    busLocations: [
      { vehId: '1001', plateNo: '경남71자 1001', lat: 35.2285, lng: 128.8894 },
      { vehId: '1002', plateNo: '경남71자 1002', lat: 35.229, lng: 128.8899 },
      { vehId: '1003', plateNo: '경남71자 1003', lat: 35.23, lng: 128.8905 },
    ],
  },
}

export const Empty: Story = {
  args: {
    busLocations: [],
  },
}
