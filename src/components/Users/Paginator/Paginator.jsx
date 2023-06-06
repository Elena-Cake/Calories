import React from "react";
import s from './Paginator.module.css'

const Paginator = ({ pageCount, currentPage, onChangePage }) => {

    const pagesCounterEmpty = []
    for (let i = 1; i <= pageCount; i++) {
        pagesCounterEmpty.push(i)
    }

    const pagesElements = pagesCounterEmpty.slice(0, 10).map(i => {
        return (
            <div key={i} className={`${s.pagination__btn} ${currentPage === i && s.pagination__btn_type_active}`}
                onClick={(e) => onChangePage(i)}>
                {i}
            </div>
        )
    })

    return (
        <div className={s.pagination}>
            {pagesElements}
        </div>
    )
}

export default Paginator;
