import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "../../ThemeProvider";
import { PhotoSlideshowCard } from "./PhotoSlideshowCard";

const meta: Meta<typeof PhotoSlideshowCard> = {
  title: "Cards/PhotoSlideshowCard",
  component: PhotoSlideshowCard,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: "20px", background: "#f5f5f5", minHeight: "100vh" }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    autoPlay: { control: "boolean" },
    interval: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Photo Slideshow",
    autoPlay: true,
    interval: 3000,
  },
};

export const CustomPhotos: Story = {
  args: {
    title: "Vacation Photos",
    autoPlay: true,
    interval: 5000,
    photos: [
      {
        id: "1",
        url: "https://picsum.photos/400/300?random=10",
        title: "Beach Sunset",
        description: "Beautiful sunset at the beach",
      },
      {
        id: "2",
        url: "https://picsum.photos/400/300?random=11",
        title: "Mountain View",
        description: "Stunning mountain landscape",
      },
      {
        id: "3",
        url: "https://picsum.photos/400/300?random=12",
        title: "City Lights",
        description: "Night cityscape",
      },
    ],
  },
};

export const NoAutoPlay: Story = {
  args: {
    title: "Manual Slideshow",
    autoPlay: false,
    interval: 3000,
  },
};
