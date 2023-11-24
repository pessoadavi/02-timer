import { ReactNode, createContext, useReducer, useState } from "react";

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
    children: ReactNode
}

interface CyclesState {
    cycles: Cycle[],
    activeCycleId: string | null
}

export const CyclesContextProvider = ({ children }: CyclesContextProviderProps) => {

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const [cyclesState, dispatch] = useReducer(
        (state: CyclesState, action: any) => {

            switch (action.type) {
                case 'ADD_NEW_CYCLE':
                    return {
                        ...state, cycles: [...state.cycles, action.payload.newCycle],
                        activeCycleId: action.payload.newCycle.id
                    }
                case 'INTERRUPT_CURRENT_CYCLE':
                    return {
                        ...state,
                        cycles: state.cycles.map(cycle => {
                            if (cycle.id === state.activeCycleId) {
                                return {
                                    ...cycle, interruptedDate: new Date()
                                }
                            } else {
                                return cycle
                            }
                        }),
                        activeCycleId: null,
                    }
                case 'MARK_CURRENT_CYCLE_AS_FINISHED':
                    return {
                        ...state,
                        cycles: state.cycles.map(cycle => {
                            if (cycle?.id === state.activeCycleId) {
                                return { ...cycle, finishedDate: new Date() }
                            } else {
                                return cycle
                            }
                        }),
                        activeCycleId: null,
                    }
                default:
                    return state
            }
        }, {
        cycles: [],
        activeCycleId: null
    })

    const { cycles, activeCycleId } = cyclesState

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    const setSecondsPassed = (seconds: number) => {
        setAmountSecondsPassed(seconds)
    }

    const markCurrentCycleAsFinished = () => {
        dispatch({
            type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
            payload: {
                activeCycleId
            }
        })

    }

    const createNewCycle = (data: CreateCycleData) => {

        const id = String(new Date().getTime())

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        dispatch({
            type: 'ADD_NEW_CYCLE',
            payload: {
                newCycle
            }
        })
        setAmountSecondsPassed(0)
    }

    const interruptCurrentCycle = () => {
        dispatch({
            type: 'INTERRUPT_CURRENT_CYCLE',
            payload: {
                activeCycleId
            }
        })
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