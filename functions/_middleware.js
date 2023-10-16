async function errorHandling(context) {
  try {
    return await context.next();
  } catch (err) {
    return new Response(`${err.message}\n${err.stack}`, { status: 500 });
  }
}

async function handleRequest({ next, request, env }) {
  if (request.headers.has("Authorization")) {
    const Authorization = request.headers.get("Authorization");
    const [scheme, encoded] = Authorization.split(" ");

    if (!encoded || scheme !== "Basic") {
      return new Response(`The Authorization header must start with Basic`, {
        status: 400,
      });
    }

    const buffer = Uint8Array.from(atob(encoded), (character) =>
      character.charCodeAt(0)
    );
    const decoded = new TextDecoder().decode(buffer).normalize();

    const index = decoded.indexOf(":");

    if (index === -1 || /[\0-\x1F\x7F]/.test(decoded)) {
      return new Response("Invalid authorization value", { status: 400 });
    }

    const user = decoded.substring(0, index);
    const password = decoded.substring(index + 1);

    if (env.BASIC_USER !== user) {
      return new Response("Invalid credentials.", { status: 401 });
    }

    if (env.BASIC_PASSWORD !== password) {
      return new Response("Invalid credentials.", { status: 401 });
    }

    return await next();
  }

  return new Response("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}

export const onRequest = [errorHandling, handleRequest];
