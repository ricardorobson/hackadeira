# PlantControl - hackadeira
## Descrição
Este projeto é o um protótipo de baixa fidelidade de um sistema de automação de cuidado de uma Planta. O projeto faz uso de sendor de Temperatura, Umidade no ar, Umidade no Solo e Luminosidade do ambiente. O projeto usa também um Servo Motor para simular um atuador que libera e veda água e luz na planta.

## Arquitetura
Os sensores informam suas medidas em tópicos mqtt. Esses tópicos são "ouvidos" por um web-socket que serve para prover uma interação via web com o usuário final.

## Uso do PlantControl
O usuário final pode optar pelo acionamento manual ou automático do Servo Motor. No caso do acionamento manual, o usuário pode clicar nos botões de Habilidar e desabilitar o motor.
No caso de acionamento automático, os valores de luminosidade e de umidade do solo determinarão o acionamento do motor.
