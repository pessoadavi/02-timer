import { createContext, useState } from 'react';
import * as zod from 'zod'
import CountDown from './components/Countdown';
import { HandPalm, Play } from "phosphor-react";
import NewCycleForm from './components/NewCycleForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { HomeContainer, StartCountDownButton, StopCountDownButton } from "./styles";
interface Cycle {
    id: string,
    task: string,
    startDate: Date,
    finishedDate?: Date,
    minutesAmount: number,
    interruptedDate?: Date,
}

interface CycleContextData {
    amountSecondsPassed: number
    activeCycleId: string | null
    activeCycle: Cycle | undefined
    markCurrentCycleAsFinished: () => void
    setSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as CycleContextData)

const newCycleFormValidationSchame = zod.object({
    task: zod.string().min(1, 'Informe a tarefa.'),
    minutesAmount: zod.number()
        .min(5, "O tempo mínimo é de 5 minutos.")
        .max(60, "O intervalo máximo é de 60 minutos.")
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchame>

export const Home = () => {

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)


    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchame),
        defaultValues: { task: '', minutesAmount: 5 }
    })

    const { watch, handleSubmit, reset } = newCycleForm

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

    const handleCreateNewCycle = (data: NewCycleFormData) => {

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
        reset()
    }

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    const handleInterruptCycle = () => {

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
        <>
            <HomeContainer>
                <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">

                    <CyclesContext.Provider
                        value={{
                            activeCycle,
                            activeCycleId,
                            setSecondsPassed,
                            amountSecondsPassed,
                            markCurrentCycleAsFinished,
                        }}
                    >
                        <FormProvider {...newCycleForm}>
                            <NewCycleForm />
                        </FormProvider>
                        <CountDown />
                    </CyclesContext.Provider>

                    {activeCycle ?
                        <>
                            <StopCountDownButton type="button" onClick={handleInterruptCycle}>
                                <HandPalm size={24} />
                                Interromper
                            </StopCountDownButton>
                        </>
                        :
                        <>
                            <StartCountDownButton disabled={!watch('task')} type="submit">
                                <Play size={24} />
                                Começar
                            </StartCountDownButton>
                        </>
                    }
                </form>
            </HomeContainer>
        </>
    );
}
