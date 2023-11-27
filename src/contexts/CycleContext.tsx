import { ReactNode, createContext, useReducer, useState } from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";

export const CyclesContext = createContext({} as CycleContextData)

interface CreateCycleData {
    task: string,
    minutesAmount: number
}

interface CycleContextData {
    cycles: Cycle[]
    amountSecondsPassed: number
    activeCycleId: string | null
    activeCycle: Cycle | undefined
    interruptCurrentCycle: () => void
    markCurrentCycleAsFinished: () => void
    setSecondsPassed: (seconds: number) => void
    createNewCycle: (data: CreateCycleData) => void
}

interface CyclesContextProviderProps {
    children: ReactNode
}

export const CyclesContextProvider = ({ children }: CyclesContextProviderProps) => {

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const [cyclesState, dispatch] = useReducer(cyclesReducer, {
        cycles: [],
        activeCycleId: null
    })

    const { cycles, activeCycleId } = cyclesState

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    const setSecondsPassed = (seconds: number) => {
        setAmountSecondsPassed(seconds)
    }

    const markCurrentCycleAsFinished = () => {
        dispatch(markCurrentCycleAsFinishedAction())
    }

    const createNewCycle = (data: CreateCycleData) => {

        const id = String(new Date().getTime())

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        dispatch(addNewCycleAction(newCycle))
        setAmountSecondsPassed(0)
    }

    const interruptCurrentCycle = () => {
        dispatch(interruptCurrentCycleAction())
    }

    return (
        <CyclesContext.Provider
            value={{
                cycles,
                activeCycle,
                activeCycleId,
                createNewCycle,
                setSecondsPassed,
                amountSecondsPassed,
                interruptCurrentCycle,
                markCurrentCycleAsFinished,
            }}
        >
            {children}
        </CyclesContext.Provider>
    )
}