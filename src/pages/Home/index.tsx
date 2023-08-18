import { Play } from "phosphor-react";
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountDownButton, TaskInput } from "./styles";

export const Home = () => {
    return (
        <>
            <HomeContainer>
                <form action="">
                    <FormContainer>
                        <label htmlFor="task">Vou trabalhar em </label>
                        <TaskInput
                            id="task"
                            list="task-suggertions"
                            placeholder="Dê um nome para o seu projeto"
                        />

                        <datalist id="task-suggertions">
                            <option value="Tarefa 1"/>
                            <option value="Tarefa 2"/>
                            <option value="Tarefa 3"/>
                        </datalist>

                        <label htmlFor="">durante</label>
                        <MinutesAmountInput
                            id="minutesAmount"
                            step={5}
                            min={5}
                            max={60}
                            type="number"
                            placeholder="00"
                        />

                        <span>minutos.</span>
                    </FormContainer>

                    <CountDownContainer>
                        <span>0</span>
                        <span>0</span>
                        <Separator>:</Separator>
                        <span>0</span>
                        <span>0</span>
                    </CountDownContainer>

                    <StartCountDownButton disabled={false} type="submit">
                        <Play size={24} />
                        Começar
                    </StartCountDownButton>
                </form>
            </HomeContainer>
        </>
    );
}
