import { ReactNode, createContext, useState } from "react";

export const CyclesContext = createContext({} as CycleContextData)

interface Cycle {
    id: string,
    task: string,
    startDate: Date,
    finishedDate?: Date,
    minutesAmount: number,
    interruptedDate?: Date,
}

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
    children : ReactNode
} 

export const CyclesContextProvider = ({ children }: CyclesContextProviderProps) => {

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    const setSecondsPassed = (seconds: number) => {
        setAmountSecondsPassed(seconds)
    }

    const markCurrentCycleAsFinished = () => {
        setCycles(state =>
            state.map(cycle => {
                if (cycle.id === activeCycleId) {
                    return {
                        ...cycle, finishedDate: new Date()
                    }
                } else {
                    return cycle
                }
            }))
    }

    const createNewCycle = (data: CreateCycleData) => {

        const id = String(new Date().getTime())

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        setActiveCycleId(id)
        setCycles(state => [...state, newCycle])
        setAmountSecondsPassed(0)
    }

    const interruptCurrentCycle = () => {

        setCycles(state =>
            state.map(cycle => {
                if (cycle?.id === activeCycle?.id) {
                    return { ...cycle, interruptedDate: new Date() }
                } else {
                    return cycle
                }
            })
        )
        setActiveCycleId(null)
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