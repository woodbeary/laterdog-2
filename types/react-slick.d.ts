declare module 'react-slick' {
  import React from 'react';

  export interface Settings {
    dots?: boolean;
    infinite?: boolean;
    speed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    autoplay?: boolean;
    autoplaySpeed?: number;
    cssEase?: string;
    pauseOnHover?: boolean;
    swipeToSlide?: boolean;
    draggable?: boolean;
    arrows?: boolean; // Add this line
    responsive?: Array<{
      breakpoint: number;
      settings: Settings;
    }>;
    onSwipe?: () => void;
    beforeChange?: (oldIndex: number, newIndex: number) => void;
    // Add any other settings you're using
  }

  export default class Slider extends React.Component<Settings & {
    children?: React.ReactNode;
  }> {
    slickNext(): void;
    slickPrev(): void;
    slickGoTo(slideNumber: number): void;
    slickPause(): void; // Add this line
    slickPlay(): void; // Add this line
  }
}