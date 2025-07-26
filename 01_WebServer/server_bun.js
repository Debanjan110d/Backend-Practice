/* This code snippet is setting up a basic server using the `serve` function from the 'bun' library in
JavaScript. Here's a breakdown of what it does: */
import { serve } from 'bun'

serve({
    fetch(request) {
        const url = new URL(request.url)
        /* This code snippet is defining a function that handles incoming requests based on the URL path.
        Here's a breakdown of what it does: */
        if (url.pathname === '/') {
            return new Response("Hello Chai World", { status: 200 })
            //Optional is the status type
        } else if (url.pathname === "/ice_tea") {
            return new Response("Hello Ice Tea", { status: 200 })
        } else {
            return new Response("Not Found", { status: 404 })
        }
    },
    /* The `port: 3000` and `hostname: "127.0.0.1"` lines in the code snippet are setting up the
    configuration for the server. */
    port: 3000,
    hostname: "127.0.0.1"
})