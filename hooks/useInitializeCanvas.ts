import { Canvas } from "fabric/fabric-impl";
import { useEffect, useRef } from "react";
import { fabric } from "fabric";

const useInitializeCanvas = (
  canvas: Canvas | null,
  setCanvas: (data: Canvas) => void
) => {
  const tableCanvas = useRef<HTMLCanvasElement>(null);
  const tableCanvasWrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tableCanvas.current && !tableCanvasWrapper.current) return;

    const canvasEl = document.querySelector(".canvas-container");

    if (!canvas && !canvasEl) {
      console.log("CANVAS", canvas);
      // const canvasHeight =
      //   tableCanvasWrapper?.current?.getBoundingClientRect().height;
      // const canvasWidth =
      //   tableCanvasWrapper?.current?.getBoundingClientRect().width;

      const canvasHeight = 640;
      const canvasWidth = 1280;

      const fabricInstance = new fabric.Canvas(tableCanvas.current, {
        height: canvasHeight,
        width: canvasWidth,
      });

      setCanvas(fabricInstance);
      fabricInstance.renderAll();
    }
  }, [tableCanvas.current, tableCanvasWrapper.current, canvas]);

  return [tableCanvas, tableCanvasWrapper] as const;
};

export default useInitializeCanvas;
