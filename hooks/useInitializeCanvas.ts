import { Canvas } from "fabric/fabric-impl";
import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { useAppSelector } from "@/config/store";

const useInitializeCanvas = () => {
  const [canvas, setCanvas] = useState<Canvas>();
  const tableCanvas = useRef<HTMLCanvasElement>(null);
  const tableCanvasWrapper = useRef<HTMLDivElement>(null);
  const auth = useAppSelector((state) => state.authentication);

  useEffect(() => {
    if (
      !tableCanvas.current ||
      !tableCanvasWrapper.current ||
      !auth.isInitialized
    )
      return;

    const canvasHeight =
      tableCanvasWrapper?.current?.getBoundingClientRect().height;
    const canvasWidth =
      tableCanvasWrapper?.current?.getBoundingClientRect().width;

    const fabricInstance = new fabric.Canvas(tableCanvas.current, {
      height: canvasHeight,
      width: canvasWidth,
    });

    setCanvas(fabricInstance);
    fabricInstance.renderAll();
  }, [tableCanvas, tableCanvasWrapper, auth.isInitialized]);

  return [tableCanvas, tableCanvasWrapper, canvas] as const;
};

export default useInitializeCanvas;
