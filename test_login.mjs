async function test() {
  try {
    const resInit = await fetch("http://localhost:8788/api/init");
    const textInit = await resInit.text();
    console.log("INIT:", textInit);

    const res = await fetch("http://localhost:8788/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "nycadmin@nyc.com", password: "Nyc@admin123" }),
    });
    const text = await res.text();
    console.log("LOGIN:", res.status, text);
  } catch (e) {
    console.log("ERROR:", e.message);
  }
}
test();
