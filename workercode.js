export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (url.pathname === "/") {
      return Response.json({ status: "ok" }, { headers: corsHeaders });
    }

    if (url.pathname === "/health") {
      return Response.json({ status: "ok" }, { headers: corsHeaders });
    }

    if (url.pathname === "/bg-remover" && request.method === "POST") {
      try {
        const formData = await request.formData();
        const file = formData.get("file");

        if (!file) {
          return Response.json(
            { error: "No file uploaded" },
            { status: 400, headers: corsHeaders }
          );
        }

        const arrayBuffer = await file.arrayBuffer();

        const form = new FormData();
        form.append(
          "image_file",
          new Blob([arrayBuffer], { type: file.type || "image/png" }),
          "image.png"
        );
        form.append("size", "auto");

        const apiResponse = await fetch(
          "https://api.remove.bg/v1.0/removebg",
          {
            method: "POST",
            headers: {
              "X-Api-Key": env.REMOVE_BG_API_KEY,
            },
            body: form,
          }
        );

        if (!apiResponse.ok) {
          const errText = await apiResponse.text();
          return Response.json(
            { error: errText },
            { status: 500, headers: corsHeaders }
          );
        }

        const resultBlob = await apiResponse.blob();

        return new Response(resultBlob, {
          headers: {
            ...corsHeaders,
            "Content-Type": "image/png",
          },
        });
      } catch (err) {
        return Response.json(
          { error: err.message },
          { status: 500, headers: corsHeaders }
        );
      }
    }

    return Response.json(
      { error: "Not found" },
      { status: 404 }
    );
  },
};