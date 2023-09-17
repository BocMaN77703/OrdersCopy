import React, { Children, Dispatch, ReactNode, SetStateAction } from 'react'

interface ActiveProps {
    active: boolean
    setActive: Dispatch<SetStateAction<boolean>>
    children: ReactNode
}
export default function Modal(props: ActiveProps) {
    return (
        <div
            className={props.active ? 'modal active' : 'modal'}
            onClick={() => {
                props.setActive(false)
            }}
        >
            <div
                className={
                    props.active ? 'modal-content active' : 'modal-content'
                }
                onClick={(e) => e.stopPropagation()}
            >
                {props.children}
            </div>
        </div>
    )
}
