import {
  useEffect,
  useMemo,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import * as QRCode from "qrcode";

export interface QRPosterProps {
  url: string;
  title: string;
  size?: number;          // PNG export size (default 3840)
  maxPreviewWidth?: number; // Max preview width in CSS px (default 400)
  padding?: number;       // Card padding for PNG export
  radius?: number;        // Card corner radius for PNG export
  qrMargin?: number;      // Quiet zone around QR code
  showFooter?: boolean;   // Show footer text below QR
  footerText?: string;    // Footer text content
  filename?: string;      // PNG filename when downloading
  shadow?: boolean;       // Show soft shadow under card
  withDownloadButton?: boolean; // Show download button below preview
}

export interface QRPosterHandle {
  download: () => Promise<void>;
}

const QRPoster = forwardRef<QRPosterHandle, QRPosterProps>(function QRPoster(
  {
    url,
    title,
    size = 3840,
    maxPreviewWidth = 400,
    padding = 120,
    radius = 120,
    qrMargin = 2,
    showFooter = true,
    footerText = "Scan me",
    filename,
    shadow = true,
    withDownloadButton = false,
  },
  ref
) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const downloadName = useMemo(() => {
    if (filename) return filename;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return `${slug}-qr-4k.png`;
  }, [filename, title]);

  function roundRectPath(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ) {
    const rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
  }

  function fitTitleFont(
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number,
    basePx: number,
    minPx: number
  ) {
    let sz = basePx;
    ctx.font = `bold ${sz}px 'Segoe UI', Arial, sans-serif`;
    while (ctx.measureText(text).width > maxWidth && sz > minPx) {
      sz -= 2;
      ctx.font = `bold ${sz}px 'Segoe UI', Arial, sans-serif`;
    }
    return sz;
  }

  async function drawPoster(canvas: HTMLCanvasElement, targetSize: number): Promise<void> {
    const scale = targetSize / size;

    const extraHeightBase = 800;
    const targetHeight = Math.round(targetSize + extraHeightBase * scale);

    canvas.width = targetSize;
    canvas.height = targetHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context not available");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const paddingPx = padding * scale;
    const radiusPx = radius * scale;
    const titleAreaPx = 260 * scale;
    const footerAreaPx = (showFooter ? 220 : 0) * scale;

    const qrTarget = Math.round(targetSize * (1 - 1200 / size));

    const qrCanvas = document.createElement("canvas");
    await QRCode.toCanvas(qrCanvas, url, {
      width: qrTarget,
      margin: qrMargin,
      errorCorrectionLevel: "H",
      color: { dark: "#000000", light: "#FFFFFF" },
    });

    const cardInnerWidth = qrCanvas.width;
    const cardWidth = cardInnerWidth + paddingPx * 2;
    const cardHeight = paddingPx + titleAreaPx + cardInnerWidth + footerAreaPx + paddingPx;

    const cardX = (canvas.width - cardWidth) / 2;
    const cardY = (canvas.height - cardHeight) / 2;

    ctx.save();
    roundRectPath(ctx, cardX, cardY, cardWidth, cardHeight, radiusPx);
    if (shadow) {
      ctx.shadowColor = "rgba(0,0,0,0.12)";
      ctx.shadowBlur = Math.max(1, 50 * scale);
    }
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.restore();

    const titleMaxWidth = cardWidth - paddingPx * 2;
    const fittedPx = fitTitleFont(ctx, title, titleMaxWidth, 180 * scale, 90 * scale);
    ctx.fillStyle = "#111111";
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.font = `bold ${fittedPx}px 'Segoe UI', Arial, sans-serif`;
    const titleBaseline = cardY + paddingPx + fittedPx;
    ctx.fillText(title, cardX + cardWidth / 2, titleBaseline);

    const qrX = cardX + paddingPx;
    const qrY = cardY + paddingPx + titleAreaPx;

    const qrCornerRadius = Math.max(20 * scale, 24 * scale);
    ctx.save();
    roundRectPath(ctx, qrX, qrY, cardInnerWidth, cardInnerWidth, qrCornerRadius);
    ctx.clip();
    ctx.drawImage(qrCanvas, qrX, qrY);
    ctx.restore();

    if (showFooter) {
      ctx.font = `bold ${Math.round(150 * scale)}px 'Segoe UI', Arial, sans-serif`;
      ctx.fillStyle = "#333333";
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";
      const footerBaseline = cardY + cardHeight - paddingPx / 2;
      ctx.fillText(footerText, cardX + cardWidth / 2, footerBaseline);
    }
  }

  // Draw preview once on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const cssWidth = Math.min(maxPreviewWidth, canvas.parentElement?.clientWidth || maxPreviewWidth);
    const logical = Math.round(cssWidth * dpr);

    drawPoster(canvas, logical).catch(console.error);
    canvas.style.width = `${cssWidth}px`;
    canvas.style.height = "auto";
  }, [url, title, size, padding, radius, qrMargin, showFooter, footerText, shadow, maxPreviewWidth]);

  async function download() {
    const off = document.createElement("canvas");
    await drawPoster(off, size);
    return new Promise<void>((resolve) => {
      off.toBlob((blob) => {
        if (!blob) return resolve();
        const urlObj = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = urlObj;
        a.download = downloadName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(urlObj);
        resolve();
      }, "image/png");
    });
  }

  useImperativeHandle(ref, () => ({ download }), [download]);

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <canvas ref={canvasRef} />
      {withDownloadButton && (
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12 }}>
          <button className="btn" onClick={download}>Download PNG (4K)</button>
        </div>
      )}
    </div>
  );
});

export default QRPoster;
