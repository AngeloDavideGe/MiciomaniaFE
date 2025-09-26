export const errorPageProfilo = `<!DOCTYPE html>
      <html>
      <head>
        <title>Link non valido</title>
        <style>
          body {
            font-family: 'Roboto', Arial, sans-serif;
            text-align: center;
            padding: 50px;
            background-color: #f4f4f9;
            color: #333;
            margin: 0;
          }
          .container {
            max-width: 500px;
            margin: 0 auto;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            padding: 30px;
          }
          h1 {
            color: #e63946;
            font-size: 24px;
            margin-bottom: 20px;
          }
          p {
            font-size: 16px;
            color: #555;
            margin-bottom: 30px;
          }
          button {
            background-color: #007bff;
            color: #fff;
            border: none;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          button:hover {
            background-color: #0056b3;
          }
          .icon {
            font-size: 50px;
            color: #e63946;
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="icon">⚠️</div>
          <h1>Link non valido</h1>
          <p>Il collegamento a cui stai cercando di accedere non è disponibile o non esiste.</p>
          <button onclick="window.close()">Chiudi questa finestra</button>
        </div>
      </body>
      </html>`;
