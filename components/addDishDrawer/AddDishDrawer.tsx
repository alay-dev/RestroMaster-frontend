import React from 'react'

const AddDishDrawer = ({ setAddDishModal }: AddDishDrawerProps) => {
    return (
        <div>AddDishDrawer</div>
    )
}

export default AddDishDrawer

type AddDishDrawerProps = {
    setAddDishModal: (data: boolean) => void
}