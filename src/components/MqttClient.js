// components/MqttClient.js
import { useEffect, useState } from 'react';
import mqtt from 'mqtt';

const MqttClient = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const clientId = 'mqttx_a4e6f8b0'; // El ID del cliente MQTT
    const username = 'tu_usuario'; // Tu nombre de usuario MQTT
    const password = 'tu_contraseña'; // Tu contraseña MQTT

    const client = mqtt.connect('wss://broker.emqx.io:8084/mqtt', {
      clientId,
      username,
      password,
      
      // Otras opciones como clean, keepalive, etc., según sea necesario
    });

    client.on('connect', () => {
      console.log('Conectado al broker MQTT');
      client.subscribe('outTopic', (err) => {
        if (!err) {
          console.log('Suscrito al topic');
        }
      });
    });

    client.on('message', (topic, message) => {
      console.log(`Mensaje recibido en el topic ${topic}: ${message.toString()}`);
      setData(JSON.parse(message.toString()));
    });

    return () => {
      if (client) {
        client.end();
      }
    };
  }, []);

  return (
    <div>
      {data && (
        <div>
          <h2>Datos recibidos:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default MqttClient;
