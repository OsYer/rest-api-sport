
export const sendMethod = async (req, res) => {
  const { method, email } = req.body;
  // console.log("Methiod", method, email)
  if ((method == null || method === '') || (email == null || email === '')) {
    return res.status(400).json({ msg: 'Bad Request. Please enter all fields' });
  }

  try {
    const emailResponse = await fetch(`http://localhost:3001/api/users/email/${email}`);

    if (emailResponse.status === 404) {
      return res.status(401).json({ msg: 'User not found' });
    }

    if (emailResponse.status !== 200) {
      return res.status(500).json({ msg: 'Error retrieving user data' });
    }

    const userData = await emailResponse.json();
    //console.log('userData ', userData)
    if (method === '1') {
      const response = await fetch('http://localhost:3001/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
        }),
      });

      if (!response.ok) {
        throw new Error('Fallo al enviar tu correo de recuperación');
      }

      const responseData = await response.json();
      const randomCode = responseData.randomCode;

      userData.randomCode = randomCode;
      // console.log('userData ', userData)
    } else if (method === '2') {

      console.log('Método en desarrollo');
      return res.status(200).json(userData);

    } else {
      return res.status(400).json({ msg: 'Invalid method' });
    }

    try {
      const response = await fetch('http://localhost:3001/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Id: userData.ID_usuario,
          recovery_code: userData.randomCode
        }),
      });
      if (!response.ok) {
        throw new Error('Failed');
      }

      return res.status(200).json(userData);
    } catch (error) {
      console.log('error5005 ', error.message)
      return res.status(500).json({ msg: error.message });
    }
  } catch (error) {
    console.log('error5005 ', error.message)
    return res.status(500).json({ msg: error.message });
  }
};
