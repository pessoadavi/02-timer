import { useState } from 'react';
import { Play } from "phosphor-react";
import * as zod from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountDownButton, TaskInput } from "./styles";


const newCycleFormValidationSchame = zod.object({
    task: zod.string().min(1, 'Informe a tarefa.'),
    minutesAmount: zod.number()
        .min(5, "O tempo mínimo é de 5 minutos.")
        .max(60, "O intervalo máximo é de 60 minutos.")
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchame>

interface Cycle {
    id: string,
    task: string,
    minutesAmount: number
}

export const Home = () => {

    const [cycles, setcycles] = useState<Cycle[]>([])
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
    const [activeCycleId, setActiveCycleId] = useState<string | null>()

    const { watch, register, handleSubmit, formState, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchame),
        defaultValues: { task: '', minutesAmount: 5 }
    })

    const handleCreateNewCicle = (data: NewCycleFormData) => {

        const id = String(new Date().getTime())

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
        }

        setActiveCycleId(id)
        setcycles(state => [...state, newCycle])
        reset()
    }

    const activeCycle = cycles.find( cycle => cycle.id === activeCycleId)
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    const secondsAmount = currentSeconds % 60
    const minutesAmount = Math.floor(currentSeconds / 60)

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    return (
        <>
            <HomeContainer>
                <form onSubmit={handleSubmit(handleCreateNewCicle)} action="">
                    <FormContainer>
                        <label htmlFor="task">Vou trabalhar em </label>
                        <TaskInput
                            id="task"
                            list="task-suggertions"
                            placeholder="Dê um nome para o seu projeto"
                            {...register('task')}
                        />

                        <datalist id="task-suggertions">
                            <option value="Tarefa 1" />
                            <option value="Tarefa 2" />
                            <option value="Tarefa 3" />
                        </datalist>

                        <label htmlFor="">durante</label>
                        <MinutesAmountInput
                            id="minutesAmount"
                            step={5}
                            min={5}
                            //max={60}
                            type="number"
                            placeholder="00"
                            {...register('minutesAmount', {
                                valueAsNumber: true
                            })}
                        />

                        <span>minutos.</span>
                    </FormContainer>

                    <CountDownContainer>
                        <span>{minutes[0]}</span>
                        <span>{minutes[1]}</span>
                        <Separator>:</Separator>
                        <span>{seconds[0]}</span>
                        <span>{seconds[1]}</span>
                    </CountDownContainer>

                    <StartCountDownButton disabled={!watch('task')} type="submit">
                        <Play size={24} />
                        Começar
                    </StartCountDownButton>
                </form>
            </HomeContainer>
        </>
    );
}
