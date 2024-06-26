import { useEffect, useState } from 'react';
import mqtt from 'mqtt';
import LiquidGauge from 'react-liquid-gauge'; // librería de gráfica de gauge

const MqttClient = () => {
  const [weight, setWeight] = useState(20); // Inicia el peso en 20
  const [data, setData] = useState(null);

  useEffect(() => {
    const client = mqtt.connect('wss://broker.emqx.io:8084/mqtt');

    client.on('connect', function () {
      console.log('Conectado al broker MQTT');
      client.subscribe('outTopic', function (err) {
        if (!err) {
          console.log('Suscrito al topic');
        } else {
          console.error('Error de suscripción:', err);
        }
      });
    });

    client.on('message', (topic, message) => {
      console.log(`Mensaje recibido en el topic ${topic}: ${message.toString()}`);
      try {
        const parsedData = JSON.parse(message.toString());
        setData(parsedData);
        if (parsedData.Peso) {
          setWeight(parsedData.Peso);
        }
      } catch (error) {
        console.error("Error al analizar el mensaje JSON:", error);
      }
    });
    return () => {
      if (client) {
        client.end();
      }
    };
  }, []);

  return (
    <div>
      
      <LiquidGauge
        width={200}
        height={200}
        value={weight} // Usa el peso como valor para la gráfica de gauge
        minValue={0} // Establece el valor mínimo de la gráfica
        maxValue={50} // Establece el valor máximo de la gráfica
        textColor="#000000"
        textSize={1}
        textOffsetX={0}
        textOffsetY={0}
        textRenderer={(props) => {
          const value = Math.round(props.value);
          const radius = Math.min(props.height / 2, props.width / 2);
          const textPixels = (props.textSize * radius / 2);
          const valueStyle = {
            fontSize: textPixels
          };
          const percentStyle = {
            fontSize: textPixels * 0.6
          };

          return (
            <tspan>
              <tspan className="value" style={valueStyle}>{value}</tspan>
              <tspan style={percentStyle}>%</tspan>
            </tspan>
          );
        }}
      />
    </div>
  );
};

export default MqttClient;
