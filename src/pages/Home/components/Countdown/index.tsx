import { useEffect, useContext } from 'react';
import { differenceInSeconds } from 'date-fns';
import { CountDownContainer, Separator } from './styles';
import { CyclesContext } from '../../../../contexts/CycleContext';

const CountDown = () => {

    const {
        activeCycle,
        activeCycleId,
        setSecondsPassed,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
    } = useContext(CyclesContext)

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    const secondsAmount = currentSeconds % 60
    const minutesAmount = Math.floor(currentSeconds / 60)

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    useEffect(() => {
        document.title = `Timer : ${activeCycle ? `${minutes}:${seconds}` : "Aguardando iníciar"}`
    }, [seconds, minutes, activeCycle])

    useEffect(() => {
        let interval: number

        if (activeCycle) {
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(new Date(), new Date(activeCycle.startDate))

                if (secondsDifference >= totalSeconds) {
                    markCurrentCycleAsFinished()
                    setSecondsPassed(totalSeconds)
                    clearInterval(interval)
                } else {
                    setSecondsPassed(secondsDifference)
                }

            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }

    }, [activeCycle, totalSeconds, activeCycleId, setSecondsPassed, markCurrentCycleAsFinished])

    return (
        <>
            <CountDownContainer>
                <span>{minutes[0]}</span>
                <span>{minutes[1]}</span>
                <Separator>:</Separator>
                <span>{seconds[0]}</span>
                <span>{seconds[1]}</span>
            </CountDownContainer>
        </>
    );
}

export default CountDown;