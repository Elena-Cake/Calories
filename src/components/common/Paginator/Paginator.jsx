import React, { useState } from "react";
import s from './Paginator.module.scss'

const Paginator = ({ currentPage, onChangePage, totalUserCount, pageSize, portionSize = 10 }) => {

    const pageCount = Math.ceil(totalUserCount / pageSize)

    const portionCount = Math.ceil(pageCount / portionSize)
    const [currentPortion, setCurrentPortion] = useState(1)
    let leftPortionPageNumber = (currentPortion - 1) * portionSize + 1;
    let rightPortionPageNumber = currentPortion * portionSize;

    const pagesCounterEmpty = []
    for (let i = 1; i <= pageCount; i++) {
        pagesCounterEmpty.push(i)
    }

    const pagesElements = pagesCounterEmpty.map(i => {
        if (i >= leftPortionPageNumber && i <= rightPortionPageNumber) {
            return (
                <div key={i} className={`${s.pagination__btn} ${currentPage === i && s.pagination__btn_type_active}`}
                    onClick={(e) => onChangePage(i)}>
                    {i}
                </div>
            )
        }
    })

    const onPrevClick = () => {
        setCurrentPortion(currentPortion - 1)
    }

    const onNextClick = () => {
        setCurrentPortion(currentPortion + 1)
    }

    return (
        <div className={s.pagination}>
            {currentPortion > 1 &&
                <button className={s.pagination__btn} onClick={onPrevClick}>prev</button>
            }
            {pagesElements}
            {currentPortion <= portionCount &&
                <button className={s.pagination__btn} onClick={onNextClick}>next</button>
            }
        </div>
    )
}

export default Paginator;
