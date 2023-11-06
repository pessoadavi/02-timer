import { useContext } from 'react';
import { CyclesContext } from '../..';
import { FormContainer, MinutesAmountInput, TaskInput } from './styles';
import { useFormContext } from 'react-hook-form';

const NewCycleForm = ({ }) => {

    const { register } = useFormContext()
    const { activeCycle } = useContext(CyclesContext)

    return (
        <>
            <FormContainer>
                <label htmlFor="task">Vou trabalhar em </label>
                <TaskInput
                    id="task"
                    list="task-suggertions"
                    disabled={!!activeCycle}
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
                    min={5}
                    step={5}
                    type="number"
                    placeholder="00"
                    disabled={!!activeCycle}
                    {...register('minutesAmount', {
                        valueAsNumber: true
                    })}
                />

                <span>minutos.</span>
            </FormContainer>
        </>
    );
}

export default NewCycleForm;