import { useContext } from 'react';
import * as zod from 'zod'
import CountDown from './components/Countdown';
import { HandPalm, Play } from "phosphor-react";
import NewCycleForm from './components/NewCycleForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { CyclesContext } from '../../contexts/CycleContext';
import { HomeContainer, StartCountDownButton, StopCountDownButton } from "./styles";

const newCycleFormValidationSchame = zod.object({
    task: zod.string().min(1, 'Informe a tarefa.'),
    minutesAmount: zod.number()
        .min(5, "O tempo mínimo é de 5 minutos.")
        .max(60, "O intervalo máximo é de 60 minutos.")
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchame>

export const Home = () => {

    const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext)

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchame),
        defaultValues: { task: '', minutesAmount: 5 }
    })

    const { watch, handleSubmit, reset } = newCycleForm

    const handleCreateNewCycle = (data: NewCycleFormData) => {
        createNewCycle(data)
        reset()
    }

    return (
        <>
            <HomeContainer>
                <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm />
                    </FormProvider>
                    <CountDown />
                    {activeCycle ?
                        <>
                            <StopCountDownButton type="button" onClick={interruptCurrentCycle}>
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
