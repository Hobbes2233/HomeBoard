import { useState, useEffect } from "react";
import { Row } from "../../Shared/Row";
import { Column } from "../../Shared/Column";
import { css } from "@emotion/react";

export interface Photo {
  id: string;
  url: string;
  title?: string;
  description?: string;
}

export interface PhotoSlideshowCardProps {
  title?: string;
  photos?: Photo[];
  autoPlay?: boolean;
  interval?: number;
  cssStyles?: string;
}

export function PhotoSlideshowCard({
  title = "Photo Slideshow",
  photos = [],
  autoPlay = true,
  interval = 3000,
  cssStyles,
}: PhotoSlideshowCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || photos.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, photos.length, interval]);

  const nextPhoto = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };

  const goToPhoto = (index: number) => {
    setCurrentIndex(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Default placeholder photos if none provided
  const defaultPhotos: Photo[] = [
    {
      id: "1",
      url: "https://picsum.photos/400/300?random=1",
      title: "Sample Photo 1",
      description: "Beautiful landscape",
    },
    {
      id: "2",
      url: "https://picsum.photos/400/300?random=2",
      title: "Sample Photo 2",
      description: "City skyline",
    },
    {
      id: "3",
      url: "https://picsum.photos/400/300?random=3",
      title: "Sample Photo 3",
      description: "Nature scene",
    },
  ];

  const displayPhotos = photos.length > 0 ? photos : defaultPhotos;
  const currentPhoto = displayPhotos[currentIndex];

  return (
    <div
      css={css`
        background: white;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        ${cssStyles}
      `}
    >
      <div
        css={css`
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 16px;
          color: #333;
        `}
      >
        {title}
      </div>
      <Column gap="12px">
        {/* Photo display area */}
        <div
          css={css`
            position: relative;
            width: 100%;
            height: 300px;
            border-radius: 8px;
            overflow: hidden;
            background-color: #f8f9fa;
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          {currentPhoto ? (
            <>
              <img
                src={currentPhoto.url}
                alt={currentPhoto.title || "Photo"}
                css={css`
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                `}
              />
              {/* Photo info overlay */}
              {(currentPhoto.title || currentPhoto.description) && (
                <div
                  css={css`
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
                    color: white;
                    padding: 16px;
                  `}
                >
                  {currentPhoto.title && (
                    <div
                      css={css`
                        font-weight: bold;
                        margin-bottom: 4px;
                      `}
                    >
                      {currentPhoto.title}
                    </div>
                  )}
                  {currentPhoto.description && (
                    <div
                      css={css`
                        font-size: 14px;
                        opacity: 0.9;
                      `}
                    >
                      {currentPhoto.description}
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div
              css={css`
                text-align: center;
                color: #666;
                font-style: italic;
              `}
            >
              No photos available
            </div>
          )}
        </div>

        {/* Navigation controls */}
        {displayPhotos.length > 1 && (
          <>
            {/* Previous/Next buttons */}
            <Row gap="8px" justifyContent="center" alignItems="center">
              <button
                onClick={prevPhoto}
                css={css`
                  padding: 8px 12px;
                  background-color: #007bff;
                  color: white;
                  border: none;
                  border-radius: 4px;
                  cursor: pointer;
                  font-size: 14px;
                  &:hover {
                    background-color: #0056b3;
                  }
                `}
              >
                ← Previous
              </button>

              <button
                onClick={togglePlayPause}
                css={css`
                  padding: 8px 12px;
                  background-color: ${isPlaying ? "#dc3545" : "#28a745"};
                  color: white;
                  border: none;
                  border-radius: 4px;
                  cursor: pointer;
                  font-size: 14px;
                  min-width: 80px;
                  &:hover {
                    background-color: ${isPlaying ? "#c82333" : "#218838"};
                  }
                `}
              >
                {isPlaying ? "Pause" : "Play"}
              </button>

              <button
                onClick={nextPhoto}
                css={css`
                  padding: 8px 12px;
                  background-color: #007bff;
                  color: white;
                  border: none;
                  border-radius: 4px;
                  cursor: pointer;
                  font-size: 14px;
                  &:hover {
                    background-color: #0056b3;
                  }
                `}
              >
                Next →
              </button>
            </Row>

            {/* Photo indicators */}
            <Row gap="4px" justifyContent="center">
              {displayPhotos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPhoto(index)}
                  css={css`
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    border: none;
                    background-color: ${index === currentIndex ? "#007bff" : "#ddd"};
                    cursor: pointer;
                    transition: background-color 0.2s;
                    &:hover {
                      background-color: ${index === currentIndex ? "#0056b3" : "#bbb"};
                    }
                  `}
                />
              ))}
            </Row>

            {/* Photo counter */}
            <div
              css={css`
                text-align: center;
                font-size: 12px;
                color: #666;
              `}
            >
              {currentIndex + 1} of {displayPhotos.length}
            </div>
          </>
        )}
      </Column>
    </div>
  );
}
