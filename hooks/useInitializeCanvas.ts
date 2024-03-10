import { Canvas } from "fabric/fabric-impl";
import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { useAppSelector } from "@/config/store";

const useInitializeCanvas = (
  canvas: Canvas | null,
  setCanvas: (data: Canvas) => void
) => {
  const tableCanvas = useRef<HTMLCanvasElement>(null);
  const tableCanvasWrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(tableCanvas, tableCanvasWrapper, " TABLECANVAS");
    if (tableCanvas.current && tableCanvasWrapper.current && !canvas) {
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
