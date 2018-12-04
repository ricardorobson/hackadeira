# PlantControl - hackadeira
## Descrição
Este projeto é o um protótipo de baixa fidelidade de um sistema de automação de cuidado de uma Planta. O projeto faz uso de sendor de Temperatura, Umidade no ar, Umidade no Solo e Luminosidade do ambiente. O projeto usa também um Servo Motor para simular um atuador que libera e veda água e luz na planta.

Na pasta [publishers](https://github.com/ricardorobson/hackadeira/tree/master/publishers) estão os scripts desenvolvidos em Python dos sensores de temperatura, umidade e luminosidade, publicando suas leituras em tópicos MQTT. Na pasta [web](https://github.com/ricardorobson/hackadeira/tree/master/web) estão os arquivos referentes ao servidor web utilizado, assim como a Dashboard do usuário. O arquivo [motor.py](https://github.com/ricardorobson/hackadeira/blob/master/motor.py) está o script do funcionamento do servo motor.

## Arquitetura
Os sensores informam suas medidas em tópicos MQTT. Esses tópicos são "ouvidos" por um WebSocket que serve para prover uma interação via web com o usuário final.

![Imagem 1](https://raw.githubusercontent.com/ricardorobson/hackadeira/master/images/Arquitetura.png)

## Uso do PlantControl
O usuário final pode optar pelo acionamento manual ou automático do Servo Motor. No caso do acionamento manual, o usuário pode clicar nos botões de Habilidar e desabilitar o motor.
No caso de acionamento automático, os valores de luminosidade e de umidade do solo determinarão o acionamento do motor.

### Dashboard
Página web com as informações das condições da planta, relacionadas à: temperatura e umidade do ambiente, umidade do solo, e luminosidade. E também com as ações manual e automática sobre o motor (servo), para acionar o mecanismo da "placa protetora" em relação a incidência solar.

![Dashboard 1](https://raw.githubusercontent.com/ricardorobson/hackadeira/master/images/Dashboard-1.png)
![Dashboard 2](https://raw.githubusercontent.com/ricardorobson/hackadeira/master/images/Dashboard-2.png)
![Dashboard 3](https://raw.githubusercontent.com/ricardorobson/hackadeira/master/images/Dashboard-3.png)
