import { HistoryContainer, HistoryList, Status } from "./styles"

export const History = () => {
    return (
        <HistoryContainer>
            <h1>History</h1>

            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Tarefas</td>
                            <td>20 minutos</td>
                            <td>Há dois meses</td>
                            <td><Status statusColor="green"> Concluído </Status></td>
                        </tr> 
                    </tbody>
                    <tbody>
                        <tr>
                            <td>Tarefas</td>
                            <td>20 minutos</td>
                            <td>Há dois meses</td>
                            <td><Status statusColor="green"> Concluído </Status></td>

                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>Tarefas</td>
                            <td>20 minutos</td>
                            <td>Há dois meses</td>
                            <td><Status statusColor="green"> Concluído </Status></td>

                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>Tarefas</td>
                            <td>20 minutos</td>
                            <td>Há dois meses</td>
                            <td><Status statusColor="green"> Concluído </Status></td>

                        </tr>
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    );
}
