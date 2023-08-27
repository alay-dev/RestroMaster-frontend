
import { useState, useEffect, useRef } from 'react'
import { fabric } from 'fabric';
import { Canvas } from 'fabric/fabric-impl';
import { Button } from '@/components/ui/button';
import { AddSquare } from "solar-icon-set"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import AddTableDrawer from '@/components/addTableDrawer/AddTableDrawer';
import DashboardLayout from '@/components/layout/DashboardLayout';


const TableView = () => {
    const [canvas, setCanvas] = useState<Canvas | null>(null)
    const [editDrawer, setEditDrawer] = useState(false)
    const [addDrawer, setAddDrawer] = useState(false)

    const initCanvas = () => {
        const el = document.getElementById("canvasWrapperElement")?.getBoundingClientRect()
        console.log(el)

        return new fabric.Canvas('canvas', {
            height: el?.height,
            width: el?.width,
            backgroundColor: '#eee',
        })
    }


    const createSofa = () => {
        const sofaBase = new fabric.Rect({ left: 5, width: 300, height: 80, fill: "#fff", rx: 20, })
        const sofaLeftHand = new fabric.Rect({ width: 40, height: 70, fill: "blue", rx: 15, visible: true, left: 0, top: 5 })
        const sofaRightHand = new fabric.Rect({ width: 40, height: 70, fill: "blue", rx: 15, visible: true, left: 270, top: 5 })

        const sofa = new fabric.Group([sofaBase, sofaLeftHand, sofaRightHand], {
            left: 200,
            top: 200
        })
        return sofa;
    }

    const createTable = (tableLeft: number, tableTop: number, tableWidth: number, tableHeight: number, seatTop: number, seatRight: number, seatBottom: number, seatLeft: number) => {
        const spaceBetweenSeat = 5;
        const seatEdgeSpace = 10
        const seatHeight = 30

        const table = new fabric.Rect({ left: 0, top: 0, width: tableWidth, height: tableHeight, rx: 20, fill: "#fff" })


        //TOP SEATS GENERATION
        const topSeats: fabric.Rect[] = [];
        for (let i = 0; i < seatTop; i++) {
            const seatWidth = (tableWidth - 2 * seatEdgeSpace - (seatTop - 1) * spaceBetweenSeat) / seatTop;
            const seat = new fabric.Rect({ fill: "#fff", width: seatWidth, height: seatHeight, rx: 6, left: seatEdgeSpace + (i * seatWidth) + i * spaceBetweenSeat })
            topSeats.push(seat)
        }
        const topSeatGrp = new fabric.Group(topSeats, {
            top: topSeats?.length ? -seatHeight - 5 : 0,
        })

        //  BOTTOM SEATS GENERATION
        const bottomSeats: fabric.Rect[] = [];
        for (let i = 0; i < seatBottom; i++) {
            const seatWidth = (tableWidth - 2 * seatEdgeSpace - (seatBottom - 1) * spaceBetweenSeat) / seatBottom;
            const seat = new fabric.Rect({ fill: "#fff", width: seatWidth, height: seatHeight, rx: 6, left: seatEdgeSpace + (i * seatWidth) + i * spaceBetweenSeat })
            bottomSeats.push(seat)
        }
        const bottomSeatGrp = new fabric.Group(bottomSeats, {
            top: bottomSeats.length ? tableHeight + 5 : 0,
        })



        //  LEFT SEATS GENERATION
        const leftSeats: fabric.Rect[] = [];
        for (let i = 0; i < seatLeft; i++) {
            const seatWidth = (tableHeight - 2 * seatEdgeSpace - (seatLeft - 1) * spaceBetweenSeat) / seatLeft;
            const seat = new fabric.Rect({ fill: "#fff", width: seatHeight, height: seatWidth, rx: 6, top: seatEdgeSpace + (i * seatWidth) + i * spaceBetweenSeat })
            leftSeats.push(seat)
        }
        const leftSeatGrp = new fabric.Group(leftSeats, {
            left: leftSeats.length ? -seatHeight - 5 : 0,
        })



        //  RIGHT SEATS GENERATION
        const rightSeats: fabric.Rect[] = [];
        for (let i = 0; i < seatRight; i++) {
            const seatWidth = (tableHeight - 2 * seatEdgeSpace - (seatRight - 1) * spaceBetweenSeat) / seatRight;
            const seat = new fabric.Rect({ fill: "#fff", width: seatHeight, height: seatWidth, rx: 6, top: seatEdgeSpace + (i * seatWidth) + i * spaceBetweenSeat })
            rightSeats.push(seat)
        }
        const rightSeatGrp = new fabric.Group(rightSeats, {
            left: rightSeats?.length ? tableWidth + 5 : 0,
            lockScalingX: true
        })

        const tableWithSeats = new fabric.Group([topSeatGrp, table, bottomSeatGrp, leftSeatGrp, rightSeatGrp], {
            top: tableTop,
            left: tableLeft,
            cornerStyle: 'circle',
            cornerSize: 10,
            lockUniScaling: false,
        })

        return tableWithSeats
    }

    useEffect(() => {
        if (!canvas) {
            const canvasEl = initCanvas()
            setCanvas(canvasEl)
            return;
        }

        if (canvas) {
            const table = createTable(300, 300, 300, 100, 3, 1, 3, 1)
            canvas.add(table)
            canvas.renderAll()
        }

        return () => {
            canvas.renderAll()
            setCanvas(null)
        }

    }, [canvas])

    const addTable = (tableLeft: number, tableTop: number, tableWidth: number, tableHeight: number, seatTop: number, seatRight: number, seatBottom: number, seatLeft: number) => {
        if (!canvas) return
        const table = createTable(tableLeft, tableTop, tableWidth, tableHeight, seatTop, seatRight, seatBottom, seatLeft)
        canvas.add(table)
        canvas.renderAll()
    }

    useEffect(() => {
        canvas?.on("selection:created", (e) => {
            console.log(e)

            console.log(canvas.getActiveObjects()?.length)


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

        })
    }, [canvas])

    // const handleEditTable = () => {
    //     addTable(canvas?.getActiveObject()?.left!, canvas?.getActiveObject()?.top!);
    //     canvas?.remove(canvas.getActiveObject()!);
    // }

    return (
        <DashboardLayout>
            <div className='relative w-full h-screen' id="canvasWrapperElement">
                {/* <Button onClick={() => addTable(800, 100)}>Add Table</Button>
            <Button onClick={() => handleEditTable()}> edit</Button> */}
                <canvas id="canvas" />
                <div onClick={() => setAddDrawer(true)} className='fixed flex items-center justify-center text-green-500 cursor-pointer bottom-6 right-6' >
                    <AddSquare iconStyle='BoldDuotone' size={60} />
                </div>
                <Sheet open={editDrawer} onOpenChange={() => setEditDrawer(!editDrawer)}  >
                    <SheetContent  >
                        <SheetHeader>
                            <SheetTitle>Are you sure absolutely sure?</SheetTitle>
                            <SheetDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
                <Sheet open={addDrawer} onOpenChange={() => setAddDrawer(!addDrawer)}  >
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Add a table</SheetTitle>
                            <SheetDescription>
                                <AddTableDrawer addTable={addTable} setAddDrawer={setAddDrawer} />
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div >
        </DashboardLayout>
    )
}

export default TableView