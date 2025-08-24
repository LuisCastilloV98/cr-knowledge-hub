import Lightbox from "yet-another-react-lightbox";
import type { SlideImage } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import { withBase } from "../utils/withBase";

export type LightboxImage =
  | string
  | {
      src: string;
      alt?: string;
      title?: string;
    };

type Props = {
  open: boolean;
  index: number;
  images: LightboxImage[];
  onClose: () => void;
  zoomMaxPixelRatio?: number;
  closeOnBackdropClick?: boolean;
};

export default function LightboxViewer({
  open,
  index,
  images,
  onClose,
  zoomMaxPixelRatio = 2.5,
  closeOnBackdropClick = true,
}: Props) {
  const slides: SlideImage[] = images.map((img) =>
    typeof img === "string"
      ? { src: withBase(img) }
      : { src: withBase(img.src), alt: img.alt, title: img.title }
  );

  return (
    <Lightbox
      open={open}
      close={onClose}
      index={index}
      slides={slides}
      plugins={[Zoom, Fullscreen]}
      controller={{ closeOnBackdropClick }}
      zoom={{
        maxZoomPixelRatio: zoomMaxPixelRatio,
        scrollToZoom: true,
      }}
      render={{
        slide: ({ slide }) => (
          <img
            src={slide.src as string}
            alt={(slide as any).alt ?? ""}
            style={{
              maxWidth: "100%",
              maxHeight: "90vh",
              margin: "auto",
              display: "block",
              objectFit: "contain",
              borderRadius: 12,
              background: "#111",
            }}
          />
        ),
      }}
    />
  );
}
