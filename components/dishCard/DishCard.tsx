

const DishCard = () => {
    return (
        <div className='flex-1 flex-shrink-0 p-3 bg-white rounded-md shadow-sm'>
            <div className="w-full mb-3 overflow-hidden rounded-sm aspect-square" >
                <img className="object-cover object-center transition duration-200 hover:scale-105" src='/images/template/food.jpg' />
            </div>
            <h4 className="mb-3 text-lg font-medium leading-6" >Almond Brown Sugar Croissant</h4>
            <p className="mb-6 text-sm text-gray-400">Sweet croissant with topping almonds and brown sugar</p>
            <h3 className="text-orange-400">$ <strong className="text-2xl font-bold " >125</strong></h3>
        </div>
    )
}

export default DishCard