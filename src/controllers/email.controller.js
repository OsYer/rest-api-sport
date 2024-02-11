import nodemailer from 'nodemailer';
import { generateRandomCode } from './generate_token.controller';

export const sendRecoveryEmail = async (req, res) => {
  const { to } = req.body;

  try {
    // Generar código aleatorio de 6 dígitos
    const randomCode = generateRandomCode();

    // Configuración de Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sportgymcenterinfo@gmail.com',
        pass: 'faol swhy ktje sibg',
      },
    });

    // Opciones del correo
    const mailOptions = {
      from: 'sportgymcenterinfo@gmail.com',
      to,
      subject: 'Sport Gym Center Recuperación',
      html: `
      <h2>Recuperación de contraseña</h2>
      <p>Usted ha solicitado la recuperación de su contraseña. En caso de no requerirla, simplemente ignore este mensaje.</p>
      <p style="text-align: center; color: green; font-size: 20px;"><strong>Sport Gym Center</strong></p>
      </br>
      <p style="font-size: 20px;">Su token es: <strong>${randomCode}</strong></p>
      </br>
      </br>
      <p>Gracias por utilizar el sistema integral Sport Gym Center, estamos a sus órdenes…</p>
      <br>
      <div style="text-align: center;">
      <p><strong>ATENTAMENTE</strong></p>
      <p>Administradores del Sport Gym Center</p>
      <p>Lic. Jair Morales Franco</p>
      <p>Lic. Leonardo Angeles</p>
      <p>Ing. Carlos Alberto Hernández Hernández</p>
      <p>Ing. Osmar Aldair Yerana Martinez</p>
      </div>
      `,
    };

    // Envío del correo
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado:', info.response);

    res.status(200).json({ message: 'Correo enviado con éxito', randomCode });

  } catch (error) {
    console.error('Error al enviar el correo:', error.message);
    res.status(500).json({ error: 'Error al enviar el correo' });
  }
};