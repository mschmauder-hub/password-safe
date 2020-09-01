export async function login() {
  const data = {
    email: "something@mail.com",
    password: "12345",
  };

  const passwords = await fetch("/api/users/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log("Logged In");
}
