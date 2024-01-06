import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AddSquare, AddCircle } from "solar-icon-set";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import AddTableDrawer from "@/components/addTableDrawer/AddTableDrawer";
import DashboardLayout from "@/components/layout/DashboardLayout";
import InitialLoading from "@/components/initialLoading/InitialLoading";
import { useAppDispatch, useAppSelector } from "@/config/store";
import useInitializeCanvas from "@/hooks/useInitializeCanvas";
import createTable from "@/lib/canvas";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFetchProfileQuery } from "@/api/users";
import { skipToken } from "@reduxjs/toolkit/query";
import {
  floorApi,
  useAddFloorMutation,
  useFetchFloorsQuery,
  useUpdateFloorMutation,
} from "@/api/floor";

import { ApiError } from "@/types/api";
import { getFloorName } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

const InitialTable = {
  version: "5.3.0",
  objects: [
    {
      type: "group",
      version: "5.3.0",
      originX: "left",
      originY: "top",
      left: 570,
      top: 55,
      width: 371,
      height: 171,
      fill: "rgb(0,0,0)",
      stroke: null,
      strokeWidth: 0,
      strokeDashArray: null,
      strokeLineCap: "butt",
      strokeDashOffset: 0,
      strokeLineJoin: "miter",
      strokeUniform: false,
      strokeMiterLimit: 4,
      scaleX: 1,
      scaleY: 1,
      angle: 0,
      flipX: false,
      flipY: false,
      opacity: 1,
      shadow: null,
      visible: true,
      backgroundColor: "",
      fillRule: "nonzero",
      paintFirst: "fill",
      globalCompositeOperation: "source-over",
      skewX: 0,
      skewY: 0,
      objects: [
        {
          type: "group",
          version: "5.3.0",
          originX: "left",
          originY: "top",
          left: -140.5,
          top: -85.5,
          width: 281,
          height: 31,
          fill: "rgb(0,0,0)",
          stroke: null,
          strokeWidth: 0,
          strokeDashArray: null,
          strokeLineCap: "butt",
          strokeDashOffset: 0,
          strokeLineJoin: "miter",
          strokeUniform: false,
          strokeMiterLimit: 4,
          scaleX: 1,
          scaleY: 1,
          angle: 0,
          flipX: false,
          flipY: false,
          opacity: 1,
          shadow: null,
          visible: true,
          backgroundColor: "",
          fillRule: "nonzero",
          paintFirst: "fill",
          globalCompositeOperation: "source-over",
          skewX: 0,
          skewY: 0,
          objects: [
            {
              type: "rect",
              version: "5.3.0",
              originX: "left",
              originY: "top",
              left: -140.5,
              top: -15.5,
              width: 90,
              height: 30,
              fill: "#fff",
              stroke: null,
              strokeWidth: 1,
              strokeDashArray: null,
              strokeLineCap: "butt",
              strokeDashOffset: 0,
              strokeLineJoin: "miter",
              strokeUniform: false,
              strokeMiterLimit: 4,
              scaleX: 1,
              scaleY: 1,
              angle: 0,
              flipX: false,
              flipY: false,
              opacity: 1,
              shadow: null,
              visible: true,
              backgroundColor: "",
              fillRule: "nonzero",
              paintFirst: "fill",
              globalCompositeOperation: "source-over",
              skewX: 0,
              skewY: 0,
              rx: 6,
              ry: 6,
            },
            {
              type: "rect",
              version: "5.3.0",
              originX: "left",
              originY: "top",
              left: -45.5,
              top: -15.5,
              width: 90,
              height: 30,
              fill: "#fff",
              stroke: null,
              strokeWidth: 1,
              strokeDashArray: null,
              strokeLineCap: "butt",
              strokeDashOffset: 0,
              strokeLineJoin: "miter",
              strokeUniform: false,
              strokeMiterLimit: 4,
              scaleX: 1,
              scaleY: 1,
              angle: 0,
              flipX: false,
              flipY: false,
              opacity: 1,
              shadow: null,
              visible: true,
              backgroundColor: "",
              fillRule: "nonzero",
              paintFirst: "fill",
              globalCompositeOperation: "source-over",
              skewX: 0,
              skewY: 0,
              rx: 6,
              ry: 6,
            },
            {
              type: "rect",
              version: "5.3.0",
              originX: "left",
              originY: "top",
              left: 49.5,
              top: -15.5,
              width: 90,
              height: 30,
              fill: "#fff",
              stroke: null,
              strokeWidth: 1,
              strokeDashArray: null,
              strokeLineCap: "butt",
              strokeDashOffset: 0,
              strokeLineJoin: "miter",
              strokeUniform: false,
              strokeMiterLimit: 4,
              scaleX: 1,
              scaleY: 1,
              angle: 0,
              flipX: false,
              flipY: false,
              opacity: 1,
              shadow: null,
              visible: true,
              backgroundColor: "",
              fillRule: "nonzero",
              paintFirst: "fill",
              globalCompositeOperation: "source-over",
              skewX: 0,
              skewY: 0,
              rx: 6,
              ry: 6,
            },
          ],
        },
        {
          type: "rect",
          version: "5.3.0",
          originX: "left",
          originY: "top",
          left: -150.5,
          top: -50.5,
          width: 300,
          height: 100,
          fill: "#fff",
          stroke: null,
          strokeWidth: 1,
          strokeDashArray: null,
          strokeLineCap: "butt",
          strokeDashOffset: 0,
          strokeLineJoin: "miter",
          strokeUniform: false,
          strokeMiterLimit: 4,
          scaleX: 1,
          scaleY: 1,
          angle: 0,
          flipX: false,
          flipY: false,
          opacity: 1,
          shadow: null,
          visible: true,
          backgroundColor: "",
          fillRule: "nonzero",
          paintFirst: "fill",
          globalCompositeOperation: "source-over",
          skewX: 0,
          skewY: 0,
          rx: 20,
          ry: 20,
        },
        {
          type: "group",
          version: "5.3.0",
          originX: "left",
          originY: "top",
          left: -140.5,
          top: 54.5,
          width: 281,
          height: 31,
          fill: "rgb(0,0,0)",
          stroke: null,
          strokeWidth: 0,
          strokeDashArray: null,
          strokeLineCap: "butt",
          strokeDashOffset: 0,
          strokeLineJoin: "miter",
          strokeUniform: false,
          strokeMiterLimit: 4,
          scaleX: 1,
          scaleY: 1,
          angle: 0,
          flipX: false,
          flipY: false,
          opacity: 1,
          shadow: null,
          visible: true,
          backgroundColor: "",
          fillRule: "nonzero",
          paintFirst: "fill",
          globalCompositeOperation: "source-over",
          skewX: 0,
          skewY: 0,
          objects: [
            {
              type: "rect",
              version: "5.3.0",
              originX: "left",
              originY: "top",
              left: -140.5,
              top: -15.5,
              width: 90,
              height: 30,
              fill: "#fff",
              stroke: null,
              strokeWidth: 1,
              strokeDashArray: null,
              strokeLineCap: "butt",
              strokeDashOffset: 0,
              strokeLineJoin: "miter",
              strokeUniform: false,
              strokeMiterLimit: 4,
              scaleX: 1,
              scaleY: 1,
              angle: 0,
              flipX: false,
              flipY: false,
              opacity: 1,
              shadow: null,
              visible: true,
              backgroundColor: "",
              fillRule: "nonzero",
              paintFirst: "fill",
              globalCompositeOperation: "source-over",
              skewX: 0,
              skewY: 0,
              rx: 6,
              ry: 6,
            },
            {
              type: "rect",
              version: "5.3.0",
              originX: "left",
              originY: "top",
              left: -45.5,
              top: -15.5,
              width: 90,
              height: 30,
              fill: "#fff",
              stroke: null,
              strokeWidth: 1,
              strokeDashArray: null,
              strokeLineCap: "butt",
              strokeDashOffset: 0,
              strokeLineJoin: "miter",
              strokeUniform: false,
              strokeMiterLimit: 4,
              scaleX: 1,
              scaleY: 1,
              angle: 0,
              flipX: false,
              flipY: false,
              opacity: 1,
              shadow: null,
              visible: true,
              backgroundColor: "",
              fillRule: "nonzero",
              paintFirst: "fill",
              globalCompositeOperation: "source-over",
              skewX: 0,
              skewY: 0,
              rx: 6,
              ry: 6,
            },
            {
              type: "rect",
              version: "5.3.0",
              originX: "left",
              originY: "top",
              left: 49.5,
              top: -15.5,
              width: 90,
              height: 30,
              fill: "#fff",
              stroke: null,
              strokeWidth: 1,
              strokeDashArray: null,
              strokeLineCap: "butt",
              strokeDashOffset: 0,
              strokeLineJoin: "miter",
              strokeUniform: false,
              strokeMiterLimit: 4,
              scaleX: 1,
              scaleY: 1,
              angle: 0,
              flipX: false,
              flipY: false,
              opacity: 1,
              shadow: null,
              visible: true,
              backgroundColor: "",
              fillRule: "nonzero",
              paintFirst: "fill",
              globalCompositeOperation: "source-over",
              skewX: 0,
              skewY: 0,
              rx: 6,
              ry: 6,
            },
          ],
        },
        {
          type: "group",
          version: "5.3.0",
          originX: "left",
          originY: "top",
          left: -185.5,
          top: -40.5,
          width: 31,
          height: 81,
          fill: "rgb(0,0,0)",
          stroke: null,
          strokeWidth: 0,
          strokeDashArray: null,
          strokeLineCap: "butt",
          strokeDashOffset: 0,
          strokeLineJoin: "miter",
          strokeUniform: false,
          strokeMiterLimit: 4,
          scaleX: 1,
          scaleY: 1,
          angle: 0,
          flipX: false,
          flipY: false,
          opacity: 1,
          shadow: null,
          visible: true,
          backgroundColor: "",
          fillRule: "nonzero",
          paintFirst: "fill",
          globalCompositeOperation: "source-over",
          skewX: 0,
          skewY: 0,
          objects: [
            {
              type: "rect",
              version: "5.3.0",
              originX: "left",
              originY: "top",
              left: -15.5,
              top: -40.5,
              width: 30,
              height: 80,
              fill: "#fff",
              stroke: null,
              strokeWidth: 1,
              strokeDashArray: null,
              strokeLineCap: "butt",
              strokeDashOffset: 0,
              strokeLineJoin: "miter",
              strokeUniform: false,
              strokeMiterLimit: 4,
              scaleX: 1,
              scaleY: 1,
              angle: 0,
              flipX: false,
              flipY: false,
              opacity: 1,
              shadow: null,
              visible: true,
              backgroundColor: "",
              fillRule: "nonzero",
              paintFirst: "fill",
              globalCompositeOperation: "source-over",
              skewX: 0,
              skewY: 0,
              rx: 6,
              ry: 6,
            },
          ],
        },
        {
          type: "group",
          version: "5.3.0",
          originX: "left",
          originY: "top",
          left: 154.5,
          top: -40.5,
          width: 31,
          height: 81,
          fill: "rgb(0,0,0)",
          stroke: null,
          strokeWidth: 0,
          strokeDashArray: null,
          strokeLineCap: "butt",
          strokeDashOffset: 0,
          strokeLineJoin: "miter",
          strokeUniform: false,
          strokeMiterLimit: 4,
          scaleX: 1,
          scaleY: 1,
          angle: 0,
          flipX: false,
          flipY: false,
          opacity: 1,
          shadow: null,
          visible: true,
          backgroundColor: "",
          fillRule: "nonzero",
          paintFirst: "fill",
          globalCompositeOperation: "source-over",
          skewX: 0,
          skewY: 0,
          objects: [
            {
              type: "rect",
              version: "5.3.0",
              originX: "left",
              originY: "top",
              left: -15.5,
              top: -40.5,
              width: 30,
              height: 80,
              fill: "#fff",
              stroke: null,
              strokeWidth: 1,
              strokeDashArray: null,
              strokeLineCap: "butt",
              strokeDashOffset: 0,
              strokeLineJoin: "miter",
              strokeUniform: false,
              strokeMiterLimit: 4,
              scaleX: 1,
              scaleY: 1,
              angle: 0,
              flipX: false,
              flipY: false,
              opacity: 1,
              shadow: null,
              visible: true,
              backgroundColor: "",
              fillRule: "nonzero",
              paintFirst: "fill",
              globalCompositeOperation: "source-over",
              skewX: 0,
              skewY: 0,
              rx: 6,
              ry: 6,
            },
          ],
        },
      ],
    },
    {
      type: "group",
      version: "5.3.0",
      originX: "left",
      originY: "top",
      left: 100,
      top: 300,
      width: 371,
      height: 171,
      fill: "rgb(0,0,0)",
      stroke: null,
      strokeWidth: 0,
      strokeDashArray: null,
      strokeLineCap: "butt",
      strokeDashOffset: 0,
      strokeLineJoin: "miter",
      strokeUniform: false,
      strokeMiterLimit: 4,
      scaleX: 1,
      scaleY: 1,
      angle: 0,
      flipX: false,
      flipY: false,
      opacity: 1,
      shadow: null,
      visible: true,
      backgroundColor: "",
      fillRule: "nonzero",
      paintFirst: "fill",
      globalCompositeOperation: "source-over",
      skewX: 0,
      skewY: 0,
      objects: [
        {
          type: "group",
          version: "5.3.0",
          originX: "left",
          originY: "top",
          left: -140.5,
          top: -85.5,
          width: 281,
          height: 31,
          fill: "rgb(0,0,0)",
          stroke: null,
          strokeWidth: 0,
          strokeDashArray: null,
          strokeLineCap: "butt",
          strokeDashOffset: 0,
          strokeLineJoin: "miter",
          strokeUniform: false,
          strokeMiterLimit: 4,
          scaleX: 1,
          scaleY: 1,
          angle: 0,
          flipX: false,
          flipY: false,
          opacity: 1,
          shadow: null,
          visible: true,
          backgroundColor: "",
          fillRule: "nonzero",
          paintFirst: "fill",
          globalCompositeOperation: "source-over",
          skewX: 0,
          skewY: 0,
          objects: [
            {
              type: "rect",
              version: "5.3.0",
              originX: "left",
              originY: "top",
              left: -140.5,
              top: -15.5,
              width: 52,
              height: 30,
              fill: "#fff",
              stroke: null,
              strokeWidth: 1,
              strokeDashArray: null,
              strokeLineCap: "butt",
              strokeDashOffset: 0,
              strokeLineJoin: "miter",
              strokeUniform: false,
              strokeMiterLimit: 4,
              scaleX: 1,
              scaleY: 1,
              angle: 0,
              flipX: false,
              flipY: false,
              opacity: 1,
              shadow: null,
              visible: true,
              backgroundColor: "",
              fillRule: "nonzero",
              paintFirst: "fill",
              globalCompositeOperation: "source-over",
              skewX: 0,
              skewY: 0,
              rx: 6,
              ry: 6,
            },
            {
              type: "rect",
              version: "5.3.0",
              originX: "left",
              originY: "top",
              left: -83.5,
              top: -15.5,
              width: 52,
              height: 30,
              fill: "#fff",
              stroke: null,
              strokeWidth: 1,
              strokeDashArray: null,
              strokeLineCap: "butt",
              strokeDashOffset: 0,
              strokeLineJoin: "miter",
              strokeUniform: false,
              strokeMiterLimit: 4,
              scaleX: 1,
              scaleY: 1,
              angle: 0,
              flipX: false,
              flipY: false,
              opacity: 1,
              shadow: null,
              visible: true,
              backgroundColor: "",
              fillRule: "nonzero",
              paintFirst: "fill",
              globalCompositeOperation: "source-over",
              skewX: 0,
              skewY: 0,
              rx: 6,
              ry: 6,
            },
            {
              type: "rect",
              version: "5.3.0",
              originX: "left",
              originY: "top",
              left: -26.5,
              top: -15.5,
              width: 52,
              height: 30,
              fill: "#fff",
              stroke: null,
              strokeWidth: 1,
              strokeDashArray: null,
              strokeLineCap: "butt",
              strokeDashOffset: 0,
              strokeLineJoin: "miter",
              strokeUniform: false,
              strokeMiterLimit: 4,
              scaleX: 1,
              scaleY: 1,
              angle: 0,
              flipX: false,
              flipY: false,
              opacity: 1,
              shadow: null,
              visible: true,
              backgroundColor: "",
              fillRule: "nonzero",
              paintFirst: "fill",
              globalCompositeOperation: "source-over",
              skewX: 0,
              skewY: 0,
              rx: 6,
              ry: 6,
            },
            {
              type: "rect",
              version: "5.3.0",
              originX: "left",
              originY: "top",
              left: 30.5,
              top: -15.5,
              width: 52,
              height: 30,
              fill: "#fff",
              stroke: null,
              strokeWidth: 1,
              strokeDashArray: null,
              strokeLineCap: "butt",
              strokeDashOffset: 0,
              strokeLineJoin: "miter",
              strokeUniform: false,
              strokeMiterLimit: 4,
              scaleX: 1,
              scaleY: 1,
              angle: 0,
              flipX: false,
              flipY: false,
              opacity: 1,
              shadow: null,
              visible: true,
              backgroundColor: "",
              fillRule: "nonzero",
              paintFirst: "fill",
              globalCompositeOperation: "source-over",
              skewX: 0,
              skewY: 0,
              rx: 6,
              ry: 6,
            },
            {
              type: "rect",
              version: "5.3.0",
              originX: "left",
              originY: "top",
              left: 87.5,
              top: -15.5,
              width: 52,
              height: 30,
              fill: "#fff",
              stroke: null,
              strokeWidth: 1,
              strokeDashArray: null,
              strokeLineCap: "butt",
              strokeDashOffset: 0,
              strokeLineJoin: "miter",
              strokeUniform: false,
              strokeMiterLimit: 4,
              scaleX: 1,
              scaleY: 1,
              angle: 0,
              flipX: false,
              flipY: false,
              opacity: 1,
              shadow: null,
              visible: true,
              backgroundColor: "",
              fillRule: "nonzero",
              paintFirst: "fill",
              globalCompositeOperation: "source-over",
              skewX: 0,
              skewY: 0,
              rx: 6,
              ry: 6,
            },
          ],
        },
        {
          type: "rect",
          version: "5.3.0",
          originX: "left",
          originY: "top",
          left: -150.5,
          top: -50.5,
          width: 300,
          height: 100,
          fill: "#fff",
          stroke: null,
          strokeWidth: 1,
          strokeDashArray: null,
          strokeLineCap: "butt",
          strokeDashOffset: 0,
          strokeLineJoin: "miter",
          strokeUniform: false,
          strokeMiterLimit: 4,
          scaleX: 1,
          scaleY: 1,
          angle: 0,
          flipX: false,
          flipY: false,
          opacity: 1,
          shadow: null,
          visible: true,
          backgroundColor: "",
          fillRule: "nonzero",
          paintFirst: "fill",
          globalCompositeOperation: "source-over",
          skewX: 0,
          skewY: 0,
          rx: 20,
          ry: 20,
        },
        {
          type: "group",
          version: "5.3.0",
          originX: "left",
          originY: "top",
          left: -140.5,
          top: 54.5,
          width: 281,
          height: 31,
          fill: "rgb(0,0,0)",
          stroke: null,
          strokeWidth: 0,
          strokeDashArray: null,
          strokeLineCap: "butt",
          strokeDashOffset: 0,
          strokeLineJoin: "miter",
          strokeUniform: false,
          strokeMiterLimit: 4,
          scaleX: 1,
          scaleY: 1,
          angle: 0,
          flipX: false,
          flipY: false,
          opacity: 1,
          shadow: null,
          visible: true,
          backgroundColor: "",
          fillRule: "nonzero",
          paintFirst: "fill",
          globalCompositeOperation: "source-over",
          skewX: 0,
          skewY: 0,
          objects: [
            {
              type: "rect",
              version: "5.3.0",
              originX: "left",
              originY: "top",
              left: -140.5,
              top: -15.5,
              width: 90,
              height: 30,
              fill: "#fff",
              stroke: null,
              strokeWidth: 1,
              strokeDashArray: null,
              strokeLineCap: "butt",
              strokeDashOffset: 0,
              strokeLineJoin: "miter",
              strokeUniform: false,
              strokeMiterLimit: 4,
              scaleX: 1,
              scaleY: 1,
              angle: 0,
              flipX: false,
              flipY: false,
              opacity: 1,
              shadow: null,
              visible: true,
              backgroundColor: "",
              fillRule: "nonzero",
              paintFirst: "fill",
              globalCompositeOperation: "source-over",
              skewX: 0,
              skewY: 0,
              rx: 6,
              ry: 6,
            },
            {
              type: "rect",
              version: "5.3.0",
              originX: "left",
              originY: "top",
              left: -45.5,
              top: -15.5,
              width: 90,
              height: 30,
              fill: "#fff",
              stroke: null,
              strokeWidth: 1,
              strokeDashArray: null,
              strokeLineCap: "butt",
              strokeDashOffset: 0,
              strokeLineJoin: "miter",
              strokeUniform: false,
              strokeMiterLimit: 4,
              scaleX: 1,
              scaleY: 1,
              angle: 0,
              flipX: false,
              flipY: false,
              opacity: 1,
              shadow: null,
              visible: true,
              backgroundColor: "",
              fillRule: "nonzero",
              paintFirst: "fill",
              globalCompositeOperation: "source-over",
              skewX: 0,
              skewY: 0,
              rx: 6,
              ry: 6,
            },
            {
              type: "rect",
              version: "5.3.0",
              originX: "left",
              originY: "top",
              left: 49.5,
              top: -15.5,
              width: 90,
              height: 30,
              fill: "#fff",
              stroke: null,
              strokeWidth: 1,
              strokeDashArray: null,
              strokeLineCap: "butt",
              strokeDashOffset: 0,
              strokeLineJoin: "miter",
              strokeUniform: false,
              strokeMiterLimit: 4,
              scaleX: 1,
              scaleY: 1,
              angle: 0,
              flipX: false,
              flipY: false,
              opacity: 1,
              shadow: null,
              visible: true,
              backgroundColor: "",
              fillRule: "nonzero",
              paintFirst: "fill",
              globalCompositeOperation: "source-over",
              skewX: 0,
              skewY: 0,
              rx: 6,
              ry: 6,
            },
          ],
        },
        {
          type: "group",
          version: "5.3.0",
          originX: "left",
          originY: "top",
          left: -185.5,
          top: -40.5,
          width: 31,
          height: 81,
          fill: "rgb(0,0,0)",
          stroke: null,
          strokeWidth: 0,
          strokeDashArray: null,
          strokeLineCap: "butt",
          strokeDashOffset: 0,
          strokeLineJoin: "miter",
          strokeUniform: false,
          strokeMiterLimit: 4,
          scaleX: 1,
          scaleY: 1,
          angle: 0,
          flipX: false,
          flipY: false,
          opacity: 1,
          shadow: null,
          visible: true,
          backgroundColor: "",
          fillRule: "nonzero",
          paintFirst: "fill",
          globalCompositeOperation: "source-over",
          skewX: 0,
          skewY: 0,
          objects: [
            {
              type: "rect",
              version: "5.3.0",
              originX: "left",
              originY: "top",
              left: -15.5,
              top: -40.5,
              width: 30,
              height: 80,
              fill: "#fff",
              stroke: null,
              strokeWidth: 1,
              strokeDashArray: null,
              strokeLineCap: "butt",
              strokeDashOffset: 0,
              strokeLineJoin: "miter",
              strokeUniform: false,
              strokeMiterLimit: 4,
              scaleX: 1,
              scaleY: 1,
              angle: 0,
              flipX: false,
              flipY: false,
              opacity: 1,
              shadow: null,
              visible: true,
              backgroundColor: "",
              fillRule: "nonzero",
              paintFirst: "fill",
              globalCompositeOperation: "source-over",
              skewX: 0,
              skewY: 0,
              rx: 6,
              ry: 6,
            },
          ],
        },
        {
          type: "group",
          version: "5.3.0",
          originX: "left",
          originY: "top",
          left: 154.5,
          top: -40.5,
          width: 31,
          height: 81,
          fill: "rgb(0,0,0)",
          stroke: null,
          strokeWidth: 0,
          strokeDashArray: null,
          strokeLineCap: "butt",
          strokeDashOffset: 0,
          strokeLineJoin: "miter",
          strokeUniform: false,
          strokeMiterLimit: 4,
          scaleX: 1,
          scaleY: 1,
          angle: 0,
          flipX: false,
          flipY: false,
          opacity: 1,
          shadow: null,
          visible: true,
          backgroundColor: "",
          fillRule: "nonzero",
          paintFirst: "fill",
          globalCompositeOperation: "source-over",
          skewX: 0,
          skewY: 0,
          objects: [
            {
              type: "rect",
              version: "5.3.0",
              originX: "left",
              originY: "top",
              left: -15.5,
              top: -40.5,
              width: 30,
              height: 80,
              fill: "#fff",
              stroke: null,
              strokeWidth: 1,
              strokeDashArray: null,
              strokeLineCap: "butt",
              strokeDashOffset: 0,
              strokeLineJoin: "miter",
              strokeUniform: false,
              strokeMiterLimit: 4,
              scaleX: 1,
              scaleY: 1,
              angle: 0,
              flipX: false,
              flipY: false,
              opacity: 1,
              shadow: null,
              visible: true,
              backgroundColor: "",
              fillRule: "nonzero",
              paintFirst: "fill",
              globalCompositeOperation: "source-over",
              skewX: 0,
              skewY: 0,
              rx: 6,
              ry: 6,
            },
          ],
        },
      ],
    },
  ],
  background: "#F3F4F6",
};

const TableView = () => {
  const [editDrawer, setEditDrawer] = useState(false);
  const [addDrawer, setAddDrawer] = useState(false);
  const [currentFloor, setCurrentFloor] = useState<number>(0);
  const [newFloor, setNewFloor] = useState(false);

  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.authentication);
  const { data: user } = useFetchProfileQuery(auth.token ?? skipToken);
  const { data: allFloors, isLoading: allFloorsLoading } = useFetchFloorsQuery(
    user?.restaurant?.id ?? skipToken
  );
  const [addFloor] = useAddFloorMutation();
  const [updateFloor] = useUpdateFloorMutation();

  useEffect(() => {
    if (allFloors && !allFloors.length) {
      setCurrentFloor(0);
      setNewFloor(true);
    } else {
      setNewFloor(false);
    }
  }, [allFloors]);

  const [tableCanvas, tableCanvasWrapper, canvas] = useInitializeCanvas();

  useEffect(() => {
    if (canvas && allFloors?.length === 0) {
      canvas.clear();
      canvas.loadFromJSON(InitialTable, () => {
        canvas.renderAll();
      });
    } else if (canvas && allFloors?.length && allFloors.length > currentFloor) {
      const canvasJSON = JSON.parse(allFloors[currentFloor].canvas);
      canvas.clear();
      canvas.loadFromJSON(canvasJSON, () => {
        canvas.renderAll();
      });
    } else if (allFloors && allFloors?.length < currentFloor + 1) {
      canvas?.clear();
    }
  }, [currentFloor, allFloors, canvas]);

  const addTable = (
    tableLeft: number,
    tableTop: number,
    tableWidth: number,
    tableHeight: number,
    seatTop: number,
    seatRight: number,
    seatBottom: number,
    seatLeft: number
  ) => {
    if (!canvas) return;
    const table = createTable({
      tableLeft,
      tableTop,
      tableWidth,
      tableHeight,
      seatTop,
      seatRight,
      seatBottom,
      seatLeft,
    });

    canvas.add(table);
    canvas.renderAll();
  };

  useEffect(() => {
    canvas?.on("selection:created", (e) => {
      console.log(e);

      console.log(canvas.getActiveObjects()?.length);

      if (canvas.getActiveObjects()?.length === 1) {
        // console.log(canvas.getActiveObject()?.canvas?._objects.at(1)?.set({ width: 30 }))
        // canvas.getActiveObject()?.on("scaling", (e) => {
        //     console.log(e)
        //     canvas.getActiveObject()?.canvas?._objects.at(1)?.set({ width: 30 })
        //     canvas.renderAll()
        // })
      }
      // e.selected.
      // console.log(canvas.getActiveObjects())
      // canvas.remove(canvas.getActiveObject()!)

      // addTable(canvas.getActiveObject()?.left!, canvas.getActiveObject()?.top!)
    });
  }, [canvas]);

  // const handleEditTable = () => {
  //     addTable(canvas?.getActiveObject()?.left!, canvas?.getActiveObject()?.top!);
  //     canvas?.remove(canvas.getActiveObject()!);
  // }
  if (!auth.isInitialized) return <InitialLoading />;

  const handleSaveFloor = async () => {
    if (!user?.restaurant) return;
    const canvasString = JSON.stringify(canvas?.toJSON());
    try {
      let floor;
      if (allFloors && allFloors.length > currentFloor)
        floor = allFloors[currentFloor];

      if (!floor?.canvas) {
        await addFloor({
          canvas: canvasString,
          floor_no: currentFloor,
          restaurant_id: user?.restaurant?.id,
        }).unwrap();
        dispatch(floorApi.util.invalidateTags(["allFloors"]));
        toast({ title: "Floor added" });
      } else {
        await updateFloor({
          canvas: canvasString,
          floor_no: currentFloor,
          restaurant_id: user?.restaurant?.id,
          floor_id: floor.id,
        }).unwrap();
        dispatch(floorApi.util.invalidateTags(["allFloors"]));
        toast({ title: "Floor updated" });
      }
    } catch (e) {
      const error = e as ApiError;
    }
  };

  const handleAddFloor = () => {
    if (!user?.restaurant) {
      return toast({
        variant: "default",
        title: "Please setup your restaurant first.",
      });
    }
    if (newFloor)
      return toast({
        variant: "destructive",
        title: "Please save the current floor ",
      });

    setNewFloor(true);
    setCurrentFloor(allFloors?.length!);

    canvas?.clear();
  };

  return (
    <DashboardLayout>
      <h1 className="mb-6 text-2xl font-medium">Floor setup</h1>
      <div className="flex items-center gap-3  py-2 pt-0 ">
        <Tabs
          onValueChange={(val) => setCurrentFloor(Number(val))}
          value={currentFloor?.toString()}
        >
          <TabsList>
            {allFloors?.length === 0 && (
              <TabsTrigger className="font-normal" value="Ground floor">
                Ground Floor
              </TabsTrigger>
            )}
            {allFloors?.map((floor) => {
              return (
                <TabsTrigger
                  key={floor?.id}
                  className="font-normal"
                  value={floor.floor_no?.toString()}
                >
                  {getFloorName(floor.floor_no)}
                </TabsTrigger>
              );
            })}
            {newFloor && allFloors?.length !== 0 && (
              <TabsTrigger
                key={allFloors?.length!}
                className="font-normal"
                value={allFloors?.length!?.toString()}
              >
                {getFloorName(allFloors?.length!)}
              </TabsTrigger>
            )}
          </TabsList>
        </Tabs>

        <AddCircle
          onClick={handleAddFloor}
          iconStyle="BoldDuotone"
          size={30}
          color="#757575"
        />

        <Button onClick={handleSaveFloor} className="ml-auto ">
          Save
        </Button>
      </div>
      <div
        className="relative w-full h-screen"
        id="canvasWrapper"
        ref={tableCanvasWrapper}
      >
        {/* <Button onClick={() => addTable(800, 100)}>Add Table</Button>
            <Button onClick={() => handleEditTable()}> edit</Button> */}
        <canvas ref={tableCanvas} id="tableCanvas" />
        <div
          onClick={() => setAddDrawer(true)}
          className="fixed flex items-center justify-center text-green-500 cursor-pointer bottom-6 right-6"
        >
          <AddSquare iconStyle="BoldDuotone" size={60} />
        </div>
        <Sheet
          open={editDrawer}
          onOpenChange={() => setEditDrawer(!editDrawer)}
        >
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Are you sure absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <Sheet open={addDrawer} onOpenChange={() => setAddDrawer(!addDrawer)}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add a table</SheetTitle>
              <SheetDescription>
                <AddTableDrawer
                  addTable={addTable}
                  setAddDrawer={setAddDrawer}
                />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </DashboardLayout>
  );
};

export default TableView;
