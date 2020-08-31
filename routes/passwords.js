app.post("/api/passwords", async (req, response) => {
  try {
    const { key, password } = req.body;
    const encryptedPassword = await encrypt(password, masterPassword);
    await writePassword(key, encryptedPassword, database);
    response.status(201).send(`Password ${key} Created`);
  } catch (error) {
    console.error(error);
    response.status(500).send(error.message);
  }
});
