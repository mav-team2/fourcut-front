import React, { useState, useRef } from "react";
import { Rnd } from "react-rnd";

// 이미지 객체 인터페이스 정의
interface ImageObject {
  id: number;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}

const App = () => {
  // 업로드된 이미지 정보를 저장합니다.
  const [images, setImages] = useState<ImageObject[]>([]);
  // 이미지의 z-index 관리를 위한 최대값 상태
  const [maxZIndex, setMaxZIndex] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // 이미지 파일을 업로드할 때 FileReader로 data URL로 변환 후 상태에 추가합니다.
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImages((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            src: ev.target?.result as string,
            x: 50, // 기본 시작 위치
            y: 50,
            width: 200, // 기본 크기
            height: 200,
            zIndex: maxZIndex,
          },
        ]);
        setMaxZIndex((prev) => prev + 1);
      };
      reader.readAsDataURL(file);
    });
    // 같은 파일을 다시 업로드할 수 있도록 초기화
    e.target.value = "";
  };

  // 이미지를 클릭하면 해당 이미지의 z-index를 최대값으로 올려 최상단에 표시합니다.
  const bringToFront = (id: number) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, zIndex: maxZIndex } : img))
    );
    setMaxZIndex((prev) => prev + 1);
  };

  // export 버튼 클릭 시, 모든 이미지의 bounding box를 계산해 canvas에 그린 후 PNG로 다운로드합니다.
  const handleExport = async () => {
    if (images.length === 0) return;

    // 각 이미지의 위치와 크기를 바탕으로 bounding box 계산
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;
    images.forEach((img) => {
      minX = Math.min(minX, img.x);
      minY = Math.min(minY, img.y);
      maxX = Math.max(maxX, img.x + img.width);
      maxY = Math.max(maxY, img.y + img.height);
    });
    const exportWidth = maxX - minX;
    const exportHeight = maxY - minY;

    // canvas 생성 및 흰색 배경 채우기
    const canvas = document.createElement("canvas");
    canvas.width = exportWidth;
    canvas.height = exportHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, exportWidth, exportHeight);

    // z-index 낮은 순서대로 그리기
    const sortedImages = [...images].sort((a, b) => a.zIndex - b.zIndex);
    for (const imgObj of sortedImages) {
      await new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          // 이미지의 원래 위치를 bounding box 기준 좌표로 변환하여 그리기
          ctx.drawImage(
            img,
            imgObj.x - minX,
            imgObj.y - minY,
            imgObj.width,
            imgObj.height
          );
          resolve();
        };
        img.src = imgObj.src;
      });
    }

    // canvas를 PNG Data URL로 변환 후 다운로드
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "exported_image.png";
    link.href = dataURL;
    link.click();
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* 버튼 영역 */}
      <button onClick={() => document.getElementById("fileInput")?.click()}>
        Image Import
      </button>
      <button onClick={handleExport}>Export</button>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        multiple
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />

      {/* 작업 영역: 흰 배경의 컨테이너 */}
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "80vh",
          marginTop: "20px",
          position: "relative",
          background: "#fff",
          border: "1px solid #ccc",
        }}
      >
        {images.map((img) => (
          <Rnd
            key={img.id}
            size={{ width: img.width, height: img.height }}
            position={{ x: img.x, y: img.y }}
            onDragStop={(e, d) => {
              setImages((prev) =>
                prev.map((item) =>
                  item.id === img.id ? { ...item, x: d.x, y: d.y } : item
                )
              );
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
              setImages((prev) =>
                prev.map((item) =>
                  item.id === img.id
                    ? {
                        ...item,
                        width: ref.offsetWidth,
                        height: ref.offsetHeight,
                        x: position.x,
                        y: position.y,
                      }
                    : item
                )
              );
            }}
            style={{
              zIndex: img.zIndex,
              border: "1px dashed #000",
            }}
            onMouseDown={() => bringToFront(img.id)}
          >
            <img
              src={img.src}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                userSelect: "none",
              }}
            />
          </Rnd>
        ))}
      </div>
    </div>
  );
};

export default App;
